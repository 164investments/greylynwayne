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

// Real, verbatim 5-star Google reviews pulled from Greylyn Wayne's Google
// Business Profile via the My Business API (src/data/google-reviews.json,
// 163 reviews / 4.9★). Service labels are inferred from each review's content.
// Do NOT add invented testimonials here — only real GBP reviews.
const reviews = [
  {
    quote:
      "I have used Greylyn Wayne for a number of stages for my listings, they have always done a great job but I was especially thrilled with my last experience with their team. We initially had a sale fail and they were quick to remove their staging and were incredibly sensitive to my clients and I. Once the repairs were completed, they were quick to help us re-stage and launch right away. Once re-listed, we received a full price offer in less than a week. Their service and stage were both exceptional and I'll absolutely be using them in the future.",
    author: "Jake Grant",
    service: "Home Staging · Real Estate Agent",
    stars: 5,
  },
  {
    quote:
      "Is this MY home? Greylyn Wayne did an amazing job showcasing the best of our home in the areas requested. After living in a home you love for 26 years, it is so heart-warming to see it staged with care. With your good work, we are putting our best foot forward! Thank you!",
    author: "Joan Medlen",
    service: "Home Staging",
    stars: 5,
  },
  {
    quote:
      "We had the good fortune to work with Tori. She furnished our entire apartment — she is incredibly skilled at making good use of small spaces. She is creative and responsive. And she is frugal. I only regret that I don't have another project to let her complete for us!!",
    author: "Tony Fargason",
    service: "Interior Design",
    stars: 5,
  },
  {
    quote:
      "GW is truly a top stager in Portland. They focus down to the detail, will not leave the project until it is completely dialed. Their special planning and choice of furniture, art, decor always showcases the home's architectural style and really has helped to highlight the homes I have sold. They are awesome to work with too! You won't be disappointed.",
    author: "Carey Hunt",
    service: "Home Staging · Real Estate Agent",
    stars: 5,
  },
  {
    quote:
      "Alicia Leon is incredibly talented and has such a great eye for design. Whether you're getting a home ready to sell or just want to refresh your space, she and the Greylyn Wayne team know how to make everything look polished, stylish, and inviting. Alicia really takes the time to understand your vision and brings it to life beautifully. If you want your space to look its absolute best, I highly recommend Alicia and the team at Greylyn Wayne!",
    author: "Miguel Tenorio",
    service: "Home Staging & Interior Design",
    stars: 5,
  },
  {
    quote:
      "Working with Greylyn Wayne for staging was a game changer. They knew exactly how to highlight the space without making it feel forced. The setup felt fresh, balanced, and really brought out the best parts of the home. Start to finish, it all felt easy and professional.",
    author: "Megan Zehngut",
    service: "Home Staging",
    stars: 5,
  },
  {
    quote:
      "It was wonderful to work with the team at Greylyn Wayne for my interior design needs. They listened to my needs and were prompt, professional and artistic in their design ideas. Thank you for your prompt and on time attention to my needs. I love the look you created.",
    author: "Linda Stine",
    service: "Interior Design",
    stars: 5,
  },
  {
    quote:
      "Thank you Greylyn Wayne! Being super busy with work did not allow me to properly design my house the way I planned to. I hired them for interior design and they were kind, efficient, professional, and made my house feel like a home. I would definitely use them again!",
    author: "Callie Enos",
    service: "Interior Design",
    stars: 5,
  },
  {
    quote:
      "We were so pleased with Alicia's choices and recommendations of the custom design plans and execution. Our time was limited and her design and execution was spot on.",
    author: "Patricia Schaub",
    service: "Interior Design",
    stars: 5,
  },
  {
    quote:
      "Always love working with Greylyn Wayne Staging! They're always so professional, and do a phenomenal job at making our staged houses look amazing. 🏡 Thank you GW Team!",
    author: "Patrick Janzen",
    service: "Home Staging · Real Estate Agent",
    stars: 5,
  },
  {
    quote:
      "Greylyn Wayne is the best! So easy to work with and seriously talented. The space turned out gorgeous—clean, stylish, and totally pulled together. I definitely encourage others to use this company!",
    author: "Halle Harris",
    service: "Interior Design",
    stars: 5,
  },
  {
    quote:
      "Greylyn Wayne has a great team and are able to provide a variety of services including staging, interior design services, and consultations. Whatever your need in the design realm they can and will successfully help you!",
    author: "Kevin Hill",
    service: "Home Staging & Interior Design",
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

      {/* Featured testimonial — real, verbatim Google review (GBP API) */}
      <section className="pb-4">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <figure className="bg-warm border-l-4 border-teal p-8 lg:p-12">
            <Stars count={5} />
            <blockquote className="font-[family-name:var(--font-playfair)] text-xl md:text-2xl text-charcoal leading-relaxed mb-6">
              &ldquo;I have always referred Greylyn Wayne to the agents I
              supervise, but recently had a delightful experience of my own. On
              short notice they transformed a lovely property from plain to
              magazine-quality! The home sold on its first open house. Their
              entire staff was a delight to work with and their fee was very
              fair. You will love working with this company.&rdquo;
            </blockquote>
            <figcaption className="text-sm">
              <span className="text-charcoal font-medium">Joanne Sterling</span>
              <span className="text-charcoal-light">
                {" "}
                — Real Estate Broker
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
