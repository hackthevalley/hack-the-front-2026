import {
  GRID_COLUMNS_SHELF_1,
  GRID_COLUMNS_SHELF_2,
  GRID_COLUMNS_SHELF_3,
} from "./background/layers";
import type { TeamJarSlot } from "./types";

// Each shelf has its own 9-column grid (GRID_COLUMNS_SHELF_1/2/3 in
// background/layers.ts) — that's the single source of truth for x-position,
// referenced here by column index. Colors follow the grid column's parity
// (odd=teal, even=pink), not a simple "skip the gap" alternation — verified
// against Figma screenshots of each shelf (see the comment above the grids).
// `member` is left undefined until real headshots/names are provided —
// empty jars render the jar art's own baked-in placeholder circle.
export const jarSlots: readonly TeamJarSlot[] = [
  // Shelf 1 — columns 1-4,6-9 (skull takes column 5)
  { id: "shelf-1-jar-1", left: GRID_COLUMNS_SHELF_1[0], top: 264, color: "teal" },
  { id: "shelf-1-jar-2", left: GRID_COLUMNS_SHELF_1[1], top: 261.84, color: "pink" },
  { id: "shelf-1-jar-3", left: GRID_COLUMNS_SHELF_1[2], top: 261.84, color: "teal" },
  { id: "shelf-1-jar-4", left: GRID_COLUMNS_SHELF_1[3], top: 260, color: "pink" },
  { id: "shelf-1-jar-5", left: GRID_COLUMNS_SHELF_1[5], top: 261.84, color: "pink" },
  { id: "shelf-1-jar-6", left: GRID_COLUMNS_SHELF_1[6], top: 264, color: "teal" },
  { id: "shelf-1-jar-7", left: GRID_COLUMNS_SHELF_1[7], top: 263.99, color: "pink" },
  { id: "shelf-1-jar-8", left: GRID_COLUMNS_SHELF_1[8], top: 263.99, color: "teal" },

  // Shelf 2 — columns 1-2,4-7,9 (crystal takes column 3, plant takes column 8)
  { id: "shelf-2-jar-1", left: GRID_COLUMNS_SHELF_2[0], top: 514, color: "teal" },
  { id: "shelf-2-jar-2", left: GRID_COLUMNS_SHELF_2[1], top: 515.84, color: "pink" },
  { id: "shelf-2-jar-3", left: GRID_COLUMNS_SHELF_2[3], top: 514, color: "pink" },
  { id: "shelf-2-jar-4", left: GRID_COLUMNS_SHELF_2[4], top: 514, color: "teal" },
  { id: "shelf-2-jar-5", left: GRID_COLUMNS_SHELF_2[5], top: 518, color: "pink" },
  { id: "shelf-2-jar-6", left: GRID_COLUMNS_SHELF_2[6], top: 517.998, color: "teal" },
  { id: "shelf-2-jar-7", left: GRID_COLUMNS_SHELF_2[8], top: 516, color: "teal" },

  // Shelf 3 — columns 1-3,5-8 (mushroom takes column 4, skull takes column 9)
  { id: "shelf-3-jar-1", left: GRID_COLUMNS_SHELF_3[0], top: 769.998, color: "teal" },
  { id: "shelf-3-jar-2", left: GRID_COLUMNS_SHELF_3[1], top: 769.84, color: "pink" },
  { id: "shelf-3-jar-3", left: GRID_COLUMNS_SHELF_3[2], top: 769.84, color: "teal" },
  { id: "shelf-3-jar-4", left: GRID_COLUMNS_SHELF_3[4], top: 771.997, color: "teal" },
  { id: "shelf-3-jar-5", left: GRID_COLUMNS_SHELF_3[5], top: 770.999, color: "pink" },
  { id: "shelf-3-jar-6", left: GRID_COLUMNS_SHELF_3[6], top: 772, color: "teal" },
  { id: "shelf-3-jar-7", left: GRID_COLUMNS_SHELF_3[7], top: 770.999, color: "pink" },
] as const;
