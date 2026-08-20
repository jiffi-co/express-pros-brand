import * as React from "react";

/**
 * Express statistic call-out.
 *
 * The brand guide's own device: a number set large in white on one of the four
 * approved gradients, with the source credited underneath. Statistics carry a lot
 * of weight in Express material, so they always name where they came from.
 *
 * This replaces the mascot slot in most brand systems. Express has no character,
 * and the repeating stylised X band plus this call-out are what do that job.
 */

type Gradient = "green-blue" | "blue-purple" | "purple-orange" | "red-yellow";

export interface StatCalloutProps {
  value: string;
  label: string;
  source?: string;
  gradient?: Gradient;
  className?: string;
}

export function StatCallout({
  value,
  label,
  source,
  gradient = "green-blue",
  className = "",
}: StatCalloutProps) {
  return (
    <figure
      data-brand-ground="inverse-none"
      className={`brand-gradient--${gradient} m-0 rounded-default p-8 text-center ${className}`}
    >
      <p className="m-0 text-5xl font-bold leading-none">{value}</p>
      <figcaption className="mt-3">
        <span className="block">{label}</span>
        {source ? (
          <cite className="mt-2 block text-sm not-italic opacity-90">
            &mdash; {source}
          </cite>
        ) : null}
      </figcaption>
    </figure>
  );
}

export default StatCallout;
