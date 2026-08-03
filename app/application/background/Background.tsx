"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";

type Sticker = {
  id: string;
  src: string;
  className: string;
  style?: CSSProperties;
};

type Cluster = {
  id: string;
  // Anchors the whole group to a screen edge/corner. Can mix px/% freely —
  // this only affects where the cluster sits on the page.
  wrapperClassName: string;
  // Positioned in px relative to the wrapper's anchor point (0,0), so
  // stickers keep their spacing to one another at every viewport size.
  stickers: Sticker[];
};

const CLUSTERS: Cluster[] = [
  {
    id: "top-left",
    wrapperClassName: "absolute left-[14%] top-[-60px]",
    stickers: [
      {
        id: "top-clover",
        src: "/application/clover.svg",
        className: "absolute left-[-13px] top-[40px] w-[50px] rotate-[20deg]",
      },
      {
        id: "top-clover2",
        src: "/application/clover2.svg",
        className: "absolute left-[-30px] top-[80px] w-[80px]",
      },
      {
        id: "clover2-bottom",
        src: "/application/clover2.svg",
        className:
          "absolute left-[124px] top-[95px] w-[54px] z-2 rotate-[-45deg]",
      },
      {
        id: "mushroom-group",
        src: "/application/mushroomGroup.svg",
        className: "absolute left-[50px] top-[70px] w-[130px]",
      },
      {
        id: "top-sparkle",
        src: "/application/sparkle.svg",
        className: "absolute left-[35px] top-[45px] w-[32px]",
      },
      {
        id: "top-sparkle2",
        src: "/application/sparkle.svg",
        className: "absolute left-[165px] top-[125px] w-[24px]",
      },
    ],
  },
  {
    id: "top-right",
    wrapperClassName: "absolute right-[-60px] top-[-40px]",
    stickers: [
      {
        id: "candles",
        src: "/application/candles.svg",
        className: "absolute right-[15px] top-[-40px] w-[380px]",
      },
      {
        id: "candle-flame-large",
        src: "/application/candle-flame-large.svg",
        className:
          "absolute right-[15px] top-[-40px] w-[380px] app-candle-flame",
        style: { "--flame-origin": "71% 54%" } as CSSProperties,
      },
      {
        id: "candle-flame-small",
        src: "/application/candle-flame-small.svg",
        className:
          "absolute right-[15px] top-[-40px] w-[380px] app-candle-flame",
        style: {
          "--flame-origin": "19% 56%",
          "--decor-duration": "3s",
          "--decor-delay": "-320ms",
        } as CSSProperties,
      },
      {
        id: "top-right-clover1",
        src: "/application/clover2.svg",
        className: "absolute right-[358px] top-[-5px] w-[76px] rotate-[22deg]",
      },
      {
        id: "top-right-clover2",
        src: "/application/clover2.svg",
        className: "absolute right-[375px] top-[94px] w-[56px] -rotate-[78deg]",
      },
      {
        id: "top-right-clover3",
        src: "/application/clover.svg",
        className:
          "absolute right-[-5px] top-[156px] w-[140px] rotate-[72deg] z-2",
      },
      {
        id: "right-sparkle",
        src: "/application/sparkle.svg",
        className: "absolute right-[210px] top-[120px] w-[50px]",
      },
      {
        id: "right-sparkle2",
        src: "/application/sparkle.svg",
        className: "absolute right-[400px] top-[41px] w-[40px]",
      },
    ],
  },
  {
    id: "bottom-left",
    wrapperClassName: "absolute left-[-100px] bottom-[-140px]",
    stickers: [
      {
        id: "coffee",
        src: "/application/coffee.svg",
        className: "absolute left-40 bottom-40 w-[360px]",
      },
      {
        id: "bottom-clover",
        src: "/application/clover2.svg",
        className: "absolute left-[200px] bottom-[430px] w-[60px] z-4",
      },
      {
        id: "bottom-sparkle",
        src: "/application/sparkle.svg",
        className: "absolute left-[411px] bottom-[359px] w-[18px]",
      },
      {
        id: "bottom-sparkle2",
        src: "/application/sparkle.svg",
        className: "absolute left-[190px] bottom-[320px] z-4 w-[40px]",
      },
      {
        id: "bottom-star",
        src: "/application/star.svg",
        className:
          "absolute left-[150px] bottom-[270px] w-[70px] z-4 rotate-[-12deg]",
      },
      {
        id: "mushroom",
        src: "/application/mushroom.svg",
        className: "absolute left-[480px] bottom-[148px] w-[100px]",
      },
      {
        id: "bottom-clover2",
        src: "/application/clover2.svg",
        className:
          "absolute left-[473px] bottom-[105px] w-[85px] rotate-[65deg] z-4",
      },
    ],
  },
  {
    id: "bottom-right",
    wrapperClassName: "absolute right-[1%] bottom-[-30px]",
    stickers: [
      {
        id: "pencil",
        src: "/application/pencil.svg",
        className: "absolute right-0 bottom-[30px] w-[300px]",
      },
      {
        id: "bottom-right-clover1",
        src: "/application/clover2.svg",
        className:
          "absolute right-[115px] bottom-[85px] w-[52px] rotate-[70deg]",
      },
      {
        id: "bottom-right-clover2",
        src: "/application/clover2.svg",
        className:
          "absolute right-[180px] bottom-[5px] w-[80px] rotate-[-10deg]",
      },
      {
        id: "star",
        src: "/application/star.svg",
        className: "absolute right-[30px] bottom-[143px] w-[60px] rotate-2",
      },
      {
        id: "bottom-right-sparkle",
        src: "/application/sparkle.svg",
        className: "absolute right-[60px] bottom-[40px] w-[35px]",
      },
    ],
  },
];

