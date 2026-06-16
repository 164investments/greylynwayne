import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { RatingBadge } from "@/components/Proof";

export const metadata: Metadata = {
  title: "About Greylyn Wayne | Portland Home Staging & Interior Design Team",
  description:
    "Meet the Greylyn Wayne team — a family-run Portland studio led by founder Jody Wallace, a 20+ year design veteran and 4x Street of Dreams featured designer. (971) 930-0220.",
  alternates: { canonical: "https://www.greylynwayne.com/about" },
  openGraph: {
    title: "About Greylyn Wayne | Portland Home Staging & Design Team",
    description:
      "A family-run Portland studio led by Jody Wallace, a 20+ year design veteran and 4x Street of Dreams featured designer.",
    url: "https://www.greylynwayne.com/about",
    images: [{ url: "/images/og-image.png" }],
  },
};

// Team roster recovered from the live site (DOM-ordered photo↔name mapping,
// verified). Jody is featured separately above the grid.
const team = [
  { name: "Jess Patiño", role: "Director of Accounting", img: "jess-patino" },
  { name: "Tori Horton", role: "Director of Purchasing & Principal Designer", img: "tori-horton" },
  { name: "Maria Chavez", role: "Director of Staging Design", img: "maria-chavez" },
  { name: "Jacqueline Kekos", role: "Director of Brand Creative & Client Communications", img: "jacqueline-kekos" },
  { name: "Olivia Brodeur", role: "Principal Staging Designer", img: "olivia-brodeur" },
  { name: "Reilly Creech", role: "Principal Staging Designer", img: "reilly-creech" },
  { name: "Kaitlyn Riley", role: "Principal Staging Designer", img: "kaitlyn-riley" },
  { name: "Miguel Olmedo", role: "Principal Moving Coordinator", img: "miguel-olmedo" },
  { name: "Mario Olmedo", role: "Assistant Moving Coordinator", img: "mario-olmedo" },
  { name: "Luis Olmedo", role: "Moving Specialist", img: "luis-olmedo" },
  { name: "Marshall Talley", role: "Warehouse Manager", img: "marshall-talley" },
  { name: "Hannah Sloan", role: "Photographer & Videographer", img: "hannah-sloan" },
];

const values = [
  {
    title: "Thoughtful Design",
    description:
      "Every space has a story. We take the time to understand your home's character and create designs that accentuate what makes it unique.",
  },
  {
    title: "Personal Touch",
    description:
      "As a family-run studio, we treat every project like our own home. You'll work directly with our team — not handed off to subcontractors.",
  },
  {
    title: "Attention to Detail",
    description:
      "From the placement of a throw pillow to the flow of an entire floor plan, we obsess over the details that make a space feel truly considered.",
  },
  {
    title: "Results-Driven",
    description:
      "Whether staging to sell or designing to live, we deliver spaces that achieve your goals — homes that sell faster and interiors that inspire.",
  },
];

