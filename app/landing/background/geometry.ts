import {
  CORE_ASPECT_RATIO,
  FOCAL_X,
  FRAME_HEIGHT,
  FRAME_WIDTH,
  MAX_SCENE_ASPECT_RATIO,
  WIDE_FOCAL_X,
  WIDE_FRAME_HEIGHT,
  WIDE_FRAME_WIDTH,
  WIDE_FRONT_SWAP_RATIO,
  WIDE_WATER_SWAP_RATIO,
} from "./constants";
import type { SceneAnchor, SceneImage, Viewport } from "./types";

export type SceneLayout = {
  scale: number | null;
  wideScale: number | null;
  layoutViewportWidth: number | null;
  coreSceneWidth: number | null;
  extraWidth: number;
  viewportAspectRatio: number;
  coreSceneLeft: number | string;
  wideSceneLeft: number | string;
  coreSceneRenderWidth: number | string;
  wideSceneRenderWidth: number | string;
  showWideFrontScene: boolean;
  showWideWaterScene: boolean;
  /** Horizontal scale so the composed scene fills viewports wider than the art. */
  sceneCoverScaleX: number;
};

export const px = (value: number) => `${value}px`;

export function getViewport(): Viewport {
  return {
    width: window.innerWidth,
    height: window.innerHeight,
  };
}

export function getWideShift(image: SceneImage, extraWidth: number) {
  if (extraWidth <= 0) {
    return 0;
  }

  const factor = image.wideFactor ?? 1;

  if (image.band === "left") {
    return -(extraWidth / 2) * factor;
  }

  if (image.band === "right") {
    return (extraWidth / 2) * factor;
  }

  return 0;
}

export function getSceneLayerLeft(
  anchor: SceneAnchor,
  sceneWidth: number | string,
  centeredLeft: number | string,
  layerViewportWidth: number | null,
) {
  if (anchor === "center") {
    return centeredLeft;
  }

  if (typeof sceneWidth !== "number" || layerViewportWidth === null) {
    return anchor === "left" ? 0 : "calc(100vw - 100%)";
  }

  if (anchor === "left") {
    return 0;
  }

  return layerViewportWidth - sceneWidth;
}

function getScale(viewport: Viewport | null, frameHeight: number) {
  return viewport ? viewport.height / frameHeight : null;
}

function getLayoutViewportWidth(viewport: Viewport | null) {
  return viewport
    ? Math.min(viewport.width, viewport.height * MAX_SCENE_ASPECT_RATIO)
    : null;
}

function getSceneWidth(scale: number | null, frameWidth: number, frameHeight: number) {
  return scale !== null
    ? frameWidth * scale
    : `calc(100dvh * ${frameWidth} / ${frameHeight})`;
}

function getExtraWidth(
  layoutViewportWidth: number | null,
  coreSceneWidth: number | null,
) {
  return layoutViewportWidth && coreSceneWidth && layoutViewportWidth > coreSceneWidth
    ? layoutViewportWidth - coreSceneWidth
    : 0;
}

function getViewportAspectRatio(
  layoutViewportWidth: number | null,
  viewport: Viewport | null,
) {
  return layoutViewportWidth && viewport
    ? layoutViewportWidth / viewport.height
    : CORE_ASPECT_RATIO;
}

function getSceneLeft(
  layoutViewportWidth: number | null,
  scale: number | null,
  focalX: number,
  frameHeight: number,
) {
  return layoutViewportWidth && scale
    ? layoutViewportWidth / 2 - focalX * scale
    : `calc(50vw - (100dvh * ${focalX} / ${frameHeight}))`;
}

function getSceneCoverScaleX(
  viewport: Viewport | null,
  layoutViewportWidth: number | null,
) {
  return viewport !== null && layoutViewportWidth !== null && layoutViewportWidth > 0
    ? viewport.width / layoutViewportWidth
    : 1;
}

export function getSceneLayout(viewport: Viewport | null): SceneLayout {
  const scale = getScale(viewport, FRAME_HEIGHT);
  const wideScale = getScale(viewport, WIDE_FRAME_HEIGHT);
  const layoutViewportWidth = getLayoutViewportWidth(viewport);
  const coreSceneWidth = scale ? FRAME_WIDTH * scale : null;
  const extraWidth = getExtraWidth(layoutViewportWidth, coreSceneWidth);
  const viewportAspectRatio = getViewportAspectRatio(layoutViewportWidth, viewport);
  const coreSceneLeft = getSceneLeft(
    layoutViewportWidth,
    scale,
    FOCAL_X,
    FRAME_HEIGHT,
  );
  const wideSceneLeft = getSceneLeft(
    layoutViewportWidth,
    wideScale,
    WIDE_FOCAL_X,
    WIDE_FRAME_HEIGHT,
  );

  return {
    scale,
    wideScale,
    layoutViewportWidth,
    coreSceneWidth,
    extraWidth,
    viewportAspectRatio,
    coreSceneLeft,
    wideSceneLeft,
    coreSceneRenderWidth: getSceneWidth(scale, FRAME_WIDTH, FRAME_HEIGHT),
    wideSceneRenderWidth: getSceneWidth(
      wideScale,
      WIDE_FRAME_WIDTH,
      WIDE_FRAME_HEIGHT,
    ),
    showWideFrontScene: viewportAspectRatio >= WIDE_FRONT_SWAP_RATIO,
    showWideWaterScene: viewportAspectRatio >= WIDE_WATER_SWAP_RATIO,
    sceneCoverScaleX: getSceneCoverScaleX(viewport, layoutViewportWidth),
  };
}
