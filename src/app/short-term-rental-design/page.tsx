import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { BreadcrumbJsonLd, ServiceJsonLd } from "@/components/JsonLd";

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

      {/* Hero */}
      <section className="relative pt-20">
        <div className="relative h-[60vh] min-h-[400px]">
          <Image
            src="/images/before-after.jpg"
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
