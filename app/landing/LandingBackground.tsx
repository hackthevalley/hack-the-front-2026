"use client";

import { useEffect, useState, type CSSProperties } from "react";

const FRAME_WIDTH = 1512;
const FRAME_HEIGHT = 982;
const FOCAL_X = FRAME_WIDTH / 2;
const WIDE_FRAME_WIDTH = 3840;
const WIDE_FOCAL_X = WIDE_FRAME_WIDTH / 2;

type HorizontalBand = "left" | "center" | "right";

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
    id: "lots-of-spray",
    src: "/landing-page/background/core-scene/lots-of-spray.svg",
    left: 7.01,
    top: 331.77,
    width: 441.1459045410156,
    height: 686.0755615234375,
    band: "left",
    opacity: 1,
    zIndex: 10,
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
    zIndex: 11,
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
    zIndex: 3,
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
    zIndex: 6,
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
    zIndex: 4,
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
    zIndex: 5,
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
    zIndex: 8,
  },
  {
    id: "left-mountain",
    src: "/landing-page/background/core-scene/left%20mountain.svg",
    left: 309.75,
    top: 406.07,
    width: 416.107177734375,
    height: 691.1132202148438,
    band: "left",
    zIndex: 2,
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
    zIndex: 7,
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
    zIndex: 10,
    wideFactor: 1,
  },
  {
    id: "trees",
    src: "/landing-page/background/core-scene/trees.svg",
    left: 404.99,
    top: 663.33,
    width: 1016.2859497070312,
    height: 430.9453125,
    band: "center",
    zIndex: 1,
  },
  {
    id: "trees-2",
    src: "/landing-page/background/core-scene/trees-2.svg",
    left: 259.4,
    top: 753.08,
    width: 816.0335693359375,
    height: 324.30841064453125,
    band: "left",
    zIndex: 3,
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
    zIndex: 14,
    wideFactor: 1,
  },
] as const;

const wideSceneImages: readonly SceneImage[] = [] as const;

type Viewport = {
  width: number;
  height: number;
};

const px = (value: number) => `${value}px`;

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
  const coreSceneWidth = scale ? FRAME_WIDTH * scale : null;
  const extraWidth =
    viewport && coreSceneWidth && viewport.width > coreSceneWidth
      ? viewport.width - coreSceneWidth
      : 0;
  const coreSceneLeft =
    viewport && scale
      ? viewport.width / 2 - FOCAL_X * scale
      : `calc(50vw - (100dvh * ${FOCAL_X} / ${FRAME_HEIGHT}))`;
  const wideSceneLeft =
    viewport && scale
      ? viewport.width / 2 - WIDE_FOCAL_X * scale
      : `calc(50vw - (100dvh * ${WIDE_FOCAL_X} / ${FRAME_HEIGHT}))`;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
    >
      {wideSceneImages.length > 0 ? (
        <div
          className="absolute left-0 top-0"
          style={{
            left: typeof wideSceneLeft === "number" ? px(wideSceneLeft) : wideSceneLeft,
            width:
              scale !== null
                ? px(WIDE_FRAME_WIDTH * scale)
                : `calc(100dvh * ${WIDE_FRAME_WIDTH} / ${FRAME_HEIGHT})`,
            height: viewport !== null ? px(viewport.height) : "100dvh",
          }}
        >
          {wideSceneImages.map((image) => {
            const imageScale = scale ?? 1;

            return (
              <div
                key={image.id}
                className="absolute"
                style={{
                  left: px(image.left * imageScale),
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
      ) : null}
      <div
        className="absolute left-0 top-0"
        style={{
          left: typeof coreSceneLeft === "number" ? px(coreSceneLeft) : coreSceneLeft,
          width:
            scale !== null
              ? px(FRAME_WIDTH * scale)
              : `calc(100dvh * ${FRAME_WIDTH} / ${FRAME_HEIGHT})`,
          height: viewport !== null ? px(viewport.height) : "100dvh",
        }}
      >
        {coreSceneImages.map((image) => {
          const imageScale = scale ?? 1;
          const wideShift = getWideShift(image, extraWidth);

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
    </div>
  );
}
