import type { CSSProperties } from "react";
import type { HomeBackgroundLayer } from "./types";

export default function HomeLayerArtwork({
  layer,
}: {
  layer: HomeBackgroundLayer;
}) {
  const twinkleStyle: CSSProperties | undefined = layer.twinkle
    ? ({
        "--decor-duration": layer.twinkle.duration,
        "--decor-delay": layer.twinkle.delay,
      } as CSSProperties)
    : undefined;

  const twinkleClass = layer.twinkle ? " decor-twinkle" : "";

  const image = layer.visibleBounds ? (
    <img
      src={layer.src}
      alt=""
      loading="lazy"
      decoding="async"
      draggable="false"
      className={`absolute max-w-none select-none${twinkleClass}`}
      style={{
        left: `${-(layer.visibleBounds.left / layer.visibleBounds.width) * 100}%`,
        top: `${-(layer.visibleBounds.top / layer.visibleBounds.height) * 100}%`,
        width: `${(layer.visibleBounds.imageWidth / layer.visibleBounds.width) * 100}%`,
        height: `${(layer.visibleBounds.imageHeight / layer.visibleBounds.height) * 100}%`,
        ...twinkleStyle,
      }}
    />
  ) : (
    <img
      src={layer.src}
      alt=""
      loading="lazy"
      decoding="async"
      draggable="false"
      className={`${
        layer.preserveAspectRatio
          ? "h-full w-full max-w-none select-none object-contain"
          : "h-full w-full max-w-none select-none"
      }${twinkleClass}`}
      style={twinkleStyle}
    />
  );

  if (!layer.sway) return image;

  const swayStyle = {
    "--decor-duration": layer.sway.duration,
    "--decor-delay": layer.sway.delay,
    "--decor-sway-angle": layer.sway.angle,
    "--decor-sway-origin": layer.sway.origin,
  } as CSSProperties;

  return (
    <span className="decor-sway" style={swayStyle}>
      {image}
    </span>
  );
}
