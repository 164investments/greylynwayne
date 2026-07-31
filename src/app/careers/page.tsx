import type { Metadata } from "next";
import { BreadcrumbJsonLd, JobPostingJsonLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Home Staging & Design Jobs in Portland, OR | Careers",
  description:
    "Greylyn Wayne is hiring a full-time Principal Staging Designer in Portland, Oregon. Lead residential staging projects from walkthrough through completion.",
  alternates: { canonical: "https://www.greylynwayne.com/careers" },
};

const principalResponsibilities = [
  "Independently select furniture, art, rugs, lighting, accessories, decor, and bedding for each project, then determine their placement with minimal oversight.",
  "Lead the staging crew on site with clear direction, confidence, and warmth while maintaining Greylyn Wayne’s design standards.",
  "Own quality control across furniture, decor, bedding, art, and accessory placement without relying on remote approvals.",
  "Adapt plans quickly when property constraints or other challenges arise on site.",
  "Protect client homes by maintaining cleanliness and documenting existing or new damage.",
  "Oversee packing, installation, destaging, and inventory returns so projects leave complete and items return safely.",
  "Anticipate inventory needs and communicate project progress, team development, and sourcing needs proactively.",
  "Use internal tools to track inventory, project details, and time accurately.",
  "Conduct project walkthroughs independently, gathering measurements, photos, and client details.",
  "Drive and maintain company vehicles, and support warehouse organization as needed.",
];

const principalExpectations = [
  "Lead staging projects from walkthrough through completion, including furniture selection, layout, art placement, and on-site pivots.",
  "Set a calm, professional, and efficient tone that earns the staging crew’s trust and respect.",
  "Deliver consistent, detail-driven stages with minimal corrections or rework.",
  "Manage time on site without compromising quality or design integrity.",
  "Mentor Junior Staging Designers and Staging Assistants and help elevate the team’s work.",
  "Represent Greylyn Wayne with professionalism, design excellence, and care.",
];

export default function CareersPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Careers", href: "/careers" },
        ]}
      />
      <JobPostingJsonLd />

      {/* Hero */}
      <section className="pt-20 bg-warm">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-20 lg:py-28">
          <div className="max-w-4xl">
            <p className="text-teal text-sm tracking-[0.3em] uppercase mb-4">
              Now Hiring · Portland, Oregon
            </p>
            <h1 className="font-[family-name:var(--font-playfair)] text-5xl md:text-6xl lg:text-7xl text-charcoal leading-[0.98] mb-7">
              Principal Staging Designer
            </h1>
            <p className="font-[family-name:var(--font-playfair)] text-charcoal-light text-xl md:text-2xl leading-relaxed max-w-3xl">
              Set the design vision, lead the crew, and take ownership of how
              every Greylyn Wayne home shows.
            </p>
          </div>
        </div>
      </section>

      {/* Featured opening */}
      <section
        id="principal-staging-designer"
        className="py-20 lg:py-28 scroll-mt-28"
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid lg:grid-cols-[minmax(250px,0.72fr)_minmax(0,1.8fr)] gap-12 lg:gap-20 items-start">
            <aside className="lg:sticky lg:top-32 border-t-2 border-teal pt-6">
              <p className="text-xs tracking-[0.24em] uppercase text-charcoal-light mb-7">
                Position Details
              </p>
              <dl className="divide-y divide-charcoal/15">
                {[
                  ["Compensation", "$23–$28 / hour DOE"],
                  ["Schedule", "Full time · Monday–Friday · 7 am–3 pm"],
                  ["Location", "Portland, OR 97214"],
                  ["Benefits", "Company vehicle during shifts · Employee discount after 90 days"],
                ].map(([term, detail]) => (
                  <div key={term} className="py-5 first:pt-0">
                    <dt className="text-xs tracking-[0.18em] uppercase text-teal mb-2">
                      {term}
                    </dt>
                    <dd className="font-[family-name:var(--font-playfair)] text-lg leading-snug text-charcoal">
                      {detail}
                    </dd>
                  </div>
                ))}
              </dl>
              <a
                href="mailto:design@greylynwayne.com?subject=Application%20%E2%80%94%20Principal%20Staging%20Designer"
                className="mt-8 inline-flex w-full items-center justify-center bg-teal text-white px-6 py-4 text-sm tracking-wider uppercase hover:bg-teal-dark transition-colors font-medium focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal"
              >
                Apply by Email
              </a>
            </aside>

            <div>
              <div className="border-b border-charcoal/15 pb-12 mb-12">
                <p className="text-xs tracking-[0.24em] uppercase text-teal mb-4">
                  The Role
                </p>
                <h2 className="font-[family-name:var(--font-playfair)] text-3xl md:text-4xl text-charcoal mb-6">
                  Lead every stage with confidence and care.
                </h2>
                <p className="text-charcoal-light text-lg leading-relaxed">
                  The Principal Staging Designer is a senior leadership role
                  responsible for the design vision and on-site execution of
                  Greylyn Wayne staging projects. You&apos;ll make independent
                  design decisions, guide the team, and ensure every project
                  meets our standards for quality, care, efficiency, and market
                  readiness.
                </p>
              </div>

              <div className="border-b border-charcoal/15 pb-12 mb-12">
                <p className="text-xs tracking-[0.24em] uppercase text-teal mb-6">
                  Key Responsibilities
                </p>
                <ul className="grid md:grid-cols-2 gap-x-10 gap-y-5">
                  {principalResponsibilities.map((responsibility) => (
                    <li
                      key={responsibility}
                      className="flex gap-4 text-charcoal-light leading-relaxed"
                    >
                      <span
                        aria-hidden="true"
                        className="mt-[0.65em] h-1.5 w-1.5 shrink-0 rounded-full bg-teal"
                      />
                      <span>{responsibility}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="grid md:grid-cols-2 gap-12">
                <div>
                  <p className="text-xs tracking-[0.24em] uppercase text-teal mb-6">
                    What Success Looks Like
                  </p>
                  <ul className="space-y-4">
                    {principalExpectations.map((expectation) => (
                      <li
                        key={expectation}
                        className="flex gap-4 text-charcoal-light leading-relaxed"
                      >
                        <span
                          aria-hidden="true"
                          className="mt-[0.65em] h-1.5 w-1.5 shrink-0 rounded-full bg-teal"
                        />
                        <span>{expectation}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-teal-bg p-7 md:p-8">
                  <p className="text-xs tracking-[0.24em] uppercase text-teal mb-6">
                    Qualifications
                  </p>
                  <ul className="space-y-4 text-charcoal leading-relaxed">
                    <li>1–3 years of home staging experience preferred</li>
                    <li>Valid driver&apos;s license and reliable transportation</li>
                    <li>High school diploma</li>
                    <li>Experience leading a small team preferred</li>
                  </ul>
                  <div className="mt-8 pt-7 border-t border-charcoal/15">
                    <p className="font-[family-name:var(--font-playfair)] text-xl text-charcoal mb-3">
                      Ready to apply?
                    </p>
                    <p className="text-charcoal-light leading-relaxed">
                      Email your resume, a cover letter explaining your
                      interest and fit for the role, and at least two
                      professional references to{" "}
                      <a
                        href="mailto:design@greylynwayne.com?subject=Application%20%E2%80%94%20Principal%20Staging%20Designer"
                        className="text-teal underline underline-offset-4 hover:text-teal-dark"
                      >
                        design@greylynwayne.com
                      </a>
                      .
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </>
  );
}
