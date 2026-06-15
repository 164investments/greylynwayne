import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Greylyn Wayne — Links",
  description:
    "Quick links to Greylyn Wayne home staging and interior design services, the Alla Famiglia 2025 Street of Dreams home, and What's New Furniture.",
  // QR / direct-traffic landing hub — not an SEO page, keep it out of the index.
  robots: { index: false, follow: true },
  alternates: {
    canonical: "https://www.greylynwayne.com/qr-code-link-directory",
  },
};

type LinkItem = { label: string; href: string; external?: boolean; sub?: string };

const featured: LinkItem[] = [
  { label: "View the Alla Famiglia Home", href: "/alla-famiglia", sub: "2025 Street of Dreams" },
  {
    label: "Shop the Look at What's New Furniture",
    href: "https://whatsnewfurniture.com/collections/street-of-dreams-furniture",
    external: true,
  },
];

const explore: LinkItem[] = [
  { label: "Home Staging", href: "/home-staging" },
  { label: "Interior Design", href: "/interior-design" },
  { label: "Street of Dreams", href: "/street-of-dreams" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Where We Work", href: "/service-areas" },
  { label: "About Jody Wallace", href: "/meet-jody-wallace" },
  { label: "Blog", href: "/blog" },
];

const connect: LinkItem[] = [
  { label: "Purchase Staged Furniture", href: "/furniture-request" },
  { label: "Contact Us", href: "/contact" },
  { label: "Call (971) 930-0220", href: "tel:9719300220", external: true },
  { label: "Email design@greylynwayne.com", href: "mailto:design@greylynwayne.com", external: true },
];

function LinkButton({ item }: { item: LinkItem }) {
  const className =
    "block w-full text-center bg-white border border-gray-200 px-6 py-4 text-charcoal hover:border-teal hover:text-teal transition-colors";
  const content = (
    <>
      <span className="text-sm tracking-wide uppercase font-medium">{item.label}</span>
      {item.sub && <span className="block text-xs text-charcoal-light mt-1 normal-case tracking-normal">{item.sub}</span>}
    </>
  );
  return item.external ? (
    <a href={item.href} target="_blank" rel="noopener noreferrer" className={className}>
      {content}
    </a>
  ) : (
    <Link href={item.href} className={className}>
      {content}
    </Link>
  );
}

function Section({ title, items }: { title: string; items: LinkItem[] }) {
  return (
    <div className="mb-10">
      <h2 className="text-center text-teal text-xs tracking-[0.3em] uppercase mb-5">{title}</h2>
      <div className="space-y-3">
        {items.map((item) => (
          <LinkButton key={item.label} item={item} />
        ))}
      </div>
    </div>
  );
}

export default function QrLinkDirectory() {
  return (
    <section className="pt-20 bg-warm min-h-screen">
      <div className="mx-auto max-w-md px-6 py-16">
        <div className="text-center mb-12">
          <Image
            src="/images/logo-teal.png"
            alt="Greylyn Wayne Interior Design & Staging"
            width={200}
            height={50}
            priority
            className="h-12 w-auto mx-auto mb-6"
          />
          <p className="text-charcoal-light text-sm leading-relaxed">
            Home staging, interior design, furniture rental, and model-home design throughout
            Portland, Oregon and the surrounding region. Tap a link below to explore.
          </p>
        </div>

        <Section title="Featured · Alla Famiglia" items={featured} />
        <Section title="Explore" items={explore} />
        <Section title="Get in Touch" items={connect} />

        <a
          href="https://whatsnewfurniture.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full text-center bg-teal text-white px-6 py-4 text-sm tracking-wider uppercase font-medium hover:bg-teal-dark transition-colors"
        >
          Shop What&apos;s New Furniture →
        </a>
      </div>
    </section>
  );
}
