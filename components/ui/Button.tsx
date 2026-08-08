"use client";

import type { CSSProperties } from "react";
import Link from "next/link";
import Image from "@/components/ui/OptimizedImage";

type CommonButtonProps = {
  className?: string;
  text: string;
  onClick?: () => void;
};

export type PrimaryButtonState =
  | "default"
  | "loading"
  | "success"
  | "error"
  | "disabled";

type PrimaryButtonProps = CommonButtonProps & {
  variant?: "primary";
  state?: PrimaryButtonState;
  /** Uses Next.js client navigation and automatic route prefetching. */
  href?: string;
  /** Native button behavior. Form actions should explicitly use "submit". */
  htmlType?: "button" | "submit";
  width?: number | string;
  /** Overrides the default 240 × 56 artwork ratio. */
  aspectRatio?: string;
  /** Overrides the default 20px Figtree CTA label treatment. */
  textClassName?: string;
};

type DirectionButtonProps = CommonButtonProps & {
  variant: "direction";
  /** Controls chevron placement/style. */
  direction?: "next" | "back";
  /** Hides the direction icon while preserving the direction-button styling. */
  showDirectionIcon?: boolean;
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
  /** Optional direction-label font size. */
  fontSize?: number | string;
  /** Grays out the direction button and blocks onClick. */
  disabled?: boolean;
};

type ButtonProps = PrimaryButtonProps | DirectionButtonProps;

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

const FRAME_WIDTH = 240;
const FRAME_HEIGHT = 56;
const DEFAULT_WIDTH = "240px";
const PRIMARY_BACKGROUND =
  "linear-gradient(110.772deg, #ff7ccd 13.299%, #7839dc 113.68%)";
const SUCCESS_BACKGROUND =
  "linear-gradient(110.772deg, #10b981 13.299%, #07533a 113.68%)";
const ERROR_BACKGROUND =
  "linear-gradient(110.772deg, #ef4444 13.299%, #892727 113.68%)";

function toCssSize(value: number | string): string {
  return typeof value === "number" ? `${value}px` : value;
}

const STATE_BACKGROUNDS: Record<PrimaryButtonState, string> = {
  default: PRIMARY_BACKGROUND,
  loading: PRIMARY_BACKGROUND,
  success: SUCCESS_BACKGROUND,
  error: ERROR_BACKGROUND,
  disabled: PRIMARY_BACKGROUND,
};

const STATE_ICONS: Partial<Record<PrimaryButtonState, string>> = {
  loading: "/landing/button/loading.svg",
  success: "/landing/button/success.svg",
  error: "/landing/button/error.svg",
};

export default function Button(props: ButtonProps) {
  if (props.variant === "direction") {
    const {
      text,
      direction = "next",
      showDirectionIcon = true,
      directionAppearance = "circled",
      directionIconSrc,
      directionIconColor,
      directionTextClassName,
      directionIconSize = 24,
      directionGap = 8,
      directionIconRotation,
      onClick,
      className = "",
      fontSize = 20,
      disabled = false,
    } = props;
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
          <Image
            src={directionIconSrc}
            alt=""
            width={64}
            height={64}
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
        {isBack && showDirectionIcon ? directionIcon : null}
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
        {!isBack && showDirectionIcon ? directionIcon : null}
      </button>
    );
  }

  const {
    text,
    state = "default",
    href,
    htmlType = "button",
    onClick,
    className = "",
    width,
    aspectRatio,
    textClassName,
  } = props;
  const isInteractive = state === "default";
  const stateIcon = STATE_ICONS[state];

  const resolvedWidth =
    width === undefined
      ? DEFAULT_WIDTH
      : typeof width === "number"
        ? `${width}px`
        : width;

  const rootClassName = `button-component group relative isolate inline-flex overflow-hidden rounded-full border-0 p-0 text-white no-underline shadow-[inset_0_2px_3.7px_#fff] transition-shadow duration-150 ${
    isInteractive
      ? "cursor-pointer hover:shadow-[inset_0_2px_3.7px_#fff,0_0_10.7px_#fff] active:shadow-[inset_0_2px_3.7px_#fff]"
      : "cursor-not-allowed"
  } ${className}`;
  const rootStyle: CSSProperties = {
    containerType: "inline-size",
    width: resolvedWidth,
    maxWidth: "100%",
    aspectRatio: aspectRatio ?? `${FRAME_WIDTH} / ${FRAME_HEIGHT}`,
    background: STATE_BACKGROUNDS[state],
  };

  const content = (
    <>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[62.5%] bg-gradient-to-b from-transparent to-[#8da8ff] opacity-60" />
      <div className="pointer-events-none absolute inset-[2px] rounded-full border border-[#df63dc] blur-[0.65px]" />
      <Image
        src="/landing/button/spray.svg"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full max-w-none select-none object-fill mix-blend-screen"
      />
      <Image
        src="/landing/button/stars.svg"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute left-[4.58%] top-[14.29%] h-[43.08%] w-[70.42%] max-w-none select-none object-fill"
      />
      <Image
        src="/landing/button/subtract.svg"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute left-[87.08%] top-[-16.07%] h-[133.93%] w-[14.17%] max-w-none select-none object-fill"
      />
      <Image
        src="/dashboard/button-cloud.svg"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute left-[46.67%] top-1/2 h-[59.27%] w-[65%] max-w-none select-none"
      />
      {isInteractive ? (
        <div className="pointer-events-none absolute inset-0 bg-transparent transition-colors duration-150 group-hover:bg-[rgba(23,23,23,0.15)] group-active:bg-[rgba(23,23,23,0.37)]" />
      ) : null}
      {state === "disabled" ? (
        <>
          <div className="pointer-events-none absolute inset-0 rounded-full bg-black/20" />
          <div className="pointer-events-none absolute inset-0 rounded-full bg-black mix-blend-saturation" />
        </>
      ) : null}

      <span
        className={`pointer-events-none absolute inset-0 z-[1] flex select-none items-center justify-center gap-[5px] whitespace-nowrap ${
          textClassName ?? "font-figtree text-xl font-semibold leading-normal"
        }`}
      >
        {text}
        {stateIcon ? (
          <span className="flex size-5 shrink-0 items-center justify-center">
            <Image
              src={stateIcon}
              alt=""
              width={17}
              height={17}
              aria-hidden="true"
              className={`block max-h-[17px] max-w-[17px] ${
                state === "loading" ? "motion-safe:animate-spin" : ""
              }`}
            />
          </span>
        ) : null}
      </span>
    </>
  );

  if (href && isInteractive) {
    return (
      <Link href={href} className={rootClassName} style={rootStyle}>
        {content}
      </Link>
    );
  }

  return (
    <button
      type={htmlType}
      onClick={isInteractive ? onClick : undefined}
      disabled={!isInteractive}
      aria-busy={state === "loading" || undefined}
      data-state={state}
      className={rootClassName}
      style={rootStyle}
    >
      {content}
    </button>
  );
}
