import type { Metadata } from "next";
import Link from "next/link";
import { BreadcrumbJsonLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Home Staging & Design Jobs in Portland, OR | Careers",
  description:
    "Now hiring in Portland, Oregon: home staging assistants, moving specialists, and design team members. Join Greylyn Wayne — see open positions and apply today.",
  alternates: { canonical: "https://www.greylynwayne.com/careers" },
};

const positions = [
  {
    title: "Staging Assistant",
    type: "Part-Time / On-Call",
    description:
      "Assist with furniture installation, staging setup, and de-staging for residential properties throughout the Portland metro area. Physical role requiring ability to lift and move furniture.",
  },
  {
    title: "Moving Specialist",
    type: "Part-Time / On-Call",
    description:
      "Handle furniture delivery, loading/unloading, and transportation of staging inventory between our warehouse and client properties. Valid driver's license required.",
  },
  {
    title: "Design Assistant",
    type: "Full-Time",
    description:
      "Support our lead designers with mood boards, sourcing, client communication, and project coordination. Interior design education or experience preferred.",
  },
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

      {/* Hero */}
      <section className="pt-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-24 lg:py-32">
          <div className="text-center">
            <p className="text-teal text-sm tracking-[0.3em] uppercase mb-4">
              Join Our Team
            </p>
            <h1 className="font-[family-name:var(--font-playfair)] text-4xl md:text-5xl lg:text-6xl text-charcoal mb-6">
              Careers at Greylyn Wayne
            </h1>
            <p className="text-charcoal-light text-lg max-w-2xl mx-auto">
              We&apos;re a growing, family-run design studio in Portland,
              Oregon. If you&apos;re passionate about design and creating
              beautiful spaces, we&apos;d love to hear from you.
            </p>
          </div>
        </div>
      </section>

      {/* Positions */}
      <section className="pb-24 lg:pb-32">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <div className="space-y-8">
            {positions.map((position) => (
              <div
                key={position.title}
                className="border border-gray-200 p-8 lg:p-10"
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
                  <h2 className="font-[family-name:var(--font-playfair)] text-xl">
                    {position.title}
                  </h2>
                  <span className="text-teal text-xs tracking-[0.2em] uppercase">
                    {position.type}
                  </span>
                </div>
                <p className="text-charcoal-light text-sm leading-relaxed mb-6">
                  {position.description}
                </p>
                <Link
                  href="/contact"
                  className="text-teal text-sm tracking-wider uppercase font-medium hover:text-teal-dark transition-colors"
                >
                  Apply Now &rarr;
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* General */}
      <section className="py-24 lg:py-32 bg-warm text-center">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <h2 className="font-[family-name:var(--font-playfair)] text-3xl md:text-4xl text-charcoal mb-6">
            Don&apos;t See Your Role?
          </h2>
          <p className="text-charcoal-light leading-relaxed mb-10">
            We&apos;re always interested in meeting talented, design-minded
            people. Send us your resume and a note about what you&apos;re
            looking for.
          </p>
          <a
            href="mailto:design@greylynwayne.com"
            className="inline-block bg-teal text-white px-10 py-4 text-sm tracking-wider uppercase hover:bg-teal-dark transition-colors font-medium"
          >
            Email Your Resume
          </a>
        </div>
      </section>
    </>
  );
}
