import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { cities, getCityBySlug } from "@/data/service-areas";
import { BreadcrumbJsonLd, FAQJsonLd } from "@/components/JsonLd";
import { ProofStrip } from "@/components/Proof";

export function generateStaticParams() {
  return cities.map((city) => ({ city: city.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ city: string }>;
}): Promise<Metadata> {
  const { city: slug } = await params;
  const city = getCityBySlug(slug);
  if (!city) return {};

  const title = `Home Staging & Interior Design in ${city.name}, ${city.stateShort}`;
  const description = `Professional home staging and interior design services in ${city.name}, ${city.state}. Greylyn Wayne helps ${city.name} homeowners and agents sell faster and for more — (971) 930-0220.`;

  return {
    title,
    description,
    alternates: {
      canonical: `https://www.greylynwayne.com/service-areas/${city.slug}`,
    },
    openGraph: {
      title,
      description,
      url: `https://www.greylynwayne.com/service-areas/${city.slug}`,
    },
  };
}

function CityServiceJsonLd({ city }: { city: ReturnType<typeof getCityBySlug> }) {
  if (!city) return null;

  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: `Home Staging in ${city.name}, ${city.stateShort}`,
      description: `Professional home staging services in ${city.name}, ${city.state}. Vacant staging, occupied staging, and luxury home staging for faster sales and higher offers.`,
      url: `https://www.greylynwayne.com/service-areas/${city.slug}`,
      provider: {
        "@type": "HomeAndConstructionBusiness",
        "@id": "https://www.greylynwayne.com/#organization",
        name: "Greylyn Wayne Interior Design & Home Staging",
        telephone: "+19719300220",
        address: {
          "@type": "PostalAddress",
          streetAddress: "1011 SE Oak St",
          addressLocality: "Portland",
          addressRegion: "OR",
          postalCode: "97214",
          addressCountry: "US",
        },
      },
      areaServed: {
        "@type": "City",
        name: city.name,
        containedInPlace: {
          "@type": "State",
          name: city.state,
        },
      },
      serviceType: "Home Staging",
    },
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: `Interior Design in ${city.name}, ${city.stateShort}`,
      description: `Full-service interior design in ${city.name}, ${city.state}. Color consultation, furniture selection, spatial planning, and complete room transformations.`,
      url: `https://www.greylynwayne.com/service-areas/${city.slug}`,
      provider: {
        "@type": "HomeAndConstructionBusiness",
        "@id": "https://www.greylynwayne.com/#organization",
      },
      areaServed: {
        "@type": "City",
        name: city.name,
        containedInPlace: {
          "@type": "State",
          name: city.state,
        },
      },
      serviceType: "Interior Design",
    },
  ];

  return (
    <>
      {schema.map((s, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }}
        />
      ))}
    </>
  );
}

