import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { BreadcrumbJsonLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Interior Design Portfolio | Street of Dreams & Luxury Homes — Portland",
  description:
    "The Greylyn Wayne interior design portfolio: four-time NW Natural Street of Dreams featured designer, award-winning luxury residences, and full-service custom interiors across Portland, Oregon. (971) 930-0220.",
  alternates: { canonical: "https://www.greylynwayne.com/portfolio" },
  openGraph: {
    title: "Interior Design Portfolio | Greylyn Wayne — Portland, OR",
    description:
      "Four-time Street of Dreams featured designer. Award-winning luxury residences and full-service custom interiors in Portland, Oregon.",
    url: "https://www.greylynwayne.com/portfolio",
    images: [{ url: "/images/og-image.png" }],
  },
};

const streetOfDreams = [
  { year: "2025", title: "Alla Famiglia", note: "8,725 sq ft — largest in recent SOD history" },
  { year: "2024", title: "Vista", note: "Historic Northwest Hills remodel" },
  { year: "2021", title: "Ohana", note: "Boho-tropical multi-generational custom home" },
  { year: "2019", title: "Bespoke", note: "People's & Professional's Best Interior Design" },
];

export default function PortfolioPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Portfolio", href: "/portfolio" },
        ]}
      />

      {/* Hero */}
      <section className="pt-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-20 lg:py-28">
          <div className="text-center max-w-3xl mx-auto">
            <p className="text-teal text-sm tracking-[0.3em] uppercase mb-4">
              Interior Design
            </p>
            <h1 className="font-[family-name:var(--font-playfair)] text-4xl md:text-5xl lg:text-6xl text-charcoal mb-6">
              Design Portfolio
            </h1>
            <p className="text-charcoal-light text-lg leading-relaxed">
              Award-winning luxury residences and full-service custom interiors.
              As a four-time featured designer at the NW Natural Street of
              Dreams, we bring the same craftsmanship to every home we touch.
            </p>
          </div>
        </div>
      </section>

      {/* Street of Dreams feature */}
      <section className="pb-8">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Link href="/street-of-dreams" className="group block">
            <div className="relative aspect-[16/10] md:aspect-[16/7] overflow-hidden">
              <Image
                src="/images/street-of-dreams.webp"
                alt="Alla Famiglia Street of Dreams interior by Greylyn Wayne"
                fill
                priority
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-charcoal/40 group-hover:bg-charcoal/30 transition-colors" />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
                <p className="text-teal-light text-sm tracking-[0.3em] uppercase mb-3">
                  4× Featured Designer
                </p>
                <h2 className="font-[family-name:var(--font-playfair)] text-3xl md:text-5xl text-white max-w-3xl">
                  NW Natural Street of Dreams
                </h2>
                <span className="mt-6 inline-block border border-white/70 text-white px-7 py-3 text-sm tracking-wider uppercase group-hover:bg-white group-hover:text-charcoal transition-colors">
                  Explore the Showcase Homes
                </span>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* SOD year grid */}
      <section className="py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {streetOfDreams.map((home) => (
              <div key={home.year} className="bg-warm p-8">
                <p className="font-[family-name:var(--font-playfair)] text-4xl text-teal-light mb-3">
                  {home.year}
                </p>
                <h3 className="font-[family-name:var(--font-playfair)] text-lg text-charcoal mb-2">
                  {home.title}
                </h3>
                <p className="text-charcoal-light text-sm leading-relaxed">
                  {home.note}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Alla Famiglia spotlight */}
      <section className="py-16 lg:py-24 bg-warm">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="relative aspect-[4/5] overflow-hidden order-last lg:order-first">
              <Image
                src="/images/sod-2025-alla-famiglia.webp"
                alt="Alla Famiglia, the 2025 NW Natural Street of Dreams home by Greylyn Wayne"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <p className="text-teal text-sm tracking-[0.3em] uppercase mb-4">
                Featured Project
              </p>
              <h2 className="font-[family-name:var(--font-playfair)] text-3xl md:text-4xl text-charcoal mb-3">
                Alla Famiglia
              </h2>
              <p className="text-charcoal-light italic mb-6">
                &ldquo;For the Family&rdquo; — our 2025 Street of Dreams home
              </p>
              <p className="text-charcoal-light leading-relaxed mb-8">
                A European-style residence designed for multi-generational
                living on 1.6 acres. At 8,725 square feet, it is the largest
                home in recent Street of Dreams history — anchored by a handmade
                spiral staircase framed in a 30-foot window wall.
              </p>
              <Link
                href="/alla-famiglia"
                className="inline-block border border-teal text-teal px-8 py-3 text-sm tracking-wider uppercase hover:bg-teal hover:text-white transition-colors"
              >
                View the Full Project
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Full-service interior design */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <p className="text-teal text-sm tracking-[0.3em] uppercase mb-4">
                Full-Service Interiors
              </p>
              <h2 className="font-[family-name:var(--font-playfair)] text-3xl md:text-4xl text-charcoal mb-6">
                Designed for the Way You Live
              </h2>
              <p className="text-charcoal-light leading-relaxed mb-6">
                Beyond the showcase homes, we partner with homeowners on
                whole-house renovations, new builds, and room-by-room refreshes
                — bringing the same eye for warm textures, curated furnishings,
                and artful detail to projects of every scale.
              </p>
              <Link
                href="/interior-design"
                className="inline-block bg-teal text-white px-8 py-3 text-sm tracking-wider uppercase hover:bg-teal-dark transition-colors font-medium"
              >
                Explore Interior Design
              </Link>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                src="/images/interiors/kearney/01.webp"
                alt="Full-service interior design by Greylyn Wayne — NW Kearney living room, Portland, Oregon"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Cross-link to staging portfolio */}
      <section className="py-16 bg-charcoal">
        <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center">
          <p className="text-teal-light text-sm tracking-[0.3em] uppercase mb-4">
            Selling a Home?
          </p>
          <h2 className="font-[family-name:var(--font-playfair)] text-2xl md:text-3xl text-white mb-5">
            See Our Home Staging Portfolio
          </h2>
          <p className="text-gray-400 leading-relaxed mb-8 max-w-2xl mx-auto">
            Browse real listings we&apos;ve staged across the Portland metro and
            SW Washington — each linked to its live status on Redfin and Zillow.
          </p>
          <Link
            href="/staged-homes"
            className="inline-block bg-teal text-white px-8 py-3 text-sm tracking-wider uppercase hover:bg-teal-dark transition-colors font-medium"
          >
            View Staged Homes
          </Link>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 lg:py-32 text-center">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <h2 className="font-[family-name:var(--font-playfair)] text-3xl md:text-4xl text-charcoal mb-6">
            Ready to Create Something Beautiful?
          </h2>
          <p className="text-charcoal-light leading-relaxed mb-10">
            Every project begins with a conversation. Let&apos;s talk about your
            home and the vision you have for it.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-teal text-white px-10 py-4 text-sm tracking-wider uppercase hover:bg-teal-dark transition-colors font-medium"
          >
            Get Your Free Consultation
          </Link>
        </div>
      </section>
    </>
  );
}
