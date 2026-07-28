import type { ReactNode } from "react";
import {
  HOME_BACKGROUND_DESIGN_HEIGHT,
  HOME_BACKGROUND_DESIGN_WIDTH,
} from "@/app/home/background/layers";
import {
  HOME_TO_FAQ_BAND_HEIGHT,
  HOME_TO_FAQ_BAND_TOP,
  HOME_TO_FAQ_DESIGN_WIDTH,
  homeToFaqTransitionLayers,
} from "./layers";

type HomeToFaqTransitionProps = {
  children?: ReactNode;
  className?: string;
};

function TransitionBand({
  stageWidth,
  className = "",
  children,
}: {
  stageWidth: string;
  className?: string;
  children?: ReactNode;
}) {
  return (
    <div
      className={`absolute left-1/2 -translate-x-1/2 overflow-visible ${className}`}
      style={{
        top: `calc(${stageWidth} * ${HOME_TO_FAQ_BAND_TOP} / ${HOME_TO_FAQ_DESIGN_WIDTH})`,
        width: stageWidth,
        height: `calc(${stageWidth} * ${HOME_TO_FAQ_BAND_HEIGHT} / ${HOME_TO_FAQ_DESIGN_WIDTH})`,
      }}
    >
      <div className="relative h-full w-full">
        {homeToFaqTransitionLayers.map((layer) => (
          <div
            key={layer.id}
            className="pointer-events-none absolute"
            aria-hidden="true"
            style={{
              left: `${(layer.left / HOME_TO_FAQ_DESIGN_WIDTH) * 100}%`,
              top: `${((layer.top - HOME_TO_FAQ_BAND_TOP) / HOME_TO_FAQ_BAND_HEIGHT) * 100}%`,
              width: `${(layer.width / HOME_TO_FAQ_DESIGN_WIDTH) * 100}%`,
              height: `${(layer.height / HOME_TO_FAQ_BAND_HEIGHT) * 100}%`,
              transform: layer.rotation
                ? `rotate(${layer.rotation}deg)`
                : undefined,
              transformOrigin: "center center",
              zIndex: layer.zIndex,
            }}
          >
            <img
              src={layer.src}
              alt=""
              draggable="false"
              className={
                layer.preserveAspectRatio
                  ? "h-full w-full max-w-none select-none object-contain"
                  : "h-full w-full max-w-none select-none"
              }
            />
          </div>
        ))}
        {children}
      </div>
    </div>
  );
}

export default function HomeToFaqTransition({
  children,
  className = "",
}: HomeToFaqTransitionProps) {
  const stageWidth = `max(100vw, calc(100dvh * ${HOME_BACKGROUND_DESIGN_WIDTH} / ${HOME_BACKGROUND_DESIGN_HEIGHT}))`;
  const mobileStageWidth = "clamp(1560px, 410vw, 1820px)";

  return (
    <>
      <TransitionBand
        stageWidth={mobileStageWidth}
        className={`${className} md:hidden`}
      >
        {children}
      </TransitionBand>

      <TransitionBand
        stageWidth={stageWidth}
        className={`${className} hidden md:block`}
      >
        {children}
      </TransitionBand>
    </>
  );
}
