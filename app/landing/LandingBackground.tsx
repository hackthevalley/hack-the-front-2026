"use client";

import { useEffect, useState, type CSSProperties } from "react";

const FRAME_WIDTH = 1512;
const FRAME_HEIGHT = 982;
const FOCAL_X = FRAME_WIDTH / 2;
const WIDE_FRAME_WIDTH = 3840;
const WIDE_FRAME_HEIGHT = 1080;
const MAX_SCENE_ASPECT_RATIO = WIDE_FRAME_WIDTH / WIDE_FRAME_HEIGHT;
const WIDE_FOCAL_X = WIDE_FRAME_WIDTH / 2;
const CORE_ASPECT_RATIO = FRAME_WIDTH / FRAME_HEIGHT;
const WIDE_TARGET_ASPECT_RATIO = WIDE_FRAME_WIDTH / WIDE_FRAME_HEIGHT;
const WIDE_FRONT_SWAP_RATIO =
  CORE_ASPECT_RATIO + (WIDE_TARGET_ASPECT_RATIO - CORE_ASPECT_RATIO) * 0.7;
const WIDE_WATER_SWAP_RATIO =
  CORE_ASPECT_RATIO + (WIDE_TARGET_ASPECT_RATIO - CORE_ASPECT_RATIO) * 0.95;
const CORE_WATER_STACK_Z_INDEX = 4;

type HorizontalBand = "left" | "center" | "right";
type SceneAnchor = "left" | "center" | "right";

