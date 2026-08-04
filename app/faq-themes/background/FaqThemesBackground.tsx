import type { CSSProperties, ReactNode } from "react";
import {
  HOME_BACKGROUND_DESIGN_HEIGHT,
  HOME_BACKGROUND_DESIGN_WIDTH,
} from "@/app/home/background/layers";
import {
  FAQ_THEMES_DESIGN_HEIGHT,
  FAQ_THEMES_DESIGN_WIDTH,
  foregroundSceneLayers,
  rearSceneLayers,
} from "./layers";
import FaqStaticOverlays from "../faq/FaqStaticOverlays";
import type { FaqThemesSceneLayer } from "./types";

type FaqThemesBackgroundProps = {
  children: ReactNode;
};

function ScenePlane({ layers }: { layers: readonly FaqThemesSceneLayer[] }) {
  return (
    <>
      {layers.map((layer) => {
        const isDesktopOnlyTransitionPiece =
          layer.id === "rectangle-296" || layer.id === "vector-485";

        const pulseStyle: CSSProperties | undefined = layer.pulse
          ? ({
              "--decor-duration": layer.pulse.duration,
              "--decor-delay": layer.pulse.delay,
              "--decor-pulse-min": layer.pulse.min,
              "--decor-pulse-glow": layer.pulse.glow,
              "--decor-pulse-color": layer.pulse.color,
            } as CSSProperties)
          : undefined;

        return (
          <div
            key={layer.id}
            className={`pointer-events-none absolute ${
              layer.pulse ? "" : "overflow-hidden "
            }${isDesktopOnlyTransitionPiece ? "hidden md:block" : ""}`}
            aria-hidden="true"
            data-figma-id={layer.figmaId}
            data-figma-name={layer.figmaName}
            style={{
              left: `${(layer.left / FAQ_THEMES_DESIGN_WIDTH) * 100}%`,
              top: `${(layer.top / FAQ_THEMES_DESIGN_HEIGHT) * 100}%`,
              width: `${(layer.width / FAQ_THEMES_DESIGN_WIDTH) * 100}%`,
              height: `${(layer.height / FAQ_THEMES_DESIGN_HEIGHT) * 100}%`,
              zIndex: layer.zIndex,
              transform: layer.rotation
                ? `rotate(${layer.rotation}deg)`
                : undefined,
              transformOrigin: layer.rotation ? "center center" : undefined,
            }}
          >
            {layer.visibleBounds ? (
              <img
                src={layer.src}
                alt=""
                loading="lazy"
                decoding="async"
                draggable="false"
                className="absolute max-w-none select-none"
                style={{
                  left: `${-(layer.visibleBounds.left / layer.visibleBounds.width) * 100}%`,
                  top: `${-(layer.visibleBounds.top / layer.visibleBounds.height) * 100}%`,
                  width: `${(layer.visibleBounds.imageWidth / layer.visibleBounds.width) * 100}%`,
                  height: `${(layer.visibleBounds.imageHeight / layer.visibleBounds.height) * 100}%`,
                }}
              />
            ) : (
              <img
                src={layer.src}
                alt=""
                loading="lazy"
                decoding="async"
                draggable="false"
                className={`h-full w-full max-w-none select-none${
                  layer.pulse ? " decor-pulse" : ""
                }`}
                style={pulseStyle}
              />
            )}
          </div>
        );
      })}
    </>
  );
}

export default function FaqThemesBackground({
  children,
}: FaqThemesBackgroundProps) {
  const faqBackground =
    "linear-gradient(180deg, #030712 37.54%, #303276 98.56%)";
  const stageWidth = `max(100vw, calc(100dvh * ${HOME_BACKGROUND_DESIGN_WIDTH} / ${HOME_BACKGROUND_DESIGN_HEIGHT}))`;

  return (
    <div
      className="relative w-full overflow-hidden"
      style={{
        background: faqBackground,
        minHeight: "100dvh",
      }}
    >
      <div
        className="relative left-1/2 block -translate-x-1/2 md:hidden"
        style={{
          width: "clamp(1700px, 400vw, 2100px)",
          aspectRatio: `${FAQ_THEMES_DESIGN_WIDTH} / ${FAQ_THEMES_DESIGN_HEIGHT}`,
          background: faqBackground,
          containerType: "inline-size",
          contentVisibility: "auto",
        }}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0"
        >
          <ScenePlane layers={rearSceneLayers} />
        </div>

        <div className="absolute inset-0 z-30">{children}</div>

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-20"
        >
          <ScenePlane layers={foregroundSceneLayers} />
        </div>

        <div className="pointer-events-none absolute inset-0 z-35">
          <FaqStaticOverlays />
        </div>
      </div>

      <div
        className="relative left-1/2 hidden -translate-x-1/2 md:block"
        style={{
          width: stageWidth,
          aspectRatio: `${FAQ_THEMES_DESIGN_WIDTH} / ${FAQ_THEMES_DESIGN_HEIGHT}`,
          background: faqBackground,
          containerType: "inline-size",
          contentVisibility: "auto",
        }}
      >
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0">
          <ScenePlane layers={rearSceneLayers} />
        </div>

        <div className="absolute inset-0 z-30">{children}</div>

        <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-20">
          <ScenePlane layers={foregroundSceneLayers} />
        </div>

        <div className="pointer-events-none absolute inset-0 z-35">
          <FaqStaticOverlays />
        </div>
      </div>
    </div>
  );
}
