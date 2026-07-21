"use client";

import type { ReactNode } from "react";
import {
  FAQ_DEFAULT_CARD,
  type FaqDefaultCard,
  type FaqItem,
  type FaqTextRun,
} from "./faqContent";
import { useFaqTypewriter } from "./useFaqTypewriter";
import {
  PAPER_FRAME,
  PAPER_VISIBLE_BOUNDS,
  STAMP_FRAME_SIZE,
  toPaperX,
  toPaperY,
  toScale,
  toStageHeight,
  toStageWidth,
  toStageX,
  toStageY,
} from "./faqStage";

function renderRuns(runs: readonly FaqTextRun[]) {
  return runs.map((run, index) => {
    const className = [
      run.weight === "bold" ? "font-bold" : undefined,
      run.style === "italic" ? "italic" : undefined,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <span key={`${run.text}-${index}`} className={className || undefined}>
        {run.text}
      </span>
    );
  });
}

function PaperAsset() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <img
        src="/faq-themes/background/paper.png"
        alt=""
        draggable="false"
        className="absolute max-w-none select-none"
        style={{
          left: `${-(PAPER_VISIBLE_BOUNDS.left / PAPER_VISIBLE_BOUNDS.width) * 100}%`,
          top: `${-(PAPER_VISIBLE_BOUNDS.top / PAPER_VISIBLE_BOUNDS.height) * 100}%`,
          width: `${(PAPER_VISIBLE_BOUNDS.imageWidth / PAPER_VISIBLE_BOUNDS.width) * 100}%`,
          height: `${(PAPER_VISIBLE_BOUNDS.imageHeight / PAPER_VISIBLE_BOUNDS.height) * 100}%`,
        }}
      />
    </div>
  );
}

function Stamp({
  x,
  y,
  rotateDeg,
  scale,
}: {
  x: number;
  y: number;
  rotateDeg: number;
  scale: number;
}) {
  return (
    <img
      src="/faq-themes/background/stamp.png"
      alt=""
      draggable="false"
      className="absolute select-none"
      style={{
        left: toPaperX(x),
        top: toPaperY(y),
        width: toPaperX(STAMP_FRAME_SIZE),
        height: toPaperY(STAMP_FRAME_SIZE),
        transform: `rotate(${rotateDeg}deg) scale(${scale})`,
        transformOrigin: "center center",
      }}
    />
  );
}

function DefaultCardContent({ card }: { card: FaqDefaultCard }) {
  return (
    <div
      className="absolute text-[#121221]"
      style={{
        left: toPaperX(56),
        top: toPaperY(67),
        width: toPaperX(358),
        height: toPaperY(496),
      }}
    >
      <p
        className="m-0 font-bold uppercase text-[#12184e]"
        style={{ fontSize: toScale(20), lineHeight: toScale(28) }}
      >
        {card.eyebrow}
      </p>
      <h2
        className="m-0 font-bold"
        style={{ marginTop: toScale(14), fontSize: toScale(34), lineHeight: toScale(42) }}
      >
        {card.titleLines.map((line) => (
          <span key={line} className="block whitespace-nowrap">
            {line}
          </span>
        ))}
      </h2>
      <div
        className="text-[#12184e]"
        style={{
          marginTop: toScale(34),
          width: "100%",
          fontSize: toScale(18),
          lineHeight: toScale(28),
        }}
      >
        {card.body.map((block, index) => (
          <p key={index} className="m-0">
            {renderRuns(block.runs)}
          </p>
        ))}
      </div>
      <div style={{ marginTop: toScale(88) }}>
        <p
          className="m-0 font-semibold"
          style={{ fontSize: toScale(24), lineHeight: toScale(32) }}
        >
          {card.closingHeading}
        </p>
        <p
          className="m-0 italic text-[#12184e]"
          style={{ marginTop: toScale(10), fontSize: toScale(20), lineHeight: toScale(28) }}
        >
          {card.closingText}
        </p>
      </div>
    </div>
  );
}

function SelectedCardContent({ item }: { item: FaqItem }) {
  const content = useFaqTypewriter(item);

  return (
    <div
      className="absolute text-[#12184e]"
      style={{
        left: toPaperX(56),
        top: toPaperY(64),
        width: toPaperX(358),
        height: toPaperY(458),
      }}
    >
      <p
        className="absolute right-0 top-0 m-0 text-right font-bold uppercase"
        style={{
          width: "64%",
          fontSize: toScale(15),
          lineHeight: toScale(18),
          letterSpacing: "0.04em",
        }}
      >
        {renderRuns(content.header)}
      </p>

      <h3
        className="m-0 text-[#121221]"
        style={{
          marginTop: toScale(108),
          fontSize: toScale(28),
          lineHeight: toScale(32),
        }}
      >
        {renderRuns(content.salutation)}
      </h3>

      <div
        className="text-[#12184e]"
        style={{
          marginTop: toScale(24),
          width: "100%",
          fontSize: toScale(18),
          lineHeight: toScale(22),
        }}
      >
        {content.blocks.map((runs, index) => (
          <p
            key={index}
            className="m-0"
            style={{ marginTop: index === 0 ? "0" : toScale(18) }}
          >
            {renderRuns(runs)}
          </p>
        ))}
      </div>

      <p
        className="absolute bottom-0 right-0 m-0 text-[#121221]"
        style={{
          fontSize: toScale(18),
          lineHeight: toScale(22),
        }}
      >
        {renderRuns(content.signature)}
      </p>
    </div>
  );
}

type FaqPaperPanelProps = {
  activeItem: FaqItem | null;
};

export default function FaqPaperPanel({ activeItem }: FaqPaperPanelProps) {
  const paperPose = activeItem?.paperPose ?? FAQ_DEFAULT_CARD.paperPose;
  const stampPose = activeItem?.stampPose ?? FAQ_DEFAULT_CARD.stampPose;

  let contentNode: ReactNode;

  if (activeItem) {
    contentNode = <SelectedCardContent item={activeItem} />;
  } else {
    contentNode = <DefaultCardContent card={FAQ_DEFAULT_CARD} />;
  }

  return (
    <div
      className="pointer-events-none absolute"
      style={{
        left: toStageX(paperPose.x),
        top: toStageY(paperPose.y),
        width: toStageWidth(PAPER_FRAME.width),
        height: toStageHeight(PAPER_FRAME.height),
        transform: `rotate(${paperPose.rotateDeg}deg)`,
        transformOrigin: "center center",
        zIndex: 13,
        transition:
          "left 320ms cubic-bezier(.22,.61,.36,1), top 320ms cubic-bezier(.22,.61,.36,1), transform 320ms cubic-bezier(.22,.61,.36,1)",
      }}
    >
      <PaperAsset />
      <Stamp {...stampPose} />
      {contentNode}
    </div>
  );
}
