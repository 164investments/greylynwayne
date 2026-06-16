import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import SodGallery from "@/components/SodGallery";

// Per-property photo galleries ported from the original Street of Dreams page.
// Files live in /public/images/sod/<slug>/NN.webp (NN = 01..count).
const gallery = (slug: string, count: number) =>
  Array.from(
    { length: count },
    (_, i) => `/images/sod/${slug}/${String(i + 1).padStart(2, "0")}.webp`
  );

export const metadata: Metadata = {
  title:
    "Street of Dreams Designer Portland | 4x Featured Interior Designer",
  description:
    "Greylyn Wayne is a 4x featured designer at the NW Natural Street of Dreams (2019, 2021, 2024, 2025). 2019 People's & Professional's Best Interior Design winner. Portland, Oregon — (971) 930-0220.",
  alternates: { canonical: "https://www.greylynwayne.com/street-of-dreams" },
  openGraph: {
    title: "Street of Dreams Designer | Greylyn Wayne — Portland, OR",
    description:
      "4x featured designer at the NW Natural Street of Dreams. 2019 People's & Professional's Best Interior Design winner.",
    url: "https://www.greylynwayne.com/street-of-dreams",
    images: [{ url: "/images/og-image.png" }],
  },
};

const homes = [
  {
    year: "2025",
    title: "Alla Famiglia",
    location: "Lake Oswego, OR",
    image: "/images/sod-2025-alla-famiglia.webp",
    imageAlt:
      "Alla Famiglia 2025 Street of Dreams home facade designed by Greylyn Wayne",
    photos: gallery("alla-famiglia", 41),
    description:
      'Meaning "for the family," this European-style estate on 1.6 acres was designed for multi-generational living. At 8,725 square feet — the largest home in recent Street of Dreams history — it houses four generations under one roof, with artisanal finishes and timeless materials throughout. Built by Red Hills Land and Design.',
  },
  {
    year: "2024",
    title: "Vista",
    location: "Northwest Hills, Portland",
    image: "/images/sod-2024-vista.webp",
    imageAlt:
      "Exterior of the 2024 Street of Dreams “Vista” home, modern architecture and exterior styling by Greylyn Wayne",
    photos: gallery("vista", 10),
    description:
      "A full-scale remodel of a historic home in Portland's Northwest Hills, honoring the property's original character with custom finishes, high-end appliances, and artisanal details throughout.",
  },
  {
    year: "2021",
    title: "Ohana",
    location: "Happy Valley, OR",
    image: "/images/sod-2021-ohana.webp",
    imageAlt:
      "Living and kitchen of the 2021 Street of Dreams “Ohana” home by Greylyn Wayne",
    photos: gallery("ohana", 17),
    description:
      "A 3,800-square-foot custom home with four bedrooms and four baths. Boho- and tropical-inspired, blending contemporary and mid-century modern elements for multi-generational living. Designed by Greylyn Wayne and furnished by What's New Furniture.",
  },
  {
    year: "2019",
    title: "Bespoke",
    location: "Portland, OR",
    image: "/images/sod-2019-bespoke.webp",
    imageAlt:
      "Exterior of the 2019 NW Natural Street of Dreams “Bespoke” home by Greylyn Wayne",
    photos: gallery("bespoke", 17),
    description:
      "Our debut Street of Dreams home — a 4,600-square-foot modern farmhouse with Tuscan influences, featuring barrel doors, exposed beams, and a distinctive 3,300-pound quartz kitchen island. Voted both People's and Professional's Best Interior Design.",
  },
];

const allaFamigliaDetails = [
  "A dramatic spiral staircase framed by a 30-foot window wall",
  "Handmade circular staircase bent with layers of 1/4\" plywood, 20 gallons of glue, and 3,000+ screws",
  "Hand-sculpted plaster and sand wall treatments",
  "Hand-stenciled patterns in the primary suite",
  "A 1,600-lb quartz slab in the primary shower",
  "A 600-lb Ilve 60\" range in the chef's kitchen",
  "12-foot Elite Windows door system — each panel weighing 300 lbs",
  "40' x 20' pool with a 10-foot waterfall holding 24,000 gallons",
];

