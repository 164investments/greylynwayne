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
};

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

export function regionFor(city: string): string {
  return REGION_OF[city] ?? "Greater Portland";
}

// Friendly sales-status framing. GW "renting" = furniture in place, home on market now;
// destaged/closed = job complete, home sold. Live status is always one click away on Redfin/Zillow.
export function statusLabel(status: string): { label: string; tone: "live" | "sold" | "new" } {
  if (status === "renting") return { label: "On the Market", tone: "live" };
  if (status === "installed") return { label: "Just Staged", tone: "new" };
  return { label: "Sold", tone: "sold" }; // destaged | closed
}

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
export function stagedWhen(iso: string | null): string | null {
  if (!iso) return null;
  const m = /^(\d{4})-(\d{2})/.exec(iso);
  if (!m) return null;
  return `${MONTHS[Number(m[2]) - 1]} ${m[1]}`;
}

export const homes = raw as StagedHome[];

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

export const stats = {
  total: homes.length,
  onMarket: homes.filter((h) => h.status === "renting").length,
  cities: new Set(homes.map((h) => h.city)).size,
};
