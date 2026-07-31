import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  cities,
  getCityBySlug,
  cityHero,
  cityInteriorContent,
} from "@/data/service-areas";
import { BreadcrumbJsonLd, FAQJsonLd } from "@/components/JsonLd";
import SplitHero from "@/components/SplitHero";
import StagedHomeCard from "@/components/StagedHomeCard";
import { homesForCity } from "@/data/staging-portfolio";

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

  // Absolute title escapes the layout template's "— Portland, OR" tail, which
  // otherwise stamps every non-Portland city page with a conflicting locality.
  const title = `Home Staging & Interior Design in ${city.name}, ${city.stateShort} | Greylyn Wayne`;
  const description = `Home staging and full-service interior design in ${city.name}, ${city.state}. 4.9★ from 163 clients, 4x Street of Dreams — staging that sells and design you'll live in. (971) 930-0220.`;

  return {
    title: { absolute: title },
    description,
    alternates: {
      canonical: `https://www.greylynwayne.com/service-areas/${city.slug}`,
    },
    openGraph: {
      title,
      description,
      url: `https://www.greylynwayne.com/service-areas/${city.slug}`,
      images: [{ url: "/images/og-image.png", width: 2500, height: 1312 }],
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

  const interior = cityInteriorContent[city.slug];
  // Merge city-specific interior-design FAQs into the page + FAQ schema so the
  // interior Service schema is backed by real matching content.
  const faqs = interior ? [...city.faqs, ...interior.faqs] : city.faqs;
  const hero = cityHero(city);
  const listings = homesForCity(city.name, city.stagingRegion);

  // Honest framing: "city" = staged here; "region"/"portfolio" = nearby/representative work.
  const listingHeading =
    listings.scope === "city"
      ? `Recently Staged in ${city.name}`
      : `Recent Projects Near ${city.name}`;
  const listingSubtitle =
    listings.scope === "city"
      ? `Real homes we've staged in ${city.name} — each links to its live status on Redfin and Zillow.`
      : `Greylyn Wayne is a Portland-based studio serving ${city.name} and the greater ${city.region}. Here's a selection of homes we've recently staged across the area.`;

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

      {/* Hero — split editorial */}
      <SplitHero
        eyebrow={city.region}
        title={
          <>
            Home Staging & Interior Design in {city.name}, {city.stateShort}
          </>
        }
        subtitle={city.description}
        imageSrc={hero.src}
        imageAlt={hero.alt}
        titleClassName="text-3xl md:text-4xl lg:text-5xl"
      />

      {/* Why staging in this city */}
      <section className="py-24 lg:py-32 bg-warm">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="font-[family-name:var(--font-playfair)] text-3xl md:text-4xl text-charcoal mb-6">
                Why Stage Your {city.name} Home?
              </h2>
              <p className="text-charcoal-light leading-relaxed mb-8">
                {city.marketNote}
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

      {/* Neighborhoods we serve */}
      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-5xl px-6 lg:px-8 text-center">
          <h2 className="font-[family-name:var(--font-playfair)] text-3xl md:text-4xl text-charcoal mb-4">
            Neighborhoods We Serve in {city.name}
          </h2>
          <p className="text-charcoal-light max-w-2xl mx-auto mb-10">
            From first photo to final showing, we stage homes across {city.name}
            &apos;s neighborhoods — matching each property to the buyers who shop
            there.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {city.neighborhoods.map((n) => (
              <span
                key={n}
                className="px-5 py-2.5 bg-cream text-sm text-charcoal-light"
              >
                {n}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Recently staged homes (real listings — local, or labeled nearby work) */}
      {listings.homes.length > 0 && (
        <section className="py-24 lg:py-32 bg-warm">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="text-center mb-16">
              <p className="text-teal text-sm tracking-[0.3em] uppercase mb-3">
                Our Work
              </p>
              <h2 className="font-[family-name:var(--font-playfair)] text-3xl md:text-4xl text-charcoal mb-4">
                {listingHeading}
              </h2>
              <p className="text-charcoal-light max-w-2xl mx-auto">
                {listingSubtitle}
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
              {listings.homes.map((home) => (
                <StagedHomeCard key={home.ref} home={home} />
              ))}
            </div>
            <div className="text-center mt-14">
              <Link
                href="/staged-homes"
                className="inline-block border border-teal text-teal px-8 py-3.5 text-sm tracking-wider uppercase hover:bg-teal hover:text-white transition-colors font-medium"
              >
                View Our Full Staging Portfolio &rarr;
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Interior design in this city — dedicated content backing the ID Service schema */}
      {interior && (
        <section className="py-24 lg:py-32">
          <div className="mx-auto max-w-3xl px-6 lg:px-8">
            <p className="text-teal text-sm tracking-[0.3em] uppercase mb-4">
              Beyond Staging
            </p>
            <h2 className="font-[family-name:var(--font-playfair)] text-3xl md:text-4xl text-charcoal mb-6">
              Interior Design in {city.name}
            </h2>
            <p className="text-charcoal-light leading-relaxed mb-8">
              {interior.note}
            </p>
            <Link
              href="/interior-design"
              className="inline-block bg-teal text-white px-8 py-4 text-sm tracking-wider uppercase hover:bg-teal-dark transition-colors font-medium"
            >
              Explore Interior Design &rarr;
            </Link>
          </div>
        </section>
      )}

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
                Interior Design in {city.name} &rarr;
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
            Ready to Transform Your {city.name} Home?
          </h2>
          <p className="text-gray-400 leading-relaxed mb-10">
            Get a free consultation and see how professional staging and
            interior design can help you sell faster — or fall back in love with
            the home you&apos;re keeping — in {city.name}.
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
