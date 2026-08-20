import * as React from "react";
import { Button } from "./Button";

/**
 * Express closing block.
 *
 * Every Express page ends by pointing at a local office. The corporate register
 * closes on a deep blue band; the franchise register closes on medium blue with
 * a purple action. Keep the ask singular: one action, one verb.
 */

export interface CTASectionProps {
  headline: string;
  body?: string;
  actionLabel: string;
  actionHref: string;
  ground?: "inverse" | "subtle";
}

export function CTASection({
  headline,
  body,
  actionLabel,
  actionHref,
  ground = "inverse",
}: CTASectionProps) {
  const inverse = ground === "inverse";
  return (
    <section
      data-brand-ground={inverse ? "inverse" : undefined}
      className={`brand-section ${inverse ? "" : "brand-section--subtle"}`}
    >
      <div className="brand-container text-center">
        <h2>{headline}</h2>
        {body ? <p className="mx-auto mb-8 max-w-2xl">{body}</p> : null}
        <Button href={actionHref} variant={inverse ? "secondary" : "primary"}>
          {actionLabel}
        </Button>
      </div>
    </section>
  );
}

export default CTASection;
