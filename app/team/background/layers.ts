import type { PropId } from "../types";
import type { TeamLayer } from "./types";

export const TEAM_DESIGN_WIDTH = 1512;
export const TEAM_DESIGN_HEIGHT = 1073;

export const JAR_WIDTH = 127;
export const JAR_HEIGHT = 149;

export const JAR_AVATAR_INSET = {
  leftFraction: (64.0264 - 38.6307) / 127,
  topFraction: (91.5272 - 38.6307) / 149,
  widthFraction: (38.6307 * 2) / 127,
  heightFraction: (38.6307 * 2) / 149,
};

export const JAR_SRC_BY_COLOR = {
  teal: "/teams/assets/teal-potion.svg",
  pink: "/teams/assets/pink-potion.svg",
} as const;

export const SHELF_SRC = "/teams/assets/shelf.svg";
export const SHELF_HEIGHT = 71;
export const SHELF_TOPS = [374.9, 628.9, 882.9];
const SHELF_Z_INDEX = 2;

const shelfMidpoints = [
  (SHELF_TOPS[0] + SHELF_TOPS[1]) / 2,
  (SHELF_TOPS[1] + SHELF_TOPS[2]) / 2,
];
export const SHELF_ROW_BANDS = [
  { top: 0, height: shelfMidpoints[0] },
  { top: shelfMidpoints[0], height: shelfMidpoints[1] - shelfMidpoints[0] },
  { top: shelfMidpoints[1], height: TEAM_DESIGN_HEIGHT - shelfMidpoints[1] },
];

export const BACKGROUND_GLOW = {
  left: 32,
  top: 31,
  width: 1448,
  height: 1015,
  background:
    "radial-gradient(50% 50% at 50% 50%, #1C2C95 0%, #160B3F 69.71%, #040815 100%)",
};

export const EDGE_VIGNETTE = {
  left: -3,
  top: -5,
  width: 1515,
  height: 1078,
  background:
    "linear-gradient(270deg, #040815 0%, rgba(4, 8, 21, 0) 25%, rgba(4, 8, 21, 0) 50%, rgba(4, 8, 21, 0) 75%, #040815 100%)",
};

const SHELF_COLUMN_MARGIN = 14;

export const SHELF_COLUMN_STEP = 169;

export function getShelfRowWidth(columnCount: number): number {
  return columnCount * SHELF_COLUMN_STEP;
}

export function getShelfColumns(columnCount: number): number[] {
  return Array.from({ length: columnCount }, (_, index) => SHELF_COLUMN_MARGIN + index * SHELF_COLUMN_STEP);
}

export const teamLayers: readonly TeamLayer[] = SHELF_TOPS.map(
  (top, index): TeamLayer => ({
    id: `shelf-${index + 1}`,
    src: SHELF_SRC,
    left: 0,
    top,
    width: TEAM_DESIGN_WIDTH,
    height: SHELF_HEIGHT,
    zIndex: SHELF_Z_INDEX,
  }),
);

export const JAR_TOP_OFFSET = -112.5;

export const PROP_ASSETS: Record<PropId, { src: string; width: number; height: number; topOffset: number }> = {
  skull: { src: "/teams/assets/skull.svg", width: 147, height: 144, topOffset: -102.4 },
  crystal: { src: "/teams/assets/crystal.svg", width: 160, height: 100, topOffset: -68.9 },
  pottedPlant: { src: "/teams/assets/potted-plant.svg", width: 155, height: 196, topOffset: -165.9 },
  smallMushroom: { src: "/teams/assets/small-mushroom.svg", width: 164, height: 162, topOffset: -116.9 },
};
