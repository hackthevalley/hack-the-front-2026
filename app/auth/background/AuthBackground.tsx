import type { CSSProperties, ReactNode } from "react";
import {
  AUTH_BACKGROUND_DESIGN_HEIGHT,
  AUTH_BACKGROUND_DESIGN_WIDTH,
  AUTH_BACKGROUND_GRADIENT,
  authBackgroundLayers,
} from "./layers";

type AuthBackgroundProps = {
  children?: ReactNode;
};

export default function AuthBackground({ children }: AuthBackgroundProps) {
  const stageWidth = `max(100vw, calc(100dvh * ${AUTH_BACKGROUND_DESIGN_WIDTH} / ${AUTH_BACKGROUND_DESIGN_HEIGHT}))`;

  return (
    <div className="relative h-[100dvh] w-full overflow-hidden bg-[#0a0324]">
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{
          width: stageWidth,
          aspectRatio: `${AUTH_BACKGROUND_DESIGN_WIDTH} / ${AUTH_BACKGROUND_DESIGN_HEIGHT}`,
          background: AUTH_BACKGROUND_GRADIENT,
        }}
      >
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          {authBackgroundLayers.map((layer) => {
            const bleed = layer.bleed;
            const imageStyle: CSSProperties | undefined = bleed
              ? {
                  left: `${-bleed.left}%`,
                  top: `${-bleed.top}%`,
                  width: `${100 + bleed.left + bleed.right}%`,
                  height: `${100 + bleed.top + bleed.bottom}%`,
                }
              : undefined;

            return (
              <div
                key={layer.id}
                className="absolute"
                data-figma-id={layer.figmaId}
                style={{
                  left: `${(layer.left / AUTH_BACKGROUND_DESIGN_WIDTH) * 100}%`,
                  top: `${(layer.top / AUTH_BACKGROUND_DESIGN_HEIGHT) * 100}%`,
                  width: `${(layer.width / AUTH_BACKGROUND_DESIGN_WIDTH) * 100}%`,
                  height: `${(layer.height / AUTH_BACKGROUND_DESIGN_HEIGHT) * 100}%`,
                  transform: layer.transform,
                  transformOrigin: layer.transform ? "center center" : undefined,
                  zIndex: layer.zIndex,
                }}
              >
                <img
                  src={layer.src}
                  alt=""
                  draggable="false"
                  className={
                    bleed
                      ? "absolute max-w-none select-none"
                      : "h-full w-full max-w-none select-none"
                  }
                  style={imageStyle}
                />
              </div>
            );
          })}
        </div>

        <div className="absolute inset-0 z-30">{children}</div>
      </div>
    </div>
  );
}
