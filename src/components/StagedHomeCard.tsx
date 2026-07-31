import Image from "next/image";
import {
  pill,
  saleInfo,
  money,
  stagedWhen,
  type StagedHome,
  type Tone,
} from "@/data/staging-portfolio";

const TONE: Record<Tone, string> = {
  over: "bg-teal text-white", // sold over ask — the hero stat
  fast: "bg-teal text-white", // sold fast
  sold: "bg-charcoal text-white",
  live: "bg-white/95 text-charcoal", // on the market
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

export default function StagedHomeCard({ home }: { home: StagedHome }) {
  const status = pill(home);
  const when = stagedWhen(home.installed_on);
  const sale = saleLine(home);
  const bb = home.beds_baths;
  const specs = bb
    ? [
        bb.beds ? `${bb.beds} bd` : null,
        bb.baths ? `${bb.baths} ba` : null,
        bb.sqft ? `${bb.sqft.toLocaleString()} sqft` : null,
      ]
        .filter(Boolean)
        .join(" · ")
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
        {sale ? <p className="text-teal text-sm font-medium mt-1.5">{sale}</p> : null}
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
