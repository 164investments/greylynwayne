import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { BreadcrumbJsonLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Alla Famiglia | Street of Dreams Luxury Home Design",
  description:
    "Explore Alla Famiglia — the 8,725 sq ft European-inspired multi-generational home at the 2025 NW Natural Street of Dreams in Lake Oswego, with interiors designed by Jody Wallace of Greylyn Wayne.",
  alternates: { canonical: "https://www.greylynwayne.com/alla-famiglia" },
};

const stats = [
  { value: "8,725", label: "Square Feet" },
  { value: "1.6", label: "Acres" },
  { value: "4", label: "Generations" },
  { value: "2 yrs", label: "In the Making" },
];

const gallery = [
  {
    src: "/images/alla-famiglia/exterior-front.jpg",
    alt: "Alla Famiglia — limestone and stucco European façade with copper accents",
    caption: "A limestone and stucco façade with copper accents",
  },
  {
    src: "/images/alla-famiglia/exterior-day.webp",
    alt: "Alla Famiglia — full exterior of the European-style Street of Dreams home in Lake Oswego",
    caption: "Old-world charm meets modern elegance on 1.6 acres",
  },
  {
    src: "/images/alla-famiglia/grand-hall.jpg",
    alt: "Alla Famiglia — grand entry hall with arched doors, European oak floors, and rustic beamed ceilings",
    caption: "A grand hall spanning the depth of the home",
  },
  {
    src: "/images/alla-famiglia/great-room.jpg",
    alt: "Alla Famiglia — great room with soaring beamed ceilings and a 12-foot collapsing glass wall",
    caption: "Soaring ceilings with rustic beams",
  },
  {
    src: "/images/alla-famiglia/window-wall.jpg",
    alt: "Alla Famiglia — dramatic 30-foot window wall framing the spiral staircase",
    caption: "A 30-foot window wall framing the spiral staircase",
  },
  {
    src: "/images/alla-famiglia/primary-bath.jpg",
    alt: "Alla Famiglia — primary bath with hand-troweled plaster walls and checkered marble flooring",
    caption: "Hand-sculpted plaster and checkered marble in the primary bath",
  },
  {
    src: "/images/alla-famiglia/interior-hall.webp",
    alt: "Alla Famiglia — interior corridor with wide-planked European oak floors",
    caption: "Wide-planked European oak throughout",
  },
  {
    src: "/images/alla-famiglia/exterior-dusk.webp",
    alt: "Alla Famiglia — twilight exterior of the Street of Dreams home",
    caption: "Timeless at every hour",
  },
];

const facts = [
  "“Alla Famiglia” means “For the Family” — fitting, as four generations will reside here.",
  "At 8,725 sq ft, it is the largest home in recent Street of Dreams history.",
  "The quartz slab in the primary shower wall weighs over 1,600 lbs.",
  "The circular staircase was handmade and bent with layers of 1/4\" plywood, 20 gallons of glue, and 3,000+ screws.",
  "The 60\" Ilve range in the chef's kitchen weighs nearly 600 lbs.",
  "A downstairs wall was built from wood strips coated in plaster and sand, then hand-sculpted in layers as it dried.",
  "The patterns above the primary tub were hand-stenciled.",
  "The 12-foot Elite Windows door system required 2' x 12' framing — each panel weighs 300 lbs.",
  "The primary suite ceiling was hand-formed by bending water-soaked 1/4\" sheetrock into the framing.",
  "Mantle, water feature, and firepit surrounds were all hand-sculpted from fiberglass plaster.",
  "Wood for the cabana roof and lower walkway beams was milled from trees on the land.",
  "The team flew to a Texas quarry to hand-select the limestone for the checkered flooring.",
  "The pool is 40' x 20', holds 24,000 gallons, and features a 10-foot waterfall.",
  "Roughly 3 miles of low-voltage wiring and 1/2 mile of LED strips run throughout.",
  "Accessibility is built in: zero-threshold entry, curbless showers, and an elevator.",
  "Entertainment features include a full theater, a golf simulator, and a putting green.",
  "A 600-amp electrical service is backed by a Generac generator.",
  "Many features were hand-crafted by artisans rather than purchased.",
];

const boards = [
  { src: "/images/alla-famiglia/board-furniture.webp", label: "Furniture & Casegoods" },
  { src: "/images/alla-famiglia/board-seating.webp", label: "Seating & Dining" },
  { src: "/images/alla-famiglia/board-living.webp", label: "Living & Lounge" },
  { src: "/images/alla-famiglia/board-lighting.webp", label: "Lighting" },
  { src: "/images/alla-famiglia/board-bath-fixtures.webp", label: "Bath Fixtures & Fittings" },
  { src: "/images/alla-famiglia/board-plumbing.webp", label: "Plumbing & Hardware" },
  { src: "/images/alla-famiglia/board-stone.webp", label: "Stone & Surfaces" },
  { src: "/images/alla-famiglia/board-finishes.webp", label: "Finishes & Material Palette" },
  { src: "/images/alla-famiglia/board-materials.webp", label: "Materials & Textiles" },
];

