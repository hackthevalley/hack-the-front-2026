export type HomeBackgroundVisibleBounds = {
  imageWidth: number;
  imageHeight: number;
  left: number;
  top: number;
  width: number;
  height: number;
};

export type HomeBackgroundTwinkle = {
  duration: string;
  delay: string;
};

export type HomeBackgroundSway = {
  duration: string;
  delay: string;
  angle: string;
  origin: string;
};

export type HomeBackgroundLayer = {
  id: string;
  src: string;
  left: number;
  top: number;
  width: number;
  height: number;
  zIndex?: number;
  preserveAspectRatio?: boolean;
  rotation?: number;
  visibleBounds?: HomeBackgroundVisibleBounds;
  twinkle?: HomeBackgroundTwinkle;
  sway?: HomeBackgroundSway;
};
