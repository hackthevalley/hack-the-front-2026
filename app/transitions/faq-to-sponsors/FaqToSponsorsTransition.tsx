import {
  HOME_BACKGROUND_DESIGN_HEIGHT,
  HOME_BACKGROUND_DESIGN_WIDTH,
} from "@/app/home/background/layers";
import {
  FAQ_TO_SPONSORS_BAND_HEIGHT,
  FAQ_TO_SPONSORS_BAND_TOP,
  FAQ_TO_SPONSORS_DESIGN_WIDTH,
  faqToSponsorsTransitionLayers,
} from "./layers";

type FaqToSponsorsTransitionProps = {
  className?: string;
};

export default function FaqToSponsorsTransition({
  className = "",
}: FaqToSponsorsTransitionProps) {
  const stageWidth = `max(100vw, calc(100dvh * ${HOME_BACKGROUND_DESIGN_WIDTH} / ${HOME_BACKGROUND_DESIGN_HEIGHT}))`;

  return (
    <div
      aria-hidden="true"
      className={`absolute left-1/2 -translate-x-1/2 overflow-visible ${className}`}
      style={{
        top: `calc(${stageWidth} * ${FAQ_TO_SPONSORS_BAND_TOP} / ${FAQ_TO_SPONSORS_DESIGN_WIDTH})`,
        width: stageWidth,
        height: `calc(${stageWidth} * ${FAQ_TO_SPONSORS_BAND_HEIGHT} / ${FAQ_TO_SPONSORS_DESIGN_WIDTH})`,
      }}
    >
      <div className="relative h-full w-full">
        {faqToSponsorsTransitionLayers.map((layer) => (
          <div
            key={layer.id}
            className="pointer-events-none absolute"
            data-figma-id={layer.figmaId}
            data-figma-name={layer.figmaName}
            style={{
              left: `${(layer.left / FAQ_TO_SPONSORS_DESIGN_WIDTH) * 100}%`,
              top: `${((layer.top - FAQ_TO_SPONSORS_BAND_TOP) / FAQ_TO_SPONSORS_BAND_HEIGHT) * 100}%`,
              width: `${(layer.width / FAQ_TO_SPONSORS_DESIGN_WIDTH) * 100}%`,
              height: `${(layer.height / FAQ_TO_SPONSORS_BAND_HEIGHT) * 100}%`,
              zIndex: layer.zIndex,
            }}
          >
            <svg
              width={layer.width}
              height={layer.height}
              viewBox={`0 0 ${layer.width} ${layer.height}`}
              overflow="visible"
              data-figma-rotation={layer.rotation}
              className="h-full w-full max-w-none select-none"
            >
              <image
                href={layer.src}
                width={layer.sourceWidth}
                height={layer.sourceHeight}
                preserveAspectRatio="none"
                transform={`matrix(${layer.matrix.join(" ")})`}
              />
            </svg>
            <img
              src={layer.src}
              alt=""
              draggable="false"
              className="h-full w-full max-w-none select-none"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
