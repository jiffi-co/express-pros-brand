import * as React from "react";

/**
 * Express card.
 *
 * The workhorse block on expresspros.com.au: a service, a job type, a stat, a
 * blog teaser. Heading in deep blue, body in brand grey, one action at the foot.
 * `tone="brand"` fills it with the medium blue used across the franchise site's
 * stat grid; `tone="gradient"` puts it on one of the four approved pairings for
 * a statistic or a pull quote.
 *
 * Each tone owns exactly one background declaration, so nothing here depends on
 * stylesheet order to win.
 */

type Tone = "default" | "subtle" | "brand" | "gradient";
type Gradient = "green-blue" | "blue-purple" | "purple-orange" | "red-yellow";

const tones: Record<Tone, string> = {
  default: "bg-brandBgDefault border border-brandBorderSubtle",
  subtle: "bg-brandBgSubtle border border-transparent",
  brand: "border border-transparent",
  gradient: "border border-transparent",
};

const grounds: Record<Tone, string | undefined> = {
  default: undefined,
  subtle: undefined,
  brand: "inverse-brand",
  gradient: "inverse-none",
};

export interface CardProps {
  title?: string;
  tone?: Tone;
  gradient?: Gradient;
  action?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}

export function Card({
  title,
  tone = "default",
  gradient = "blue-purple",
  action,
  children,
  className = "",
}: CardProps) {
  const ground = grounds[tone];
  // Heading and body colour come from the ground rule in globals.css, so there is
  // nothing to set here and nothing to keep in sync.
  const gradientClass = tone === "gradient" ? `brand-gradient--${gradient}` : "";
  return (
    <article
      data-brand-ground={ground}
      className={`${tones[tone]} ${gradientClass} rounded-default p-6 ${className}`}
    >
      {title ? <h4 className="mb-3">{title}</h4> : null}
      <div>{children}</div>
      {action ? <div className="mt-6">{action}</div> : null}
    </article>
  );
}

export default Card;
