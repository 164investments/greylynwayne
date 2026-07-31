import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { BreadcrumbJsonLd, ServiceJsonLd, FAQJsonLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  title:
    "New Construction Home Staging | Model Home Design for Builders",
  description:
    "New construction and model home staging in Portland, Oregon by Greylyn Wayne. Showcase the full potential of your new builds and drive buyer interest. Free consultation — (971) 930-0220.",
  alternates: {
    canonical: "https://www.greylynwayne.com/new-construction-staging",
  },
};

const services = [
  {
    title: "Model Home Staging",
    description:
      "Transform empty builds into warm, inviting showcase homes that help buyers envision their future. We stage model homes that drive traffic and close sales.",
  },
  {
    title: "Fixture & Finish Selection",
    description:
      "Collaborate with your team on fixture packages, finishes, and color palettes that appeal to your target buyer demographic and elevate the build.",
  },
  {
    title: "Color Consultation",
    description:
      "Strategic interior and exterior color selection designed to maximize appeal and create a cohesive, market-ready presentation.",
  },
  {
    title: "Community Model Programs",
    description:
      "Full staging programs for new developments and communities. We create cohesive design across multiple model homes to showcase variety and lifestyle.",
  },
];

const builderFaqs = [
  {
    question: "How does model home staging help sell a new development?",
    answer:
      "A staged model gives buyers something an empty shell can't — an emotional sense of how the home lives. It anchors the floor plan to a lifestyle, makes square footage feel intentional, and produces the photography that drives online traffic to the rest of the community. For builders, a well-staged model typically pays for itself by shortening time-to-sale across the development.",
  },
  {
    question: "Do you stage multiple model homes or entire communities?",
    answer:
      "Yes. We run full staging programs for new developments, designing cohesive but distinct presentations across multiple models so each floor plan and price point shows its best while the community reads as one polished brand.",
  },
  {
    question: "When in the build timeline should we bring you in?",
    answer:
      "The earlier the better. Looping us in before finishes are locked lets us coordinate fixture packages, palettes, and flooring with the staging vision so everything works together. That said, we regularly stage completed builds on a fast timeline when a model needs to open quickly.",
  },
  {
    question: "Do you work with our existing finishes, or select them?",
    answer:
      "Both. We can stage around the selections your team has already made, or collaborate on fixtures, finishes, and color packages tuned to your target buyer. Many builders use us for both finish selection and the final staging so the result is fully cohesive.",
  },
  {
    question: "What areas do you serve for builder and developer staging?",
    answer:
      "We serve builders and developers throughout the Portland metro area and across Oregon, including Lake Oswego, West Linn, Beaverton, Bend, and surrounding communities. Reach out with your development's location and we'll confirm coverage and timing.",
  },
];

export default function NewConstructionPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Home Staging", href: "/home-staging" },
          { name: "New Construction Staging", href: "/new-construction-staging" },
        ]}
      />
      <ServiceJsonLd
        name="New Construction & Model Home Staging in Portland, Oregon"
        description="Professional model home staging and new construction design services for builders and developers in Portland, Oregon. Showcase the full potential of new builds."
        url="/new-construction-staging"
      />
      <FAQJsonLd faqs={builderFaqs} />

      {/* Hero */}
      <section className="relative pt-20">
        <div className="relative h-[60vh] min-h-[400px]">
          <Image
            src="/images/portland-staged-kitchen-hero.webp"
            alt="New construction model home kitchen staged by Greylyn Wayne — white cabinetry, large island with bar stools, glass-front cabinets, and brass pendant lighting in Portland, Oregon"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-charcoal/40" />
          <div className="absolute inset-0 flex items-center">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <p className="text-teal-light text-sm tracking-[0.3em] uppercase mb-4">
                For Builders & Developers
              </p>
              <h1 className="font-[family-name:var(--font-playfair)] text-4xl md:text-5xl lg:text-6xl text-white max-w-2xl">
                New Construction & Model Home Staging
              </h1>
            </div>
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="font-[family-name:var(--font-playfair)] text-3xl md:text-4xl text-charcoal mb-6">
                Showcase the Full Potential of Your Builds
              </h2>
              <p className="text-charcoal-light leading-relaxed mb-6">
                Empty homes don&apos;t sell themselves. Professional model home
                staging transforms a new construction from a blank shell into a
                warm, inviting space where buyers can immediately picture their
                future.
              </p>
              <p className="text-charcoal-light leading-relaxed mb-8">
                We partner with builders and developers throughout Portland and
                Oregon to create beautifully staged model homes that drive
                traffic, generate emotional connections, and accelerate sales
                for entire communities.
              </p>
              <Link
                href="/contact"
                className="inline-block bg-teal text-white px-8 py-4 text-sm tracking-wider uppercase hover:bg-teal-dark transition-colors font-medium"
              >
                Discuss Your Development
              </Link>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                src="/images/portland-home-staging-living-room.webp"
                alt="Model home living room staged by Greylyn Wayne — sectional sofa, layered textures, and curated decor in a Portland new construction home"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-24 lg:py-32 bg-warm">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-teal text-sm tracking-[0.3em] uppercase mb-4">
              Builder Services
            </p>
            <h2 className="font-[family-name:var(--font-playfair)] text-3xl md:text-4xl text-charcoal">
              What We Offer Builders
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service) => (
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

      {/* Process */}
      <section className="py-24 lg:py-32 bg-teal">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-teal-bg text-sm tracking-[0.3em] uppercase mb-4">
              How We Work With Builders
            </p>
            <h2 className="font-[family-name:var(--font-playfair)] text-3xl md:text-4xl text-white">
              From Blueprint to Buyer-Ready
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                step: "01",
                title: "Consult",
                desc: "We tour your build or development and align on target buyer, price point, timeline, and budget.",
              },
              {
                step: "02",
                title: "Design Plan",
                desc: "We craft a staging plan tuned to each floor plan and the lifestyle your buyers aspire to.",
              },
              {
                step: "03",
                title: "Stage & Install",
                desc: "We deliver and style every space — typically a day or two per model — for a photo-ready presentation.",
              },
              {
                step: "04",
                title: "Drive Sales",
                desc: "Your model opens polished and market-ready, drawing traffic and accelerating sales across the community.",
              },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="font-[family-name:var(--font-playfair)] text-5xl text-white/20 mb-4">
                  {item.step}
                </div>
                <h3 className="text-white font-semibold mb-2">{item.title}</h3>
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
              New Construction Staging FAQ
            </h2>
          </div>
          <div className="space-y-8">
            {builderFaqs.map((faq, i) => (
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
      <section className="py-24 lg:py-32 bg-charcoal text-center">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <h2 className="font-[family-name:var(--font-playfair)] text-3xl md:text-4xl text-white mb-6">
            Let&apos;s Stage Your Next Development
          </h2>
          <p className="text-gray-400 leading-relaxed mb-10">
            From single model homes to full community staging programs, we
            deliver results that move homes off the market faster.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-teal text-white px-10 py-4 text-sm tracking-wider uppercase hover:bg-teal-dark transition-colors font-medium"
            >
              Get a Builder Quote
            </Link>
            <a
              href="tel:9719300220"
              className="border border-white/30 text-white px-10 py-4 text-sm tracking-wider uppercase hover:bg-white/10 transition-colors"
            >
              Call (971) 930-0220
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
