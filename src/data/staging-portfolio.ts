import raw from "./staging-portfolio.json";

export type StagedHome = {
  ref: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  status: "renting" | "closed" | "destaged" | "installed" | string;
  installed_on: string | null;
  signed_total_cents: number | null;
  zillow: string;
  redfin: string;
  redfin_verified?: boolean;
  photo: string | null;
  beds_baths: { beds?: number; baths?: number; sqft?: number } | null;
  sale?: {
    status?: string;            // Active | Pending | Closed | Coming Soon
    price_cents?: number;       // sold price (if sold) or current asking
    price_label?: string;       // "Sold Price" | "Price" | "List Price"
    list_price_cents?: number;  // original list price
    dom?: number;               // days on market
    is_sold?: boolean;
    sold_date?: string;         // ISO yyyy-mm-dd
  } | null;
};

const SOLD_FAST_DAYS = 10;

export function money(cents?: number | null): string | null {
  if (!cents && cents !== 0) return null;
  const d = cents / 100;
  if (d >= 1_000_000) return `$${(d / 1_000_000).toFixed(2).replace(/\.?0+$/, "")}M`;
  if (d >= 1_000) return `$${Math.round(d / 1000)}K`;
  return `$${Math.round(d)}`;
}

export type SaleInfo = {
  isSold: boolean;
  soldFast: boolean;
  overAskCents: number | null;   // sold − list (positive = over ask)
  overAskPct: number | null;
  dom: number | null;
  priceFmt: string | null;       // sold price, or asking
  isAsking: boolean;             // price represents current asking (not sold)
  soldMonth: string | null;
};

export function saleInfo(h: StagedHome): SaleInfo {
  const s = h.sale ?? {};
  // Only count RECENT sales as sold — Redfin's "Last Sold Price" can be a 1995/2014
  // historical sale on a home that's actually on the market now. Require sold_date ≥ 2025,
  // or a current "Sold Price" label (Redfin's tag for a recent close) when date is absent.
  const isSold =
    !!s.is_sold &&
    (s.sold_date ? s.sold_date >= "2025-01-01" : s.price_label === "Sold Price");
  const price = s.price_cents ?? null;
  const list = s.list_price_cents ?? null;
  const overAskCents = isSold && price != null && list != null ? price - list : null;
  const overAskPct =
    overAskCents != null && list ? Math.round((overAskCents / list) * 1000) / 10 : null;
  const dom = s.dom ?? null;
  return {
    isSold,
    soldFast: isSold && dom != null && dom <= SOLD_FAST_DAYS,
    overAskCents,
    overAskPct,
    dom,
    priceFmt: money(price),
    isAsking: !isSold,
    soldMonth: s.sold_date ? stagedWhen(s.sold_date) : null,
  };
}

// City -> metro region, for grouping the showcase into sections.
const REGION_OF: Record<string, string> = {};
const REGIONS: { name: string; cities: string[] }[] = [
  { name: "Portland", cities: ["Portland"] },
  {
    name: "Westside & Valley",
    cities: [
      "Beaverton", "Hillsboro", "Tigard", "Tualatin", "Lake Oswego", "West Linn",
      "Wilsonville", "Sherwood", "Newberg", "Aloha", "Cornelius", "Forest Grove",
      "King City", "Durham",
    ],
  },
  {
    name: "East & Clackamas",
    cities: [
      "Milwaukie", "Happy Valley", "Oregon City", "Gresham", "Canby", "Damascus",
      "Clackamas", "Sandy", "Estacada", "Boring", "Troutdale", "Fairview",
    ],
  },
  {
    name: "SW Washington",
    cities: [
      "Vancouver", "Camas", "Ridgefield", "Washougal", "Battle Ground", "Orchards",
      "Amboy", "La Center", "Brush Prairie", "Hockinson", "Yacolt",
    ],
  },
];
for (const r of REGIONS) for (const c of r.cities) REGION_OF[c] = r.name;

// Ops-DB city values are occasionally dirty ("Vancouver WA 98686", "Washington 98686",
// "SANDY"). Normalize for both display and region grouping.
export function cleanCity(city: string, zip = ""): string {
  const z = zip ?? "";
  let s = (city ?? "")
    .replace(/\b(WA|OR|Washington|Oregon)\b/gi, "")
    .replace(/\d{5}/g, "")
    .replace(/[,\s]+/g, " ")
    .trim();
  if (!s) s = z.startsWith("986") ? "Vancouver" : (city ?? "").trim();
  return s
    .split(" ")
    .map((w) => (w ? w[0].toUpperCase() + w.slice(1).toLowerCase() : w))
    .join(" ");
}

