import { toScale, toStageX, toStageY } from "./faqStage";

const HEADING_GLOW =
  "0 0 8px rgba(255,255,255,.9), 0 0 24px rgba(202,210,255,.48)";

export default function FaqTitleOverlay() {
  return (
    <h1
      className="absolute m-0 font-vcr font-normal leading-none text-white"
      style={{
        left: toStageX(693),
        top: toStageY(101),
        fontSize: toScale(72),
        textShadow: HEADING_GLOW,
      }}
    >
      FAQ
    </h1>
  );
}
