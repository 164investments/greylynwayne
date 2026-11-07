import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  BreadcrumbJsonLd,
  ServiceJsonLd,
  FAQJsonLd,
} from "@/components/JsonLd";
import SplitHero from "@/components/SplitHero";
import StagedHomeCard from "@/components/StagedHomeCard";
import { featuredHomes } from "@/data/staging-portfolio";
import { metroLinks } from "@/data/service-areas";
import { blogPosts } from "@/data/blog-posts";

export const metadata: Metadata = {
  title: "Home Staging Portland, Oregon | Sell Faster & For Top Dollar",
  description:
    "Professional home staging in Portland, OR by Greylyn Wayne — 4.9★ from 163 clients and a 4x Street of Dreams designer. Vacant, occupied, luxury & model home staging. Free consultation — (971) 930-0220.",
  alternates: { canonical: "https://www.greylynwayne.com/home-staging" },
  openGraph: {
    title: "Home Staging Portland, Oregon | Greylyn Wayne",
    description:
      "Professional home staging in Portland. Staged homes sell faster and for more. Free consultation — (971) 930-0220.",
    url: "https://www.greylynwayne.com/home-staging",
    images: [{ url: "/images/og-image.png" }],
  },
};

const benefits = [
  {
    title: "Sell Faster",
    description:
      "Staged homes spend significantly less time on the market compared to unstaged properties, reducing your carrying costs and getting you to closing sooner.",
  },
  {
    title: "Sell for More",
    description:
      "Professional staging helps buyers see your home's full potential, often resulting in offers above the asking price. The ROI on staging consistently outperforms the investment.",
  },
  {
    title: "Unforgettable First Impression",
    description:
      "Staging creates an emotional connection with buyers from the moment they walk through the door or see the listing photos online.",
  },
  {
    title: "Dominate Online Listings",
    description:
      "In today's digital-first market, beautifully staged listing photos capture more views, generate more showings, and create more offers.",
  },
];

// bestFor/link restate the description as a skimmable label (no new claims).
const services = [
  {
    title: "Occupied Home Staging",
    bestFor: "You're living in the home while it's listed",
    description:
      "We work with your existing furnishings and supplement with our curated inventory to create a cohesive, buyer-friendly presentation that helps your lived-in home shine.",
    link: { href: "/blog/staging-an-occupied-home", label: "How to stage a home you're still living in" },
  },
  {
    title: "Vacant Home Staging",
    bestFor: "The home is already empty",
    description:
      "Full-service staging with our designer furniture and decor, transforming empty rooms into warm, inviting spaces buyers can envision as home.",
    link: { href: "/blog/home-staging-checklist", label: "The room-by-room staging checklist" },
  },
  {
    title: "New Construction & Model Homes",
    bestFor: "Builders and developers",
    description:
      "Partner with builders and developers to showcase model homes that highlight the full potential of new builds and drive sales for entire communities.",
    link: { href: "/new-construction-staging", label: "New construction staging" },
  },
  {
    title: "Luxury & Estate Staging",
    bestFor: "Luxury and estate listings",
    description:
      "High-end staging tailored for luxury properties, featuring premium furnishings and thoughtful design details that match the caliber of the home.",
    link: { href: "/street-of-dreams", label: "Our Street of Dreams homes" },
  },
];

// Quick answers, each restated from the FAQ, process and CTA copy below.
const atAGlance = [
  { label: "Consultation", value: "Free, with same-week availability" },
  { label: "Quote", value: "Custom, based on home size, rooms staged, and occupied or vacant" },
  { label: "Install", value: "Typically completed in one day" },
  { label: "Staging period", value: "First 30 days on market, with extensions available" },
  { label: "Who we work with", value: "Homeowners, real estate agents and builders" },
  { label: "Service area", value: "All of the Portland metro" },
];

const jumpLinks = [
  { href: "#services", label: "Services" },
  { href: "#process", label: "Process" },
  { href: "#faq", label: "FAQ" },
  { href: "#areas", label: "Areas we serve" },
];

const guideSlugs = [
  "cost-to-stage-a-home-portland",
  "is-home-staging-worth-it",
  "home-staging-checklist",
  "staging-an-occupied-home",
  "how-to-stage-your-house-to-sell",
  "home-staging-tips",
];
const guides = guideSlugs
  .map((slug) => blogPosts.find((p) => p.slug === slug))
  .filter((p) => p !== undefined);

const stagingFaqs = [
  {
    question: "How much does home staging cost in Portland, Oregon?",
    answer:
      "Home staging costs depend on the property size, number of rooms staged, and whether it's occupied or vacant. We provide customized quotes after a free consultation. Most of our clients see significant ROI — staged homes in Portland typically sell faster and for higher prices than comparable unstaged listings.",
  },
  {
    question: "How long does staging stay in the home?",
    answer:
      "Our standard staging period covers the first 30 days on market. Extensions are available if needed. We work with you and your real estate agent to coordinate timing around your listing schedule.",
  },
  {
    question: "Do you stage occupied homes or just vacant properties?",
    answer:
      "We stage both! For occupied homes, we work with your existing furniture and supplement with key pieces from our inventory. For vacant homes, we provide a complete staging package with all furnishings and decor.",
  },
  {
    question: "What's included in a free staging consultation?",
    answer:
      "During your free consultation, we tour your property, discuss your goals and timeline, identify the rooms that will benefit most from staging, and provide a detailed quote. There's no obligation — it's an opportunity for us to understand your property and for you to understand our process.",
  },
  {
    question:
      "Do you work with real estate agents in Portland?",
    answer:
      "Yes — we partner with real estate agents throughout the Portland metro area and Oregon. We offer agent-specific packages, can coordinate directly with your listing timeline, and provide consistent, high-quality staging that helps your listings stand out.",
  },
];

