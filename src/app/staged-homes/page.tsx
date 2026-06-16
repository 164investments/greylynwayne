import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import {
  groupedByRegion,
  featuredHomes,
  stats,
  pill,
  saleInfo,
  money,
  stagedWhen,
  type StagedHome,
} from "@/data/staging-portfolio";

export const metadata: Metadata = {
  title: "Recently Staged Homes | Greylyn Wayne Home Staging — Portland, OR",
  description:
    "Real homes professionally staged by Greylyn Wayne across Portland, the Westside, Clackamas County, and SW Washington. See current listing status on Redfin and Zillow. Book your staging consultation — (971) 930-0220.",
  alternates: { canonical: "https://www.greylynwayne.com/staged-homes" },
  openGraph: {
    title: "Recently Staged Homes | Greylyn Wayne",
    description:
      "Real homes we've staged across the Portland metro and SW Washington — with live Redfin & Zillow links.",
    url: "https://www.greylynwayne.com/staged-homes",
    images: [{ url: "/images/og-image.png" }],
  },
};

const TONE: Record<string, string> = {
  over: "bg-teal text-white",          // sold over ask — the hero stat
  fast: "bg-teal text-white",          // sold fast
  sold: "bg-charcoal text-white",
  live: "bg-white/95 text-charcoal",   // on the market
  new: "bg-cream text-charcoal-light", // pending / just staged
};

// One short line of sale proof under the address.
function saleLine(home: StagedHome): string | null {
  const s = saleInfo(home);
  if (s.isSold) {
    const parts: string[] = [];
    if (s.priceFmt) parts.push(`Sold ${s.priceFmt}`);
    if (s.overAskCents != null && s.overAskCents > 0)
      parts.push(`${money(s.overAskCents)} over asking`);
    else if (s.dom != null && s.dom <= 14)
      parts.push(`${s.dom} ${s.dom === 1 ? "day" : "days"} on market`);
    return parts.join(" · ") || null;
  }
  if (s.priceFmt) return `Asking ${s.priceFmt}`;
  return null;
}

function RedfinIcon() {
  return (
    <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 11l9-8 9 8M5 9v11a1 1 0 001 1h12a1 1 0 001-1V9" />
    </svg>
  );
}

