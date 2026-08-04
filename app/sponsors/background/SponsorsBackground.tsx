import type { ReactNode } from "react";
import MobileSponsorsContent from "../MobileSponsorsContent";
import {
  SPONSORS_BACKGROUND_LAYER,
  SPONSORS_DESIGN_HEIGHT,
  SPONSORS_DESIGN_WIDTH,
  SPONSORS_TEAM_WAVE_LAYER,
} from "./layers";

type SponsorsBackgroundProps = {
  children?: ReactNode;
  stageWidth?: string;
};

export default function SponsorsBackground({
  children,
  stageWidth,
}: SponsorsBackgroundProps) {
  const resolvedStageWidth =
    stageWidth ??
    `max(100vw, calc(100dvh * ${SPONSORS_DESIGN_WIDTH} / ${SPONSORS_DESIGN_HEIGHT}))`;

  return (
    <div
      className="relative min-h-dvh w-full overflow-visible"
      style={{
        background:
          "linear-gradient(0deg, #040A15 88.61%, #080E32 109.06%)",
      }}
    >
      <div
        className="relative left-1/2 -translate-x-1/2 overflow-visible max-md:!w-full max-md:!aspect-auto"
        style={{
          width: resolvedStageWidth,
          aspectRatio: `${SPONSORS_DESIGN_WIDTH} / ${SPONSORS_DESIGN_HEIGHT}`,
          background:
            "linear-gradient(0deg, #040A15 88.61%, #080E32 109.06%)",
          containerType: "inline-size",
          contentVisibility: "auto",
        }}
      >
        <div className="pointer-events-none absolute inset-0 hidden overflow-hidden md:block">
          <div
            aria-hidden="true"
            className="absolute"
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

          <div
            aria-hidden="true"
            className="absolute z-[3]"
            data-figma-id="1617:6099"
            data-figma-name="Vector 343"
            style={{
              left: `${(SPONSORS_TEAM_WAVE_LAYER.left / SPONSORS_DESIGN_WIDTH) * 100}%`,
              top: `${(SPONSORS_TEAM_WAVE_LAYER.top / SPONSORS_DESIGN_HEIGHT) * 100}%`,
              width: `${(SPONSORS_TEAM_WAVE_LAYER.width / SPONSORS_DESIGN_WIDTH) * 100}%`,
              height: `${(SPONSORS_TEAM_WAVE_LAYER.height / SPONSORS_DESIGN_HEIGHT) * 100}%`,
              transform: `rotate(${SPONSORS_TEAM_WAVE_LAYER.rotation}deg)`,
              transformOrigin: "center",
            }}
          >
            <img
              src={SPONSORS_TEAM_WAVE_LAYER.src}
              alt=""
              draggable="false"
              className="h-full w-full max-w-none select-none"
            />
          </div>
        </div>

        <MobileSponsorsContent />
        <div className="hidden md:contents">{children}</div>
      </div>
    </div>
  );
}
