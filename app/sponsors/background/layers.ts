export const SPONSORS_DESIGN_WIDTH = 1512;
export const SPONSORS_DESIGN_HEIGHT = 2582;

/**
 * The background export includes artwork that extends beyond the Figma frame.
 * Its SVG origin is 237 design pixels to the left of the frame origin.
 */
export const SPONSORS_BACKGROUND_LAYER = {
  src: "/sponsors/background/sponsors-background.svg",
  left: -237,
  top: 0,
  width: 2157,
  height: 2755,
} as const;

export const SPONSORS_TEAM_WAVE_LAYER = {
  src: "/sponsors/background/team-wave.svg",
  left: -49.39,
  top: 8434.63 - 6223,
  width: 1691.67,
  height: 373.55,
  rotation: 2.16,
} as const;
