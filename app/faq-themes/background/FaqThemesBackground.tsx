import type { ReactNode } from "react";
import {
  FAQ_THEMES_DESIGN_HEIGHT,
  FAQ_THEMES_DESIGN_WIDTH,
  foregroundSceneLayers,
  rearSceneLayers,
} from "./layers";
import type { FaqThemesSceneLayer } from "./types";

type FaqThemesBackgroundProps = {
  children: ReactNode;
};

function ScenePlane({ layers }: { layers: readonly FaqThemesSceneLayer[] }) {
  return (
    <>
      {layers.map((layer) => (
        <img
          key={layer.id}
          src={layer.src}
          alt=""
          aria-hidden="true"
          draggable="false"
          className="pointer-events-none absolute max-w-none select-none"
          data-figma-id={layer.figmaId}
          data-figma-name={layer.figmaName}
          style={{
            left: layer.left,
            top: layer.top,
            width: layer.width,
            height: layer.height,
            zIndex: layer.zIndex,
          }}
        />
      ))}
    </>
  );
}

export default function FaqThemesBackground({
  children,
}: FaqThemesBackgroundProps) {
  return (
    <div
      className="relative shrink-0 overflow-hidden"
      style={{
        width: FAQ_THEMES_DESIGN_WIDTH,
        height: FAQ_THEMES_DESIGN_HEIGHT,
        background:
          "linear-gradient(180deg, #030712 0%, #0e1648 42%, #303276 100%)",
      }}
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0">
        <ScenePlane layers={rearSceneLayers} />
      </div>

      <div className="absolute inset-0 z-10">{children}</div>

      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-20">
        <ScenePlane layers={foregroundSceneLayers} />
      </div>
    </div>
  );
}
