import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { BreadcrumbJsonLd, ServiceJsonLd, FAQJsonLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Short-Term Rental & Airbnb Design | Portland, Oregon",
  description:
    "Maximize your Airbnb bookings with professional short-term rental design by Greylyn Wayne. Stylish, functional interiors that earn 5-star reviews. Portland, Oregon — (971) 930-0220.",
  alternates: {
    canonical: "https://www.greylynwayne.com/short-term-rental-design",
  },
};

const benefits = [
  {
    title: "Increase Bookings",
    description:
      "Professionally designed rentals photograph better, stand out in search results, and attract more guests willing to pay premium rates.",
  },
  {
    title: "Earn 5-Star Reviews",
    description:
      "Thoughtful design creates an elevated guest experience that consistently translates to glowing reviews and repeat bookings.",
  },
  {
    title: "Maximize Revenue",
    description:
      "Well-designed spaces command higher nightly rates. Our clients regularly see significant increases in their average booking value.",
  },
  {
    title: "Turnkey Setup",
    description:
      "We handle everything — design concept, furniture sourcing, delivery, install, styling, and even the basic supplies. You get a fully finished, truly move-in ready space your guests can enjoy from day one.",
  },
];

const rentalFaqs = [
  {
    question:
      "How much does short-term rental design cost in Portland?",
    answer:
      "Cost depends on the size of the property, how many rooms we're furnishing, and whether you need a full turnkey setup or a design refresh. We provide a custom quote after a free consultation. Most owners view it as an investment that pays back through higher nightly rates, stronger occupancy, and better reviews.",
  },
  {
    question: "Do you furnish the rental, or just create the design?",
    answer:
      "We do both. Our turnkey package covers the full scope — design concept, furniture and decor sourcing, delivery, installation, styling, and the essentials guests expect. If you only need a design plan or a styling refresh on an existing space, we can scope to that instead.",
  },
  {
    question: "How long does a turnkey rental setup take?",
    answer:
      "Most single-unit projects move from consultation to a guest-ready space in a few weeks, depending on furniture lead times and the size of the property. We coordinate around your launch date so the listing can go live on schedule.",
  },
  {
    question: "Can good design really increase my nightly rate and bookings?",
    answer:
      "Yes. Short-term rentals compete first on photos and then on experience. A thoughtfully designed, photogenic space ranks better in search, earns more clicks, justifies a higher nightly rate, and produces the 5-star reviews that compound into repeat bookings.",
  },
  {
    question: "Do you work with multiple properties or portfolios?",
    answer:
      "Absolutely. Whether you have one Airbnb or a portfolio of vacation rentals, we can design a consistent, on-brand look across your properties — useful for owners and managers scaling a recognizable guest experience.",
  },
];

