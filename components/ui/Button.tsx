"use client";

import { useEffect, useState, type CSSProperties } from "react";
import { Figtree, Inter } from "next/font/google";

const figtree = Figtree({ subsets: ["latin"], weight: ["400", "600"] });
const inter = Inter({ subsets: ["latin"], weight: ["600"] });

type ButtonProps = {
  className?: string;
  text: string;
  buttonType?: "primary" | "disabled" | "direction";
  /** Only used when buttonType is "direction". Controls chevron placement/style. */
  direction?: "next" | "back";
  /** Uses a supplied direction icon instead of the default circled chevron. */
  directionIconSrc?: string;
  /** Overrides the direction label typography without changing other variants. */
  directionTextClassName?: string;
  onClick?: () => void;
  width?: number | string;
  /** Overrides the default button artwork ratio for compact design variants. */
  aspectRatio?: string;
  /** Uses the compact 240 × 56 artwork geometry from the dashboard design. */
  artworkVariant?: "default" | "compact";
  /** Optional design-frame font size. Defaults to the shared 20px label size. */
  fontSize?: number;
  /** Only used when buttonType is "direction" — the "disabled" buttonType covers
   * the primary/disabled pair instead. Grays out the button and blocks onClick. */
  disabled?: boolean;
};

function ChevronIcon({
  direction,
  className = "",
}: {
  direction: "left" | "right";
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path
        d={direction === "left" ? "M15 6l-6 6 6 6" : "M9 6l6 6-6 6"}
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

type LayerConfig = {
  id: string;
  src?: string;
  left: number;
  top: number;
  width: number;
  height: number;
  style?: CSSProperties;
  disabledOnly?: boolean;
};

const FRAME_WIDTH = 206;
const FRAME_HEIGHT = 72;
const DEFAULT_WIDTH = "min(100%, 206px)";

const PRIMARY_BACKGROUND =
  "linear-gradient(95.06deg, #FF7CCD -13.3%, #7839DC 113.68%)";
const DISABLED_BACKGROUND =
  "linear-gradient(95.06deg, #CFCFCF -13.3%, #9A9A9A 113.68%)";

const PILL_RADIUS = 1275.45;
const INNER_SHADOW_OFFSET_Y = 2.55;
const INNER_SHADOW_BLUR = 4.72;
const BASE_FONT_SIZE = 20;
const RECTANGLE_HEIGHT = 66.38993835449219;
const FOG_HEIGHT = 44.68553161621094;

function pxToCqw(value: number): string {
  return `${(value / FRAME_WIDTH) * 100}cqw`;
}

function gradientBorder(gradient: string): string {
  return `linear-gradient(#0000, #0000) padding-box, ${gradient} border-box`;
}

const LAYERS: readonly LayerConfig[] = [
  {
    id: "fog",
    left: 0,
    top: FRAME_HEIGHT - FOG_HEIGHT,
    width: 306.4150695800781,
    height: FOG_HEIGHT,
    style: {
      opacity: 0.4,
      background:
        "linear-gradient(180deg, rgba(115, 115, 115, 0) 0%, #8DA8FF 100%)",
    },
  },
  {
    id: "rectangle",
    left: 2.55,
    top: 2.55,
    width: FRAME_WIDTH - 2 * 2.55,
    height: RECTANGLE_HEIGHT,
    style: {
      borderRadius: pxToCqw(RECTANGLE_HEIGHT / 2),
      border: `${pxToCqw(3.2)} solid transparent`,
      background: gradientBorder(
        "linear-gradient(108.9deg, #DF63DC -30.53%, #DF63DC -9.53%, rgba(120, 57, 220, 0.5) 62%, rgba(141, 168, 255, 0.35) 105.43%, rgba(141, 168, 255, 0.2) 162.91%)",
      ),
      filter: `blur(${pxToCqw(0.9)})`,
      opacity: 1,
    },
  },
  {
    id: "spray",
    src: "/landing/button/spray.svg",
    left: 0,
    top: 0,
    width: FRAME_WIDTH,
    height: FRAME_HEIGHT,
    style: {
      mixBlendMode: "screen",
    },
  },
  {
    id: "stars-shadow",
    src: "/landing/button/stars-shadow.svg",
    left: 12.04,
    top: 8.22,
    width: 215.7679443359375,
    height: 30.798866271972656,
  },
  {
    id: "stars",
    src: "/landing/button/stars.svg",
    left: 0.04,
    top: 10.22,
    width: 215.7679443359375,
    height: 30.798866271972656,
  },
  {
    id: "cloud",
    src: "/landing/button/cloud.svg",
    left: 42,
    top: 33.2,
    width: 199.16981506347656,
    height: 38.8999,
  },
  {
    id: "black-white",
    left: 0,
    top: 0,
    width: FRAME_WIDTH,
    height: FRAME_HEIGHT,
    disabledOnly: true,
    style: {
      borderRadius: pxToCqw(PILL_RADIUS),
      background: "#000000",
      mixBlendMode: "saturation",
    },
  },
];

export default function Button({
  text,
  buttonType = "primary",
  direction = "next",
  directionIconSrc,
  directionTextClassName,
  onClick,
  className = "",
  width,
  aspectRatio,
  artworkVariant = "default",
  fontSize = BASE_FONT_SIZE,
  disabled = false,
}: ButtonProps) {
  if (buttonType === "direction") {
    const isBack = direction === "back";

    return (
      <button
        type="button"
        onClick={disabled ? undefined : onClick}
        disabled={disabled}
        aria-disabled={disabled}
        className={`inline-flex items-center gap-2 border-0 bg-transparent p-0 text-white transition-opacity ${
          disabled
            ? "cursor-not-allowed opacity-40"
            : "cursor-pointer hover:opacity-70"
        } ${className}`}
      >
        {isBack && directionIconSrc && (
          <img
            src={directionIconSrc}
            alt=""
            aria-hidden="true"
            className="h-6 w-6 shrink-0"
          />
        )}
        {isBack && !directionIconSrc && (
          <span
            className={`flex h-6 w-6 items-center justify-center rounded-full border-2 ${
              disabled ? "border-white/40" : "border-white"
            }`}
          >
            <ChevronIcon direction="left" className="h-3 w-3" />
          </span>
        )}
        <span
          className={
            directionTextClassName ??
            `${figtree.className} text-[20px] font-semibold`
          }
        >
          {text}
        </span>
        {!isBack && directionIconSrc && (
          <img
            src={directionIconSrc}
            alt=""
            aria-hidden="true"
            className="h-6 w-6 shrink-0"
          />
        )}
        {!isBack && !directionIconSrc && (
          <span
            className={`flex h-6 w-6 items-center justify-center rounded-full border-2 ${
              disabled ? "border-white/40" : "border-white"
            }`}
          >
            <ChevronIcon direction="right" className="h-3 w-3" />
          </span>
        )}
      </button>
    );
  }

  const isDisabled = buttonType === "disabled";
  const isCompact = artworkVariant === "compact";

  const [ready, setReady] = useState(false);
  useEffect(() => {
    const raf = requestAnimationFrame(() => setReady(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  const visibleLayers = LAYERS.filter(
    (layer) => !layer.disabledOnly || isDisabled,
  );

  const resolvedWidth =
    width === undefined
      ? DEFAULT_WIDTH
      : typeof width === "number"
        ? `${width}px`
        : width;

  return (
    <button
      onClick={!isDisabled ? onClick : undefined}
      disabled={isDisabled}
      className={`button-component relative isolate inline-flex overflow-hidden border-0 p-0 text-white ${
        isDisabled ? "cursor-default" : "cursor-pointer"
      } ${className}`}
      style={{
        width: resolvedWidth,
        aspectRatio:
          aspectRatio ??
          (isCompact ? "240 / 56" : `${FRAME_WIDTH} / ${FRAME_HEIGHT}`),
        background: isCompact
          ? isDisabled
            ? "linear-gradient(110.77deg, #9e9e9e 13.3%, #5f5f5f 113.68%)"
            : "linear-gradient(110.77deg, #ff7ccd 13.3%, #7839dc 113.68%)"
          : isDisabled
            ? DISABLED_BACKGROUND
            : PRIMARY_BACKGROUND,
        borderRadius: isCompact ? 999 : pxToCqw(PILL_RADIUS),
        boxShadow: isCompact
          ? "inset 0 2px 3.7px #fff"
          : `inset 0 ${pxToCqw(INNER_SHADOW_OFFSET_Y)} ${pxToCqw(INNER_SHADOW_BLUR)} #FFFFFF`,
        opacity: ready ? 1 : 0,
        transition: "opacity 0.15s ease",
      }}
    >
      {isCompact ? (
        <>
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[62.5%] bg-gradient-to-b from-transparent to-[#8da8ff] opacity-60" />
          <div className="pointer-events-none absolute inset-[2px] rounded-full border border-[#df63dc] blur-[0.65px]" />
          <img
            src="/landing/button/spray.svg"
            alt=""
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 h-full w-full max-w-none select-none object-fill mix-blend-screen"
          />
          <img
            src="/landing/button/stars.svg"
            alt=""
            aria-hidden="true"
            className="pointer-events-none absolute left-[4.58%] top-[14.29%] h-[43.08%] w-[70.42%] max-w-none select-none object-fill opacity-25"
          />
          <img
            src="/dashboard/button-cloud.svg"
            alt=""
            aria-hidden="true"
            className="pointer-events-none absolute left-[46.67%] top-1/2 h-[59.27%] w-[65%] max-w-none select-none"
          />
          {isDisabled && (
            <div className="pointer-events-none absolute inset-0 rounded-full bg-black mix-blend-saturation" />
          )}
        </>
      ) : (
        visibleLayers.map((layer) => {
          const geometry: CSSProperties = {
            left: pxToCqw(layer.left),
            top: pxToCqw(layer.top),
            width: pxToCqw(layer.width),
            height: pxToCqw(layer.height),
          };

          if (layer.src) {
            return (
              <img
                key={layer.id}
                src={layer.src}
                alt=""
                aria-hidden="true"
                draggable="false"
                className="pointer-events-none absolute max-w-none select-none object-fill"
                style={{ ...geometry, ...layer.style }}
              />
            );
          }

          return (
            <div
              key={layer.id}
              className="pointer-events-none absolute select-none"
              style={{ ...geometry, ...layer.style }}
            />
          );
        })
      )}

      <span
        className={`${isCompact ? inter.className : figtree.className} pointer-events-none absolute inset-0 z-[1] flex select-none items-center justify-center whitespace-nowrap font-semibold`}
        style={{
          lineHeight: isCompact ? "normal" : "100%",
          letterSpacing: "0%",
          fontSize: isCompact
            ? "clamp(10px, 5.83cqw, 14px)"
            : pxToCqw(fontSize),
          WebkitFontSmoothing: "antialiased",
          MozOsxFontSmoothing: "grayscale",
        }}
      >
        {text}
      </span>

      <style jsx>{`
        .button-component {
          container-type: inline-size;
          filter: none;
          transform: none;
          transition:
            filter 0.15s ease,
            transform 0.1s ease;
        }
        .button-component:hover:not(:disabled) {
          filter: brightness(1.15) saturate(1.1);
        }
        .button-component:active:not(:disabled) {
          filter: brightness(0.8) saturate(0.95);
          transform: translateY(1px);
        }
        .button-component:disabled {
          filter: none;
        }
      `}</style>
    </button>
  );
}