export function regionFor(city: string): string {
  return REGION_OF[city] ?? "Greater Portland";
}

export type Tone = "live" | "sold" | "over" | "fast" | "new";

// Sale-aware pill. Prefers real Redfin sale data; falls back to GW staging status
// (renting = on market now; destaged/closed = sold).
export function pill(h: StagedHome): { label: string; tone: Tone } {
  const s = saleInfo(h);
  if (s.soldFast) return { label: `Sold in ${s.dom} ${s.dom === 1 ? "day" : "days"}`, tone: "fast" };
  if (s.isSold && s.overAskCents != null && s.overAskCents > 0)
    return { label: `Sold ${money(s.overAskCents)} over ask`, tone: "over" };
  if (s.isSold) return { label: "Sold", tone: "sold" };
  if (h.sale?.status === "Pending") return { label: "Sale Pending", tone: "new" };
  if (h.sale?.status === "Active" || h.status === "renting")
    return { label: "On the Market", tone: "live" };
  if (h.status === "installed") return { label: "Just Staged", tone: "new" };
  return { label: "Sold", tone: "sold" }; // destaged/closed without sale data
}

// Standout sales for the Featured strip. Guarantee the fast sales are represented
// (the speed story), then fill the rest with the biggest over-ask wins.
export function featuredHomes(limit = 6): StagedHome[] {
  const pool = homes
    .map((h) => ({ h, s: saleInfo(h) }))
    .filter(({ h, s }) => h.photo && s.isSold);

  const fast = pool
    .filter(({ s }) => s.soldFast)
    .sort((a, b) => (a.s.dom ?? 99) - (b.s.dom ?? 99));

  const overAsk = pool
    .filter(({ s }) => (s.overAskCents ?? 0) > 0 && !fast.includes({} as never))
    .sort((a, b) => (b.s.overAskCents ?? 0) - (a.s.overAskCents ?? 0));

  const picked: StagedHome[] = [];
  const seen = new Set<string>();
  // fast sales first, then biggest over-ask, dedup by ref
  for (const { h } of [...fast, ...overAsk]) {
    if (seen.has(h.ref)) continue;
    seen.add(h.ref);
    picked.push(h);
    if (picked.length >= limit) break;
  }
  return picked;
}

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
export function stagedWhen(iso: string | null): string | null {
  if (!iso) return null;
  const m = /^(\d{4})-(\d{2})/.exec(iso);
  if (!m) return null;
  return `${MONTHS[Number(m[2]) - 1]} ${m[1]}`;
}

// Normalize dirty city values once, up front, so grouping/stats/display all agree.
export const homes: StagedHome[] = (raw as StagedHome[]).map((h) => ({
  ...h,
  city: cleanCity(h.city, h.zip),
}));

// Sort newest-first, then group into regions (only regions that have homes).
export function groupedByRegion(): { region: string; homes: StagedHome[] }[] {
  const sorted = [...homes].sort((a, b) =>
    (b.installed_on ?? "").localeCompare(a.installed_on ?? "")
  );
  const order = [...REGIONS.map((r) => r.name), "Greater Portland"];
  const buckets = new Map<string, StagedHome[]>();
  for (const h of sorted) {
    const r = regionFor(h.city);
    if (!buckets.has(r)) buckets.set(r, []);
    buckets.get(r)!.push(h);
  }
  return order
    .filter((r) => buckets.has(r))
    .map((region) => ({ region, homes: buckets.get(region)! }));
}

const _sold = homes.map(saleInfo).filter((s) => s.isSold);
export const stats = {
  total: homes.length,
  onMarket: homes.filter(
    (h) => h.sale?.status === "Active" || (h.status === "renting" && !h.sale?.is_sold)
  ).length,
  cities: new Set(homes.map((h) => h.city)).size,
  sold: _sold.length,
  soldOverAsk: _sold.filter((s) => (s.overAskCents ?? 0) > 0).length,
  soldFast: _sold.filter((s) => s.soldFast).length,
};
