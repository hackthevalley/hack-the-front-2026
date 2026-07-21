"use client";

import type { CSSProperties, ReactNode, SVGProps } from "react";
import { FAQ_ITEMS, type FaqIconId } from "./faqContent";
import { toScale, toStageHeight, toStageWidth, toStageX, toStageY } from "./faqStage";

const BUTTON_BASE_X = 262;
const BUTTON_BASE_Y = 225;
const BUTTON_VERTICAL_STEP = 113;
const BUTTON_WIDTH = 480;
const BUTTON_HEIGHT = 80;

const FAQ_BUTTON_BASE_FILL =
  "linear-gradient(91.64deg, rgba(1, 5, 53, 0.9) 43.53%, rgba(25, 41, 133, 0.9) 100%)";
const FAQ_BUTTON_IDLE_GLOW =
  "radial-gradient(62% 125% at 87% 50%, rgba(93,117,255,.20) 0%, rgba(93,117,255,0) 56%)";
const FAQ_BUTTON_ACTIVE_GLOW =
  "radial-gradient(70% 140% at 86% 52%, rgba(88,111,255,.28) 0%, rgba(88,111,255,0) 58%)";

const ICON_BACKGROUNDS: Record<FaqIconId, string> = {
  help: "linear-gradient(180deg,#B553EA,#7B3EE0)",
  bag: "linear-gradient(180deg,#6A8DFF,#4060E1)",
  dollar: "linear-gradient(180deg,#63B7A4,#2C8473)",
  shield: "linear-gradient(180deg,#C04FF0,#7C37DE)",
  search: "linear-gradient(180deg,#7B8CFF,#4A5FE7)",
  calendar: "linear-gradient(180deg,#63B7A4,#2C8473)",
};

function QuestionIcon({
  icon,
  style,
}: {
  icon: FaqIconId;
  style?: CSSProperties;
}) {
  const iconStyleMap: Record<FaqIconId, CSSProperties> = {
    help: {
      width: "66%",
      height: "66%",
    },
    bag: {
      width: "69%",
      height: "69%",
    },
    dollar: {
      width: "70%",
      height: "70%",
      transform: "scaleX(1.06)",
    },
    shield: {
      width: "69%",
      height: "69%",
      transform: "scaleX(1.03)",
    },
    search: {
      width: "69%",
      height: "69%",
    },
    calendar: {
      width: "70%",
      height: "70%",
      transform: "scaleX(1.03)",
    },
  };

  const commonProps: SVGProps<SVGSVGElement> = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    style: iconStyleMap[icon],
    "aria-hidden": true,
  };

  let iconSvg: ReactNode;

  switch (icon) {
    case "bag":
      iconSvg = (
        <svg {...commonProps}>
          <rect x="5.5" y="8.5" width="13" height="11" rx="2.5" />
          <path d="M9 8.5V7.4A3 3 0 0 1 12 4.6a3 3 0 0 1 3 2.8v1.1" />
          <path d="M9.5 12.8v2.8" />
          <path d="M14.5 12.8v2.8" />
        </svg>
      );
      break;
    case "dollar":
      iconSvg = (
        <svg {...commonProps}>
          <path d="M12 3v18" />
          <path d="M16 7.5c0-1.9-1.8-3-4-3s-4 1.1-4 3 1.6 2.7 4 3 4 1.1 4 3-1.8 3-4 3-4-1.1-4-3" />
        </svg>
      );
      break;
    case "shield":
      iconSvg = (
        <svg {...commonProps}>
          <path d="M12 4.1 17.4 6.3v4.8c0 3.9-2.2 7.3-5.4 9.1-3.2-1.8-5.4-5.2-5.4-9.1V6.3z" />
          <path d="m9.5 11.8 1.7 1.8 3.4-3.5" />
        </svg>
      );
      break;
    case "search":
      iconSvg = (
        <svg {...commonProps}>
          <circle cx="10.5" cy="10.5" r="5.7" />
          <path d="m15 15 4.2 4.2" />
        </svg>
      );
      break;
    case "calendar":
      iconSvg = (
        <svg {...commonProps}>
          <rect x="4.5" y="6.5" width="15" height="13" rx="2.2" />
          <path d="M8 4.3v4.2" />
          <path d="M16 4.3v4.2" />
          <path d="M4.5 10.2h15" />
          <path d="M8.2 13.6h.01" />
          <path d="M12 13.6h.01" />
          <path d="M15.8 13.6h.01" />
        </svg>
      );
      break;
    case "help":
    default:
      iconSvg = (
        <svg {...commonProps}>
          <circle cx="12" cy="12" r="8" />
          <path d="M9.8 9.3A2.6 2.6 0 0 1 12 8c1.4 0 2.5.9 2.5 2.2 0 1-.5 1.6-1.6 2.2-.9.5-1.4 1-1.4 2" />
          <path d="M12 17h.01" />
        </svg>
      );
      break;
  }

  return (
    <span
      className="grid shrink-0 place-items-center rounded-full text-white"
      style={{
        width: toScale(48),
        height: toScale(48),
        background: ICON_BACKGROUNDS[icon],
        boxShadow: "inset 0 0 0 1px rgba(255,255,255,.18)",
        ...style,
      }}
    >
      {iconSvg}
    </span>
  );
}

