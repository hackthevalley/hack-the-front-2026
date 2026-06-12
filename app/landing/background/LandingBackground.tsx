"use client";

import { useEffect, useState, type CSSProperties } from "react";
import { CORE_WATER_STACK_Z_INDEX } from "./constants";
import {
  coreSceneImages,
  wideBackSceneImages,
  wideFrontCenterSceneImages,
  wideFrontRightSceneImages,
  wideMidSceneImages,
  wideSkySceneImages,
  wideWaterMidSceneImages,
  wideWaterTopSceneImages,
} from "./data";
import {
  getSceneLayerLeft,
  getSceneLayout,
  getViewport,
  getWideShift,
  px,
} from "./geometry";
import {
  CORE_WIDE_SKY_SWAP_IDS,
  CORE_WIDE_SWAP_IDS,
  CORE_WIDE_WATER_SWAP_IDS,
} from "./rules";
import type { SceneAnchor, SceneImage, Viewport } from "./types";

export default function LandingBackground() {
  const [viewport, setViewport] = useState<Viewport | null>(null);

  useEffect(() => {
    const updateViewport = () => {
      setViewport(getViewport());
    };

    updateViewport();
    window.addEventListener("resize", updateViewport);

    return () => {
      window.removeEventListener("resize", updateViewport);
    };
  }, []);

  const {
    scale,
    wideScale,
    layoutViewportWidth,
    extraWidth,
    coreSceneLeft,
    wideSceneLeft,
    coreSceneRenderWidth,
    wideSceneRenderWidth,
    showWideFrontScene,
    showWideWaterScene,
    sceneCoverScaleX,
  } = getSceneLayout(viewport);
  const renderedCoreSceneImages = coreSceneImages.map((image) => {
    const opacity = image.opacity ?? 1;

    if (CORE_WIDE_SKY_SWAP_IDS.has(image.id) && showWideFrontScene) {
      return { ...image, opacity: 0 };
    }

    if (CORE_WIDE_SWAP_IDS.has(image.id) && showWideFrontScene) {
      return { ...image, opacity: 0 };
    }

    if (CORE_WIDE_WATER_SWAP_IDS.has(image.id) && showWideWaterScene) {
      return { ...image, opacity: 0 };
    }

    return { ...image, opacity };
  });
  const renderedCoreUnderWaterSceneImages = renderedCoreSceneImages.filter(
    (image) => (image.zIndex ?? 0) < CORE_WATER_STACK_Z_INDEX,
  );
  const renderedCoreOverWaterSceneImages = renderedCoreSceneImages.filter(
    (image) => (image.zIndex ?? 0) >= CORE_WATER_STACK_Z_INDEX,
  );

  const renderSceneLayer = (
    images: readonly SceneImage[],
    sceneLeft: number | string,
    sceneWidth: number | string,
    imageScale: number,
    pullApart = false,
    layerZIndex?: number,
    layerStyle?: CSSProperties,
    anchor: SceneAnchor = "center",
    layerViewportWidth: number | null = layoutViewportWidth ?? viewport?.width ?? null,
  ) => (
    <div
      className="absolute left-0 top-0"
      style={{
        left: (() => {
          const anchoredLeft = getSceneLayerLeft(
            anchor,
            sceneWidth,
            sceneLeft,
            layerViewportWidth,
          );

          return typeof anchoredLeft === "number" ? px(anchoredLeft) : anchoredLeft;
        })(),
        width: typeof sceneWidth === "number" ? px(sceneWidth) : sceneWidth,
        height: viewport !== null ? px(viewport.height) : "100dvh",
        zIndex: layerZIndex,
        ...layerStyle,
      }}
    >
      {images.map((image) => {
        const wideShift = pullApart ? getWideShift(image, extraWidth) : 0;

        return (
          <div
            key={image.id}
            className="absolute"
            style={{
              left: px(image.left * imageScale + wideShift),
              top: px(image.top * imageScale),
              width: px(image.width * imageScale),
              height: px(image.height * imageScale),
              opacity: image.opacity ?? 1,
              zIndex: image.zIndex ?? 0,
            }}
          >
            <img
              src={image.src}
              alt=""
              draggable="false"
              className="h-full w-full max-w-none select-none"
              style={image.imageStyle}
            />
          </div>
        );
      })}
    </div>
  );

  const renderSceneStacks = () => (
    <>
      {wideSkySceneImages.length > 0 && showWideFrontScene
        ? renderSceneLayer(
            wideSkySceneImages,
            wideSceneLeft,
            wideSceneRenderWidth,
            wideScale ?? 1,
            false,
            0,
            undefined,
            "center",
          )
        : null}
      {wideBackSceneImages.length > 0
        ? renderSceneLayer(
            wideBackSceneImages,
            wideSceneLeft,
            wideSceneRenderWidth,
            wideScale ?? 1,
            false,
            0,
            undefined,
            "center",
          )
        : null}
      {renderSceneLayer(
        renderedCoreUnderWaterSceneImages,
        coreSceneLeft,
        coreSceneRenderWidth,
        scale ?? 1,
        true,
        1,
        undefined,
        "center",
      )}
      {wideMidSceneImages.length > 0 && showWideFrontScene
        ? renderSceneLayer(
            wideMidSceneImages,
            wideSceneLeft,
            wideSceneRenderWidth,
            wideScale ?? 1,
            false,
            2,
            undefined,
            "left",
          )
        : null}
      {wideWaterMidSceneImages.length > 0 && showWideWaterScene
        ? renderSceneLayer(
            wideWaterMidSceneImages,
            wideSceneLeft,
            wideSceneRenderWidth,
            wideScale ?? 1,
            false,
            2.5,
            undefined,
            "left",
          )
        : null}
      {renderSceneLayer(
        renderedCoreOverWaterSceneImages,
        coreSceneLeft,
        coreSceneRenderWidth,
        scale ?? 1,
        true,
        3,
        undefined,
        "center",
      )}
      {wideWaterTopSceneImages.length > 0 && showWideWaterScene
        ? renderSceneLayer(
            wideWaterTopSceneImages,
            wideSceneLeft,
            wideSceneRenderWidth,
            wideScale ?? 1,
            false,
            3.5,
            undefined,
            "left",
          )
        : null}
      {wideFrontCenterSceneImages.length > 0 && showWideFrontScene
        ? renderSceneLayer(
            wideFrontCenterSceneImages,
            wideSceneLeft,
            wideSceneRenderWidth,
            wideScale ?? 1,
            false,
            4,
            undefined,
            "center",
          )
        : null}
      {wideFrontRightSceneImages.length > 0 && showWideFrontScene
        ? renderSceneLayer(
            wideFrontRightSceneImages,
            wideSceneLeft,
            wideSceneRenderWidth,
            wideScale ?? 1,
            false,
            4,
            undefined,
            "right",
          )
        : null}
    </>
  );

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
    >
      <div
        className="absolute left-1/2 top-0"
        style={{
          width:
            layoutViewportWidth !== null
              ? px(layoutViewportWidth)
              : "100vw",
          height: viewport !== null ? px(viewport.height) : "100dvh",
          transform: `translateX(-50%) scaleX(${sceneCoverScaleX})`,
          transformOrigin: "center top",
        }}
      >
        {renderSceneStacks()}
      </div>
    </div>
  );
}
