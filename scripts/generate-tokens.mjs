#!/usr/bin/env node
/**
 * generate-tokens.mjs
 *
 * Reads tokens/tokens.json (W3C DTCG), the single source of truth, and writes:
 *   - tokens/tokens.css          CSS custom properties + semantic aliases (mode-switchable)
 *   - tokens/tokens.ts           typed exports, incl. a `noHash` colour variant for PptxGenJS
 *   - tailwind.preset.ts         Tailwind v3 preset (theme.extend)
 *
 * The three generated files must never be hand-edited. Edit tokens.json and rerun:
 *   node scripts/generate-tokens.mjs
 *
 * Conventions the script expects in tokens.json:
 *   palette.*   raw primitives          -> --palette-<path>, primitives in TS/Tailwind
 *   brand.*     semantic aliases        -> --brand-<path>, the consumer-facing layer
 *               aliases may reference primitives with "{palette.blue.500}"
 *   brand.<mode>.*  (optional)          -> a [data-brand-mode="<mode>"] override block in CSS
 *   type.*, space.*, radius.*           -> mapped into Tailwind fontFamily/spacing/borderRadius
 *
 * Zero dependencies. Node 18+.
 */

import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(__dirname, "..");
const tokensDir = join(repoRoot, "tokens");
const srcPath = join(tokensDir, "tokens.json");

if (!existsSync(srcPath)) {
  console.error(`✗ ${srcPath} not found. Author tokens.json first.`);
  process.exit(1);
}

const raw = JSON.parse(readFileSync(srcPath, "utf8"));

/** Flatten the DTCG tree into { path: { type, value } }, ignoring $schema and meta keys. */
function flatten(node, trail = [], out = {}) {
  for (const [key, val] of Object.entries(node)) {
    if (key.startsWith("$")) continue;
    if (val && typeof val === "object" && "$value" in val) {
      out[[...trail, key].join(".")] = { type: val.$type, value: val.$value };
    } else if (val && typeof val === "object") {
      flatten(val, [...trail, key], out);
    }
  }
  return out;
}

const flat = flatten(raw);

/** Resolve {a.b.c} references to their literal values (one or more hops). */
function deref(value, seen = new Set()) {
  if (typeof value !== "string") return value;
  const m = value.match(/^\{([^}]+)\}$/);
  if (!m) return value;
  const ref = m[1];
  if (seen.has(ref) || !flat[ref]) return value;
  seen.add(ref);
  return deref(flat[ref].value, seen);
}

const kebab = (p) => p.replace(/\./g, "-").replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
const camel = (p) => p.replace(/[-.](\w)/g, (_, c) => c.toUpperCase());
const isMode = (path) => /^brand\.[^.]+\./.test(path) && KNOWN_MODES.has(path.split(".")[1]);

// Treat brand.<mode>.* as a mode override only for declared modes.
const KNOWN_MODES = new Set(raw.$modes || []); // optional: "$modes": ["dark","professional"]

// ---- tokens.css -------------------------------------------------------------
const primitives = [];
const aliasesBase = [];
const modeBlocks = {}; // mode -> lines[]

for (const [path, { type, value }] of Object.entries(flat)) {
  const cssVar = `--${kebab(path)}`;
  const resolved = deref(value);
  const decl = `  ${cssVar}: ${resolved};`;
  if (path.startsWith("palette.")) {
    primitives.push(decl);
  } else if (path.startsWith("brand.")) {
    const parts = path.split(".");
    if (KNOWN_MODES.has(parts[1])) {
      const mode = parts[1];
      // re-point the matching default alias: brand.dark.bg.default -> --brand-bg-default
      const targetVar = `--brand-${kebab(parts.slice(2).join("."))}`;
      (modeBlocks[mode] ||= []).push(`  ${targetVar}: ${resolved};`);
    } else {
      // keep the alias pointing at the primitive var where possible
      const refMatch = typeof value === "string" && value.match(/^\{([^}]+)\}$/);
      const rhs = refMatch ? `var(--${kebab(refMatch[1])})` : resolved;
      aliasesBase.push(`  ${cssVar}: ${rhs};`);
    }
  } else {
    // type/space/radius scalars also exposed as vars
    primitives.push(decl);
  }
}

