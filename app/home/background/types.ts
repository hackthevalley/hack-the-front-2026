export type HomeBackgroundVisibleBounds = {
  imageWidth: number;
  imageHeight: number;
  left: number;
  top: number;
  width: number;
  height: number;
};

export type HomeBackgroundLayer = {
  id: string;
  src: string;
  left: number;
  top: number;
  width: number;
  height: number;
  zIndex?: number;
  visibleBounds?: HomeBackgroundVisibleBounds;
};