export default function ShortTermRentalPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Interior Design", href: "/interior-design" },
          {
            name: "Short-Term Rental Design",
            href: "/short-term-rental-design",
          },
        ]}
      />
      <ServiceJsonLd
        name="Short-Term Rental & Airbnb Design in Portland, Oregon"
        description="Professional Airbnb and vacation rental interior design services in Portland, Oregon. Turnkey design, furniture sourcing, and installation to maximize bookings and guest experience."
        url="/short-term-rental-design"
      />
      <FAQJsonLd faqs={rentalFaqs} />

      {/* Hero */}
      <section className="relative pt-20">
        <div className="relative h-[60vh] min-h-[400px]">
          <Image
            src="/images/portland-home-staging-character-bedroom.webp"
            alt="Short-term rental design by Greylyn Wayne — stylish Portland vacation rental with character"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-charcoal/45" />
          <div className="absolute inset-0 flex items-center">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <p className="text-teal-light text-sm tracking-[0.3em] uppercase mb-4">
                Airbnb & Vacation Rentals
              </p>
              <h1 className="font-[family-name:var(--font-playfair)] text-4xl md:text-5xl lg:text-6xl text-white max-w-2xl">
                Short-Term Rental Design
              </h1>
            </div>
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="py-24 lg:py-32">
        <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center">
          <h2 className="font-[family-name:var(--font-playfair)] text-3xl md:text-4xl text-charcoal mb-6">
            Design That Turns Guests Into 5-Star Reviewers
          </h2>
          <p className="text-charcoal-light leading-relaxed text-lg mb-6">
            Your Airbnb or vacation rental competes on experience. Professional
            design creates the kind of memorable, Instagram-worthy space that
            earns premium rates, consistent bookings, and raving reviews.
          </p>
          <p className="text-charcoal-light leading-relaxed text-lg mb-10">
            We handle everything from design concept to furniture sourcing,
            delivery, and installation — giving you a turnkey property ready for
            your first guest.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-teal text-white px-8 py-4 text-sm tracking-wider uppercase hover:bg-teal-dark transition-colors font-medium"
          >
            Design My Rental Property
          </Link>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-24 lg:py-32 bg-warm">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-teal text-sm tracking-[0.3em] uppercase mb-4">
              Why Invest in Design
            </p>
            <h2 className="font-[family-name:var(--font-playfair)] text-3xl md:text-4xl text-charcoal">
              The ROI of Professional Rental Design
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {benefits.map((benefit) => (
              <div key={benefit.title} className="bg-white p-8 lg:p-10">
                <h3 className="font-[family-name:var(--font-playfair)] text-xl mb-3">
                  {benefit.title}
                </h3>
                <p className="text-charcoal-light text-sm leading-relaxed">
                  {benefit.description}
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
            <h2 className="font-[family-name:var(--font-playfair)] text-3xl md:text-4xl text-white">
              Our Turnkey Process
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: "01", title: "Consult", desc: "We assess your property, target guest, and budget." },
              { step: "02", title: "Design", desc: "A custom design plan optimized for guest experience and photos." },
              { step: "03", title: "Source", desc: "We procure all furniture, linens, decor, and essentials." },
              { step: "04", title: "Install", desc: "Full delivery, setup, and styling — ready for your first booking." },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="font-[family-name:var(--font-playfair)] text-5xl text-white/20 mb-4">
                  {item.step}
                </div>
                <h3 className="text-white font-semibold mb-2">{item.title}</h3>
                <p className="text-teal-bg text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What We Design */}
      <section className="py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-teal text-sm tracking-[0.3em] uppercase mb-4">
              What We Design
            </p>
            <h2 className="font-[family-name:var(--font-playfair)] text-3xl md:text-4xl text-charcoal">
              Every Space Your Guests Will Remember
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Living & Common Areas",
                description:
                  "The hero shot of your listing. We design inviting, photogenic living spaces that earn the click and set the tone for the whole stay.",
              },
              {
                title: "Bedrooms & Baths",
                description:
                  "Hotel-quality comfort that drives reviews — quality bedding, layered lighting, and spa-like bathrooms guests rave about.",
              },
              {
                title: "Kitchens & Workspaces",
                description:
                  "Functional, fully-stocked kitchens and remote-work-friendly nooks that win over longer stays and business travelers.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="border border-gray-200 p-8 lg:p-10 hover:border-teal transition-colors"
              >
                <h3 className="font-[family-name:var(--font-playfair)] text-xl mb-3">
                  {item.title}
                </h3>
                <p className="text-charcoal-light text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 lg:py-32 bg-warm">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-teal text-sm tracking-[0.3em] uppercase mb-4">
              Questions
            </p>
            <h2 className="font-[family-name:var(--font-playfair)] text-3xl md:text-4xl text-charcoal">
              Short-Term Rental Design FAQ
            </h2>
          </div>
          <div className="space-y-8">
            {rentalFaqs.map((faq, i) => (
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
      <section className="py-24 lg:py-32 text-center">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <h2 className="font-[family-name:var(--font-playfair)] text-3xl md:text-4xl text-charcoal mb-6">
            Elevate Your Rental Property
          </h2>
          <p className="text-charcoal-light leading-relaxed mb-10">
            Whether you have one Airbnb or a portfolio of vacation rentals,
            we&apos;ll design spaces that work harder for your bottom line.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-teal text-white px-10 py-4 text-sm tracking-wider uppercase hover:bg-teal-dark transition-colors font-medium"
            >
              Get a Free Quote
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
