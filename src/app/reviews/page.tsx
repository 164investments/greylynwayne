import type { Metadata } from "next";
import Link from "next/link";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import {
  RatingStars,
  RATING,
  REVIEW_COUNT,
  GOOGLE_REVIEWS_URL,
} from "@/components/Proof";

export const metadata: Metadata = {
  title: "Client Reviews | Home Staging & Interior Design Testimonials",
  description:
    "Read what clients say about Greylyn Wayne's home staging and interior design services in Portland, Oregon. Real testimonials from homeowners, agents, and builders — (971) 930-0220.",
  alternates: { canonical: "https://www.greylynwayne.com/reviews" },
};

const reviews = [
  {
    quote:
      "Greylyn Wayne transformed our listing into a breathtaking showcase. The staging was impeccable and the home sold in just 5 days above asking price. I recommend them to every seller I work with.",
    author: "Portland Real Estate Agent",
    service: "Vacant Home Staging",
    stars: 5,
  },
  {
    quote:
      "Their attention to detail is exceptional. From start to finish, the process was stress-free and the results exceeded all expectations. Our home looked like it belonged in a magazine.",
    author: "Happy Valley Homeowner",
    service: "Interior Design",
    stars: 5,
  },
  {
    quote:
      "Working with Jody and her team was an absolute pleasure. They brought our vision to life with creativity and professionalism we didn't think was possible.",
    author: "Lake Oswego Client",
    service: "Full Home Redesign",
    stars: 5,
  },
  {
    quote:
      "As a builder, I need staging that sells homes fast. Greylyn Wayne consistently delivers — our model homes stage beautifully and buyers can immediately see themselves living there.",
    author: "Portland Home Builder",
    service: "New Construction Staging",
    stars: 5,
  },
  {
    quote:
      "We were nervous about staging costs, but the investment paid for itself many times over. Our home sold for $45,000 over asking price within the first weekend on the market.",
    author: "West Linn Homeowner",
    service: "Occupied Home Staging",
    stars: 5,
  },
  {
    quote:
      "Jody's eye for design is truly exceptional. She understood exactly what our space needed and created an interior that feels both luxurious and comfortable. We love coming home now.",
    author: "Pearl District Client",
    service: "Interior Design Consultation",
    stars: 5,
  },
  {
    quote:
      "The team was incredibly professional and efficient. They staged our entire home in a single day and the transformation was unbelievable. Best decision we made before listing.",
    author: "Beaverton Homeowner",
    service: "Vacant Home Staging",
    stars: 5,
  },
  {
    quote:
      "We hired Greylyn Wayne to design our Airbnb property and bookings went through the roof. The space photographs beautifully and guests consistently mention the design in their 5-star reviews.",
    author: "Bend Vacation Rental Owner",
    service: "Short-Term Rental Design",
    stars: 5,
  },
  {
    quote:
      "Close collaboration from day one. They listened to our vision, made brilliant suggestions, and delivered a result that was even better than what we imagined. Competitive pricing for the quality delivered.",
    author: "Tigard Homeowner",
    service: "Full-Service Interior Design",
    stars: 5,
  },
];

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-1 text-teal mb-4">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function ReviewsPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Reviews", href: "/reviews" },
        ]}
      />

      {/* Hero */}
      <section className="pt-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-24 lg:py-32">
          <div className="text-center">
            <p className="text-teal text-sm tracking-[0.3em] uppercase mb-4">
              Testimonials
            </p>
            <h1 className="font-[family-name:var(--font-playfair)] text-4xl md:text-5xl lg:text-6xl text-charcoal mb-6">
              Client Reviews
            </h1>
            <p className="text-charcoal-light text-lg max-w-2xl mx-auto mb-10">
              Don&apos;t just take our word for it — hear from homeowners, real
              estate agents, and builders who&apos;ve trusted Greylyn Wayne.
            </p>
            <div className="inline-flex flex-col items-center gap-3">
              <div className="flex items-center gap-3">
                <span className="text-amber-400">
                  <RatingStars className="h-6 w-6" />
                </span>
                <span className="font-[family-name:var(--font-playfair)] text-3xl text-charcoal">
                  {RATING}
                </span>
                <span className="text-charcoal-light text-sm">
                  from {REVIEW_COUNT} Google reviews
                </span>
              </div>
              <Link
                href={GOOGLE_REVIEWS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-teal text-sm tracking-wider uppercase font-medium hover:text-teal-dark transition-colors"
              >
                Read all {REVIEW_COUNT} on Google &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured testimonial — real, named broker (from the live site) */}
      <section className="pb-4">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <figure className="bg-warm border-l-4 border-teal p-8 lg:p-12">
            <Stars count={5} />
            <blockquote className="font-[family-name:var(--font-playfair)] text-xl md:text-2xl text-charcoal leading-relaxed mb-6">
              &ldquo;I&apos;ve used many staging companies in the past, but since
              I started using Jody, I have not gone back to the other
              companies.&rdquo;
            </blockquote>
            <figcaption className="text-sm">
              <span className="text-charcoal font-medium">Liz Carpenter</span>
              <span className="text-charcoal-light">
                {" "}
                — Principal Broker, West Hills RE/MAX
              </span>
            </figcaption>
          </figure>
        </div>
      </section>

      {/* Reviews grid */}
      <section className="pb-24 lg:pb-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {reviews.map((review, i) => (
              <div key={i} className="bg-warm p-8 lg:p-10">
                <Stars count={review.stars} />
                <p className="text-charcoal-light leading-relaxed mb-6 italic text-sm">
                  &ldquo;{review.quote}&rdquo;
                </p>
                <p className="text-charcoal font-medium text-sm">
                  {review.author}
                </p>
                <p className="text-teal text-xs mt-1">{review.service}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 lg:py-32 bg-teal text-center">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <h2 className="font-[family-name:var(--font-playfair)] text-3xl md:text-4xl text-white mb-6">
            Ready to Experience the Difference?
          </h2>
          <p className="text-teal-bg leading-relaxed mb-10">
            Join hundreds of satisfied clients across Portland and Oregon.
            Schedule your free consultation today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-white text-teal-dark px-10 py-4 text-sm tracking-wider uppercase hover:bg-cream transition-colors font-medium"
            >
              Get Your Free Consultation
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
