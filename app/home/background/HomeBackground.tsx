import {
  HOME_BACKGROUND_DESIGN_HEIGHT,
  HOME_BACKGROUND_DESIGN_WIDTH,
  homeBackgroundLayers,
} from "./layers";

const HOME_BACKGROUND_GRADIENT =
  "linear-gradient(180deg, #040142 15.36%, #C541E0 59.31%, #DF63DC 71.52%, #FFD668 95.53%)";

export default function HomeBackground() {
  return (
    <div
      aria-hidden="true"
      className="relative w-full overflow-hidden"
      style={{
        background: HOME_BACKGROUND_GRADIENT,
      }}
    >
      <div
        className="relative w-full"
        style={{
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
                className="h-full w-full max-w-none select-none"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
