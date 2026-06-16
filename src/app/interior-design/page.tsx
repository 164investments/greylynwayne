import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  BreadcrumbJsonLd,
  ServiceJsonLd,
  FAQJsonLd,
} from "@/components/JsonLd";
import SplitHero from "@/components/SplitHero";

export const metadata: Metadata = {
  title: "Interior Designer Portland, Oregon | Full-Service Home Design",
  description:
    "Expert interior design services in Portland, OR by Greylyn Wayne. Full-service design, consultations, spatial planning, color consultation & custom furniture sourcing. Free consultation — (971) 930-0220.",
  alternates: { canonical: "https://www.greylynwayne.com/interior-design" },
  openGraph: {
    title: "Interior Designer Portland, Oregon | Greylyn Wayne",
    description:
      "Full-service interior design in Portland. From concept to completion — spatial planning, color consultation, furniture sourcing & more. Free consultation.",
    url: "https://www.greylynwayne.com/interior-design",
    images: [{ url: "/images/og-image.png" }],
  },
};

const designServices = [
  {
    title: "Full-Service Interior Design",
    description:
      "From concept to completion, we handle every aspect of your project — mood boards, spatial planning, material selection, furniture sourcing, and final styling.",
  },
  {
    title: "Design Consultations",
    description:
      "Expert guidance to help you visualize your space and make confident design decisions. Perfect for homeowners who want professional direction.",
  },
  {
    title: "Color & Material Selection",
    description:
      "Choose the perfect tones, textures, and finishes for your space. We curate palettes that create cohesion and reflect your personal style.",
  },
  {
    title: "Spatial Planning & Organization",
    description:
      "Maximize the flow and functionality of your home. We optimize layouts to make every room work harder and feel more open.",
  },
  {
    title: "Custom Furniture & Decor Sourcing",
    description:
      "Access our network of trusted vendors for one-of-a-kind pieces. From statement furniture to artisanal accents, we source items that elevate your space.",
  },
  {
    title: "Short-Term Rental & Airbnb Design",
    description:
      "Maximize bookings with stylish, functional design that creates inviting spaces and a standout guest experience. We handle everything — sourcing, delivery, install, and even the basic supplies — so your space is completely move-in ready from day one.",
  },
];

const rooms = [
  "Living Room",
  "Kitchen",
  "Bedroom",
  "Bathroom",
  "Dining Room",
  "Home Office",
  "Outdoor Living",
  "Nursery & Kids",
  "Basement",
  "Entryway",
];

const designFaqs = [
  {
    question: "How much does interior design cost in Portland?",
    answer:
      "Interior design costs vary based on the scope of your project — from a single-room refresh to a full-home redesign. We offer free consultations to understand your vision and provide a detailed proposal. Our goal is to deliver exceptional design at a price point that makes sense for your project.",
  },
  {
    question: "How do your interior design services work?",
    answer:
      "Every project is different, so we tailor our services to your space, your goals, and your budget. For some clients that means mood boards and space planning, for others it's sourcing and styling, and for others it's full-service design where we manage everything from concept to final install. Most projects land somewhere in between — we'll shape the right scope together during your first call.",
  },
  {
    question: "How long does an interior design project take?",
    answer:
      "Every project is different — timelines depend entirely on the scope and your goals. Some spaces come together in as little as a week when we can pull pieces from our showroom floor; others unfold over several months. Once we understand what you're looking for, we'll give you a realistic timeline during your consultation.",
  },
  {
    question: "Do you design Airbnb and vacation rental properties?",
    answer:
      "Yes! We specialize in short-term rental design that maximizes bookings and guest experience. We handle everything from design concept to furniture sourcing, delivery, and installation — and we'll even stock the basic supplies, so your space is truly move-in ready and set up to earn 5-star reviews from the very first guest.",
  },
];

