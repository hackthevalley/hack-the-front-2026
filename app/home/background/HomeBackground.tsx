import type { ReactNode } from "react";
import HomeNavbar from "@/components/layout/HomeNavbar";
import Button from "@/components/ui/Button";

import type { ReactNode } from "react";
import {
  HOME_BACKGROUND_DESIGN_HEIGHT,
  HOME_BACKGROUND_DESIGN_WIDTH,
  homeBackgroundLayers,
} from "./layers";

const HOME_BACKGROUND_GRADIENT =
  "linear-gradient(181deg, #040142 9.13%, #DF63DC 25%)";

type HomeBackgroundProps = {
  children?: ReactNode;
};

export default function HomeBackground({ children }: HomeBackgroundProps) {
  return (
    <div
      className="relative w-full overflow-hidden"
      style={{
        minHeight: "100dvh",
        background: HOME_BACKGROUND_GRADIENT,
      }}
    >
      <div
        className="relative left-1/2 -translate-x-1/2"
        style={{
          width: `max(100vw, calc(100dvh * ${HOME_BACKGROUND_DESIGN_WIDTH} / ${HOME_BACKGROUND_DESIGN_HEIGHT}))`,
          aspectRatio: `${HOME_BACKGROUND_DESIGN_WIDTH} / ${HOME_BACKGROUND_DESIGN_HEIGHT}`,
          background: HOME_BACKGROUND_GRADIENT,
        }}
      >
        {homeBackgroundLayers.map((layer) => (
          <div
            key={layer.id}
            className="absolute"
            style={{
              left: `${(layer.left / HOME_BACKGROUND_DESIGN_WIDTH) * 100}%`,
              top: `${(layer.top / HOME_BACKGROUND_DESIGN_HEIGHT) * 100}%`,
              width: `${(layer.width / HOME_BACKGROUND_DESIGN_WIDTH) * 100}%`,
              height: `${(layer.height / HOME_BACKGROUND_DESIGN_HEIGHT) * 100}%`,
              transform: layer.rotation
                ? `rotate(${layer.rotation}deg)`
                : undefined,
              transformOrigin: "center center",
              zIndex: layer.zIndex ?? 0,
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
                className={
                  layer.preserveAspectRatio
                    ? "h-full w-full max-w-none select-none object-contain"
                    : "h-full w-full max-w-none select-none"
                }
              />
            )}
          </div>
        ))}
        {children}
      </div>
    </div>
  );
}