export default function AboutPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "About", href: "/about" },
        ]}
      />

      {/* Hero — clean header (no cropped photo) */}
      <section className="pt-20 bg-cream">
        <div className="mx-auto max-w-4xl px-6 lg:px-8 py-20 lg:py-24 text-center">
          <p className="text-teal text-sm tracking-[0.3em] uppercase mb-4">
            About Us
          </p>
          <h1 className="font-[family-name:var(--font-playfair)] text-5xl md:text-6xl lg:text-7xl text-charcoal mb-6">
            Our Story
          </h1>
          <p className="text-charcoal-light text-lg max-w-2xl mx-auto mb-8">
            A family-run Portland studio of designers, stagers, and
            coordinators — the people behind every project since 2015.
          </p>
          <div className="flex justify-center">
            <RatingBadge />
          </div>
        </div>
      </section>

      {/* Team group photo — shown whole, never cropped */}
      <section className="bg-cream pb-16 lg:pb-24">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="relative aspect-[3/2] overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.12)]">
            <Image
              src="/images/team/team-group.webp"
              alt="The Greylyn Wayne team — Portland home staging and interior design studio"
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1024px) 100vw, 1100px"
            />
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-24 lg:py-32">
        <div className="mx-auto max-w-3xl px-6 lg:px-8 text-center">
          <p className="text-teal text-sm tracking-[0.3em] uppercase mb-4">
            Est. 2015
          </p>
          <h2 className="font-[family-name:var(--font-playfair)] text-3xl md:text-4xl text-charcoal mb-8">
            A Family-Run Design Studio in Portland, Oregon
          </h2>
          <p className="text-charcoal-light leading-relaxed mb-6">
            Greylyn Wayne was born from founder Jody Wallace&apos;s lifelong
            passion for design. The name itself is personal — a combination of
            the middle names of Jody&apos;s three children. Established in 2015,
            we&apos;re a Portland-based interior design and home staging company
            specializing in custom design solutions that accentuate the
            character of every space.
          </p>
          <p className="text-charcoal-light leading-relaxed">
            We carefully curate the layout of each room, selecting furnishings
            and details that tell its story. From our Portland warehouse, our
            team serves homeowners, realtors, builders, and property managers
            throughout Oregon and Southwest Washington.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 lg:py-24 bg-teal text-center">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <p className="text-teal-bg text-sm tracking-[0.3em] uppercase mb-5">
            Our Mission
          </p>
          <p className="font-[family-name:var(--font-playfair)] text-3xl md:text-4xl lg:text-5xl text-white leading-snug">
            Our goal is simple: make first impressions last.
          </p>
        </div>
      </section>

      {/* Jody */}
      <section className="py-24 lg:py-32 bg-warm">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image
                  src="/images/team/jody-wallace.webp"
                  alt="Jody Wallace — founder and head of design at Greylyn Wayne, Portland"
                  fill
                  className="object-cover object-top"
                />
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <p className="text-teal text-sm tracking-[0.3em] uppercase mb-4">
                Founder &amp; Head of Design
              </p>
              <h2 className="font-[family-name:var(--font-playfair)] text-3xl md:text-4xl text-charcoal mb-6">
                Meet Jody Wallace
              </h2>
              <p className="text-charcoal-light leading-relaxed mb-6">
                With a 20+ year design career spanning from the historic midwest
                to Portland, Jody has developed an eye for spaces that feel
                storied and soulful. Before moving to Portland in 2010, she
                lived across the country — from Southern California to Chicago —
                gaining inspiration from different regional design styles.
              </p>
              <p className="text-charcoal-light leading-relaxed mb-6">
                Jody leads a team known for their thoughtful approach and
                beautiful designs that are both inviting and inspiring. She has
                been the lead interior designer for four NW Natural Street of
                Dreams homes — in 2019, 2021, 2024, and 2025 — and her 2019
                home was voted both People&apos;s and Professional&apos;s Best
                Interior Design.
              </p>
              <p className="text-charcoal-light leading-relaxed">
                A few years ago, Jody passed the home-staging side of the
                operation to her daughter and son-in-law, guiding them into
                their roles while remaining a strong presence as lead designer.
              </p>
              <Link
                href="/meet-jody-wallace"
                className="inline-block mt-8 text-teal text-sm tracking-wider uppercase font-medium hover:text-teal-dark transition-colors"
              >
                Read Jody&apos;s full story &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Team grid */}
      <section className="py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-teal text-sm tracking-[0.3em] uppercase mb-4">
              The People Behind Greylyn Wayne
            </p>
            <h2 className="font-[family-name:var(--font-playfair)] text-3xl md:text-4xl lg:text-5xl text-charcoal mb-4">
              Meet the Team
            </h2>
            <p className="text-charcoal-light max-w-2xl mx-auto">
              A close-knit, family-run team of designers, stagers, and
              coordinators — the people you&apos;ll actually work with on every
              project.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10">
            {team.map((member) => (
              <div key={member.name}>
                <div className="relative aspect-[3/4] overflow-hidden bg-cream mb-4">
                  <Image
                    src={`/images/team/${member.img}.webp`}
                    alt={`${member.name} — ${member.role} at Greylyn Wayne`}
                    fill
                    className="object-cover object-top"
                    sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  />
                </div>
                <h3 className="font-[family-name:var(--font-playfair)] text-lg text-charcoal">
                  {member.name}
                </h3>
                <p className="text-charcoal-light text-sm mt-0.5">
                  {member.role}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials — real, named brokers */}
      <section className="py-20 lg:py-24 bg-warm">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-teal text-sm tracking-[0.3em] uppercase mb-4">
              What Partners Say
            </p>
            <h2 className="font-[family-name:var(--font-playfair)] text-3xl md:text-4xl text-charcoal">
              Trusted by Portland&apos;s Top Brokers
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <figure className="bg-white p-8 lg:p-10">
              <svg className="h-7 w-7 text-teal-light mb-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H14.017zM0 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151C7.546 6.068 5.983 8.789 5.983 11H10v10H0z" />
              </svg>
              <blockquote className="text-charcoal-light leading-relaxed italic mb-5">
                &ldquo;The GW team went above and beyond: they nailed the
                scheduling, took the time to understand the property and target
                audience, and handled everything from setup to teardown with
                total professionalism and style. They don&apos;t just stage
                homes—they deliver the WOW factor.&rdquo;
              </blockquote>
              <figcaption className="text-sm">
                <span className="text-charcoal font-medium">Sherry Francis</span>
                <span className="text-charcoal-light"> — Senior Broker, ELEETE Real Estate</span>
              </figcaption>
            </figure>
            <figure className="bg-white p-8 lg:p-10">
              <svg className="h-7 w-7 text-teal-light mb-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H14.017zM0 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151C7.546 6.068 5.983 8.789 5.983 11H10v10H0z" />
              </svg>
              <blockquote className="text-charcoal-light leading-relaxed italic mb-5">
                &ldquo;GW is truly a top stager in Portland. They focus down to
                the detail, will not leave the project until it is completely
                dialed. Their special planning and choice of furniture, art,
                decor always showcases the home&apos;s architectural style and
                really has helped to highlight the homes I have sold. They are
                awesome to work with too!&rdquo;
              </blockquote>
              <figcaption className="text-sm">
                <span className="text-charcoal font-medium">Carey Hunt</span>
                <span className="text-charcoal-light"> — Real Estate Agent</span>
              </figcaption>
            </figure>
          </div>
          <p className="text-center mt-10">
            <Link
              href="/reviews"
              className="text-teal text-sm tracking-wider uppercase font-medium hover:text-teal-dark transition-colors"
            >
              Read more reviews &rarr;
            </Link>
          </p>
        </div>
      </section>

      {/* Press / recognition */}
      <section className="py-20 lg:py-24 bg-warm">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-teal text-sm tracking-[0.3em] uppercase mb-4">
              In the Press
            </p>
            <h2 className="font-[family-name:var(--font-playfair)] text-3xl md:text-4xl text-charcoal">
              Recognition &amp; Features
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
            <div className="bg-white p-8">
              <p className="font-[family-name:var(--font-playfair)] text-xl text-charcoal mb-2">
                4x Street of Dreams
              </p>
              <p className="text-charcoal-light text-sm">
                Featured lead interior designer — NW Natural Street of Dreams
                (2019, 2021, 2024, 2025)
              </p>
            </div>
            <div className="bg-white p-8">
              <p className="font-[family-name:var(--font-playfair)] text-xl text-charcoal mb-2">
                Portrait of Portland
              </p>
              <p className="text-charcoal-light text-sm">
                Featured on the cover of <em>Portrait of Portland</em>
              </p>
            </div>
            <div className="bg-white p-8">
              <p className="font-[family-name:var(--font-playfair)] text-xl text-charcoal mb-2">
                NW Natural Interview
              </p>
              <p className="text-charcoal-light text-sm">
                Featured Q&amp;A on design philosophy, June 2025
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-teal text-sm tracking-[0.3em] uppercase mb-4">
              What Drives Us
            </p>
            <h2 className="font-[family-name:var(--font-playfair)] text-3xl md:text-4xl text-charcoal">
              Our Values
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value) => (
              <div
                key={value.title}
                className="border border-gray-200 p-8 lg:p-10"
              >
                <h3 className="font-[family-name:var(--font-playfair)] text-xl mb-3">
                  {value.title}
                </h3>
                <p className="text-charcoal-light text-sm leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 lg:py-32 bg-teal text-center">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <h2 className="font-[family-name:var(--font-playfair)] text-3xl md:text-4xl text-white mb-6">
            Let&apos;s Work Together
          </h2>
          <p className="text-teal-bg leading-relaxed mb-10">
            Whether you&apos;re selling, building, or creating your dream home
            — our team is ready to help bring your vision to life.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-white text-teal-dark px-10 py-4 text-sm tracking-wider uppercase hover:bg-cream transition-colors font-medium"
          >
            Schedule Your Free Consultation
          </Link>
        </div>
      </section>
    </>
  );
}
