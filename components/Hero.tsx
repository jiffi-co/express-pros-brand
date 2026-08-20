import * as React from "react";

/**
 * Express hero.
 *
 * The pattern the live site uses: a job-representation photograph with a brand
 * colour laid over it, headline and one action on top. The overlay is what makes
 * the photo read as Express rather than as stock. Never run a hero photo bare,
 * because white type has no checkable contrast against a raw image.
 *
 * Passing more than one panel renders the two-audience opening from
 * expresspros.com.au: job seekers on the left in blue, employers on the right in
 * purple, each with its own action.
 *
 * The overlay gradients live in tokens.json as `palette.overlay.*`, so the colour
 * values here cannot drift from the palette.
 */

type Overlay = "blue" | "purple" | "deep";

export interface HeroPanelProps {
  eyebrow?: string;
  headline: string;
  body?: string;
  action?: React.ReactNode;
  /** URL of a job-representation photograph. Optional; without it the overlay stands alone. */
  image?: string;
  overlay?: Overlay;
}

export function HeroPanel({
  eyebrow,
  headline,
  body,
  action,
  image,
  overlay = "blue",
}: HeroPanelProps) {
  return (
    <section
      data-brand-ground="inverse"
      className={`brand-overlay--${overlay} relative flex min-h-[26rem] items-center bg-cover bg-center p-12`}
      style={
        image
          ? {
              backgroundImage: `var(--palette-overlay-${overlay}), url(${image})`,
            }
          : undefined
      }
    >
      <div className="max-w-xl">
        {eyebrow ? (
          <p className="mb-2 text-sm font-medium uppercase tracking-widest">
            {eyebrow}
          </p>
        ) : null}
        <h1 className="mb-4">{headline}</h1>
        {body ? <p className="mb-8">{body}</p> : null}
        {action}
      </div>
    </section>
  );
}

export function Hero({ panels }: { panels: HeroPanelProps[] }) {
  return (
    <div className={panels.length > 1 ? "grid md:grid-cols-2" : undefined}>
      {panels.map((p) => (
        <HeroPanel key={p.headline} {...p} />
      ))}
    </div>
  );
}

export default Hero;