function HomeCard({ home }: { home: StagedHome }) {
  const status = pill(home);
  const when = stagedWhen(home.installed_on);
  const sale = saleLine(home);
  const bb = home.beds_baths;
  const specs = bb
    ? [
        bb.beds ? `${bb.beds} bd` : null,
        bb.baths ? `${bb.baths} ba` : null,
        bb.sqft ? `${bb.sqft.toLocaleString()} sqft` : null,
      ].filter(Boolean).join(" · ")
    : null;

  return (
    <div className="group flex flex-col">
      <div className="relative aspect-[4/3] overflow-hidden bg-cream">
        {home.photo ? (
          <Image
            src={home.photo}
            alt={`${home.street}, ${home.city} — staged by Greylyn Wayne`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          // Elegant fallback when a listing photo isn't available — editorial address plate.
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-teal-bg text-center px-6">
            <Image
              src="/images/flourish-offwhite.webp"
              alt=""
              width={56}
              height={56}
              className="opacity-60 mb-3 [filter:saturate(0.6)_brightness(0.7)]"
            />
            <p className="font-[family-name:var(--font-playfair)] text-xl text-teal-dark leading-snug">
              {home.street}
            </p>
            <p className="text-teal text-xs tracking-[0.2em] uppercase mt-2">
              {home.city}, {home.state}
            </p>
          </div>
        )}
        <span
          className={`absolute top-3 left-3 text-[11px] tracking-wider uppercase px-2.5 py-1 ${TONE[status.tone]}`}
        >
          {status.label}
        </span>
      </div>

      <div className="pt-4">
        <h3 className="font-[family-name:var(--font-playfair)] text-lg text-charcoal leading-tight">
          {home.street}
        </h3>
        <p className="text-charcoal-light text-sm mt-0.5">
          {home.city}, {home.state}
          {when ? <span className="text-charcoal-light/70"> · Staged {when}</span> : null}
        </p>
        {sale ? (
          <p className="text-teal text-sm font-medium mt-1.5">{sale}</p>
        ) : null}
        {specs ? <p className="text-charcoal-light/70 text-xs mt-1">{specs}</p> : null}

        <div className="flex items-center gap-4 mt-3">
          <a
            href={home.redfin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs tracking-wide uppercase text-teal hover:text-teal-dark transition-colors"
          >
            <RedfinIcon />
            {home.redfin_verified ? "View on Redfin" : "Find on Redfin"}
          </a>
          <a
            href={home.zillow}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs tracking-wide uppercase text-charcoal-light hover:text-teal transition-colors"
          >
            Zillow →
          </a>
        </div>
      </div>
    </div>
  );
}

export default function StagedHomesPage() {
  const regions = groupedByRegion();
  const featured = featuredHomes(6);

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Staged Homes", href: "/staged-homes" },
        ]}
      />

      {/* Hero */}
      <section className="pt-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-20 lg:py-28">
          <div className="text-center max-w-3xl mx-auto">
            <p className="text-teal text-sm tracking-[0.3em] uppercase mb-4">
              Home Staging Portfolio
            </p>
            <h1 className="font-[family-name:var(--font-playfair)] text-4xl md:text-5xl lg:text-6xl text-charcoal mb-6">
              Recently Staged Homes
            </h1>
            <p className="text-charcoal-light text-lg leading-relaxed">
              Real listings we&apos;ve staged across the Portland metro and SW
              Washington. Every home links to its live status on Redfin and
              Zillow — so you can see exactly how our staging shows on the
              market.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 max-w-2xl mx-auto mt-14 text-center">
            <div>
              <p className="font-[family-name:var(--font-playfair)] text-3xl md:text-4xl text-teal">
                {stats.total}
              </p>
              <p className="text-charcoal-light text-xs tracking-wider uppercase mt-1">
                Recent Homes
              </p>
            </div>
            <div>
              <p className="font-[family-name:var(--font-playfair)] text-3xl md:text-4xl text-teal">
                {stats.soldOverAsk}
              </p>
              <p className="text-charcoal-light text-xs tracking-wider uppercase mt-1">
                Sold Over Asking
              </p>
            </div>
            <div>
              <p className="font-[family-name:var(--font-playfair)] text-3xl md:text-4xl text-teal">
                {stats.onMarket}
              </p>
              <p className="text-charcoal-light text-xs tracking-wider uppercase mt-1">
                On the Market Now
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured: standout sales (over ask / fast) */}
      {featured.length > 0 && (
        <section className="py-16 lg:py-20 bg-charcoal">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="text-center mb-12">
              <p className="text-teal-light text-sm tracking-[0.3em] uppercase mb-3">
                The Proof Is in the Sale
              </p>
              <h2 className="font-[family-name:var(--font-playfair)] text-3xl md:text-4xl text-white">
                Recent Sold Stories
              </h2>
              <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
                Homes we staged that sold over asking or flew off the market.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {featured.map((home) => {
                const s = saleInfo(home);
                // Big number is the hero; unit + address are supporting.
                const bigNum = s.soldFast ? `${s.dom}` : money(s.overAskCents);
                const bigUnit = s.soldFast
                  ? `${s.dom === 1 ? "Day" : "Days"} on Market`
                  : "Over Asking";
                return (
                  <a
                    key={home.ref}
                    href={home.redfin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block bg-white shadow-sm transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl"
                  >
                    {/* Clean photo — no text overlay */}
                    <div className="relative aspect-[4/3] overflow-hidden">
                      {home.photo && (
                        <Image
                          src={home.photo}
                          alt={`${home.street}, ${home.city} — staged by Greylyn Wayne`}
                          fill
                          sizes="(max-width: 768px) 100vw, 33vw"
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      )}
                    </div>
                    {/* High-contrast proof panel below the photo */}
                    <div className="p-7 text-center">
                      <p className="font-[family-name:var(--font-playfair)] text-5xl text-teal leading-none">
                        {bigNum}
                      </p>
                      <p className="text-charcoal text-[11px] font-semibold tracking-[0.25em] uppercase mt-2">
                        {bigUnit}
                      </p>
                      <div className="w-10 h-px bg-cream mx-auto my-4" />
                      <p className="text-charcoal text-sm font-medium">{home.street}</p>
                      <p className="text-charcoal-light text-xs mt-1">
                        {home.city}, {home.state}
                        {s.priceFmt ? ` · Sold ${s.priceFmt}` : ""}
                      </p>
                      <span className="inline-block text-teal text-[11px] tracking-[0.15em] uppercase mt-4 group-hover:text-teal-dark transition-colors">
                        View on Redfin →
                      </span>
                    </div>
                  </a>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Region sections */}
      {regions.map((group, idx) => (
        <section
          key={group.region}
          className={idx % 2 === 1 ? "py-16 lg:py-20 bg-warm" : "py-16 lg:py-20"}
        >
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="flex items-baseline justify-between mb-10 border-b border-gray-200 pb-4">
              <h2 className="font-[family-name:var(--font-playfair)] text-2xl md:text-3xl text-charcoal">
                {group.region}
              </h2>
              <span className="text-charcoal-light text-sm">
                {group.homes.length} {group.homes.length === 1 ? "home" : "homes"}
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
              {group.homes.map((home) => (
                <HomeCard key={home.ref} home={home} />
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* Note + design cross-link */}
      <section className="py-12 bg-warm border-t border-gray-200">
        <div className="mx-auto max-w-3xl px-6 lg:px-8 text-center">
          <p className="text-charcoal-light text-sm leading-relaxed">
            Listing photos and sale status are sourced from public real-estate
            listings and update on Redfin and Zillow. Looking for our luxury
            interior design and Street of Dreams work instead?{" "}
            <Link href="/portfolio" className="text-teal hover:text-teal-dark underline">
              See the design portfolio →
            </Link>
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 lg:py-32 text-center">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <h2 className="font-[family-name:var(--font-playfair)] text-3xl md:text-4xl text-charcoal mb-6">
            Staging Sells Homes Faster — and for More
          </h2>
          <p className="text-charcoal-light leading-relaxed mb-10">
            Join the hundreds of agents and homeowners across the Portland metro
            who trust Greylyn Wayne to make their listings unforgettable.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-teal text-white px-10 py-4 text-sm tracking-wider uppercase hover:bg-teal-dark transition-colors font-medium"
          >
            Get Your Free Staging Consultation
          </Link>
        </div>
      </section>
    </>
  );
}
