import Image from "next/image";
import Link from "next/link";
import { FAQJsonLd } from "@/components/JsonLd";
import SplitHero from "@/components/SplitHero";
import HeroStacked from "@/components/HeroStacked";

const services = [
  {
    title: "Home Staging",
    description:
      "Professionally staged homes sell faster and at higher prices. Our expert staging highlights your property's best features to attract qualified buyers.",
    href: "/home-staging",
    image: "/images/portland-home-staging-living-room.webp",
    alt: "Professional home staging by Greylyn Wayne in Portland, Oregon — staged living room with gray sectional, marble coffee table, and curated art",
  },
  {
    title: "Interior Design",
    description:
      "Transform your home with personalized, high-end interior design. Whether refreshing a single room or a full remodel, we curate spaces that feel beautiful and livable.",
    href: "/interior-design",
    image: "/images/portland-interior-design-white-kitchen.webp",
    alt: "Interior design by Greylyn Wayne — modern white kitchen with open shelving and natural wood accents in Portland home",
  },
  {
    title: "Street of Dreams",
    description:
      "Selected as lead designer for four NW Natural Street of Dreams homes. Award-winning luxury design showcasing the best in Portland craftsmanship.",
    href: "/street-of-dreams",
    image: "/images/street-of-dreams.webp",
    alt: "Alla Famiglia Street of Dreams luxury dining room designed by Greylyn Wayne — modern chandelier, upholstered chairs, built-in cabinetry",
  },
];

const stats = [
  { value: "10+", label: "Years in Business" },
  { value: "4x", label: "Street of Dreams Designer" },
  { value: "2,500+", label: "Homes Transformed" },
  { value: "4.9★", label: "163 Google Reviews" },
];

// Credential badges shown directly under the hero. Icon + short label, in a
// hairline-divided grid so the proof points read as designed credentials.
const credentials = [
  {
    label: "4× Street of Dreams Designer",
    icon: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" strokeWidth={1.4} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 002.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 012.916.52 6.003 6.003 0 01-5.395 4.972m0 0a6.726 6.726 0 01-2.749 1.35m0 0a6.772 6.772 0 01-3.044 0" />
      </svg>
    ),
  },
  {
    label: "People's & Professional's Choice Award",
    icon: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" strokeWidth={1.4} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
      </svg>
    ),
  },
  {
    label: "2,500+ Homes Staged",
    icon: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" strokeWidth={1.4} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
      </svg>
    ),
  },
  {
    label: "Free Consultations",
    icon: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" strokeWidth={1.4} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
      </svg>
    ),
  },
];

// Real, verbatim 5-star Google reviews (see /reviews + src/data/google-reviews.json).
const testimonials = [
  {
    quote:
      "Working with Greylyn Wayne for staging was a game changer. They knew exactly how to highlight the space without making it feel forced. The setup felt fresh, balanced, and really brought out the best parts of the home. Start to finish, it all felt easy and professional.",
    author: "Megan Zehngut",
    context: "Home Staging",
  },
  {
    quote:
      "Is this MY home? Greylyn Wayne did an amazing job showcasing the best of our home in the areas requested. After living in a home you love for 26 years, it is so heart-warming to see it staged with care.",
    author: "Joan Medlen",
    context: "Home Staging",
  },
  {
    quote:
      "Greylyn Wayne is the best! So easy to work with and seriously talented. The space turned out gorgeous—clean, stylish, and totally pulled together. I definitely encourage others to use this company!",
    author: "Halle Harris",
    context: "Interior Design",
  },
];

const homeFaqs = [
  {
    question: "How much does home staging cost in Portland?",
    answer:
      "Home staging costs vary based on the size of the home, number of rooms, and whether it's occupied or vacant staging. We offer free consultations to assess your property and provide a custom quote. Most staging projects deliver significant ROI — staged homes typically sell faster and for higher prices than unstaged ones.",
  },
  {
    question: "What areas do you serve for home staging and interior design?",
    answer:
      "We serve the entire Portland metro area including Lake Oswego, West Linn, Beaverton, Happy Valley, Tigard, and Sherwood. We also travel to Bend, Hood River, Eugene, Salem, Cannon Beach, Vancouver WA, Camas, and communities throughout Oregon and Southwest Washington.",
  },
  {
    question:
      "How long does the home staging process take?",
    answer:
      "After your free consultation, we typically create a design plan within a few days. Installation is usually completed in a single day. From first contact to staged home, the entire process can be done in as little as one week, depending on your timeline.",
  },
  {
    question: "Do you work with real estate agents?",
    answer:
      "Absolutely. We partner with real estate agents throughout Portland and Oregon to help their listings sell faster and for more. We offer agent-specific packages and can coordinate directly with your listing timeline.",
  },
];

