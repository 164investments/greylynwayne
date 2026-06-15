import Image from "next/image";
import Link from "next/link";
import { FAQJsonLd } from "@/components/JsonLd";

const services = [
  {
    title: "Home Staging",
    description:
      "Professionally staged homes sell faster and at higher prices. Our expert staging highlights your property's best features to attract qualified buyers.",
    href: "/home-staging",
    image: "/images/home-staging-1.webp",
    alt: "Professional home staging by Greylyn Wayne in Portland, Oregon — industrial loft living room with curated furnishings",
  },
  {
    title: "Interior Design",
    description:
      "Transform your home with personalized, high-end interior design. Whether refreshing a single room or a full remodel, we curate spaces that feel beautiful and livable.",
    href: "/interior-design",
    image: "/images/home-staging-2.jpg",
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
  { value: "500+", label: "Homes Transformed" },
  { value: "5.0", label: "Star Rating" },
];

const testimonials = [
  {
    quote:
      "Greylyn Wayne transformed our listing into a breathtaking showcase. The staging was impeccable and the home sold in just 5 days above asking price.",
    author: "Portland Real Estate Agent",
    context: "Vacant Home Staging",
  },
  {
    quote:
      "Their attention to detail is exceptional. From start to finish, the process was stress-free and the results exceeded all expectations.",
    author: "Happy Valley Homeowner",
    context: "Interior Design",
  },
  {
    quote:
      "Working with Jody and her team was an absolute pleasure. They brought our vision to life with creativity and professionalism we didn't think was possible.",
    author: "Lake Oswego Client",
    context: "Full Home Redesign",
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

      {/* Hero */}
      <section className="relative min-h-screen flex items-center">
        <div className="absolute inset-0">
          <Image
            src="/images/hero-interior.webp"
            alt="Luxury interior design by Greylyn Wayne — Alla Famiglia Street of Dreams dining room in Portland, Oregon"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-charcoal/50" />
        </div>
        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8 py-32">
          <div className="max-w-2xl">
            <p className="text-teal-light text-sm tracking-[0.3em] uppercase mb-6">
              Portland, Oregon &middot; Est. 2015
            </p>
            <h1 className="font-[family-name:var(--font-playfair)] text-5xl md:text-6xl lg:text-7xl text-white leading-tight mb-6">
              Home Staging &<br />
              Interior Design
            </h1>
            <p className="text-gray-300 text-lg md:text-xl leading-relaxed mb-4 max-w-lg">
              We transform spaces into stunning showcases that sell faster, live
              better, and feel like home.
            </p>
            <p className="text-teal-light text-sm mb-10">
              4x Street of Dreams Featured Designer &middot; Award-Winning
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                type="button"
                data-open-chat
                className="inline-flex items-center justify-center gap-2 bg-teal text-white px-8 py-4 text-sm tracking-wider uppercase hover:bg-teal-dark transition-colors duration-200 text-center font-medium"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-2.685.16 4.486 4.486 0 001.276-2.876c.026-.198-.07-.392-.246-.487A8.225 8.225 0 013 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
                </svg>
                Text Us
              </button>
              <a
                href="tel:9719300220"
                className="inline-flex items-center justify-center gap-2 border border-white/40 text-white px-8 py-4 text-sm tracking-wider uppercase hover:bg-white/10 transition-colors duration-200 text-center"
              >
                Call (971) 930-0220
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Trust bar */}
      <section className="py-6 bg-warm border-b border-gray-100">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-xs text-charcoal-light tracking-wider uppercase">
            <span>4x Street of Dreams Designer</span>
            <span className="hidden sm:inline text-teal">&middot;</span>
            <span>People&apos;s & Professional&apos;s Choice Award</span>
            <span className="hidden sm:inline text-teal">&middot;</span>
            <span>500+ Homes Staged</span>
            <span className="hidden sm:inline text-teal">&middot;</span>
            <span>Free Consultations</span>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-24 lg:py-32 bg-warm">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-teal text-sm tracking-[0.3em] uppercase mb-4">
              What We Do
            </p>
            <h2 className="font-[family-name:var(--font-playfair)] text-3xl md:text-4xl lg:text-5xl text-charcoal">
              Our Services
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service) => (
              <Link
                key={service.title}
                href={service.href}
                className="group"
              >
                <div className="relative aspect-[4/3] overflow-hidden mb-6">
                  <Image
                    src={service.image}
                    alt={service.alt}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <h3 className="font-[family-name:var(--font-playfair)] text-2xl mb-3 group-hover:text-teal transition-colors">
                  {service.title}
                </h3>
                <p className="text-charcoal-light text-sm leading-relaxed">
                  {service.description}
                </p>
                <span className="inline-block mt-4 text-teal text-sm tracking-wider uppercase font-medium">
                  Learn More &rarr;
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* About preview */}
      <section className="py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative aspect-[4/5] overflow-hidden">
              <Image
                src="/images/home-staging-1.webp"
                alt="Greylyn Wayne staged industrial loft living room in Portland — leather sofas, exposed brick, curated decor"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <p className="text-teal text-sm tracking-[0.3em] uppercase mb-4">
                About Us
              </p>
              <h2 className="font-[family-name:var(--font-playfair)] text-3xl md:text-4xl lg:text-5xl text-charcoal mb-6">
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
      <section className="py-20 bg-teal">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
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
      <section className="py-24 lg:py-32 bg-warm">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-teal text-sm tracking-[0.3em] uppercase mb-4">
              Testimonials
            </p>
            <h2 className="font-[family-name:var(--font-playfair)] text-3xl md:text-4xl lg:text-5xl text-charcoal">
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
      <section className="relative py-24 lg:py-32">
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
          <h2 className="font-[family-name:var(--font-playfair)] text-3xl md:text-4xl lg:text-5xl text-white mb-6">
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
      <section className="py-24 lg:py-32">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-teal text-sm tracking-[0.3em] uppercase mb-4">
              Common Questions
            </p>
            <h2 className="font-[family-name:var(--font-playfair)] text-3xl md:text-4xl text-charcoal">
              Frequently Asked Questions
            </h2>
          </div>
          <div className="space-y-8">
            {homeFaqs.map((faq, i) => (
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

      {/* Service areas — SEO-rich */}
      <section className="py-24 lg:py-32 bg-warm">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-teal text-sm tracking-[0.3em] uppercase mb-4">
              Where We Work
            </p>
            <h2 className="font-[family-name:var(--font-playfair)] text-3xl md:text-4xl text-charcoal mb-4">
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
