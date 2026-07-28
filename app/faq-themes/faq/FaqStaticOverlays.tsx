"use client";

import Button from "@/components/ui/Button";
import { toScale, toStageWidth, toStageX, toStageY } from "./faqStage";
import ThemesTextOverlays from "../themes/ThemesTextOverlays";

export default function FaqStaticOverlays() {
  return (
    <>
      <div
        className="absolute hidden items-center justify-between text-white md:flex"
        style={{
          left: toStageX(322),
          top: toStageY(1345),
          width: toStageWidth(826),
        }}
      >
        <div className="pointer-events-auto select-text" style={{ width: "43.95%" }}>
          <p
            className="m-0 font-medium leading-none"
            style={{
              fontSize: toScale(36),
              textShadow: "0 0 12px rgba(255,255,255,.75)",
            }}
          >
            Have more questions?
          </p>
          <p
            className="m-0 italic leading-none"
            style={{
              marginTop: toScale(15),
              fontSize: toScale(24),
              textShadow: "0 0 12px rgba(255,255,255,.75)",
            }}
          >
            Message us at @hackthevalley.io
          </p>
        </div>

        <div className="pointer-events-auto" style={{ width: "29.06%" }}>
          <Button
            text="Contact Us"
            width="100%"
            onClick={() => {
              window.location.href = "mailto:contact@hackthevalley.io";
            }}
          />
        </div>
      </div>

      <h2
        id="themes"
        className="pointer-events-auto absolute m-0 select-text font-vcr font-normal leading-none text-white"
        style={{
          left: toStageX(629),
          top: toStageY(1569.708),
          width: toStageWidth(254),
          fontSize: toScale(72),
          textAlign: "center",
          textShadow:
            "0 0 8px rgba(255,255,255,.9), 0 0 24px rgba(202,210,255,.48)",
        }}
      >
        Themes
      </h2>
      <p
        className="pointer-events-auto absolute m-0 select-text text-white"
        style={{
          left: toStageX(593.5),
          top: toStageY(1676.7119),
          width: toStageWidth(325),
          fontSize: toScale(24),
          textAlign: "center",
        }}
      >
        Spark your build with purpose.
      </p>

      <ThemesTextOverlays />
    </>
  );
}
