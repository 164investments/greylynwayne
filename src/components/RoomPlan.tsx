import type { PlanKind } from "@/data/rooms/_schema";

// Top-down floor-plan line drawings for the room layout picks. One grid
// (120x90), one stroke weight, brand tokens only. Counters are drawn 12 units
// deep; walls are the outer line, with the doorway left open at the bottom.
const C = 12; // counter depth
type R = [number, number, number, number]; // x, y, w, h

const counters: Record<PlanKind, R[]> = {
  galley: [[8, 8, 104, C], [8, 70, 104, C]],
  "l-shape": [[8, 8, 104, C], [8, 8 + C, C, 52]],
  "u-shape": [[8, 8, 104, C], [8, 8 + C, C, 46], [100, 8 + C, C, 46]],
  island: [[8, 8, 104, C], [8, 8 + C, C, 40], [38, 44, 46, 16]],
  peninsula: [[8, 8, 104, C], [70, 8 + C, C, 44]], // leg projects into the room, free end
  "one-wall": [[8, 8, 104, C]],
};

export default function RoomPlan({ kind, className = "" }: { kind: PlanKind; className?: string }) {
  // A galley is a corridor open at both ends (short wall returns mark the
  // openings); every other plan is a room with a doorway in the bottom wall.
  const walls =
    kind === "galley"
      ? "M4 16 V4 H116 V16 M4 74 V86 H116 V74"
      : "M48 86 H4 V4 H116 V86 H76";
  return (
    <svg viewBox="0 0 120 90" className={className} aria-hidden="true" focusable="false">
      <path d={walls} fill="none" strokeWidth={2} strokeLinecap="square" className="stroke-charcoal" />
      {counters[kind].map(([x, y, w, h], i) => (
        <rect key={i} x={x} y={y} width={w} height={h} strokeWidth={1.25} className="fill-teal-light stroke-charcoal-light" />
      ))}
    </svg>
  );
}
