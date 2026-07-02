"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";

type ButtonType = "primary" | "disabled";

interface ButtonProps {
  text: string;
  buttonType?: ButtonType;
  onClick?: () => void;
  className?: string;
  style?: CSSProperties;
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

const PRIMARY_BACKGROUND =
  "linear-gradient(95.06deg, #FF7CCD -13.3%, #7839DC 113.68%)";
const DISABLED_BACKGROUND =
  "linear-gradient(95.06deg, #CFCFCF -13.3%, #9A9A9A 113.68%)";

const PILL_RADIUS = 1275.45;
const INNER_SHADOW_OFFSET_Y = 2.55;
const INNER_SHADOW_BLUR = 4.72;
const OUTLINE_OFFSET = 3;
const BASE_FONT_SIZE = 24;

const NON_INTERACTIVE: CSSProperties = {
  pointerEvents: "none",
  userSelect: "none",
};

const px = (value: number, scale: number) => `${value * scale}px`;

const LAYERS: readonly LayerConfig[] = [
  {
    id: "black-white",
    left: 0,
    top: 0.45,
    width: 203,
    height: 73,
    disabledOnly: true,
    style: {
      borderRadius: "999px",
      background: "#000000",
      mixBlendMode: "saturation",
    },
  },
  {
    id: "fog",
    left: 0,
    top: 26.8115,
    width: 306.4150695800781,
    height: 44.68553161621094,
    style: {
      opacity: 0.6,
      background:
        "linear-gradient(180deg, rgba(115, 115, 115, 0) 0%, #8DA8FF 100%)",
    },
  },
  {
    id: "shine",
    left: 3.19184,
    top: 3.19232,
    width: 300.031,
    height: 65.1132,
    style: {
      borderRadius: "32.5566px",
      border: "1.27673px solid",
      borderImage:
        "linear-gradient(122.77deg, #DF63DC 15.87%, rgba(223, 99, 220, 0) 35.52%, rgba(120, 57, 220, 0) 58.79%, rgba(80, 36, 192, 0) 80.16%, rgba(255, 193, 170, 0) 100%) 1",
      filter: "blur(0.829874px)",
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
      filter: "drop-shadow(0 0 1.79px #FFFFFF)",
      mixBlendMode: "screen",
    },
  },
  {
    id: "stars-shadow",
    src: "/landing/button/stars-shadow.svg",
    left: 14.04,
    top: 10.22,
    width: 215.7679443359375,
    height: 30.798866271972656,
  },
  {
    id: "stars",
    src: "/landing/button/stars.svg",
    left: 3.04,
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
];

function useScale() {
  const ref = useRef<HTMLButtonElement | null>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new ResizeObserver(([entry]) => {
      setScale(entry.contentRect.width / FRAME_WIDTH);
    });

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return [ref, scale] as const;
}

export default function Button({
  text,
  buttonType = "primary",
  onClick,
  className = "",
  style,
}: ButtonProps) {
  const isDisabled = buttonType === "disabled";
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [ref, scale] = useScale();

  const interactiveFilter = isDisabled
    ? "grayscale(1) saturate(0.95) brightness(0.96)"
    : isPressed
      ? "brightness(0.86) saturate(0.98)"
      : isHovered
        ? "brightness(1.08) saturate(1.08)"
        : "none";

  const interactiveTransform = isDisabled
    ? "none"
    : isPressed
      ? "translateY(1px)"
      : isHovered
        ? "translateY(-1px)"
        : "none";

  const visibleLayers = LAYERS.filter(
    (layer) => !layer.disabledOnly || isDisabled,
  );

  return (
    <button
      ref={ref}
      onClick={!isDisabled ? onClick : undefined}
      disabled={isDisabled}
      className={className}
      style={{
        position: "relative",
        isolation: "isolate",
        display: "inline-flex",
        width: "clamp(180px, 20vw, 206px)",
        aspectRatio: `${FRAME_WIDTH} / ${FRAME_HEIGHT}`,
        padding: 0,
        border: "none",
        background: isDisabled ? DISABLED_BACKGROUND : PRIMARY_BACKGROUND,
        color: "#ffffff",
        fontFamily: "'Inter', 'Segoe UI', sans-serif",
        fontSize: px(BASE_FONT_SIZE, scale),
        fontWeight: 600,
        lineHeight: 1,
        overflow: "hidden",
        borderRadius: px(PILL_RADIUS, scale),
        boxShadow: `inset 0 ${px(INNER_SHADOW_OFFSET_Y, scale)} ${px(INNER_SHADOW_BLUR, scale)} #FFFFFF`,
        outlineOffset: px(OUTLINE_OFFSET, scale),
        filter: interactiveFilter,
        transform: interactiveTransform,
        transition: "filter 0.15s ease, transform 0.1s ease",
        ...style,
      }}
      onPointerEnter={() => setIsHovered(true)}
      onPointerLeave={() => {
        setIsHovered(false);
        setIsPressed(false);
      }}
      onPointerDown={() => !isDisabled && setIsPressed(true)}
      onPointerUp={() => setIsPressed(false)}
      onPointerCancel={() => setIsPressed(false)}
      onBlur={() => setIsPressed(false)}
    >
      {visibleLayers.map((layer) => {
        const geometry: CSSProperties = {
          position: "absolute",
          left: px(layer.left, scale),
          top: px(layer.top, scale),
          width: px(layer.width, scale),
          height: px(layer.height, scale),
        };

        if (layer.src) {
          return (
            <img
              key={layer.id}
              src={layer.src}
              alt=""
              aria-hidden="true"
              draggable="false"
              style={{
                ...geometry,
                ...NON_INTERACTIVE,
                maxWidth: "none",
                objectFit: "fill",
                ...layer.style,
              }}
            />
          );
        }

        return (
          <div
            key={layer.id}
            style={{
              ...geometry,
              ...NON_INTERACTIVE,
              ...layer.style,
            }}
          />
        );
      })}

      <span
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          whiteSpace: "nowrap",
          ...NON_INTERACTIVE,
        }}
      >
        {text}
      </span>
    </button>
  );
}
