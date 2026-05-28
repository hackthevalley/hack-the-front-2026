import type { CSSProperties } from "react";

export type HorizontalBand = "left" | "center" | "right";
export type SceneAnchor = "left" | "center" | "right";

export type SceneImage = {
  id: string;
  src: string;
  left: number;
  top: number;
  width: number;
  height: number;
  band?: HorizontalBand;
  opacity?: number;
  zIndex?: number;
  wideFactor?: number;
  imageStyle?: CSSProperties;
};

export type Viewport = {
  width: number;
  height: number;
};
