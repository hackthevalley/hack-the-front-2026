import type { ReactNode } from "react";
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
      {layers.map((layer) => (
        <div
          key={layer.id}
          className="pointer-events-none absolute overflow-hidden"
          aria-hidden="true"
          data-figma-id={layer.figmaId}
          data-figma-name={layer.figmaName}
          style={{
            left: `${(layer.left / FAQ_THEMES_DESIGN_WIDTH) * 100}%`,
            top: `${(layer.top / FAQ_THEMES_DESIGN_HEIGHT) * 100}%`,
            width: `${(layer.width / FAQ_THEMES_DESIGN_WIDTH) * 100}%`,
            height: `${(layer.height / FAQ_THEMES_DESIGN_HEIGHT) * 100}%`,
            zIndex: layer.zIndex,
          }}
        >
          {layer.visibleBounds ? (
            <img
              src={layer.src}
              alt=""
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
              draggable="false"
              className="h-full w-full max-w-none select-none"
            />
          )}
        </div>
      ))}
    </>
  );
}

export default function FaqThemesBackground({
  children,
}: FaqThemesBackgroundProps) {
  return (
    <div
      className="relative w-full overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, #030712 0%, #0e1648 42%, #303276 100%)",
        minHeight: "100dvh",
      }}
    >
      <div
        className="relative left-1/2 -translate-x-1/2"
        style={{
          width: `max(100vw, calc(100dvh * ${FAQ_THEMES_DESIGN_WIDTH} / ${FAQ_THEMES_DESIGN_HEIGHT}))`,
          aspectRatio: `${FAQ_THEMES_DESIGN_WIDTH} / ${FAQ_THEMES_DESIGN_HEIGHT}`,
          background:
            "linear-gradient(180deg, #030712 0%, #0e1648 42%, #303276 100%)",
          containerType: "inline-size",
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