// Not tied to a corner cluster, so % is fine here.
// mushroom-group/clover2-bottom currently use top-% (not bottom-%), so they
// don't share coffee's coordinate frame — left them loose rather than guessing.
const LOOSE_STICKERS: Sticker[] = [
  {
    id: "top-blueleaf",
    src: "/application/blueLeaf.svg",
    className: "absolute left-[-170px] top-[130px] w-[320px] rotate-6",
    style: {
      "--decor-enter-x": "-34px",
      "--decor-enter-y": "16px",
      "--decor-enter-rotate": "-7deg",
      "--decor-duration": "1100ms",
      "--decor-delay": "80ms",
    } as CSSProperties,
  },
  {
    id: "left-darkleaf",
    src: "/application/darkLeaf.svg",
    className: "absolute left-[-330px] bottom-[-90px] w-[650px]",
    style: {
      "--decor-enter-x": "-40px",
      "--decor-enter-y": "22px",
      "--decor-enter-rotate": "-4deg",
      "--decor-duration": "1250ms",
      "--decor-delay": "220ms",
    } as CSSProperties,
  },
  {
    id: "left-clover",
    src: "/application/clover.svg",
    className:
      "absolute left-[-65px] bottom-[410px] w-[160px] rotate-[-5deg] z-4",
  },
  {
    id: "right-darkleaf",
    src: "/application/darkLeaf.svg",
    className:
      "absolute right-[-280px] bottom-[170px] w-[550px] scale-x-[-1] rotate-[-30deg] z-10",
    style: {
      "--decor-enter-x": "38px",
      "--decor-enter-y": "18px",
      "--decor-enter-rotate": "5deg",
      "--decor-duration": "1200ms",
      "--decor-delay": "160ms",
    } as CSSProperties,
  },
];

const ENTERING_STICKER_IDS = new Set([
  "top-blueleaf",
  "left-darkleaf",
  "right-darkleaf",
]);

const BACKDROP =
  "radial-gradient(120% 100% at 50% -10%, #241C6B 0%, #0B0730 55%, #05041C 100%)";