type SceneImage = {
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

const coreSceneImages: readonly SceneImage[] = [
  {
    id: "ground",
    src: "/landing-page/background/core-scene/ground.svg",
    left: -5.12,
    top: 993.52,
    width: 1513.44,
    height: 90.59,
    band: "center",
    zIndex: 0,
  },
  {
    id: "lots-of-spray",
    src: "/landing-page/background/core-scene/lots-of-spray.svg",
    left: 7.01,
    top: 331.77,
    width: 441.1459045410156,
    height: 686.0755615234375,
    band: "left",
    opacity: 1,
    zIndex: 11,
    wideFactor: 1,
  },
  {
    id: "lots-of-spray-2",
    src: "/landing-page/background/core-scene/lots-of-spray-2.svg",
    left: -11.41,
    top: 746.64,
    width: 572.2451171875,
    height: 284.6068420410156,
    band: "left",
    opacity: 1,
    zIndex: 12,
    wideFactor: 1,
  },
  {
    id: "waterfall-glow",
    src: "/landing-page/background/core-scene/waterfall-glow.png",
    left: -178.69,
    top: 220.84,
    width: 636.0620727539062,
    height: 806.9891967773438,
    band: "left",
    zIndex: 4,
    wideFactor: 1,
    imageStyle: {
      mixBlendMode: "screen",
      transform: "scale(1.1)",
      transformOrigin: "center center",
    },
  },
  {
    id: "side-fall",
    src: "/landing-page/background/core-scene/side-fall.png",
    left: -108.83,
    top: 150.39,
    width: 250.13763427734375,
    height: 862.422119140625,
    band: "left",
    zIndex: 7,
    wideFactor: 1,
  },
  {
    id: "waterfall",
    src: "/landing-page/background/core-scene/waterfall.png",
    left: -192.69,
    top: 208.01,
    width: 636.0620727539062,
    height: 806.9891967773438,
    band: "left",
    zIndex: 5,
    wideFactor: 1,
  },
  {
    id: "water-details",
    src: "/landing-page/background/core-scene/water-details.svg",
    left: -192.69,
    top: 208.01,
    width: 636.0620727539062,
    height: 806.9891967773438,
    band: "left",
    zIndex: 6,
    wideFactor: 1,
  },
  {
    id: "shadow-valley",
    src: "/landing-page/background/core-scene/shadow-valley.svg",
    left: 810.56,
    top: 480.76,
    width: 663.3751220703125,
    height: 513.9644165039062,
    band: "right",
    zIndex: 9,
  },
  {
    id: "left-mountain",
    src: "/landing-page/background/core-scene/left-mountain.svg",
    left: 309.75,
    top: 406.07,
    width: 416.107177734375,
    height: 691.1132202148438,
    band: "left",
    zIndex: 3,
    wideFactor: 1,
  },
  {
    id: "valley",
    src: "/landing-page/background/core-scene/valley.svg",
    left: 878.28,
    top: 484.15,
    width: 663.3751220703125,
    height: 513.9644165039062,
    band: "right",
    zIndex: 8,
    wideFactor: 1,
  },
  {
    id: "plateau-top",
    src: "/landing-page/background/core-scene/plateau-top.svg",
    left: 1152.29,
    top: 465.41,
    width: 381.26251220703125,
    height: 70.4864501953125,
    band: "right",
    zIndex: 11,
    wideFactor: 1,
  },
  {
    id: "trees-5",
    src: "/landing-page/background/core-scene/trees-5.png",
    left: 259.4,
    top: 753.08,
    width: 816.0335693359375,
    height: 324.30841064453125,
    band: "left",
    zIndex: 4,
    wideFactor: 1,
  },
  {
    id: "front-trees",
    src: "/landing-page/background/core-scene/front-trees.png",
    left: 764.08,
    top: 649.55,
    width: 1051.8052978515625,
    height: 476.94769287109375,
    band: "right",
    zIndex: 15,
    wideFactor: 1,
  },
  {
    id: "cloud-1",
    src: "/landing-page/background/cloud-1.svg",
    left: 166.76,
    top: 140.45,
    width: 337.19,
    height: 98.73,
    band: "left",
    zIndex: 1,
  },
  {
    id: "cloud-2",
    src: "/landing-page/background/cloud-2.svg",
    left: 1107.26,
    top: 128.96,
    width: 579.71,
    height: 169.75,
    band: "right",
    zIndex: 2,
  },
  {
    id: "cloud-3",
    src: "/landing-page/background/cloud-3.svg",
    left: 1379.37,
    top: 315.78,
    width: 308.36,
    height: 90.29,
    band: "right",
    zIndex: 1,
  },
  {
    id: "sky-things",
    src: "/landing-page/background/sky-things.svg",
    left: -54.17,
    top: -94.61,
    width: 1998.5,
    height: 795.99,
    band: "center",
    zIndex: 1,
  },
  {
    id: "stars-1",
    src: "/landing-page/background/stars-1.svg",
    left: 421.91,
    top: 34.96,
    width: 167.81,
    height: 160.75,
    band: "left",
    zIndex: 1,
  },
  {
    id: "stars-2",
    src: "/landing-page/background/stars-2.svg",
    left: 1142.24,
    top: 318.94,
    width: 176.44,
    height: 126.1,
    band: "right",
    zIndex: 1,
  },
  {
    id: "tiny-stars",
    src: "/landing-page/background/tiny-stars.svg",
    left: 108.49,
    top: 22.31,
    width: 1368.22,
    height: 446.26,
    band: "center",
    zIndex: 1,
  },
] as const;

const wideBackSceneImages: readonly SceneImage[] = [
  {
    id: "ground",
    src: "/landing-page/background/wide-scene/wide-ground.svg",
    left: -5.12,
    top: 993.52,
    width: 3841.8818359375,
    height: 90.5888671875,
    zIndex: 0,
  },
  {
    id: "trees",
    src: "/landing-page/background/wide-scene/trees.png",
    left: 1348.11,
    top: 775.13,
    width: 1079.67,
    height: 439.59,
    zIndex: 1,
  },
  {
    id: "trees-3",
    src: "/landing-page/background/wide-scene/trees-3.svg",
    left: 2099.68,
    top: 775.13,
    width: 1079.667236328125,
    height: 439.5874328613281,
    zIndex: 1,
  },
  {
    id: "trees-4",
    src: "/landing-page/background/wide-scene/trees-4.svg",
    left: 579.28,
    top: 703.01,
    width: 1079.6920166015625,
    height: 531.227783203125,
    zIndex: 1,
  },
  {
    id: "wide-waterfall-glow-2",
    src: "/landing-page/background/wide-scene/wide-waterfall-glow-2.png",
    left: 3017.78,
    top: 576.66,
    width: 442.36578369140625,
    height: 561.241455078125,
    zIndex: 1.5,
    imageStyle: {
      mixBlendMode: "screen",
      transform: "scale(1.1)",
      transformOrigin: "center center",
    },
  },
  {
    id: "wide-water-fall-2",
    src: "/landing-page/background/wide-scene/wide-waterfall-2.png",
    left: 3017.78,
    top: 572.61,
    width: 442.36578369140625,
    height: 561.241455078125,
    zIndex: 2,
  },
  {
    id: "wide-water-details-2",
    src: "/landing-page/background/wide-scene/wide-water-details-2.svg",
    left: 3017.78,
    top: 572.61,
    width: 442.36578369140625,
    height: 561.241455078125,
    zIndex: 3,
  },
  {
    id: "wide-lots-of-spray-3",
    src: "/landing-page/background/wide-scene/wide-lots-of-spray-3.svg",
    left: 2983.72,
    top: 621.27,
    width: 210.38836491458488,
    height: 327.1995821854444,
    opacity: 0.63,
    zIndex: 4,
  },
] as const;

const wideMidSceneImages: readonly SceneImage[] = [
  {
    id: "trees-2",
    src: "/landing-page/background/wide-scene/trees-2.png",
    left: 506,
    top: 775.13,
    width: 1079.6673583984375,
    height: 439.5879211425781,
    zIndex: 1.5,
  },
] as const;

const wideWaterMidSceneImages: readonly SceneImage[] = [
  {
    id: "wide-left-mountain",
    src: "/landing-page/background/wide-scene/wide-left-mountain.svg",
    left: 423.07,
    top: 451.95,
    width: 454.48,
    height: 754.85,
    zIndex: 1,
  },
  {
    id: "wide-waterfall-glow",
    src: "/landing-page/background/wide-scene/wide-waterfall-glow.png",
    left: -110.4,
    top: 249.67,
    width: 694.7107543945312,
    height: 881.3983764648438,
    zIndex: 2,
    imageStyle: {
      mixBlendMode: "screen",
      transform: "scale(1.1)",
      transformOrigin: "center center",
    },
  },
  {
    id: "wide-waterfall",
    src: "/landing-page/background/wide-scene/wide-waterfall.png",
    left: -125.69,
    top: 235.66,
    width: 694.7107543945312,
    height: 881.3983764648438,
    zIndex: 3,
  },
  {
    id: "wide-water-details",
    src: "/landing-page/background/wide-scene/wide-water-details.svg",
    left: -125.69,
    top: 235.66,
    width: 694.7107543945312,
    height: 881.3983764648438,
    zIndex: 4,
  },
];

const wideWaterTopSceneImages: readonly SceneImage[] = [
  {
    id: "wide-lots-of-spray",
    src: "/landing-page/background/wide-scene/wide-lots-of-spray.svg",
    left: 92.4,
    top: 370.84,
    width: 481.83,
    height: 749.33,
    zIndex: 11,
  },
  {
    id: "wide-lots-of-spray-2",
    src: "/landing-page/background/wide-scene/wide-lots-of-spray-2.svg",
    left: 72.26,
    top: 823.97,
    width: 625.03,
    height: 310.85,
    zIndex: 12,
  },
] as const;

const wideFrontCenterSceneImages: readonly SceneImage[] = [
  {
    id: "wide-front-trees",
    src: "/landing-page/background/wide-scene/wide-front-trees.png",
    left: 1861.46,
    top: 866.38,
    width: 831.2988891601562,
    height: 376.95770263671875,
    zIndex: 1,
  },
  {
    id: "wide-front-trees-2",
    src: "/landing-page/background/wide-scene/wide-front-trees-2.png",
    left: 743.01,
    top: 835.33,
    width: 891.5460205078125,
    height: 404.27679443359375,
    zIndex: 1,
  },
] as const;

const wideFrontRightSceneImages: readonly SceneImage[] = [
  {
    id: "wide-front-trees-3",
    src: "/landing-page/background/wide-scene/wide-front-trees-3.png",
    left: 2732.67,
    top: 717.91,
    width: 1148.7879638671875,
    height: 520.9251098632812,
    zIndex: 1,
  },
] as const;

type Viewport = {
  width: number;
  height: number;
};

const px = (value: number) => `${value}px`;

const CORE_WIDE_SWAP_IDS = new Set([
  "trees-5",
  "front-trees",
]);

const CORE_WIDE_WATER_SWAP_IDS = new Set([
  "lots-of-spray",
  "lots-of-spray-2",
  "waterfall-glow",
  "side-fall",
  "waterfall",
  "water-details",
  "left-mountain",
]);

function getViewport(): Viewport {
  return {
    width: window.innerWidth,
    height: window.innerHeight,
  };
}

function getWideShift(image: SceneImage, extraWidth: number) {
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

function getSceneLayerLeft(
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

  const scale = viewport ? viewport.height / FRAME_HEIGHT : null;
  const wideScale = viewport ? viewport.height / WIDE_FRAME_HEIGHT : null;
  const layoutViewportWidth = viewport
    ? Math.min(viewport.width, viewport.height * MAX_SCENE_ASPECT_RATIO)
    : null;
  const coreSceneWidth = scale ? FRAME_WIDTH * scale : null;
  const extraWidth =
    layoutViewportWidth && coreSceneWidth && layoutViewportWidth > coreSceneWidth
      ? layoutViewportWidth - coreSceneWidth
      : 0;
  const viewportAspectRatio =
    layoutViewportWidth && viewport
      ? layoutViewportWidth / viewport.height
      : CORE_ASPECT_RATIO;
  const coreSceneLeft =
    layoutViewportWidth && scale
      ? layoutViewportWidth / 2 - FOCAL_X * scale
      : `calc(50vw - (100dvh * ${FOCAL_X} / ${FRAME_HEIGHT}))`;
  const wideSceneLeft =
    layoutViewportWidth && wideScale
      ? layoutViewportWidth / 2 - WIDE_FOCAL_X * wideScale
      : `calc(50vw - (100dvh * ${WIDE_FOCAL_X} / ${WIDE_FRAME_HEIGHT}))`;
  const showWideFrontScene = viewportAspectRatio >= WIDE_FRONT_SWAP_RATIO;
  const showWideWaterScene = viewportAspectRatio >= WIDE_WATER_SWAP_RATIO;
  const showUltrawideBackdrop =
    viewport !== null &&
    layoutViewportWidth !== null &&
    viewport.width - layoutViewportWidth > 1;
  const ultrawideBackdropScaleX =
    viewport !== null && layoutViewportWidth !== null && layoutViewportWidth > 0
      ? viewport.width / layoutViewportWidth
      : 1;
  const renderedCoreSceneImages = coreSceneImages.map((image) =>
    CORE_WIDE_SWAP_IDS.has(image.id) || CORE_WIDE_WATER_SWAP_IDS.has(image.id)
      ? {
          ...image,
          opacity:
            CORE_WIDE_SWAP_IDS.has(image.id)
              ? showWideFrontScene
                ? 0
                : (image.opacity ?? 1)
              : showWideWaterScene
                ? 0
                : (image.opacity ?? 1),
        }
      : image,
  );
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
      {wideBackSceneImages.length > 0
        ? renderSceneLayer(
            wideBackSceneImages,
            wideSceneLeft,
            wideScale !== null
              ? WIDE_FRAME_WIDTH * wideScale
              : `calc(100dvh * ${WIDE_FRAME_WIDTH} / ${WIDE_FRAME_HEIGHT})`,
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
        scale !== null
          ? FRAME_WIDTH * scale
          : `calc(100dvh * ${FRAME_WIDTH} / ${FRAME_HEIGHT})`,
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
            wideScale !== null
              ? WIDE_FRAME_WIDTH * wideScale
              : `calc(100dvh * ${WIDE_FRAME_WIDTH} / ${WIDE_FRAME_HEIGHT})`,
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
            wideScale !== null
              ? WIDE_FRAME_WIDTH * wideScale
              : `calc(100dvh * ${WIDE_FRAME_WIDTH} / ${WIDE_FRAME_HEIGHT})`,
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
        scale !== null
          ? FRAME_WIDTH * scale
          : `calc(100dvh * ${FRAME_WIDTH} / ${FRAME_HEIGHT})`,
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
            wideScale !== null
              ? WIDE_FRAME_WIDTH * wideScale
              : `calc(100dvh * ${WIDE_FRAME_WIDTH} / ${WIDE_FRAME_HEIGHT})`,
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
            wideScale !== null
              ? WIDE_FRAME_WIDTH * wideScale
              : `calc(100dvh * ${WIDE_FRAME_WIDTH} / ${WIDE_FRAME_HEIGHT})`,
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
            wideScale !== null
              ? WIDE_FRAME_WIDTH * wideScale
              : `calc(100dvh * ${WIDE_FRAME_WIDTH} / ${WIDE_FRAME_HEIGHT})`,
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
      {showUltrawideBackdrop && layoutViewportWidth !== null ? (
        <div className="absolute inset-0 overflow-hidden">
          <div
            className="absolute left-1/2 top-0"
            style={{
              width: px(layoutViewportWidth),
              height: viewport !== null ? px(viewport.height) : "100dvh",
              opacity: 0.78,
              filter: "blur(48px) saturate(1.05)",
              transform: `translateX(-50%) scaleX(${ultrawideBackdropScaleX}) scaleY(1.04)`,
              transformOrigin: "center center",
            }}
          >
            {renderSceneStacks()}
          </div>
        </div>
      ) : null}
      <div
        className="absolute left-1/2 top-0 overflow-hidden"
        style={{
          width:
            layoutViewportWidth !== null
              ? px(layoutViewportWidth)
              : "100vw",
          height: viewport !== null ? px(viewport.height) : "100dvh",
          transform: "translateX(-50%)",
        }}
      >
        {renderSceneStacks()}
      </div>
    </div>
  );
}
