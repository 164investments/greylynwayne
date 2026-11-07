// Room design page content model (/interior-design/<slug>).
//
// One JSON file per room in this folder, registered in ../rooms.ts. Pages are
// a skimmable guide layer: picks with labels, a sourced numbers
// table, real project photos, FAQ. Never fabricate stats: every number in
// `numbers.rows` must appear in one of `numbers.sources`, and `factChecks` records the
// verbatim source text each number was checked against before publishing.

import type { FAQ } from "../blog/_schema";

/** Floor-plan line drawings available to `picks.items[].plan` (RoomPlan.tsx). */
export type PlanKind = "galley" | "l-shape" | "u-shape" | "island" | "peninsula" | "one-wall";

export interface RoomPage {
  slug: string;
  /** Short room name, as in the "Rooms We Design" list on /interior-design. */
  room: string;
  /** H1, e.g. "Kitchen Design in Portland". */
  title: string;
  metaTitle: string;
  metaDescription: string;
  /** Primary keyword this page targets (for our reference, not rendered). */
  targetKeyword: string;
  /** Hero subtitle: the direct answer, 85 characters or fewer (checked in rooms.ts). */
  answer: string;
  /** Real Greylyn Wayne project photo (never generated). */
  hero: { src: string; alt: string };
  picks: {
    heading: string;
    items: { name: string; plan?: PlanKind; bestFor: string; watchFor: string }[];
  };
  numbers: {
    heading: string;
    rows: { label: string; value: string }[];
    sources: { label: string; url: string }[];
  };
  /** Generated teaching illustration, always captioned as an illustration. */
  art: { src: string; alt: string; caption: string };
  /** Real project photos; caption says what Greylyn Wayne did there. */
  photos: { src: string; alt: string; caption: string; href: string }[];
  faqs: FAQ[];
  /** Verbatim source quotes backing each number (checked, not rendered). */
  factChecks: { claim: string; quote: string; url: string }[];
}