export default function HomeStagingPage() {
  const featured = featuredHomes(3);
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Home Staging", href: "/home-staging" },
        ]}
      />
      <ServiceJsonLd
        name="Home Staging Services in Portland, Oregon"
        description="Professional home staging services including occupied staging, vacant staging, luxury estate staging, and new construction model home staging throughout Portland, Oregon and surrounding areas."
        url="/home-staging"
      />
      <FAQJsonLd faqs={stagingFaqs} />

      {/* Hero — split editorial */}
      <SplitHero
        eyebrow="Home Staging · Portland, Oregon"
        title="Sell Your Home Faster & For More"
        subtitle="Portland sellers trust us to stage homes that move — one recent listing sold in 5 days above asking."
        imageSrc="/images/hero-staging.webp"
        imageAlt="Professionally staged home kitchen by Greylyn Wayne in Portland, Oregon — bright white kitchen with open shelving, natural wood accents, and gold fixtures"
      />

      {/* Intro */}
      <section className="py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="font-[family-name:var(--font-playfair)] text-3xl md:text-4xl text-charcoal mb-6">
                Professional Home Staging in Portland, Oregon
              </h2>
              <p className="text-charcoal-light leading-relaxed mb-6">
                Our real estate staging services highlight each home&apos;s
                unique features, attract qualified buyers, and help properties
                sell faster at higher prices. We&apos;re a local, family-run
                staging company that stages houses to make them feel like home
                and enhance the property&apos;s true identity.
              </p>
              <p className="text-charcoal-light leading-relaxed mb-8">
                Whether you&apos;re a homeowner preparing to list, a real estate
                agent looking to maximize your listing&apos;s appeal, or a
                builder showcasing a new development — we have the staging
                solution for you.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/contact"
                  className="inline-block bg-teal text-white px-8 py-4 text-sm tracking-wider uppercase hover:bg-teal-dark transition-colors font-medium text-center"
                >
                  Request a Free Quote
                </Link>
                <Link
                  href="/staged-homes"
                  className="inline-block border border-charcoal/20 text-charcoal px-8 py-4 text-sm tracking-wider uppercase hover:bg-charcoal hover:text-white transition-colors text-center"
                >
                  See Homes We&apos;ve Staged
                </Link>
              </div>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                src="/images/portland-home-staging-loft-living-room.webp"
                alt="Staged industrial loft living room in Portland, Oregon by Greylyn Wayne"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* At a glance — skimmable quick answers */}
      <section className="pb-24 lg:pb-32">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          <div className="border border-teal/30 p-8 lg:p-12">
            <h2 className="font-[family-name:var(--font-playfair)] text-2xl md:text-3xl text-charcoal mb-8">
              Home Staging in Portland at a Glance
            </h2>
            <dl className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-6">
              {atAGlance.map((item) => (
                <div key={item.label}>
                  <dt className="text-teal text-xs tracking-wider uppercase mb-1">
                    {item.label}
                  </dt>
                  <dd className="text-charcoal-light text-sm leading-relaxed">
                    {item.value}
                  </dd>
                </div>
              ))}
            </dl>
            <nav
              aria-label="On this page"
              className="mt-8 pt-6 border-t border-gray-200 flex flex-wrap gap-x-6 gap-y-2 text-sm"
            >
              {jumpLinks.map((l) => (
                <a key={l.href} href={l.href} className="text-teal hover:text-teal-dark underline-offset-4 hover:underline">
                  {l.label}
                </a>
              ))}
            </nav>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-24 lg:py-32 bg-warm">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-teal text-sm tracking-[0.3em] uppercase mb-4">
              Why Stage Your Home?
            </p>
            <h2 className="font-[family-name:var(--font-playfair)] text-3xl md:text-4xl text-charcoal">
              The ROI of Professional Home Staging
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

      {/* Recently staged — real proof */}
      {featured.length > 0 && (
        <section className="py-24 lg:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="text-center mb-16">
              <p className="text-teal text-sm tracking-[0.3em] uppercase mb-4">
                Proof on the Market
              </p>
              <h2 className="font-[family-name:var(--font-playfair)] text-3xl md:text-4xl text-charcoal mb-4">
                Recently Staged Homes
              </h2>
              <p className="text-charcoal-light leading-relaxed max-w-2xl mx-auto">
                Real Portland-area listings we&apos;ve staged — each one links to
                its live status on Redfin and Zillow, so you can see exactly how
                our work shows on the market.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featured.map((home) => (
                <StagedHomeCard key={home.ref} home={home} />
              ))}
            </div>
            <div className="text-center mt-12">
              <Link
                href="/staged-homes"
                className="inline-block border border-charcoal/20 text-charcoal px-8 py-4 text-sm tracking-wider uppercase hover:bg-charcoal hover:text-white transition-colors font-medium"
              >
                View All Staged Homes
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Services */}
      <section id="services" className="py-24 lg:py-32 scroll-mt-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-teal text-sm tracking-[0.3em] uppercase mb-4">
              Staging Services
            </p>
            <h2 className="font-[family-name:var(--font-playfair)] text-3xl md:text-4xl text-charcoal">
              Home Staging Services for Every Portland Property
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service) => (
              <div
                key={service.title}
                className="border border-gray-200 p-8 lg:p-10 hover:border-teal transition-colors"
              >
                <h3 className="font-[family-name:var(--font-playfair)] text-xl mb-2">
                  {service.title}
                </h3>
                <p className="text-teal text-xs tracking-wider uppercase mb-3">
                  Best for: {service.bestFor}
                </p>
                <p className="text-charcoal-light text-sm leading-relaxed mb-4">
                  {service.description}
                </p>
                <Link
                  href={service.link.href}
                  className="text-sm text-teal hover:text-teal-dark underline-offset-4 hover:underline"
                >
                  {service.link.label} &rarr;
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section id="process" className="py-24 lg:py-32 bg-teal scroll-mt-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-teal-bg text-sm tracking-[0.3em] uppercase mb-4">
              How It Works
            </p>
            <h2 className="font-[family-name:var(--font-playfair)] text-3xl md:text-4xl text-white">
              Our Home Staging Process
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                step: "01",
                title: "Free Consultation",
                desc: "We tour your property and discuss your goals, timeline, and budget — at no cost to you.",
              },
              {
                step: "02",
                title: "Custom Design Plan",
                desc: "Our team creates a staging plan tailored to your home, neighborhood, and target buyer.",
              },
              {
                step: "03",
                title: "Professional Install",
                desc: "We deliver, arrange, and style every room to perfection — typically completed in one day.",
              },
              {
                step: "04",
                title: "List & Sell",
                desc: "Your beautifully staged home hits the market and makes an unforgettable first impression.",
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
      <section id="faq" className="py-24 lg:py-32 scroll-mt-28">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-teal text-sm tracking-[0.3em] uppercase mb-4">
              Questions
            </p>
            <h2 className="font-[family-name:var(--font-playfair)] text-3xl md:text-4xl text-charcoal">
              Home Staging FAQ
            </h2>
          </div>
          <div className="space-y-8">
            {stagingFaqs.map((faq, i) => (
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
          {guides.length > 0 && (
            <div className="mt-16">
              <h2 className="font-[family-name:var(--font-playfair)] text-2xl text-charcoal mb-6">
                Home Staging Guides
              </h2>
              <ul className="space-y-3">
                {guides.map((post) => (
                  <li key={post.slug}>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="text-teal hover:text-teal-dark underline-offset-4 hover:underline"
                    >
                      {post.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>

      {/* Metro links — "Home staging in {city}" anchors to the city pages */}
      <section id="areas" className="pb-24 lg:pb-32 scroll-mt-28">
        <div className="mx-auto max-w-5xl px-6 lg:px-8 text-center">
          <p className="text-teal text-sm tracking-[0.3em] uppercase mb-4">
            Where We Work
          </p>
          <h2 className="font-[family-name:var(--font-playfair)] text-3xl md:text-4xl text-charcoal mb-4">
            Home Staging Across the Portland Metro
          </h2>
          <p className="text-charcoal-light max-w-2xl mx-auto mb-10">
            We stage homes for homeowners, real estate agents and builders
            throughout the Portland metro area and Oregon.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {metroLinks.map((c) => (
              <Link
                key={c.slug}
                href={`/service-areas/${c.slug}`}
                className="px-5 py-2.5 border border-teal/30 text-sm text-charcoal-light hover:border-teal hover:text-teal transition-colors"
              >
                Home staging in {c.name}
              </Link>
            ))}
            <Link
              href="/service-areas"
              className="px-5 py-2.5 border border-teal text-sm text-teal hover:bg-teal hover:text-white transition-colors"
            >
              View All Areas &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 lg:py-32 bg-warm text-center">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <h2 className="font-[family-name:var(--font-playfair)] text-3xl md:text-4xl text-charcoal mb-6">
            Ready to Stage Your Portland Home?
          </h2>
          <p className="text-charcoal-light leading-relaxed mb-4">
            Contact us today for a free, no-obligation consultation. Our team
            will assess your property and create a custom staging plan designed
            to get you the best possible results.
          </p>
          <p className="text-teal text-sm font-medium mb-10">
            Same-week consultations available &middot; Serving all of Portland
            metro
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-teal text-white px-10 py-4 text-sm tracking-wider uppercase hover:bg-teal-dark transition-colors font-medium"
            >
              Get Your Free Staging Quote
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
