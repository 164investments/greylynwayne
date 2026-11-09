import type { RoomPage } from "./rooms/_schema";
import livingRoom from "./rooms/living-room.json";
import kitchen from "./rooms/kitchen.json";
import bedroom from "./rooms/bedroom.json";
import bathroom from "./rooms/bathroom.json";
import diningRoom from "./rooms/dining-room.json";
import homeOffice from "./rooms/home-office.json";
import outdoorLiving from "./rooms/outdoor-living.json";
import basement from "./rooms/basement.json";
import entryway from "./rooms/entryway.json";

/** Built room pages, in "Rooms We Design" order. Add a room = JSON + 1 line. */
export const roomPages = [
  livingRoom,
  kitchen,
  bedroom,
  bathroom,
  diningRoom,
  homeOffice,
  outdoorLiving,
  basement,
  entryway,
] as RoomPage[];

// The hero answer must stay on two lines at 393px so Text Us is on the first phone screen.
for (const r of roomPages) {
  if (r.answer.length > 85) throw new Error(`rooms/${r.slug}.json: answer is ${r.answer.length} chars (max 85)`);
}

export function getRoomBySlug(slug: string): RoomPage | undefined {
  return roomPages.find((r) => r.slug === slug);
}

/** Every room Greylyn Wayne designs; `slug` links it once its page exists. */
export const designRooms: { name: string; slug?: string }[] = [
  "Living Room",
  "Kitchen",
  "Bedroom",
  "Bathroom",
  "Dining Room",
  "Home Office",
  "Outdoor Living",
  "Nursery & Kids",
  "Basement",
  "Entryway",
].map((name) => ({ name, slug: roomPages.find((r) => r.room === name)?.slug }));
