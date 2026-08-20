import * as React from "react";
import { Logo } from "./Logo";

/**
 * Express footer.
 *
 * Deep blue ground, white reversed logo, columns of links, then the two lines
 * that are not optional on any Express property: the Equal Opportunity Employer
 * statement and the Alamo Franchise Services copyright.
 */

export interface FooterColumn {
  heading: string;
  links: { label: string; href: string }[];
}

export interface FooterProps {
  columns: FooterColumn[];
  year?: number;
}

export function Footer({ columns, year = new Date().getFullYear() }: FooterProps) {
  return (
    <footer data-brand-ground="inverse">
      <div className="brand-container py-16">
        <Logo treatment="white" height={44} />

        <div className="mt-12 grid gap-10 sm:grid-cols-2 md:grid-cols-4">
          {columns.map((col) => (
            <nav key={col.heading}>
              <h5 className="mb-3">{col.heading}</h5>
              <ul className="list-none p-0">
                {col.links.map((l) => (
                  <li key={l.href} className="mb-2">
                    <a href={l.href} className="no-underline hover:underline">
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <hr className="my-10 border-0 border-t border-brandBorderInverse opacity-40" />

        <p className="text-sm text-brandTextInverseMuted">
          Express Employment Professionals is an Equal Opportunity Employer.
        </p>
        <p className="text-sm text-brandTextInverseMuted">
          &copy;2024&ndash;{year} Alamo Franchise Services, LLC, a subsidiary of
          Express Services, Inc. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
