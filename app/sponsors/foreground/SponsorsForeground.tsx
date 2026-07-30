import {
  SPONSORS_DESIGN_HEIGHT,
  SPONSORS_DESIGN_WIDTH,
} from "../background/layers";
import { SPONSORS_FOREGROUND_LAYER } from "./layers";

export default function SponsorsForeground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute z-[5]"
      data-figma-id="1715:11737"
      data-figma-name="Frame 207"
      style={{
        left: `${(SPONSORS_FOREGROUND_LAYER.left / SPONSORS_DESIGN_WIDTH) * 100}%`,
        top: `${(SPONSORS_FOREGROUND_LAYER.top / SPONSORS_DESIGN_HEIGHT) * 100}%`,
        width: `${(SPONSORS_FOREGROUND_LAYER.width / SPONSORS_DESIGN_WIDTH) * 100}%`,
        height: `${(SPONSORS_FOREGROUND_LAYER.height / SPONSORS_DESIGN_HEIGHT) * 100}%`,
      }}
    >
      <img
        src={SPONSORS_FOREGROUND_LAYER.src}
        alt=""
        draggable="false"
        className="h-full w-full max-w-none select-none"
      />
    </div>
  );
}