export default function StreetOfDreamsPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Street of Dreams", href: "/street-of-dreams" },
        ]}
      />

      {/* Hero */}
      <section className="relative pt-20">
        <div className="relative h-[60vh] min-h-[400px]">
          <Image
            src="/images/street-of-dreams.webp"
            alt="Alla Famiglia Street of Dreams dining room by Greylyn Wayne"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-charcoal/50" />
          <div className="absolute inset-0 flex items-center">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <p className="text-teal-light text-sm tracking-[0.3em] uppercase mb-4">
                Street of Dreams
              </p>
              <h1 className="font-[family-name:var(--font-playfair)] text-4xl md:text-5xl lg:text-6xl text-white max-w-3xl">
                Award-Winning Luxury Home Design
              </h1>
            </div>
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="py-24 lg:py-32">
        <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center">
          <h2 className="font-[family-name:var(--font-playfair)] text-3xl md:text-4xl text-charcoal mb-6">
            Four-Time Featured Designer
          </h2>
          <p className="text-charcoal-light leading-relaxed text-lg mb-4">
            The NW Natural Street of Dreams is Oregon&apos;s premier luxury home
            showcase, uniting top builders, architects, and designers to
            spotlight cutting-edge trends in architecture and interior design.
            Greylyn Wayne is honored to be a featured designer, taking a lead
            role in the creation of custom homes that blend timeless elegance
            with modern sophistication.
          </p>
          <p className="text-charcoal-light leading-relaxed text-lg">
            Jody Wallace, our founder and lead designer, has been the lead
            interior designer in{" "}
            <span className="text-teal font-medium">
              four unique homes
            </span>{" "}
            for the Street of Dreams in 2019, 2021, 2024, and 2025.
          </p>
        </div>
      </section>

      {/* Award callout */}
      <section className="py-16 bg-teal">
        <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center">
          <p className="text-teal-bg text-sm tracking-[0.3em] uppercase mb-3">
            2019 NW Natural Street of Dreams
          </p>
          <h3 className="font-[family-name:var(--font-playfair)] text-3xl md:text-4xl text-white">
            People&apos;s & Professional&apos;s Choice
          </h3>
          <p className="text-teal-bg mt-3">Best Interior Design</p>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24 lg:py-32 bg-warm">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-teal text-sm tracking-[0.3em] uppercase mb-4">
              Our Journey
            </p>
            <h2 className="font-[family-name:var(--font-playfair)] text-3xl md:text-4xl text-charcoal">
              Street of Dreams Homes
            </h2>
          </div>
          <div className="space-y-16 lg:space-y-24">
            {homes.map((home, i) => (
              <div key={home.year}>
                <div className="bg-white grid grid-cols-1 md:grid-cols-2 items-stretch overflow-hidden">
                  <div
                    className={`relative aspect-[3/2] md:aspect-auto md:min-h-[360px] ${
                      i % 2 === 1 ? "md:order-2" : ""
                    }`}
                  >
                    <Image
                      src={home.image}
                      alt={home.imageAlt}
                      fill
                      sizes="(min-width: 768px) 50vw, 100vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="p-8 lg:p-12 flex flex-col justify-center">
                    <div className="font-[family-name:var(--font-playfair)] text-5xl text-teal-light mb-4">
                      {home.year}
                    </div>
                    <h3 className="font-[family-name:var(--font-playfair)] text-2xl mb-1">
                      {home.title}
                    </h3>
                    <p className="text-teal text-xs tracking-wider uppercase mb-3">
                      {home.location}
                    </p>
                    <p className="text-charcoal-light leading-relaxed">
                      {home.description}
                    </p>
                  </div>
                </div>

                {home.photos.length > 0 && (
                  <div className="mt-3 sm:mt-4">
                    <SodGallery
                      images={home.photos}
                      title={`${home.title} (${home.year})`}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Alla Famiglia Detail */}
      <section className="py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <p className="text-teal text-sm tracking-[0.3em] uppercase mb-4">
                Featured Project
              </p>
              <h2 className="font-[family-name:var(--font-playfair)] text-3xl md:text-4xl text-charcoal mb-3">
                Alla Famiglia
              </h2>
              <p className="text-charcoal-light italic mb-6">
                &ldquo;For the Family&rdquo; in Italian
              </p>
              <p className="text-charcoal-light leading-relaxed mb-8">
                This European-style home was designed for multi-generational
                living, set on 1.6 acres. At 8,725 square feet, it is the
                largest home in recent Street of Dreams history — with four
                generations residing under one roof.
              </p>
              <ul className="space-y-3">
                {allaFamigliaDetails.map((detail, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 text-sm text-charcoal-light"
                  >
                    <span className="text-teal mt-1 flex-shrink-0">
                      &#9670;
                    </span>
                    {detail}
                  </li>
                ))}
              </ul>
              <Link
                href="/alla-famiglia"
                className="inline-block mt-8 border border-teal text-teal px-8 py-3 text-sm tracking-wider uppercase hover:bg-teal hover:text-white transition-colors font-medium"
              >
                See the Full Project
              </Link>
            </div>
            <div className="relative aspect-[4/5] overflow-hidden">
              <Image
                src="/images/street-of-dreams.webp"
                alt="Alla Famiglia dining room designed by Greylyn Wayne"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 lg:py-32 bg-charcoal text-center">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <h2 className="font-[family-name:var(--font-playfair)] text-3xl md:text-4xl text-white mb-6">
            Bring Award-Winning Design to Your Home
          </h2>
          <p className="text-gray-400 leading-relaxed mb-10">
            Experience the same level of craftsmanship and attention to detail
            that defines our Street of Dreams projects — in your own home.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-teal text-white px-10 py-4 text-sm tracking-wider uppercase hover:bg-teal-dark transition-colors font-medium"
          >
            Bring This Craftsmanship to Your Home
          </Link>
        </div>
      </section>
    </>
  );
}
