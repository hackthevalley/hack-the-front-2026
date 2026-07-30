import type { ReactNode } from "react";
import {
  BACKGROUND_GLOW,
  EDGE_VIGNETTE,
  TEAM_DESIGN_HEIGHT,
  TEAM_DESIGN_WIDTH,
  teamLayers,
} from "./layers";

type TeamBackgroundProps = {
  children?: ReactNode;
};

export default function TeamBackground({ children }: TeamBackgroundProps) {
  return (
    <div className="relative w-full overflow-hidden">
      <div
        className="team-shelf-canvas relative"
        style={{
          aspectRatio: `${TEAM_DESIGN_WIDTH} / ${TEAM_DESIGN_HEIGHT}`,
          background: "#040A15",
        }}
      >
      <div
        className="absolute"
        style={{
          left: `${(BACKGROUND_GLOW.left / TEAM_DESIGN_WIDTH) * 100}%`,
          top: `${(BACKGROUND_GLOW.top / TEAM_DESIGN_HEIGHT) * 100}%`,
          width: `${(BACKGROUND_GLOW.width / TEAM_DESIGN_WIDTH) * 100}%`,
          height: `${(BACKGROUND_GLOW.height / TEAM_DESIGN_HEIGHT) * 100}%`,
          background: BACKGROUND_GLOW.background,
          zIndex: 0,
        }}
      />

      {teamLayers.map((layer) => (
        <div
          key={layer.id}
          className="absolute"
          style={{
            left: `${(layer.left / TEAM_DESIGN_WIDTH) * 100}%`,
            top: `${(layer.top / TEAM_DESIGN_HEIGHT) * 100}%`,
            width: `${(layer.width / TEAM_DESIGN_WIDTH) * 100}%`,
            height: `${(layer.height / TEAM_DESIGN_HEIGHT) * 100}%`,
            transform: layer.rotation ? `rotate(${layer.rotation}deg)` : undefined,
            transformOrigin: "center center",
            zIndex: layer.zIndex ?? 0,
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

      <div
        aria-hidden="true"
        className="pointer-events-none absolute"
        style={{
          left: `${(EDGE_VIGNETTE.left / TEAM_DESIGN_WIDTH) * 100}%`,
          top: `${(EDGE_VIGNETTE.top / TEAM_DESIGN_HEIGHT) * 100}%`,
          width: `${(EDGE_VIGNETTE.width / TEAM_DESIGN_WIDTH) * 100}%`,
          height: `${(EDGE_VIGNETTE.height / TEAM_DESIGN_HEIGHT) * 100}%`,
          background: EDGE_VIGNETTE.background,
          zIndex: 10,
        }}
      />
      </div>
    </div>
  );
}
