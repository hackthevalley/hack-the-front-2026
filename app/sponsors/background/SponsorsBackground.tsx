import type { ReactNode } from "react";
import {
  SPONSORS_BACKGROUND_LAYER,
  SPONSORS_DESIGN_HEIGHT,
  SPONSORS_DESIGN_WIDTH,
} from "./layers";

type SponsorsBackgroundProps = {
  children?: ReactNode;
};

export default function SponsorsBackground({
  children,
}: SponsorsBackgroundProps) {
  const stageWidth = `max(100vw, calc(100dvh * ${SPONSORS_DESIGN_WIDTH} / ${SPONSORS_DESIGN_HEIGHT}))`;

  return (
    <div className="relative min-h-dvh w-full overflow-hidden bg-[#040815]">
      <div
        className="relative left-1/2 -translate-x-1/2 overflow-hidden"
        style={{
          width: stageWidth,
          aspectRatio: `${SPONSORS_DESIGN_WIDTH} / ${SPONSORS_DESIGN_HEIGHT}`,
          background: "#040815",
          containerType: "inline-size",
        }}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute"
          data-figma-id="1715:11601"
          data-figma-name="sponsors background"
          style={{
            left: `${(SPONSORS_BACKGROUND_LAYER.left / SPONSORS_DESIGN_WIDTH) * 100}%`,
            top: `${(SPONSORS_BACKGROUND_LAYER.top / SPONSORS_DESIGN_HEIGHT) * 100}%`,
            width: `${(SPONSORS_BACKGROUND_LAYER.width / SPONSORS_DESIGN_WIDTH) * 100}%`,
            height: `${(SPONSORS_BACKGROUND_LAYER.height / SPONSORS_DESIGN_HEIGHT) * 100}%`,
          }}
        >
          <img
            src={SPONSORS_BACKGROUND_LAYER.src}
            alt=""
            draggable="false"
            className="h-full w-full max-w-none select-none"
          />
        </div>

        {children}
      </div>
    </div>
  );
}