export default function Home() {
  return (
    <>
      <FAQJsonLd faqs={homeFaqs} />

      {/* Hero — stacked (clean photo on top, teal text band below) on mobile,
          matching the brand's established Wix pattern; split editorial on desktop.
          No text is layered over the photo. */}
      <div className="lg:hidden">
        <HeroStacked
          eyebrow="Portland, Oregon · Est. 2015"
          title={
            <>
              Home Staging &<br />
              Interior Design
            </>
          }
          subtitle="We transform spaces into stunning showcases that sell faster, live better, and feel like home."
          imageSrc="/images/hero-home-top.webp"
          imageAlt="Bright, modern Portland kitchen styled by Greylyn Wayne — island, rattan pendants, and natural wood floors"
        />
      </div>
      <div className="hidden lg:block">
        <SplitHero
          eyebrow="Portland, Oregon · Est. 2015"
          title={
            <>
              Home Staging &<br />
              Interior Design
            </>
          }
          subtitle="We transform spaces into stunning showcases that sell faster, live better, and feel like home."
          imageSrc="/images/hero-interior.webp"
          imageAlt="Luxury interior design by Greylyn Wayne — Alla Famiglia Street of Dreams dining room in Portland, Oregon"
        />
      </div>

      {/* Credentials — designed badge grid (icons + hairline dividers) */}
      <section className="bg-warm py-10 sm:py-14">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-teal-bg border border-teal-bg">
            {credentials.map((c) => (
              <div
                key={c.label}
                className="bg-warm flex flex-col items-center text-center gap-3 px-4 py-8"
              >
                <span className="text-teal" aria-hidden="true">
                  {c.icon}
                </span>
                <span className="text-charcoal text-[13px] font-medium tracking-[0.12em] uppercase leading-snug">
                  {c.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 sm:py-24 lg:py-32 bg-warm">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <p className="text-teal text-sm tracking-[0.3em] uppercase mb-4">
              What We Do
            </p>
            <h2 className="font-[family-name:var(--font-playfair)] text-4xl lg:text-5xl text-charcoal">
              Our Services
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {services.map((service) => (
              <Link
                key={service.title}
                href={service.href}
                className="group flex flex-col bg-white border border-gray-100 shadow-[0_1px_3px_rgba(62,66,66,0.05)] hover:shadow-[0_16px_40px_rgba(62,66,66,0.14)] hover:-translate-y-1 transition-all duration-300"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={service.image}
                    alt={service.alt}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="flex flex-col flex-1 p-6 lg:p-7">
                  <h3 className="font-[family-name:var(--font-playfair)] text-2xl mb-3 group-hover:text-teal transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-charcoal-light text-base leading-relaxed">
                    {service.description}
                  </p>
                  <span className="inline-flex items-center gap-2 mt-auto pt-5 text-teal text-sm tracking-wider uppercase font-medium">
                    Learn More
                    <span className="transition-transform duration-300 group-hover:translate-x-1">
                      &rarr;
                    </span>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* About preview */}
      <section className="py-16 sm:py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div className="relative aspect-[3/2] overflow-hidden">
              <Image
                src="/images/team/team-group.webp"
                alt="The Greylyn Wayne team — Portland's family-run home staging and interior design studio led by Jody Wallace"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <p className="text-teal text-sm tracking-[0.3em] uppercase mb-4">
                About Us
              </p>
              <h2 className="font-[family-name:var(--font-playfair)] text-4xl lg:text-5xl text-charcoal mb-6">
                Portland&apos;s Family-Run Design Studio
              </h2>
              <p className="text-charcoal-light leading-relaxed mb-6">
                Founded in 2015 by Jody Wallace, Greylyn Wayne is a
                Portland-based interior design and home staging company
                specializing in custom design solutions that accentuate the
                character of every space.
              </p>
              <p className="text-charcoal-light leading-relaxed mb-8">
                With over 20 years of design experience and four NW Natural
                Street of Dreams homes under our belt, our team brings a
                thoughtful approach to every project — whether staging a home for
                sale or designing a dream living space.
              </p>
              <Link
                href="/about"
                className="inline-block bg-teal text-white px-8 py-4 text-sm tracking-wider uppercase hover:bg-teal-dark transition-colors duration-200 font-medium"
              >
                Meet Our Team
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 sm:py-16 lg:py-20 bg-teal">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-y-10 gap-x-6 md:gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="font-[family-name:var(--font-playfair)] text-4xl md:text-5xl text-white mb-2">
                  {stat.value}
                </div>
                <div className="text-teal-bg text-sm tracking-wider uppercase">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 sm:py-24 lg:py-32 bg-warm">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <p className="text-teal text-sm tracking-[0.3em] uppercase mb-4">
              Testimonials
            </p>
            <h2 className="font-[family-name:var(--font-playfair)] text-4xl lg:text-5xl text-charcoal">
              What Our Clients Say
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, i) => (
              <div key={i} className="bg-white p-8 lg:p-10">
                <svg
                  className="h-8 w-8 text-teal-light mb-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H14.017zM0 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151C7.546 6.068 5.983 8.789 5.983 11H10v10H0z" />
                </svg>
                <p className="text-charcoal-light leading-relaxed mb-6 italic">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>
                <p className="text-teal text-sm font-medium">
                  {testimonial.author}
                </p>
                <p className="text-charcoal-light text-xs mt-1">
                  {testimonial.context}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-16 sm:py-24 lg:py-32">
        <div className="absolute inset-0">
          <Image
            src="/images/hero-staging.webp"
            alt="Beautifully staged Portland kitchen by Greylyn Wayne — bright white cabinetry with natural wood and gold accents"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-charcoal/70" />
        </div>
        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8 text-center">
          <h2 className="font-[family-name:var(--font-playfair)] text-4xl lg:text-5xl text-white mb-6">
            Ready to Transform Your Space?
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto mb-4">
            Whether you&apos;re selling your home or creating your dream
            interior, we&apos;re here to help.
          </p>
          <p className="text-teal-light text-sm mb-10">
            Free consultations &middot; No obligation &middot; Same-week
            availability
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              type="button"
              data-open-chat
              className="inline-flex items-center justify-center gap-2 bg-teal text-white px-10 py-4 text-sm tracking-wider uppercase hover:bg-teal-dark transition-colors duration-200 font-medium"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-2.685.16 4.486 4.486 0 001.276-2.876c.026-.198-.07-.392-.246-.487A8.225 8.225 0 013 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
              </svg>
              Text Us
            </button>
            <a
              href="tel:9719300220"
              className="inline-flex items-center justify-center gap-2 border border-white/30 text-white px-10 py-4 text-sm tracking-wider uppercase hover:bg-white/10 transition-colors duration-200"
            >
              Call (971) 930-0220
            </a>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 sm:py-24 lg:py-32">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <p className="text-teal text-sm tracking-[0.3em] uppercase mb-4">
              Common Questions
            </p>
            <h2 className="font-[family-name:var(--font-playfair)] text-4xl lg:text-5xl text-charcoal">
              Frequently Asked Questions
            </h2>
          </div>
          <div className="space-y-8">
            {homeFaqs.map((faq, i) => (
              <div key={i} className="border-b border-gray-200 pb-8">
                <h3 className="font-[family-name:var(--font-playfair)] text-xl mb-3">
                  {faq.question}
                </h3>
                <p className="text-charcoal-light text-base leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service areas — SEO-rich */}
      <section className="py-16 sm:py-24 lg:py-32 bg-warm">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <p className="text-teal text-sm tracking-[0.3em] uppercase mb-4">
              Where We Work
            </p>
            <h2 className="font-[family-name:var(--font-playfair)] text-4xl lg:text-5xl text-charcoal mb-4">
              Home Staging & Interior Design Across Oregon
            </h2>
            <p className="text-charcoal-light max-w-2xl mx-auto">
              We proudly serve Portland and communities throughout Oregon and
              Southwest Washington.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-white p-8">
              <h3 className="font-semibold text-sm uppercase tracking-wider mb-4">
                Portland Metro
              </h3>
              <p className="text-charcoal-light text-sm leading-loose">
                Pearl District, Irvington, Laurelhurst, Sellwood, Alberta Arts,
                Eastmoreland, Lake Oswego, West Linn, Beaverton, Tigard,
                Tualatin, Sherwood, Happy Valley, Milwaukie, Oregon City
              </p>
            </div>
            <div className="bg-white p-8">
              <h3 className="font-semibold text-sm uppercase tracking-wider mb-4">
                Greater Oregon
              </h3>
              <p className="text-charcoal-light text-sm leading-loose">
                Bend, Eugene, Salem, Hood River, Cannon Beach, Astoria,
                Manzanita, Seaside, Lincoln City, Sunriver, Government Camp,
                Cascade Locks
              </p>
            </div>
            <div className="bg-white p-8">
              <h3 className="font-semibold text-sm uppercase tracking-wider mb-4">
                SW Washington
              </h3>
              <p className="text-charcoal-light text-sm leading-loose">
                Vancouver, Camas, Ridgefield, and surrounding communities
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
