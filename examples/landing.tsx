/**
 * A full Express page, assembled only from the reference components and tokens.
 *
 * It follows the running order the live site uses: the two-audience hero, the
 * "who we are" paragraph, the three service lines, a credentialed statistic, then
 * one closing ask pointing at a local office. Copy here is lifted from
 * expresspros.com.au, so it is approved language. Reuse it rather than
 * paraphrasing.
 *
 * To render the franchise register instead, put data-brand-mode="franchise" on
 * the outermost element. Do not mix the two on one page.
 */

import { Nav } from "../components/Nav";
import { Hero } from "../components/Hero";
import { Card } from "../components/Card";
import { Button } from "../components/Button";
import { StatCallout } from "../components/StatCallout";
import { CTASection } from "../components/CTASection";
import { Footer } from "../components/Footer";

const SERVICES = [
  {
    title: "Office Services",
    body: "Clerical/Administrative, Receptionist, Customer Service Representative, Call Centre, Office Manager, Data Entry, Executive Assistant, and more.",
  },
  {
    title: "Light Industrial",
    body: "Assembler, Forklift Driver, Welder, Lathe Operator, Maintenance Worker, Shipping/Receiving Clerk, Warehouse Worker, Machinist, and more.",
  },
  {
    title: "Skilled Trades",
    body: "CNC Machinist, Forklift Driver, Truck Driver, HVAC Technician, Facilities Maintenance, and more.",
  },
];

export default function Landing() {
  return (
    <>
      <Nav
        utility={[
          { label: "Search Jobs", href: "/search-jobs/australia" },
          { label: "Locations", href: "/locations" },
        ]}
        links={[
          { label: "Job Seekers", href: "/job-seekers/job-seekers" },
          { label: "Employers", href: "/employers/employers" },
          { label: "Who We Are", href: "/who-we-are/who-we-are" },
        ]}
        actionLabel="Find a location"
        actionHref="/locations"
      />

      <Hero
        panels={[
          {
            eyebrow: "Job seekers",
            headline: "Find a job",
            body: "One connection with Express gives you access to multiple job opportunities. Work with Express and you will never pay a fee for our services.",
            overlay: "blue",
            action: (
              <Button href="/search-jobs/australia" variant="secondary">
                Search job openings
              </Button>
            ),
          },
          {
            eyebrow: "Employers",
            headline: "Hire people",
            body: "The Express team will take the time to understand your business needs, then connect you with screened and qualified workers.",
            overlay: "purple",
            action: (
              <Button href="/employers/workforce-solutions" variant="secondary">
                Explore workforce solutions
              </Button>
            ),
          },
        ]}
      />

      <section className="brand-section">
        <div className="brand-container">
          <h2>Locally owned, global resources</h2>
          <p className="max-w-3xl">
            Every Express Employment Professionals office is locally owned by
            business leaders within the communities they serve, with the support
            and resources of a global leader in the staffing industry. Let us put
            our more than four decades of recruiting experience and expertise to
            work for you.
          </p>
        </div>
      </section>

      <section className="brand-section brand-section--subtle">
        <div className="brand-container">
          <h2>Any position, any industry</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {SERVICES.map((s) => (
              <Card
                key={s.title}
                title={s.title}
                action={
                  <Button href="/employers/workforce-solutions" variant="ghost">
                    Learn more
                  </Button>
                }
              >
                {s.body}
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="brand-section">
        <div className="brand-container grid items-center gap-10 md:grid-cols-2">
          <StatCallout
            value="80%"
            label="of companies that use staffing services say they find quality employees."
            source="American Staffing Association"
            gradient="green-blue"
          />
          <div>
            <h3>Screened before they reach your floor</h3>
            <p>
              All employees are screened and evaluated through our ISO-registered
              hiring process to assess skills, abilities, and cultural fit before
              they are placed in a job at your business. Express never charges a
              fee to the people we place.
            </p>
          </div>
        </div>
      </section>

      <CTASection
        headline="Contact an office near you"
        body="Tell us what you need and your local Express team will send you a qualified worker who fits your job description and your company culture."
        actionLabel="Find your local office"
        actionHref="/locations"
      />

      <Footer
        columns={[
          {
            heading: "Job Seekers",
            links: [
              { label: "Search Jobs Australia", href: "/search-jobs/australia" },
              { label: "Search Jobs New Zealand", href: "/search-jobs/new-zealand" },
              { label: "Types of Jobs", href: "/job-seekers/types-of-jobs" },
            ],
          },
          {
            heading: "Employers",
            links: [
              { label: "Employers", href: "/employers/employers" },
              { label: "Workforce Solutions", href: "/employers/workforce-solutions" },
            ],
          },
          {
            heading: "Who We Are",
            links: [
              { label: "Who We Are", href: "/who-we-are/who-we-are" },
              { label: "Meet the Team", href: "/who-we-are/meet-the-team" },
              { label: "Franchising Opportunities", href: "https://www.expressfranchising.com.au/" },
            ],
          },
          {
            heading: "Resources",
            links: [
              { label: "Blog", href: "/resources/blog" },
              { label: "Market Trends", href: "/resources/market-trends" },
              { label: "Privacy Policy", href: "/privacy-policy" },
            ],
          },
        ]}
      />
    </>
  );
}