export default function InteriorDesignPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Interior Design", href: "/interior-design" },
        ]}
      />
      <ServiceJsonLd
        name="Interior Design Services in Portland, Oregon"
        description="Full-service interior design in Portland, Oregon. Spatial planning, color consultation, custom furniture sourcing, mood boards, and complete room transformations for homes and commercial spaces."
        url="/interior-design"
      />
      <FAQJsonLd faqs={designFaqs} />

      {/* Hero — split editorial */}
      <SplitHero
        eyebrow="Interior Design · Portland, Oregon"
        title="Spaces That Feel Beautiful & Livable"
        subtitle="Design you'll love coming home to — by Portland's 4x Street of Dreams team."
        imageSrc="/images/before-after.jpg"
        imageAlt="Interior design by Greylyn Wayne in Portland — styled living room with burnt-orange velvet sofa, blue accent wall, and local Portland art"
      />

      {/* Intro */}
      <section className="py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                src="/images/home-staging-2.jpg"
                alt="Modern Portland kitchen designed by Greylyn Wayne — white cabinetry, open shelving, herringbone backsplash, gold accents"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h2 className="font-[family-name:var(--font-playfair)] text-3xl md:text-4xl text-charcoal mb-6">
                Portland Interior Design That Tells Your Story
              </h2>
              <p className="text-charcoal-light leading-relaxed mb-6">
                Whether refreshing a single room or undergoing a full remodel,
                our expert interior designers curate spaces that feel both
                beautiful and livable. We believe every home has a story to tell
                — our job is to bring that story to life through thoughtful
                design.
              </p>
              <p className="text-charcoal-light leading-relaxed mb-8">
                Our design process includes space planning, mood boards,
                furniture selection, and decor curation, ensuring every detail
                fits your lifestyle and vision.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/contact"
                  className="inline-block bg-teal text-white px-8 py-4 text-sm tracking-wider uppercase hover:bg-teal-dark transition-colors font-medium text-center"
                >
                  Book a Free Call
                </Link>
                <Link
                  href="/portfolio"
                  className="inline-block border border-charcoal/20 text-charcoal px-8 py-4 text-sm tracking-wider uppercase hover:bg-charcoal hover:text-white transition-colors text-center"
                >
                  View Portfolio
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 lg:py-32 bg-warm">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-teal text-sm tracking-[0.3em] uppercase mb-4">
              What We Offer
            </p>
            <h2 className="font-[family-name:var(--font-playfair)] text-3xl md:text-4xl text-charcoal">
              Interior Design Services in Portland
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {designServices.map((service) => (
              <div key={service.title} className="bg-white p-8 lg:p-10">
                <h3 className="font-[family-name:var(--font-playfair)] text-xl mb-3">
                  {service.title}
                </h3>
                <p className="text-charcoal-light text-sm leading-relaxed">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Rooms */}
      <section className="py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
          <p className="text-teal text-sm tracking-[0.3em] uppercase mb-4">
            Every Room, Every Detail
          </p>
          <h2 className="font-[family-name:var(--font-playfair)] text-3xl md:text-4xl text-charcoal mb-12">
            Rooms We Design
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            {rooms.map((room) => (
              <span
                key={room}
                className="border border-teal/30 text-charcoal px-6 py-3 text-sm tracking-wider"
              >
                {room}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-24 lg:py-32 bg-teal">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-teal-bg text-sm tracking-[0.3em] uppercase mb-4">
              Our Process
            </p>
            <h2 className="font-[family-name:var(--font-playfair)] text-3xl md:text-4xl text-white">
              How Our Interior Design Process Works
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                step: "01",
                title: "Free Discovery Call",
                desc: "We learn about your lifestyle, taste, and goals. A thorough walkthrough of your space sets the foundation for your design.",
              },
              {
                step: "02",
                title: "Design & Present",
                desc: "We develop mood boards, floor plans, and material palettes. You'll see the full vision before any changes are made.",
              },
              {
                step: "03",
                title: "Install & Reveal",
                desc: "From procurement to installation to final styling, we bring the design to life and hand you the keys to your new space.",
              },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="font-[family-name:var(--font-playfair)] text-6xl text-white/20 mb-4">
                  {item.step}
                </div>
                <h3 className="text-white font-semibold text-lg mb-3">
                  {item.title}
                </h3>
                <p className="text-teal-bg text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 lg:py-32">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-teal text-sm tracking-[0.3em] uppercase mb-4">
              Questions
            </p>
            <h2 className="font-[family-name:var(--font-playfair)] text-3xl md:text-4xl text-charcoal">
              Interior Design FAQ
            </h2>
          </div>
          <div className="space-y-8">
            {designFaqs.map((faq, i) => (
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
      <section className="py-24 lg:py-32 bg-warm text-center">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <h2 className="font-[family-name:var(--font-playfair)] text-3xl md:text-4xl text-charcoal mb-6">
            Let&apos;s Design Your Dream Space
          </h2>
          <p className="text-charcoal-light leading-relaxed mb-4">
            Ready to transform your Portland home? Schedule a free call and
            let&apos;s bring your vision to life.
          </p>
          <p className="text-teal text-sm font-medium mb-10">
            No obligation &middot; Your first call is always free
          </p>
          <Link
            href="/contact"
            className="inline-block bg-teal text-white px-10 py-4 text-sm tracking-wider uppercase hover:bg-teal-dark transition-colors font-medium"
          >
            Book Your Free Call
          </Link>
        </div>
      </section>
    </>
  );
}