let css = `/* GENERATED from tokens/tokens.json by scripts/generate-tokens.mjs. Do not edit by hand. */\n\n`;
css += `:root {\n${primitives.join("\n")}\n}\n\n`;
css += `/* Semantic aliases: the consumer-facing layer. Override these per mode, never the primitives. */\n`;
css += `:root {\n${aliasesBase.join("\n")}\n}\n`;
for (const [mode, lines] of Object.entries(modeBlocks)) {
  css += `\n[data-brand-mode="${mode}"] {\n${lines.join("\n")}\n}\n`;
}
writeFileSync(join(tokensDir, "tokens.css"), css);

// ---- tokens.ts --------------------------------------------------------------
const colorEntries = [];
const noHashEntries = [];
const otherEntries = [];
for (const [path, { type, value }] of Object.entries(flat)) {
  if (isMode(path)) continue;
  const key = camel(path.replace(/\./g, "-"));
  const resolved = String(deref(value));
  if (type === "color") {
    colorEntries.push(`  "${key}": "${resolved}",`);
    noHashEntries.push(`  "${key}": "${resolved.replace(/^#/, "")}",`);
  } else {
    otherEntries.push(`  "${key}": ${JSON.stringify(resolved)},`);
  }
}
let ts = `/* GENERATED from tokens/tokens.json by scripts/generate-tokens.mjs. Do not edit by hand. */\n\n`;
ts += `export const colors = {\n${colorEntries.join("\n")}\n} as const;\n\n`;
ts += `/** Colours without the leading '#', for PptxGenJS. */\n`;
ts += `export const colorsNoHash = {\n${noHashEntries.join("\n")}\n} as const;\n\n`;
ts += `export const tokens = {\n${otherEntries.join("\n")}\n} as const;\n\n`;
ts += `export type ColorToken = keyof typeof colors;\n`;
writeFileSync(join(tokensDir, "tokens.ts"), ts);

// ---- tailwind.preset.ts -----------------------------------------------------
const twColors = {};
const twSpacing = {};
const twRadius = {};
const twFonts = {};
for (const [path, { type, value }] of Object.entries(flat)) {
  if (isMode(path)) continue;
  const resolved = deref(value);
  if (type === "color") {
    // expose brand aliases via the css var so Tailwind classes respect mode switching
    const ref = `var(--${kebab(path)})`;
    twColors[camel(path.replace(/\./g, "-"))] = ref;
  } else if (path.startsWith("space.")) {
    twSpacing[path.split(".").slice(1).join("-")] = resolved;
  } else if (path.startsWith("radius.")) {
    twRadius[path.split(".").slice(1).join("-") || "DEFAULT"] = resolved;
  } else if (type === "fontFamily") {
    twFonts[path.split(".").slice(1).join("-")] = [resolved];
  }
}
const j = (o) => JSON.stringify(o, null, 6).replace(/\n/g, "\n  ");
let preset = `/* GENERATED from tokens/tokens.json by scripts/generate-tokens.mjs. Do not edit by hand. */\n`;
preset += `import type { Config } from "tailwindcss";\n\n`;
preset += `const preset: Partial<Config> = {\n`;
preset += `  theme: {\n`;
preset += `    extend: {\n`;
preset += `      colors: ${j(twColors)},\n`;
preset += `      spacing: ${j(twSpacing)},\n`;
preset += `      borderRadius: ${j(twRadius)},\n`;
preset += `      fontFamily: ${j(twFonts)},\n`;
preset += `    },\n  },\n};\n\nexport default preset;\n`;
writeFileSync(join(repoRoot, "tailwind.preset.ts"), preset);

console.log("✓ tokens.css, tokens.ts, tailwind.preset.ts generated from tokens.json");
