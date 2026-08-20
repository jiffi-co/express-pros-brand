import * as React from "react";

/**
 * Repeating stylised X band.
 *
 * A brand-guide design element: the stylised X repeated in a single line,
 * horizontally or vertically, as a quiet section divider. It is a texture, not a
 * logo, so keep it low-contrast, keep it to one line, and never let it sit close
 * enough to a real logo to read as a second one.
 */

export interface XBandProps {
  count?: number;
  direction?: "horizontal" | "vertical";
  size?: number;
  /** Where logo/svg is served from. Defaults to the repo layout copied to the site root. */
  basePath?: string;
  className?: string;
}

export function XBand({
  count = 6,
  direction = "horizontal",
  size = 28,
  basePath = "/logo",
  className = "",
}: XBandProps) {
  return (
    <div
      aria-hidden="true"
      className={`flex gap-4 opacity-25 ${
        direction === "vertical" ? "flex-col" : "flex-row"
      } ${className}`}
    >
      {Array.from({ length: count }, (_, i) => (
        <img
          key={i}
          src={`${basePath}/svg/logo-icon-x-deep-blue.svg`}
          alt=""
          style={{ height: size, width: "auto" }}
        />
      ))}
    </div>
  );
}

export default XBand;
