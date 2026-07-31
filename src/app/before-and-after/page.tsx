import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { BreadcrumbJsonLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Before & After Home Staging | Portland Real Estate Agents",
  description:
    "See how Greylyn Wayne's expert home staging transforms Portland properties. Before and after photos showing how staging helps homes sell faster and at higher prices — (971) 930-0220.",
  alternates: { canonical: "https://www.greylynwayne.com/before-and-after" },
};

export default function BeforeAndAfterPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Home Staging", href: "/home-staging" },
          { name: "Before & After", href: "/before-and-after" },
        ]}
      />

      {/* Hero */}
      <section className="pt-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-24 lg:py-32">
          <div className="text-center">
            <p className="text-teal text-sm tracking-[0.3em] uppercase mb-4">
              The Staging Difference
            </p>
            <h1 className="font-[family-name:var(--font-playfair)] text-4xl md:text-5xl lg:text-6xl text-charcoal mb-6">
              Before & After
            </h1>
            <p className="text-charcoal-light text-lg max-w-2xl mx-auto">
              See how our expert staging transforms properties, helping Portland
              real estate agents and homeowners sell faster and at higher prices.
            </p>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="pb-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <div className="relative aspect-[4/3] overflow-hidden mb-4">
                <Image
                  src="/images/portland-home-staging-loft-living-room.webp"
                  alt="Home staging transformation by Greylyn Wayne — industrial loft living room in Portland"
                  fill
                  className="object-cover"
                />
              </div>
              <p className="text-teal text-xs tracking-[0.2em] uppercase mb-1">
                Living Room Staging
              </p>
              <p className="text-charcoal-light text-sm">
                Industrial loft transformed with curated leather furnishings,
                layered textiles, and carefully placed accessories.
              </p>
            </div>
            <div>
              <div className="relative aspect-[4/3] overflow-hidden mb-4">
                <Image
                  src="/images/portland-interior-design-white-kitchen.webp"
                  alt="Kitchen staging by Greylyn Wayne — modern white kitchen with styling"
                  fill
                  className="object-cover"
                />
              </div>
              <p className="text-teal text-xs tracking-[0.2em] uppercase mb-1">
                Kitchen Staging
              </p>
              <p className="text-charcoal-light text-sm">
                Modern kitchen elevated with open shelving styling, natural
                elements, and warm wood accents that appeal to buyers.
              </p>
            </div>
            <div>
              <div className="relative aspect-[4/3] overflow-hidden mb-4">
                <Image
                  src="/images/street-of-dreams.webp"
                  alt="Luxury dining room design by Greylyn Wayne for Street of Dreams"
                  fill
                  className="object-cover"
                />
              </div>
              <p className="text-teal text-xs tracking-[0.2em] uppercase mb-1">
                Dining Room Design
              </p>
              <p className="text-charcoal-light text-sm">
                Alla Famiglia Street of Dreams — luxury dining room with custom
                chandelier, upholstered seating, and built-in display cabinets.
              </p>
            </div>
            <div>
              <div className="relative aspect-[4/3] overflow-hidden mb-4">
                <Image
                  src="/images/portland-home-staging-character-bedroom.webp"
                  alt="Portland home staging by Greylyn Wayne — colorful bedroom with character"
                  fill
                  className="object-cover"
                />
              </div>
              <p className="text-teal text-xs tracking-[0.2em] uppercase mb-1">
                Bedroom Staging
              </p>
              <p className="text-charcoal-light text-sm">
                Bold, characterful staging with Portland-inspired decor,
                statement wallpaper, and curated artwork that tells a story.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* For agents */}
      <section className="py-24 lg:py-32 bg-warm">
        <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center">
          <p className="text-teal text-sm tracking-[0.3em] uppercase mb-4">
            For Real Estate Agents
          </p>
          <h2 className="font-[family-name:var(--font-playfair)] text-3xl md:text-4xl text-charcoal mb-6">
            Help Your Listings Sell Faster
          </h2>
          <p className="text-charcoal-light leading-relaxed mb-4">
            As a real estate agent, you know that first impressions matter.
            Professional staging transforms your listings from ordinary to
            extraordinary — generating more online views, more showings, and
            stronger offers.
          </p>
          <p className="text-charcoal-light leading-relaxed mb-10">
            We partner with agents throughout Portland and Oregon to deliver
            consistent, high-quality staging that helps your business grow.
            Ask about our agent-specific packages and preferred partner program.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-teal text-white px-10 py-4 text-sm tracking-wider uppercase hover:bg-teal-dark transition-colors font-medium"
            >
              Partner With Us
            </Link>
            <a
              href="tel:9719300220"
              className="border border-charcoal/20 text-charcoal px-10 py-4 text-sm tracking-wider uppercase hover:bg-charcoal hover:text-white transition-colors"
            >
              Call (971) 930-0220
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
