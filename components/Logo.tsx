import * as React from "react";

/**
 * Express logo.
 *
 * Four colour treatments and nothing else. The brand guide permits the three-blue
 * lock-up, all deep blue, all black and all white. There is no recoloured,
 * outlined, shadowed or stretched version, and there never will be.
 *
 * `clearSpace` applies the guide's rule: keep a margin on all four sides equal to
 * the top half of the stylised X, which measures 45% of the lock-up height on the
 * guide's own grid (page 12).
 *
 * The SVG files must be reachable from the browser. Copy `logo/` into your public
 * directory, or point `basePath` at wherever you served them.
 */

type Treatment = "3blue" | "deep-blue" | "black" | "white";
type Mark = "primary" | "icon";

const names: Record<Mark, Record<Treatment, string>> = {
  primary: {
    "3blue": "logo-primary-3blue",
    "deep-blue": "logo-primary-deep-blue",
    black: "logo-primary-black",
    white: "logo-primary-white",
  },
  icon: {
    "3blue": "logo-icon-x-3blue",
    "deep-blue": "logo-icon-x-deep-blue",
    black: "logo-icon-x-black",
    white: "logo-icon-x-white",
  },
};

/** Clear space on all four sides, as a fraction of the rendered height. */
export const CLEAR_SPACE_RATIO = 0.45;

/**
 * Smallest height at which each mark stays legible. Express publishes no minimum
 * size, so these are ours: below 24px the "Employment Professionals" line closes
 * up, and below 16px the stylised X stops reading as a person.
 */
export const MIN_HEIGHT_PX = { primary: 24, icon: 16 } as const;

export interface LogoProps {
  mark?: Mark;
  treatment?: Treatment;
  /** Rendered height in px. Width follows the artwork; never set both. */
  height?: number;
  clearSpace?: boolean;
  /** Where logo/svg is served from. Defaults to the repo layout copied to the site root. */
  basePath?: string;
  className?: string;
}

export function Logo({
  mark = "primary",
  treatment = "3blue",
  height = 40,
  clearSpace = false,
  basePath = "/logo",
  className = "",
}: LogoProps) {
  const img = (
    <img
      src={`${basePath}/svg/${names[mark][treatment]}.svg`}
      alt="Express Employment Professionals"
      height={height}
      style={{ height, width: "auto", display: "block" }}
      className={clearSpace ? undefined : className}
    />
  );

  if (!clearSpace) return img;

  return (
    <span
      className={className}
      style={{ display: "inline-block", padding: height * CLEAR_SPACE_RATIO }}
    >
      {img}
    </span>
  );
}

export default Logo;
