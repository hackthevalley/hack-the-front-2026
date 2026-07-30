"use client";

import type { CSSProperties } from "react";
import Link from "next/link";

type ButtonProps = {
  className?: string;
  text: string;
  buttonType?: "primary" | "disabled" | "direction";
  /** Only used when buttonType is "direction". Controls chevron placement/style. */
  direction?: "next" | "back";
  /** Uses a supplied direction icon instead of the default circled chevron. */
  directionIconSrc?: string;
  /** Recolors a supplied direction icon while preserving its SVG shape. */
  directionIconColor?: string;
  /** Overrides the direction label typography without changing other variants. */
  directionTextClassName?: string;
  /** Direction buttons are circled by default; focused flows can opt into a plain icon. */
  directionAppearance?: "circled" | "plain";
  directionIconSize?: number | string;
  directionGap?: number | string;
  /** Rotation applied to an exported direction icon. */
  directionIconRotation?: number;
  /** Uses Next.js client navigation and automatic route prefetching. */
  href?: string;
  /** Native button behavior. Form actions should explicitly use "submit". */
  htmlType?: "button" | "submit";
  onClick?: () => void;
  width?: number | string;
  /** Overrides the default button artwork ratio for compact design variants. */
  aspectRatio?: string;
  /** Uses the compact 240 × 56 artwork geometry from the dashboard design. */
  artworkVariant?: "default" | "compact";
  /** Optional design-frame font size. Defaults to the shared 20px label size. */
  fontSize?: number | string;
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

function toCssSize(value: number | string): string {
  return typeof value === "number" ? `${value}px` : value;
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
  directionAppearance = "circled",
  directionIconSrc,
  directionIconColor,
  directionTextClassName,
  directionIconSize = 24,
  directionGap = 8,
  directionIconRotation,
  href,
  htmlType = "button",
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
    const isPlain = directionAppearance === "plain";

    const directionIcon = (
      <span
        className={`flex shrink-0 items-center justify-center ${
          isPlain
            ? ""
            : `rounded-full border-2 ${
                disabled ? "border-white/40" : "border-white"
              }`
        }`}
        style={{
          width: toCssSize(directionIconSize),
          height: toCssSize(directionIconSize),
        }}
      >
        {directionIconSrc && directionIconColor ? (
          <span
            aria-hidden="true"
            className="block"
            style={{
              width: "75.8%",
              height: "44.22%",
              backgroundColor: directionIconColor,
              maskImage: `url("${directionIconSrc}")`,
              maskPosition: "center",
              maskRepeat: "no-repeat",
              maskSize: "contain",
              WebkitMaskImage: `url("${directionIconSrc}")`,
              WebkitMaskPosition: "center",
              WebkitMaskRepeat: "no-repeat",
              WebkitMaskSize: "contain",
              transform: `rotate(${
                directionIconRotation ?? (isBack ? -90 : 90)
              }deg)`,
            }}
          />
        ) : directionIconSrc ? (
          <img
            src={directionIconSrc}
            alt=""
            aria-hidden="true"
            className="block max-w-none"
            style={{
              width: "75.8%",
              height: "44.22%",
              transform: `rotate(${
                directionIconRotation ?? (isBack ? -90 : 90)
              }deg)`,
            }}
          />
        ) : (
          <ChevronIcon
            direction={isBack ? "left" : "right"}
            className={isPlain ? "h-[44.22%] w-[75.8%]" : "h-3 w-3"}
          />
        )}
      </span>
    );

    return (
      <button
        type="button"
        onClick={disabled ? undefined : onClick}
        disabled={disabled}
        aria-disabled={disabled}
        className={`inline-flex items-center border-0 bg-transparent p-0 text-white transition-opacity ${
          disabled
            ? "cursor-not-allowed opacity-40"
            : "cursor-pointer hover:opacity-70"
        } ${className}`}
        style={{ gap: toCssSize(directionGap) }}
      >
        {isBack ? directionIcon : null}
        <span
          className={
            directionTextClassName ??
            "font-figtree font-semibold leading-[normal]"
          }
          style={{
            fontSize: directionTextClassName ? undefined : toCssSize(fontSize),
          }}
        >
          {text}
        </span>
        {!isBack ? directionIcon : null}
      </button>
    );
  }

  const isDisabled = buttonType === "disabled";
  const isCompact = artworkVariant === "compact";

  const visibleLayers = LAYERS.filter(
    (layer) => !layer.disabledOnly || isDisabled,
  );

  const resolvedWidth =
    width === undefined
      ? DEFAULT_WIDTH
      : typeof width === "number"
        ? `${width}px`
        : width;

  const rootClassName = `button-component relative isolate inline-flex overflow-hidden border-0 p-0 text-white no-underline transition-[filter,transform] duration-150 ${
    isDisabled
      ? "cursor-default"
      : "cursor-pointer hover:[filter:brightness(1.15)_saturate(1.1)] active:translate-y-px active:[filter:brightness(0.8)_saturate(0.95)]"
  } ${className}`;
  const rootStyle: CSSProperties = {
    containerType: "inline-size",
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
  };

  const content = (
    <>
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
        className={`${isCompact ? "font-inter" : "font-figtree"} pointer-events-none absolute inset-0 z-[1] flex select-none items-center justify-center whitespace-nowrap font-semibold`}
        style={{
          lineHeight: isCompact ? "normal" : "100%",
          letterSpacing: "0%",
          fontSize: isCompact
            ? "clamp(10px, 5.83cqw, 14px)"
            : typeof fontSize === "number"
              ? pxToCqw(fontSize)
              : fontSize,
          WebkitFontSmoothing: "antialiased",
          MozOsxFontSmoothing: "grayscale",
        }}
      >
        {text}
      </span>

    </>
  );

  if (href && !isDisabled) {
    return (
      <Link href={href} className={rootClassName} style={rootStyle}>
        {content}
      </Link>
    );
  }

  return (
    <button
      type={htmlType}
      onClick={!isDisabled ? onClick : undefined}
      disabled={isDisabled}
      className={rootClassName}
      style={rootStyle}
    >
      {content}
    </button>
  );
}
