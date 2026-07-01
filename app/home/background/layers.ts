import type { HomeBackgroundLayer } from "./types";

export const HOME_BACKGROUND_DESIGN_WIDTH = 1512;
export const HOME_BACKGROUND_DESIGN_HEIGHT = 2713;

export const homeBackgroundLayers: readonly HomeBackgroundLayer[] = [
  {
    id: "about-ground",
    src: "/home/background/about-ground.png",
    left: -21.05,
    top: 988.97,
    width: 1554.0987548828125,
    height: 1873.12841796875,
    zIndex: 0,
  },
  {
    id: "first-stump",
    src: "/home/background/first-stump.png",
    left: 240.5283,
    top: 1641.627,
    width: 595.5572,
    height: 374.026,
    zIndex: 1,
    visibleBounds: {
      imageWidth: 796,
      imageHeight: 475,
      left: 103,
      top: 0,
      width: 587,
      height: 390,
    },
  },
  {
    id: "second-stump",
    src: "/home/background/second-stump.png",
    left: 848.544,
    top: 1808.6274,
    width: 462.9641,
    height: 348.2333,
    zIndex: 1,
    visibleBounds: {
      imageWidth: 573,
      imageHeight: 405,
      left: 53,
      top: 0,
      width: 469,
      height: 359,
    },
  },
  {
    id: "third-stump",
    src: "/home/background/third-stump.png",
    left: 370.6692,
    top: 2021.2324,
    width: 554.6922,
    height: 382.9829,
    zIndex: 1,
    visibleBounds: {
      imageWidth: 626,
      imageHeight: 450,
      left: 14,
      top: 9,
      width: 552,
      height: 387,
    },
  },
] as const;
