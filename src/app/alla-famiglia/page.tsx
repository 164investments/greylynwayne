import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { BreadcrumbJsonLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Alla Famiglia | Street of Dreams Luxury Home Design",
  description:
    "Explore the Alla Famiglia home at Street of Dreams — an 8,725 sq ft European-style multi-generational home designed by Greylyn Wayne in Portland, Oregon.",
  alternates: { canonical: "https://www.greylynwayne.com/alla-famiglia" },
};

const features = [
  "A dramatic spiral staircase framed by a 30-foot window wall",
  "Handmade circular staircase bent with layers of 1/4\" plywood, 20 gallons of glue, and 3,000+ screws",
  "Hand-sculpted plaster and sand wall treatments, layered as they dried",
  "Hand-stenciled patterns in the primary suite bathroom",
  "A 1,600-lb quartz slab in the primary shower",
  "A 600-lb Ilve 60\" range in the chef's kitchen",
  "12-foot Elite Windows door system — each panel weighing 300 lbs",
  "40' x 20' pool with a 10-foot waterfall holding 24,000 gallons",
  "Courtyard with outdoor living space, water feature, and firepit",
  "Set on 1.6 acres — designed for four generations under one roof",
];

export default function AllaFamigliaPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Street of Dreams", href: "/street-of-dreams" },
          { name: "Alla Famiglia", href: "/alla-famiglia" },
        ]}
      />

      {/* Hero */}
      <section className="relative pt-20">
        <div className="relative h-[60vh] min-h-[400px]">
          <Image
            src="/images/street-of-dreams.webp"
            alt="Alla Famiglia Street of Dreams luxury dining room designed by Greylyn Wayne"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-charcoal/40" />
          <div className="absolute inset-0 flex items-center">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <p className="text-teal-light text-sm tracking-[0.3em] uppercase mb-4">
                Street of Dreams 2025 &middot; Lake Oswego
              </p>
              <h1 className="font-[family-name:var(--font-playfair)] text-4xl md:text-5xl lg:text-6xl text-white max-w-2xl">
                Alla Famiglia
              </h1>
              <p className="text-gray-300 text-lg mt-4 italic">
                &ldquo;For the Family&rdquo;
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Overview */}
      <section className="py-24 lg:py-32">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-teal text-sm tracking-[0.3em] uppercase mb-4">
              8,725 Square Feet
            </p>
            <h2 className="font-[family-name:var(--font-playfair)] text-3xl md:text-4xl text-charcoal mb-6">
              The Largest Home in Recent Street of Dreams History
            </h2>
            <p className="text-charcoal-light leading-relaxed text-lg mb-6">
              Alla Famiglia — meaning &ldquo;For the Family&rdquo; in Italian —
              is a European-style home designed for multi-generational living.
              Set on 1.6 acres, this extraordinary residence was designed with
              four generations in mind, bringing family together under one
              beautifully crafted roof.
            </p>
            <p className="text-charcoal-light leading-relaxed text-lg">
              Jody Wallace served as the lead interior designer, bringing her
              signature blend of warmth, sophistication, and meticulous attention
              to detail to every room in the home.
            </p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 lg:py-32 bg-warm">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <p className="text-teal text-sm tracking-[0.3em] uppercase mb-4">
                Craftsmanship
              </p>
              <h2 className="font-[family-name:var(--font-playfair)] text-3xl md:text-4xl text-charcoal mb-8">
                Extraordinary Details
              </h2>
              <ul className="space-y-4">
                {features.map((feature, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 text-sm text-charcoal-light leading-relaxed"
                  >
                    <span className="text-teal mt-1 flex-shrink-0">
                      &#9670;
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-8">
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src="/images/street-of-dreams.webp"
                  alt="Alla Famiglia dining room — modern chandelier, upholstered chairs, built-in display cabinets"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src="/images/hero-interior.webp"
                  alt="Alla Famiglia interior details by Greylyn Wayne"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 lg:py-32 bg-charcoal text-center">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <h2 className="font-[family-name:var(--font-playfair)] text-3xl md:text-4xl text-white mb-6">
            Bring This Level of Design to Your Home
          </h2>
          <p className="text-gray-400 leading-relaxed mb-10">
            Experience the same craftsmanship and attention to detail that
            defined Alla Famiglia — tailored to your own home and vision.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-teal text-white px-10 py-4 text-sm tracking-wider uppercase hover:bg-teal-dark transition-colors font-medium"
          >
            Start Your Design Project
          </Link>
        </div>
      </section>
    </>
  );
}
