#!/usr/bin/env node
/**
 * check-contrast.mjs
 *
 * Reads tokens/tokens.json and re-computes every contrast pairing claimed in
 * brand/visual-system.md. If someone changes a colour and a documented pairing
 * stops passing, this fails instead of the doc quietly going out of date.
 *
 * Run: node scripts/check-contrast.mjs
 * Zero dependencies. Node 18+.
 */

import { readFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const raw = JSON.parse(readFileSync(join(repoRoot, "tokens/tokens.json"), "utf8"));

function flatten(node, trail = [], out = {}) {
  for (const [key, val] of Object.entries(node)) {
    if (key.startsWith("$")) continue;
    if (val && typeof val === "object" && "$value" in val) {
      out[[...trail, key].join(".")] = val.$value;
    } else if (val && typeof val === "object") {
      flatten(val, [...trail, key], out);
    }
  }
  return out;
}

const flat = flatten(raw);

function deref(value, seen = new Set()) {
  const m = typeof value === "string" && value.match(/^\{([^}]+)\}$/);
  if (!m) return value;
  if (seen.has(m[1]) || !(m[1] in flat)) throw new Error(`unresolved token ${value}`);
  seen.add(m[1]);
  return deref(flat[m[1]], seen);
}

const hex = (path) => {
  if (!(path in flat)) throw new Error(`unknown token ${path}`);
  return deref(flat[path]);
};

const channel = (c) => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);

function luminance(value) {
  const h = value.replace("#", "");
  const [r, g, b] = [0, 2, 4].map((i) => channel(parseInt(h.slice(i, i + 2), 16) / 255));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function ratio(a, b) {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}

/** min: 4.5 for body text, 3 for large text and non-text (borders, icons, focus rings). */
const PAIRINGS = [
  ["body copy on white", "brand.text.primary", "brand.bg.default", 4.5],
  ["body copy on tint", "brand.text.primary", "brand.bg.subtle", 4.5],
  ["heading on white", "brand.text.heading", "brand.bg.default", 4.5],
  ["heading on tint", "brand.text.heading", "brand.bg.subtle", 4.5],
  ["link on white", "brand.text.link", "brand.bg.default", 4.5],
  ["link hover on white", "brand.text.link-hover", "brand.bg.default", 4.5],
  ["white on deep blue", "brand.text.inverse", "brand.bg.inverse", 4.5],
  ["white on deepest blue", "brand.text.inverse", "brand.bg.inverse-strong", 4.5],
  ["muted on deep blue", "brand.text.inverse-muted", "brand.bg.inverse", 4.5],
  ["white on medium blue", "brand.text.inverse", "brand.bg.brand", 4.5],
  ["primary button label", "brand.action.primary-fg", "brand.action.primary-bg", 4.5],
  ["primary button hover label", "brand.action.primary-fg-hover", "brand.action.primary-bg-hover", 4.5],
  ["accent button label", "brand.action.accent-fg", "brand.action.accent-bg", 4.5],
  ["franchise button label", "brand.action.accent-fg", "palette.purple.franchise", 4.5],
  ["secondary button label", "brand.action.secondary-fg", "brand.action.secondary-bg", 4.5],
  ["ghost button label on white", "brand.action.ghost-fg", "brand.bg.default", 4.5],
  ["success text on white", "brand.status.success", "brand.bg.default", 4.5],
  ["success text on tint", "brand.status.success", "brand.bg.subtle", 4.5],
  ["warning text on white", "brand.status.warning", "brand.bg.default", 4.5],
  ["warning text on tint", "brand.status.warning", "brand.bg.subtle", 4.5],
  ["danger text on white", "brand.status.danger", "brand.bg.default", 4.5],
  ["gold text on white", "brand.status.highlight-text", "brand.bg.default", 4.5],
  ["gold text on tint", "brand.status.highlight-text", "brand.bg.subtle", 4.5],
  ["ink on highlight chip", "brand.text.on-highlight", "brand.status.highlight", 4.5],
  ["focus ring on white", "brand.focus.ring", "brand.bg.default", 3],
  ["focus ring on tint", "brand.focus.ring", "brand.bg.subtle", 3],
  ["focus ring on deep blue", "brand.focus.ring-inverse", "brand.bg.inverse", 3],
  ["strong border on white", "brand.border.strong", "brand.bg.default", 3],
  ["inverse border on deep blue", "brand.border.inverse", "brand.bg.inverse", 3],
  ["inverse border on deepest blue", "brand.border.inverse", "brand.bg.inverse-strong", 3],
  ["inverse border on medium blue", "brand.border.inverse", "brand.bg.brand", 3],

  // Franchise register. These override the aliases above when
  // data-brand-mode="franchise" is set, so they need their own row.
  ["franchise: white on medium blue ground", "brand.text.inverse", "brand.franchise.bg.inverse", 4.5],
  ["franchise: muted text on medium blue ground", "brand.franchise.text.inverse-muted", "brand.franchise.bg.inverse", 4.5],
  ["franchise: body copy on #F1F1F1", "brand.text.primary", "brand.franchise.bg.subtle", 4.5],
  ["franchise: heading on #F1F1F1", "brand.text.heading", "brand.franchise.bg.subtle", 4.5],
  ["franchise: primary button label", "brand.action.primary-fg", "brand.franchise.action.primary-bg", 4.5],
  ["franchise: primary button hover label", "brand.franchise.action.primary-fg-hover", "brand.franchise.action.primary-bg-hover", 4.5],
  ["franchise: focus ring on #F1F1F1", "brand.focus.ring", "brand.franchise.bg.subtle", 3],
];

/** Pairings the brand guide's own palette does NOT clear. Documented rather than
 *  fixed, so nobody "discovers" them later and quietly starts using them. */
const KNOWN_FAILURES = [
  ["white on light blue", "palette.neutral.white", "palette.blue.light", 4.5],
  ["white on brand green", "palette.neutral.white", "palette.green.base", 4.5],
  ["white on brand orange", "palette.neutral.white", "palette.orange.base", 4.5],
  ["brand yellow on white", "palette.yellow.base", "palette.neutral.white", 4.5],
];

let failed = 0;
console.log("Contrast pairings (WCAG 2.1)\n");
for (const [label, fg, bg, min] of PAIRINGS) {
  const r = ratio(hex(fg), hex(bg));
  const ok = r >= min - 0.005;
  if (!ok) failed++;
  console.log(
    `${ok ? "  ok  " : "  FAIL"}  ${r.toFixed(2).padStart(6)} : 1  (min ${min})  ${label}  [${hex(fg)} on ${hex(bg)}]`
  );
}

console.log("\nKnown-failing pairings. These must stay banned in brand/visual-system.md\n");
for (const [label, fg, bg, min] of KNOWN_FAILURES) {
  const r = ratio(hex(fg), hex(bg));
  if (r >= min) {
    failed++;
    console.log(`  UNEXPECTED PASS  ${r.toFixed(2)} : 1  ${label}: the ban is now stale, so update the docs`);
  } else {
    console.log(`  banned  ${r.toFixed(2).padStart(6)} : 1  (needs ${min})  ${label}`);
  }
}

if (failed) {
  console.error(`\n✗ ${failed} pairing(s) out of contract.`);
  process.exit(1);
}
console.log(`\n✓ ${PAIRINGS.length} pairings pass, ${KNOWN_FAILURES.length} bans still hold.`);