type FaqQuestionListProps = {
  activeId: string | null;
  onSelect: (id: string) => void;
};

export default function FaqQuestionList({
  activeId,
  onSelect,
}: FaqQuestionListProps) {
  return (
    <section aria-label="Frequently asked questions">
      {FAQ_ITEMS.map((item, index) => {
        const isActive = activeId === item.id;
        const baseTop = BUTTON_BASE_Y + index * BUTTON_VERTICAL_STEP;
        const left = isActive ? item.buttonPose.x : BUTTON_BASE_X;
        const top = isActive ? item.buttonPose.y : baseTop;
        const rotateDeg = isActive ? item.buttonPose.rotateDeg : 0;

        return (
          <button
            key={item.id}
            type="button"
            aria-pressed={isActive}
            onClick={() => onSelect(item.id)}
            className="absolute flex cursor-pointer items-center border border-white/10 text-left font-medium text-[#E5E7EB] outline-none focus-visible:ring-2 focus-visible:ring-white/60"
            style={{
              left: toStageX(left),
              top: toStageY(top),
              width: toStageWidth(BUTTON_WIDTH),
              height: toStageHeight(BUTTON_HEIGHT),
              paddingInline: toScale(24),
              paddingBlock: toScale(12),
              gap: toScale(10),
              borderRadius: toScale(16),
              fontSize: toScale(20),
              transform: `rotate(${rotateDeg}deg)`,
              transformOrigin: "center center",
              zIndex: isActive ? 30 : 25,
              transition:
                "left 280ms cubic-bezier(.22,.61,.36,1), top 280ms cubic-bezier(.22,.61,.36,1), transform 280ms cubic-bezier(.22,.61,.36,1), box-shadow 220ms ease, border-color 220ms ease, opacity 220ms ease",
              boxShadow: isActive
                ? "0 16px 32px rgba(8,10,38,.35), inset 0 0 0 1px rgba(255,255,255,.28)"
                : "0 12px 30px rgba(0,0,0,.22)",
              borderColor: isActive ? "rgba(255,255,255,.38)" : "rgba(255,255,255,.10)",
              background: isActive
                ? [FAQ_BUTTON_ACTIVE_GLOW, FAQ_BUTTON_BASE_FILL].join(", ")
                : [FAQ_BUTTON_IDLE_GLOW, FAQ_BUTTON_BASE_FILL].join(", "),
            }}
          >
            <QuestionIcon icon={item.icon} />
            <span className="grow">{item.label}</span>
            <span
              aria-hidden="true"
              className="text-white/70"
              style={{ marginLeft: toScale(16), fontSize: toScale(24) }}
            >
              {isActive ? "\u2039" : "\u203A"}
            </span>
          </button>
        );
      })}
    </section>
  );
}
