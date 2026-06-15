import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { BreadcrumbJsonLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Meet Jody Wallace | Founder & Lead Designer",
  description:
    "Meet Jody Wallace, founder of Greylyn Wayne. 20+ year design career, 4x Street of Dreams featured designer, People's & Professional's Choice Award winner. Portland, Oregon — (971) 930-0220.",
  alternates: { canonical: "https://www.greylynwayne.com/meet-jody-wallace" },
};

export default function MeetJodyPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "About", href: "/about" },
          { name: "Meet Jody Wallace", href: "/meet-jody-wallace" },
        ]}
      />

      {/* Hero */}
      <section className="relative pt-20">
        <div className="relative h-[50vh] min-h-[400px]">
          <Image
            src="/images/hero-interior.webp"
            alt="Luxury interior design by Jody Wallace — Alla Famiglia Street of Dreams"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-charcoal/50" />
          <div className="absolute inset-0 flex items-center">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <p className="text-teal-light text-sm tracking-[0.3em] uppercase mb-4">
                Founder & Lead Designer
              </p>
              <h1 className="font-[family-name:var(--font-playfair)] text-4xl md:text-5xl lg:text-6xl text-white max-w-2xl">
                Meet Jody Wallace
              </h1>
            </div>
          </div>
        </div>
      </section>

      {/* Bio */}
      <section className="py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <p className="text-teal text-sm tracking-[0.3em] uppercase mb-4">
                20+ Years of Design Excellence
              </p>
              <h2 className="font-[family-name:var(--font-playfair)] text-3xl md:text-4xl text-charcoal mb-6">
                A Passion for Spaces That Feel Storied & Soulful
              </h2>
              <p className="text-charcoal-light leading-relaxed mb-6">
                With a 20+ year design career spanning from the historic midwest
                to Portland, Oregon, Jody has developed an eye for spaces that
                feel storied and soulful. She leads a team known for their
                thoughtful approach and beautiful designs that are both inviting
                and inspiring.
              </p>
              <p className="text-charcoal-light leading-relaxed mb-6">
                Before moving to Portland in 2010, Jody lived across the country
                — from Southern California to Chicago — gaining inspiration from
                different regional design styles. Each place left its mark,
                shaping a design philosophy rooted in warmth, authenticity, and
                attention to detail.
              </p>
              <p className="text-charcoal-light leading-relaxed mb-6">
                In 2015, Jody founded Greylyn Wayne, turning her lifelong
                passion into a full-service interior design and home staging
                company. What started as a solo venture has grown into a
                family-run business serving homeowners, realtors, builders, and
                property managers throughout Oregon and Southwest Washington.
              </p>
              <p className="text-charcoal-light leading-relaxed">
                A few years ago, Jody passed on the home staging side of the
                operation to her daughter and son-in-law, guiding them into
                their current roles while remaining a strong presence as the
                lead designer — dedicating the time and attention needed to
                craft beautiful, custom projects.
              </p>
            </div>
            <div className="relative aspect-[3/4] overflow-hidden">
              <Image
                src="/images/team/jody-wallace.webp"
                alt="Jody Wallace — founder and head of design at Greylyn Wayne, Portland, Oregon"
                fill
                className="object-cover object-top"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Awards */}
      <section className="py-20 bg-teal">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-[family-name:var(--font-playfair)] text-3xl md:text-4xl text-white">
              Awards & Recognition
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="font-[family-name:var(--font-playfair)] text-5xl text-white/30 mb-2">
                4x
              </div>
              <p className="text-white font-medium mb-1">
                NW Natural Street of Dreams
              </p>
              <p className="text-teal-bg text-sm">
                Featured Lead Interior Designer
                <br />
                2019, 2021, 2024, 2025
              </p>
            </div>
            <div className="text-center">
              <div className="font-[family-name:var(--font-playfair)] text-5xl text-white/30 mb-2">
                #1
              </div>
              <p className="text-white font-medium mb-1">
                People&apos;s & Professional&apos;s Choice
              </p>
              <p className="text-teal-bg text-sm">
                Best Interior Design
                <br />
                2019 Street of Dreams
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Design philosophy */}
      <section className="py-24 lg:py-32 bg-warm">
        <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center">
          <p className="text-teal text-sm tracking-[0.3em] uppercase mb-4">
            Design Philosophy
          </p>
          <h2 className="font-[family-name:var(--font-playfair)] text-3xl md:text-4xl text-charcoal mb-8">
            &ldquo;Every space has a story. Our job is to tell it.&rdquo;
          </h2>
          <p className="text-charcoal-light leading-relaxed mb-6">
            Jody&apos;s approach to design centers on understanding the
            character of each space and the people who inhabit it. She believes
            the best interiors feel both intentional and effortless — spaces
            that are beautiful to look at and genuinely comfortable to live in.
          </p>
          <p className="text-charcoal-light leading-relaxed">
            This philosophy extends to home staging as well, where the goal
            isn&apos;t to create a showroom, but to help buyers feel an
            emotional connection — the unmistakable sense of coming home.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 lg:py-32 text-center">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <h2 className="font-[family-name:var(--font-playfair)] text-3xl md:text-4xl text-charcoal mb-6">
            Work With Jody & the Team
          </h2>
          <p className="text-charcoal-light leading-relaxed mb-10">
            Whether you&apos;re envisioning a custom interior or staging a home
            for sale, Jody and her team bring award-winning design to every
            project.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-teal text-white px-10 py-4 text-sm tracking-wider uppercase hover:bg-teal-dark transition-colors font-medium"
          >
            Schedule Your Free Consultation
          </Link>
        </div>
      </section>
    </>
  );
}
