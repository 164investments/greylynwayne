import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page Not Found",
  description:
    "The page you're looking for isn't here. Explore Greylyn Wayne's home staging and interior design services, or get in touch for a free consultation.",
  robots: { index: false, follow: true },
};

const popularLinks = [
  { name: "Home Staging", href: "/home-staging" },
  { name: "Interior Design", href: "/interior-design" },
  { name: "Portfolio", href: "/portfolio" },
  { name: "Service Areas", href: "/service-areas" },
  { name: "About Greylyn Wayne", href: "/about" },
  { name: "Reviews", href: "/reviews" },
];

export default function NotFound() {
  return (
    <section className="pt-20">
      <div className="mx-auto max-w-3xl px-6 lg:px-8 py-24 lg:py-36 text-center">
        <p className="text-teal text-sm tracking-[0.3em] uppercase mb-4">
          Error 404
        </p>
        <h1 className="font-[family-name:var(--font-playfair)] text-4xl md:text-5xl lg:text-6xl text-charcoal mb-6">
          This Page Has Been Restaged
        </h1>
        <p className="text-charcoal-light text-lg leading-relaxed max-w-xl mx-auto mb-10">
          The page you&apos;re looking for moved or no longer exists. Let&apos;s
          get you back to a beautiful space — explore our services below or
          reach out for a free consultation.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <Link
            href="/"
            className="inline-block bg-teal text-white px-10 py-4 text-sm tracking-wider uppercase hover:bg-teal-dark transition-colors font-medium"
          >
            Back to Home
          </Link>
          <Link
            href="/contact"
            className="inline-block border-2 border-teal text-teal px-10 py-4 text-sm tracking-wider uppercase hover:bg-teal hover:text-white transition-colors font-medium"
          >
            Get Your Free Consultation
          </Link>
        </div>

        <div className="border-t border-gray-200 pt-12">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-charcoal mb-6">
            Popular Pages
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            {popularLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-6 py-3 border border-gray-200 text-sm text-charcoal-light hover:border-teal hover:text-teal transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>
          <p className="text-charcoal-light text-sm mt-10">
            Prefer to talk? Call us at{" "}
            <a
              href="tel:9719300220"
              className="text-teal font-medium hover:text-teal-dark transition-colors"
            >
              (971) 930-0220
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
