export type FaqThemesScenePlane = "rear" | "foreground";

export type FaqThemesVisibleBounds = {
  imageWidth: number;
  imageHeight: number;
  left: number;
  top: number;
  width: number;
  height: number;
};

export type FaqThemesPulse = {
  duration: string;
  delay: string;
  min: number;
  glow: string;
  color: string;
};

export type FaqThemesSceneLayer = {
  id: string;
  figmaId: string;
  figmaName: string;
  src: string;
  left: number;
  top: number;
  width: number;
  height: number;
  zIndex: number;
  plane: FaqThemesScenePlane;
  rotation?: number;
  visibleBounds?: FaqThemesVisibleBounds;
  pulse?: FaqThemesPulse;
};

