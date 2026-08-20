import * as React from "react";
import { Logo } from "./Logo";
import { Button } from "./Button";

/**
 * Express top navigation.
 *
 * A thin deep-blue utility strip over a white bar carrying the three-blue logo,
 * the arrangement on expresspros.com.au. The logo always sits on white; it never
 * goes into the coloured strip, because the three-blue lock-up needs a light
 * ground to hold contrast.
 */

export interface NavLink {
  label: string;
  href: string;
}

export interface NavProps {
  links: NavLink[];
  utility?: NavLink[];
  actionLabel?: string;
  actionHref?: string;
}

export function Nav({ links, utility = [], actionLabel, actionHref }: NavProps) {
  return (
    <header>
      {utility.length > 0 ? (
        <div data-brand-ground="inverse" className="text-sm">
          <nav className="brand-container flex justify-end gap-6 py-2">
            {utility.map((l) => (
              <a key={l.href} href={l.href} className="no-underline">
                {l.label}
              </a>
            ))}
          </nav>
        </div>
      ) : null}

      <div className="border-b border-brandBorderSubtle bg-brandBgDefault">
        <div className="brand-container flex items-center justify-between gap-8 py-4">
          <a href="/" aria-label="Express Employment Professionals home">
            <Logo height={44} />
          </a>
          <nav className="hidden items-center gap-8 md:flex">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-brandTextHeading no-underline hover:underline"
              >
                {l.label}
              </a>
            ))}
            {actionLabel && actionHref ? (
              <Button href={actionHref}>{actionLabel}</Button>
            ) : null}
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Nav;