const surfaces = [
  "Calacatta Monet Honed Marble",
  "Barocca Leathered Soapstone",
  "Olde Wood European Mountain Oak",
  "Nuvole Black Polished Dolomite",
  "Serene Antiqued Rosa Perlina",
  "Nuvole White Leathered Dolomite",
  "Zia Cement Tile",
  "Patagonia Polished Quartzite",
  "Star Bone Porcelain Tile",
  "Origami White Natural Tile",
  "Ocean Fantasy Polished Quartzite",
  "Calacatta DaVinci Leathered Dolomite",
  "Texto Tile in Glossy Teal",
  "Homey Stripes Green Glossy Tile",
  "Limestone Pavers",
  "DuChateau LuxeTech Youngscombe LVP",
  "Z Collection Black Terrazzo",
  "Travertino Antico Crema Marble",
  "Terra Crea Mattone Tile",
  "French Quarter Bienville Street Tile",
  "Foil Porcelain in Aluminum",
  "Homey Stripes White Matte Tile",
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
        <div className="relative h-[70vh] min-h-[460px]">
          <Image
            src="/images/alla-famiglia/exterior-dusk.webp"
            alt="Alla Famiglia — European-style Street of Dreams home in Lake Oswego at twilight, designed by Greylyn Wayne"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-charcoal/45" />
          <div className="absolute inset-0 flex items-center">
            <div className="mx-auto max-w-7xl px-6 lg:px-8 w-full">
              <p className="text-teal-light text-sm tracking-[0.3em] uppercase mb-4">
                2025 NW Natural Street of Dreams &middot; Lake Oswego
              </p>
              <h1 className="font-[family-name:var(--font-playfair)] text-4xl md:text-5xl lg:text-6xl text-white max-w-2xl">
                Alla Famiglia
              </h1>
              <p className="text-gray-200 text-lg mt-4 italic">
                &ldquo;For the Family&rdquo; &mdash; Custom European-Inspired
                Interiors
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-warm border-b border-cream">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-cream">
            {stats.map((s) => (
              <div key={s.label} className="py-10 text-center">
                <div className="font-[family-name:var(--font-playfair)] text-3xl md:text-4xl text-teal-dark">
                  {s.value}
                </div>
                <div className="text-charcoal-light text-xs tracking-[0.2em] uppercase mt-2">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section className="py-24 lg:py-32">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-teal text-sm tracking-[0.3em] uppercase mb-4">
              About the House
            </p>
            <h2 className="font-[family-name:var(--font-playfair)] text-3xl md:text-4xl text-charcoal">
              A Legacy of Thoughtful Design
            </h2>
          </div>
          <div className="space-y-6 text-charcoal-light leading-relaxed text-lg">
            <p>
              &ldquo;Alla Famiglia,&rdquo; an Italian phrase meaning &ldquo;for
              the family,&rdquo; is the perfect name for this stunning
              European-style home designed for multi-generational living. Set on
              1.6 acres sloping toward a natural creek, the home blends old-world
              charm with modern elegance. A limestone and stucco façade with
              copper accents creates a warm, timeless first impression.
            </p>
            <p>
              Guests enter through arched double doors into a grand hall that
              spans the depth of the home. Wide-planked European oak floors and
              soaring ceilings with rustic beams set a tone of classic comfort.
              The layout encourages gathering — whether around the Italian marble
              kitchen island or in the great room, where a 12-foot collapsing
              glass wall opens to a resort-style outdoor space.
            </p>
            <p>
              The covered patio features a built-in grill with a copper/plaster
              hood and wood-fired pizza oven. Just beyond, a cabana and 10-foot
              waterfall flow into a luxurious pool with a waterslide, sun deck,
              and play area. The primary suite showcases a cross-vault ceiling
              and custom plaster walls, with barn doors revealing a freestanding
              copper tub and double walk-in shower set against a dramatic
              dolomite and granite backdrop.
            </p>
            <p>
              A dramatic spiral staircase framed by a 30-foot window wall leads
              to the lower level — designed with children and grandchildren in
              mind. This space includes personalized bedrooms, a recreation room,
              workout area, steam and infrared saunas, and a movie theater with
              stadium seating. Throughout, rustic and beautifully imperfect
              elements create a sense of warmth and authenticity — timeless
              finishes designed to age gracefully alongside the family that lives
              here.
            </p>
            <p className="text-charcoal italic">
              Alla Famiglia is more than a home — it&rsquo;s a legacy of
              thoughtful design, comfort, and togetherness.
            </p>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="pb-8">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-teal text-sm tracking-[0.3em] uppercase mb-4">
              The Home
            </p>
            <h2 className="font-[family-name:var(--font-playfair)] text-3xl md:text-4xl text-charcoal">
              Inside Alla Famiglia
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {gallery.map((img, i) => (
              <figure
                key={img.src}
                className={`group relative overflow-hidden ${
                  i === 0 ? "sm:col-span-2 sm:row-span-2" : ""
                }`}
              >
                <div
                  className={`relative ${
                    i === 0 ? "aspect-[4/3] sm:aspect-auto sm:h-full" : "aspect-[4/3]"
                  }`}
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <figcaption className="absolute bottom-0 left-0 right-0 p-5 text-white text-sm opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                    {img.caption}
                  </figcaption>
                </div>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* The Design Process — mood boards */}
      <section className="py-24 lg:py-32 bg-warm">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-14 max-w-2xl mx-auto">
            <p className="text-teal text-sm tracking-[0.3em] uppercase mb-4">
              The Design Process
            </p>
            <h2 className="font-[family-name:var(--font-playfair)] text-3xl md:text-4xl text-charcoal mb-6">
              Curated, Room by Room
            </h2>
            <p className="text-charcoal-light leading-relaxed">
              Every furnishing, fixture, and finish in Alla Famiglia was
              hand-selected by Jody Wallace — a complete design specification
              spanning two years of collaboration with the builder and
              craftsmen.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {boards.map((b) => (
              <figure key={b.src} className="bg-white shadow-sm">
                <div className="relative aspect-square">
                  <Image
                    src={b.src}
                    alt={`Alla Famiglia design board — ${b.label}`}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-contain p-4"
                  />
                </div>
                <figcaption className="border-t border-cream py-4 text-center text-charcoal text-xs tracking-[0.2em] uppercase">
                  {b.label}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Extraordinary Details */}
      <section className="py-24 lg:py-32">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-teal text-sm tracking-[0.3em] uppercase mb-4">
              Craftsmanship
            </p>
            <h2 className="font-[family-name:var(--font-playfair)] text-3xl md:text-4xl text-charcoal">
              Extraordinary Details
            </h2>
          </div>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-5">
            {facts.map((fact, i) => (
              <li
                key={i}
                className="flex items-start gap-3 text-charcoal-light leading-relaxed"
              >
                <span className="text-teal mt-1.5 flex-shrink-0 text-xs">
                  &#9670;
                </span>
                {fact}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Surfaces */}
      <section className="py-24 lg:py-32 bg-charcoal">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-teal-light text-sm tracking-[0.3em] uppercase mb-4">
              Specified Materials
            </p>
            <h2 className="font-[family-name:var(--font-playfair)] text-3xl md:text-4xl text-white">
              Surfaces &amp; Finishes
            </h2>
          </div>
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-3">
            {surfaces.map((s, i) => (
              <li
                key={i}
                className="flex items-baseline gap-3 text-gray-300 text-sm leading-relaxed border-b border-white/10 pb-2"
              >
                <span className="text-teal-light text-xs tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {s}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Meet the Team */}
      <section className="py-24 lg:py-32 bg-warm">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative aspect-[3/2] overflow-hidden">
              <Image
                src="/images/alla-famiglia/team.webp"
                alt="The Greylyn Wayne and build team in front of Alla Famiglia at the Street of Dreams"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
            <div>
              <p className="text-teal text-sm tracking-[0.3em] uppercase mb-4">
                Meet the Team
              </p>
              <h2 className="font-[family-name:var(--font-playfair)] text-3xl md:text-4xl text-charcoal mb-8">
                A Two-Year Collaboration
              </h2>
              <dl className="space-y-5">
                <div>
                  <dt className="text-xs tracking-[0.2em] uppercase text-charcoal-light">
                    Designed By
                  </dt>
                  <dd className="text-lg text-charcoal">
                    Jody Wallace at Greylyn Wayne
                  </dd>
                </div>
                <div>
                  <dt className="text-xs tracking-[0.2em] uppercase text-charcoal-light">
                    Built By
                  </dt>
                  <dd className="text-lg text-charcoal">
                    Red Hills Land &amp; Design LLC
                  </dd>
                </div>
                <div>
                  <dt className="text-xs tracking-[0.2em] uppercase text-charcoal-light">
                    Furnished By
                  </dt>
                  <dd className="text-lg text-charcoal">What&rsquo;s New Furniture</dd>
                </div>
              </dl>
              <p className="text-charcoal-light leading-relaxed mt-8 mb-6">
                All of the furniture and rugs in Alla Famiglia can be sourced
                and purchased through our sister company, What&rsquo;s New
                Furniture.
              </p>
              <a
                href="https://whatsnewfurniture.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block border border-teal text-teal px-8 py-3 text-sm tracking-wider uppercase hover:bg-teal hover:text-white transition-colors font-medium"
              >
                Shop the Look at What&rsquo;s New Furniture
              </a>
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