export default async function CityPage({
  params,
}: {
  params: Promise<{ city: string }>;
}) {
  const { city: slug } = await params;
  const city = getCityBySlug(slug);
  if (!city) notFound();

  const faqs = [
    {
      question: `How much does home staging cost in ${city.name}?`,
      answer: `Home staging costs in ${city.name} vary based on property size, number of rooms, and staging duration. Most ${city.name} staging projects range from $2,500 to $8,000+. Contact us for a free, no-obligation quote specific to your property — (971) 930-0220.`,
    },
    {
      question: `Do you offer interior design services in ${city.name}?`,
      answer: `Yes! Greylyn Wayne provides full-service interior design in ${city.name} and the surrounding ${city.region} area. From single-room refreshes to whole-home transformations, our design team works with ${city.name} homeowners to create beautiful, functional spaces.`,
    },
    {
      question: `How quickly can you stage a home in ${city.name}?`,
      answer: `We can typically stage a ${city.name} property within 5–7 business days of your consultation. Rush staging is available for tight timelines. Our Portland-based warehouse and experienced team allow us to serve ${city.name} efficiently.`,
    },
  ];

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Service Areas", href: "/service-areas" },
          { name: city.name, href: `/service-areas/${city.slug}` },
        ]}
      />
      <CityServiceJsonLd city={city} />
      <FAQJsonLd faqs={faqs} />

      {/* Hero */}
      <section className="pt-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-16 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div className="order-2 lg:order-1">
            <p className="text-teal text-sm tracking-[0.3em] uppercase mb-4">
              {city.region}
            </p>
            <h1 className="font-[family-name:var(--font-playfair)] text-4xl md:text-5xl lg:text-6xl text-charcoal mb-6">
              Home Staging & Interior Design in {city.name},{" "}
              {city.stateShort}
            </h1>
            <p className="text-charcoal-light text-lg leading-relaxed">
              {city.description}
            </p>
            <ProofStrip tone="light" className="mt-6" />
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <button
                type="button"
                data-open-chat
                className="inline-flex items-center justify-center gap-2 bg-teal text-white px-8 py-4 text-sm tracking-wider uppercase hover:bg-teal-dark transition-colors font-medium text-center"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-2.685.16 4.486 4.486 0 001.276-2.876c.026-.198-.07-.392-.246-.487A8.225 8.225 0 013 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
                </svg>
                Text Us
              </button>
              <a
                href="tel:9719300220"
                className="inline-flex items-center justify-center gap-2 border-2 border-teal text-teal px-8 py-4 text-sm tracking-wider uppercase hover:bg-teal hover:text-white transition-colors font-medium text-center"
              >
                Call (971) 930-0220
              </a>
            </div>
            </div>
            <div className="relative order-1 lg:order-2 aspect-[4/3] lg:aspect-[5/4] overflow-hidden">
              <Image
                src="/images/hero-home.webp"
                alt={`Professionally staged living room by Greylyn Wayne — serving ${city.name}, ${city.stateShort}`}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Why staging in this city */}
      <section className="py-24 lg:py-32 bg-warm">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="font-[family-name:var(--font-playfair)] text-3xl md:text-4xl text-charcoal mb-6">
                Why Stage Your {city.name} Home?
              </h2>
              <p className="text-charcoal-light leading-relaxed mb-8">
                Staged homes sell faster and for more money — that&apos;s true
                nationwide, and it&apos;s especially true in{" "}
                {city.name}&apos;s competitive market. Professional staging
                helps buyers see your property&apos;s full potential from the
                first photo they see online.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center p-6 bg-white">
                  <p className="font-[family-name:var(--font-playfair)] text-3xl text-teal mb-1">
                    4.9&#9733;
                  </p>
                  <p className="text-charcoal-light text-sm">
                    rated by 163 Portland-area clients on Google
                  </p>
                </div>
                <div className="text-center p-6 bg-white">
                  <p className="font-[family-name:var(--font-playfair)] text-3xl text-teal mb-1">
                    4x
                  </p>
                  <p className="text-charcoal-light text-sm">
                    NW Natural Street of Dreams featured designer
                  </p>
                </div>
              </div>
            </div>
            <div>
              <h3 className="font-[family-name:var(--font-playfair)] text-xl text-charcoal mb-6">
                What Sets Us Apart in {city.name}
              </h3>
              <ul className="space-y-4">
                {city.highlights.map((highlight, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 text-charcoal-light"
                  >
                    <span className="text-teal mt-1 flex-shrink-0">
                      <svg
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M4.5 12.75l6 6 9-13.5"
                        />
                      </svg>
                    </span>
                    <span className="text-sm leading-relaxed">{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-[family-name:var(--font-playfair)] text-3xl md:text-4xl text-charcoal mb-4">
              Our Services in {city.name}
            </h2>
            <p className="text-charcoal-light max-w-2xl mx-auto">
              Full-service staging and design for {city.name} homeowners,
              agents, and builders.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Link
              href="/home-staging"
              className="group border border-gray-200 p-10 hover:border-teal transition-colors"
            >
              <h3 className="font-[family-name:var(--font-playfair)] text-2xl mb-4 group-hover:text-teal transition-colors">
                Home Staging
              </h3>
              <p className="text-charcoal-light text-sm leading-relaxed mb-4">
                Vacant staging, occupied staging, and luxury staging for{" "}
                {city.name} properties. We handle everything from consultation
                to installation and removal.
              </p>
              <span className="text-teal text-sm tracking-wider uppercase font-medium">
                Learn More &rarr;
              </span>
            </Link>
            <Link
              href="/interior-design"
              className="group border border-gray-200 p-10 hover:border-teal transition-colors"
            >
              <h3 className="font-[family-name:var(--font-playfair)] text-2xl mb-4 group-hover:text-teal transition-colors">
                Interior Design
              </h3>
              <p className="text-charcoal-light text-sm leading-relaxed mb-4">
                Full-service interior design for {city.name} homes. Color
                consultation, furniture selection, spatial planning, and
                complete room transformations.
              </p>
              <span className="text-teal text-sm tracking-wider uppercase font-medium">
                Learn More &rarr;
              </span>
            </Link>
            <Link
              href="/new-construction-staging"
              className="group border border-gray-200 p-10 hover:border-teal transition-colors"
            >
              <h3 className="font-[family-name:var(--font-playfair)] text-2xl mb-4 group-hover:text-teal transition-colors">
                New Construction Staging
              </h3>
              <p className="text-charcoal-light text-sm leading-relaxed mb-4">
                Model home staging and design for builders and developers in{" "}
                {city.name}. Help buyers envision the lifestyle your homes
                offer.
              </p>
              <span className="text-teal text-sm tracking-wider uppercase font-medium">
                Learn More &rarr;
              </span>
            </Link>
            <Link
              href="/short-term-rental-design"
              className="group border border-gray-200 p-10 hover:border-teal transition-colors"
            >
              <h3 className="font-[family-name:var(--font-playfair)] text-2xl mb-4 group-hover:text-teal transition-colors">
                Short-Term Rental Design
              </h3>
              <p className="text-charcoal-light text-sm leading-relaxed mb-4">
                Airbnb and vacation rental design for {city.name} property
                owners. Maximize bookings with interiors that photograph
                beautifully and delight guests.
              </p>
              <span className="text-teal text-sm tracking-wider uppercase font-medium">
                Learn More &rarr;
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 lg:py-32 bg-warm">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-[family-name:var(--font-playfair)] text-3xl md:text-4xl text-charcoal">
              {city.name} Staging & Design FAQ
            </h2>
          </div>
          <div className="space-y-8">
            {faqs.map((faq, i) => (
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

      {/* Nearby areas */}
      <section className="py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-[family-name:var(--font-playfair)] text-3xl text-charcoal mb-4">
              Also Serving Near {city.name}
            </h2>
            <p className="text-charcoal-light">
              We provide home staging and interior design throughout the{" "}
              {city.region} area.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {city.nearby.map((nearby) => {
              const nearbyCity = cities.find((c) => c.name === nearby);
              return nearbyCity ? (
                <Link
                  key={nearby}
                  href={`/service-areas/${nearbyCity.slug}`}
                  className="px-6 py-3 border border-gray-200 text-sm text-charcoal-light hover:border-teal hover:text-teal transition-colors"
                >
                  {nearby}
                </Link>
              ) : (
                <span
                  key={nearby}
                  className="px-6 py-3 border border-gray-200 text-sm text-charcoal-light"
                >
                  {nearby}
                </span>
              );
            })}
            <Link
              href="/service-areas"
              className="px-6 py-3 border border-teal text-sm text-teal hover:bg-teal hover:text-white transition-colors"
            >
              View All Areas &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 lg:py-32 bg-charcoal text-center">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <h2 className="font-[family-name:var(--font-playfair)] text-3xl md:text-4xl text-white mb-6">
            Ready to Stage Your {city.name} Home?
          </h2>
          <p className="text-gray-400 leading-relaxed mb-10">
            Get a free consultation and see how professional staging can help
            you sell faster and for more in {city.name}.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              type="button"
              data-open-chat
              className="inline-flex items-center justify-center gap-2 bg-teal text-white px-10 py-4 text-sm tracking-wider uppercase hover:bg-teal-dark transition-colors font-medium"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-2.685.16 4.486 4.486 0 001.276-2.876c.026-.198-.07-.392-.246-.487A8.225 8.225 0 013 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
              </svg>
              Text Us
            </button>
            <a
              href="tel:9719300220"
              className="inline-flex items-center justify-center gap-2 border-2 border-white text-white px-10 py-4 text-sm tracking-wider uppercase hover:bg-white hover:text-charcoal transition-colors font-medium"
            >
              Call (971) 930-0220
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