// Soft vertical light-beam columns. Gradient runs the opposite way to the
// backdrop (blue at top fading to black at the bottom) so they read as
// light spilling down onto a floor that's dark at top / lit at bottom.
type Column = {
  id: string;
  left: string;
  width: string;
  opacity: number;
};

const COLUMNS: Column[] = [
  { id: "col-1", left: "8%", width: "50px", opacity: 0.35 },
  { id: "col-2", left: "26%", width: "34px", opacity: 0.25 },
  { id: "col-3", left: "50%", width: "60px", opacity: 0.3 },
  { id: "col-4", left: "72%", width: "38px", opacity: 0.25 },
  { id: "col-5", left: "90%", width: "46px", opacity: 0.35 },
];

export default function Background() {
  const candlesRef = useRef<HTMLImageElement>(null);
  const hoveredCandleRef = useRef<"small" | "large" | null>(null);
  const [hoveredCandle, setHoveredCandle] = useState<
    "small" | "large" | null
  >(null);

  useEffect(() => {
    function updateCandleHover(event: PointerEvent) {
      if (event.pointerType === "touch") return;

      const bounds = candlesRef.current?.getBoundingClientRect();
      let nextHoveredCandle: "small" | "large" | null = null;

      if (bounds) {
        const x = ((event.clientX - bounds.left) / bounds.width) * 397;
        const y = ((event.clientY - bounds.top) / bounds.height) * 227;

        if (x >= 35 && x <= 115 && y >= 74 && y <= 227) {
          nextHoveredCandle = "small";
        } else if (x >= 235 && x <= 330 && y >= 50 && y <= 227) {
          nextHoveredCandle = "large";
        }
      }

      if (hoveredCandleRef.current !== nextHoveredCandle) {
        hoveredCandleRef.current = nextHoveredCandle;
        setHoveredCandle(nextHoveredCandle);
      }
    }

    function clearCandleHover() {
      if (hoveredCandleRef.current) {
        hoveredCandleRef.current = null;
        setHoveredCandle(null);
      }
    }

    window.addEventListener("pointermove", updateCandleHover, { passive: true });
    window.addEventListener("blur", clearCandleHover);

    return () => {
      window.removeEventListener("pointermove", updateCandleHover);
      window.removeEventListener("blur", clearCandleHover);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      data-candle-hovered={hoveredCandle ?? undefined}
      style={{ background: BACKDROP }}
    >
      {COLUMNS.map((column) => (
        <div
          key={column.id}
          className="absolute top-0 bottom-0 -translate-x-1/2"
          style={{
            left: column.left,
            width: column.width,
            opacity: column.opacity,
            background:
              "linear-gradient(180deg, #4A3FB8 0%, #241C6B 35%, #05041C 75%, #120D2E 100%)",
            filter: "blur(12px)",
          }}
        />
      ))}
      {CLUSTERS.map((cluster) => (
        <div key={cluster.id} className={cluster.wrapperClassName}>
          {cluster.stickers.map((sticker) => (
            <img
              key={sticker.id}
              ref={sticker.id === "candles" ? candlesRef : undefined}
              data-candle-id={
                sticker.id === "candle-flame-small"
                  ? "small"
                  : sticker.id === "candle-flame-large"
                    ? "large"
                    : undefined
              }
              src={sticker.src}
              alt=""
              draggable="false"
              className={`${sticker.className} max-w-none select-none`}
              style={sticker.style}
            />
          ))}
        </div>
      ))}
      {LOOSE_STICKERS.map((sticker) => (
        <img
          key={sticker.id}
          src={sticker.src}
          alt=""
          draggable="false"
          className={`${sticker.className} max-w-none select-none${
            ENTERING_STICKER_IDS.has(sticker.id) ? " decor-leaf-enter" : ""
          }`}
          style={sticker.style}
        />
      ))}
    </div>
  );
}
