import type { Metadata } from "next";
import Link from "next/link";
import { BreadcrumbJsonLd, FAQJsonLd } from "@/components/JsonLd";
import { cities } from "@/data/service-areas";

export const metadata: Metadata = {
  title:
    "Home Staging & Interior Design Service Areas | Portland, Oregon & Beyond",
  description:
    "Greylyn Wayne serves Portland, Lake Oswego, West Linn, Beaverton, Bend, Vancouver WA & more. Professional home staging and interior design across Oregon and SW Washington — (971) 930-0220.",
  alternates: { canonical: "https://www.greylynwayne.com/service-areas" },
};

const regions = [
  "Portland Metro",
  "Central Oregon",
  "Columbia River Gorge",
  "Willamette Valley",
  "Oregon Coast",
  "Southwest Washington",
];

const areaFaqs = [
  {
    question: "Do you charge extra for staging outside of Portland?",
    answer:
      "We serve the entire Portland metro area at standard rates. For properties in Central Oregon, the Coast, or other areas outside the metro, we may include a travel fee depending on distance. Contact us for a free quote specific to your location.",
  },
  {
    question: "Can you stage a vacation home on the Oregon Coast?",
    answer:
      "Absolutely! We regularly stage and design properties in Cannon Beach, Astoria, Manzanita, Seaside, and other coastal communities. We also specialize in short-term rental design for vacation properties.",
  },
  {
    question: "Do you serve Bend and Central Oregon?",
    answer:
      "Yes, we serve Bend, Sunriver, and the surrounding Central Oregon area. Whether you're staging a home for sale or designing a vacation property, we can help.",
  },
];

export default function ServiceAreasPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Service Areas", href: "/service-areas" },
        ]}
      />
      <FAQJsonLd faqs={areaFaqs} />

      {/* Hero */}
      <section className="pt-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-24 lg:py-32">
          <div className="text-center">
            <p className="text-teal text-sm tracking-[0.3em] uppercase mb-4">
              Where We Work
            </p>
            <h1 className="font-[family-name:var(--font-playfair)] text-4xl md:text-5xl lg:text-6xl text-charcoal mb-6">
              Service Areas
            </h1>
            <p className="text-charcoal-light text-lg max-w-2xl mx-auto">
              We proudly serve communities throughout Oregon and Southwest
              Washington with professional home staging and interior design.
            </p>
          </div>
        </div>
      </section>

      {/* Areas grid by region */}
      <section className="pb-24 lg:pb-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regions.map((region) => {
              const regionCities = cities.filter((c) => c.region === region);
              if (regionCities.length === 0) return null;
              return (
                <div key={region} className="bg-warm p-8">
                  <h2 className="font-[family-name:var(--font-playfair)] text-xl mb-4">
                    {region}
                  </h2>
                  <ul className="space-y-2">
                    {regionCities.map((city) => (
                      <li key={city.slug}>
                        <Link
                          href={`/service-areas/${city.slug}`}
                          className="text-charcoal-light hover:text-teal text-sm flex items-center gap-2 transition-colors py-1.5"
                        >
                          <span className="text-teal text-xs">&#9670;</span>
                          {city.name}, {city.stateShort}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 lg:py-32 bg-warm">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-[family-name:var(--font-playfair)] text-3xl md:text-4xl text-charcoal">
              Service Area FAQ
            </h2>
          </div>
          <div className="space-y-8">
            {areaFaqs.map((faq, i) => (
              <div key={i} className="border-b border-gray-200 pb-8">
                <h3 className="font-[family-name:var(--font-playfair)] text-lg mb-3">
                  {faq.question}
                </h3>
                <p className="text-charcoal-light text-sm leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 lg:py-32 text-center">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <h2 className="font-[family-name:var(--font-playfair)] text-3xl md:text-4xl text-charcoal mb-6">
            Don&apos;t See Your Area?
          </h2>
          <p className="text-charcoal-light leading-relaxed mb-10">
            We frequently travel to new areas across Oregon and Washington.
            Contact us to discuss your project — we may be able to help.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-teal text-white px-10 py-4 text-sm tracking-wider uppercase hover:bg-teal-dark transition-colors font-medium"
          >
            Get in Touch
          </Link>
        </div>
      </section>
    </>
  );
}
