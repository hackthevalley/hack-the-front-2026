import type { TeamLayer } from "./types";

export const TEAM_DESIGN_WIDTH = 1512;
export const TEAM_DESIGN_HEIGHT = 1073;

// Jar footprint is identical for every slot — matches the flattened asset's
// own viewBox (127x149) exactly, so the avatar circle below lines up with no
// distortion or white showing around the edge.
export const JAR_WIDTH = 127;
export const JAR_HEIGHT = 149;

// Avatar circle position/size as a fraction of the jar's own box, read
// directly off the white <circle> baked into teal-potion.svg/pink-potion.svg
// (cx=64.0264, cy=91.5272, r=38.6307 within the 127x149 viewBox).
export const JAR_AVATAR_INSET = {
  leftFraction: (64.0264 - 38.6307) / 127,
  topFraction: (91.5272 - 38.6307) / 149,
  widthFraction: (38.6307 * 2) / 127,
  heightFraction: (38.6307 * 2) / 149,
};

// Only two jar colors appear in the design — every jar reuses one of these
// two flattened assets.
export const JAR_SRC_BY_COLOR = {
  teal: "/teams/assets/teal-potion.svg",
  pink: "/teams/assets/pink-potion.svg",
} as const;

export const SHELF_SRC = "/teams/assets/shelf.svg";
export const SHELF_HEIGHT = 71;
export const SHELF_TOPS = [374.9, 628.9, 882.9];
const SHELF_Z_INDEX = 2;

// Rendered as a CSS radial-gradient rather than background-glow.svg — exact
// values/gradient stops from the Figma inspect panel.
export const BACKGROUND_GLOW = {
  left: 32,
  top: 31,
  width: 1448,
  height: 1015,
  background:
    "radial-gradient(50% 50% at 50% 50%, #1C2C95 0%, #160B3F 69.71%, #040815 100%)",
};

// Decorative props render above the jars (zIndex 4 in TeamOverlays) — in
// Figma these are later siblings that paint on top.
const PROP_Z_INDEX = 6;

// Edge vignette (Figma "Rectangle 255") — darkens the left/right edges of
// the whole scene. Slightly overhangs the frame (negative left/top) and
// sits above everything else. Exact values/gradient from Figma inspect.
export const EDGE_VIGNETTE = {
  left: -3,
  top: -5,
  width: 1515,
  height: 1078,
  background:
    "linear-gradient(270deg, #040815 0%, rgba(4, 8, 21, 0) 25%, rgba(4, 8, 21, 0) 50%, rgba(4, 8, 21, 0) 75%, #040815 100%)",
};

// Each shelf has its own 9-column grid (all three happen to line up today,
// but can diverge independently). Verified against Figma screenshots of
// each shelf group (1255:2640, 1255:2864, 1255:3057) — columns are
// 1-indexed below, odd columns are teal jars, even are pink, and props
// simply occupy a column without breaking that parity:
//   Shelf 1: teal,pink,teal,pink,SKULL,pink,teal,pink,teal
//   Shelf 2: teal,pink,CRYSTAL,pink,teal,pink,teal,PLANT,teal
//   Shelf 3: teal,pink,teal,MUSHROOM,teal,pink,teal,pink,SKULL
export const GRID_COLUMNS_SHELF_1 = [
  14, 183.16, 352.02, 520.88, 678, 872, 1041, 1210, 1379,
];
export const GRID_COLUMNS_SHELF_2 = [
  14, 183.16, 335, 520.88, 689.75, 859, 1028, 1193, 1379,
];
export const GRID_COLUMNS_SHELF_3 = [
  13, 182.16, 351.02, 495.38, 689, 858, 1027, 1196, 1352,
];

export const teamLayers: readonly TeamLayer[] = [
  ...SHELF_TOPS.map(
    (top, index): TeamLayer => ({
      id: `shelf-${index + 1}`,
      src: SHELF_SRC,
      left: 0,
      top,
      width: TEAM_DESIGN_WIDTH,
      height: SHELF_HEIGHT,
      zIndex: SHELF_Z_INDEX,
    }),
  ),
  {
    // Shelf 1, column 5
    id: "skull-shelf-1",
    src: "/teams/assets/skull.svg",
    left: GRID_COLUMNS_SHELF_1[4],
    top: 273,
    width: 147,
    height: 144,
    zIndex: PROP_Z_INDEX,
  },
  {
    // Shelf 2, column 3
    id: "crystal-shelf-2",
    src: "/teams/assets/crystal.svg",
    left: GRID_COLUMNS_SHELF_2[2],
    top: 560,
    width: 160,
    height: 100,
    zIndex: PROP_Z_INDEX,
  },
  {
    // Shelf 2, column 8
    id: "potted-plant-shelf-2",
    src: "/teams/assets/potted-plant.svg",
    left: GRID_COLUMNS_SHELF_2[7],
    top: 463,
    width: 155,
    height: 196,
    zIndex: PROP_Z_INDEX,
  },
  {
    // Shelf 3, column 9 — rightmost.
    id: "skull-shelf-3",
    src: "/teams/assets/skull.svg",
    left: GRID_COLUMNS_SHELF_3[8],
    top: 780,
    width: 147,
    height: 144,
    zIndex: PROP_Z_INDEX,
  },
  {
    // Shelf 3, column 4
    id: "small-mushroom-shelf-3",
    src: "/teams/assets/small-mushroom.svg",
    left: GRID_COLUMNS_SHELF_3[3],
    top: 766,
    width: 164,
    height: 162,
    zIndex: PROP_Z_INDEX,
  },
] as const;
