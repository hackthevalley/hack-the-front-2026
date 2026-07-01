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
] as const;
