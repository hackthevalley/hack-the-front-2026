import type { CSSProperties } from "react";

const FRAME_WIDTH = 1512;
const FRAME_HEIGHT = 982;

type SceneImage = {
  id: string;
  src: string;
  left: number;
  top: number;
  width: number;
  height: number;
  opacity?: number;
  zIndex?: number;
  imageStyle?: CSSProperties;
};

const sceneImages: readonly SceneImage[] = [
  {
    id: "lots-of-spray",
    src: "/landing-page/background/lots-of-spray.svg",
    left: 7.01,
    top: 331.77,
    width: 441.1459045410156,
    height: 686.0755615234375,
    opacity: 1,
    zIndex: 10,
  },
  {
    id: "lots-of-spray-2",
    src: "/landing-page/background/lots-of-spray-2.svg",
    left: -11.41,
    top: 746.64,
    width: 572.2451171875,
    height: 284.6068420410156,
    opacity: 1,
    zIndex: 11,
  },
  {
    id: "waterfall-glow",
    src: "/landing-page/background/waterfall-glow.png",
    left: -178.69,
    top: 220.84,
    width: 636.0620727539062,
    height: 806.9891967773438,
    zIndex: 3,
    imageStyle: {
      mixBlendMode: "screen",
      transform: "scale(1.1)",
      transformOrigin: "center center",
    },
  },
  {
    id: "side-fall",
    src: "/landing-page/background/side-fall.png",
    left: -108.83,
    top: 150.39,
    width: 250.13763427734375,
    height: 862.422119140625,
    zIndex: 6,
  },
  {
    id: "waterfall",
    src: "/landing-page/background/waterfall.png",
    left: -192.69,
    top: 208.01,
    width: 636.0620727539062,
    height: 806.9891967773438,
    zIndex: 4,
  },
  {
    id: "water-details",
    src: "/landing-page/background/water-details.svg",
    left: -192.69,
    top: 208.01,
    width: 636.0620727539062,
    height: 806.9891967773438,
    zIndex: 5,
  },
  {
    id: "back-valley",
    src: "/landing-page/background/back-valley.svg",
    left: 360.53,
    top: 542.05,
    width: 1253.6494140625,
    height: 445.0940856933594,
    zIndex: 0,
  },
  {
    id: "shadow-valley",
    src: "/landing-page/background/shadow-valley.svg",
    left: 810.56,
    top: 480.76,
    width: 663.3751220703125,
    height: 513.9644165039062,
    zIndex: 8,
  },
  {
    id: "valley",
    src: "/landing-page/background/valley.svg",
    left: 878.28,
    top: 484.15,
    width: 663.3751220703125,
    height: 513.9644165039062,
    zIndex: 7,
  },
  {
    id: "left-valley",
    src: "/landing-page/background/left-valley.svg",
    left: 190.16,
    top: 451.19,
    width: 1533.31640625,
    height: 544.38671875,
    zIndex: 2,
  },
  {
    id: "plateau-top",
    src: "/landing-page/background/plateau-top.svg",
    left: 1152.29,
    top: 465.41,
    width: 381.26251220703125,
    height: 70.4864501953125,
    zIndex: 10,
  },
  {
    id: "trees",
    src: "/landing-page/background/trees.svg",
    left: 404.99,
    top: 663.33,
    width: 1016.2859497070312,
    height: 430.9453125,
    zIndex: 1,
  },
  {
    id: "front-trees",
    src: "/landing-page/background/front-trees.png",
    left: 764.08,
    top: 649.55,
    width: 1051.8052978515625,
    height: 476.94769287109375,
    zIndex: 14,
  },
] as const;

const px = (value: number) => `${value}px`;

export default function LandingBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
    >
      <div className="absolute inset-0 grid place-items-center">
        <div
          className="relative"
          style={{
            width: `min(100vw, calc(${FRAME_WIDTH} / ${FRAME_HEIGHT} * 100vh))`,
            aspectRatio: `${FRAME_WIDTH} / ${FRAME_HEIGHT}`,
          }}
        >
          {sceneImages.map((image) => (
            <div
              key={image.id}
              className="absolute"
              style={{
                left: px(image.left),
                top: px(image.top),
                width: px(image.width),
                height: px(image.height),
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
          ))}
        </div>
      </div>
    </div>
  );
}
