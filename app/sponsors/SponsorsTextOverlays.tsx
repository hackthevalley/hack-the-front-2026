import DesignBox from "@/components/layout/DesignBox";
import {
  SPONSORS_DESIGN_HEIGHT,
  SPONSORS_DESIGN_WIDTH,
} from "./background/layers";

const FRAME_LEFT = 193;
const FRAME_TOP = 218;

const TITLE = {
  left: 502.5,
  top: 90.16959381103516,
  width: 507,
  height: 70,
  fontSize: 72,
  blur: 3.4,
} as const;

const TIER_TITLES = [
  {
    id: "1715:11748",
    text: "Our Gold Tier Sponsors",
    left: FRAME_LEFT + 373,
    top: FRAME_TOP + 20,
  },
  {
    id: "1715:11762",
    text: "Our Silver Tier Sponsors",
    left: FRAME_LEFT + 377,
    top: FRAME_TOP + 810,
  },
  {
    id: "1715:11776",
    text: "Our Bronze Tier Sponsors",
    left: FRAME_LEFT + 382,
    top: FRAME_TOP + 1483,
  },
] as const;

const TIER_TITLE_WIDTH = 380;
const TIER_TITLE_HEIGHT = 29;
const TIER_TITLE_FONT_SIZE = 24;
const TIER_TITLE_GLOW_RADIUS = 23.5711669921875 / 2;

const CTA_HEADING = {
  left: FRAME_LEFT + 1.5918079614639282,
  top: FRAME_TOP + 2010,
  width: 1125.408203125,
  height: 43,
  fontSize: 36,
} as const;

const CTA_EMAIL = {
  left: FRAME_LEFT,
  top: FRAME_TOP + 2068,
  width: 1080.8375244140625,
  height: 29,
  fontSize: 24,
} as const;

const CTA_BLUR_RADIUS = 13.199999809265137 / 2;

const CTA_BUTTON = {
  left: FRAME_LEFT + 444,
  top: FRAME_TOP + 2147,
  width: 240,
  height: 56,
} as const;

function cqh(value: number, boxHeight: number) {
  return `${(value / boxHeight) * 100}cqh`;
}

function CtaCopy({ blurred = false }: { blurred?: boolean }) {
  const boxClassName = blurred
    ? "pointer-events-none select-none text-center text-white"
    : "select-text text-center text-white";

  return (
    <>
      <DesignBox
        designWidth={SPONSORS_DESIGN_WIDTH}
        designHeight={SPONSORS_DESIGN_HEIGHT}
        left={CTA_HEADING.left}
        top={CTA_HEADING.top}
        width={CTA_HEADING.width}
        height={CTA_HEADING.height}
        zIndex={6}
        className={boxClassName}
      >
        <p
          aria-hidden={blurred || undefined}
          className="m-0 whitespace-nowrap font-figtree font-bold leading-normal"
          style={{
            fontSize: cqh(CTA_HEADING.fontSize, CTA_HEADING.height),
            filter: blurred
              ? `blur(${cqh(CTA_BLUR_RADIUS, CTA_HEADING.height)})`
              : undefined,
          }}
        >
          Interested in supporting Hack the Valley?
        </p>
      </DesignBox>

      <DesignBox
        designWidth={SPONSORS_DESIGN_WIDTH}
        designHeight={SPONSORS_DESIGN_HEIGHT}
        left={CTA_EMAIL.left}
        top={CTA_EMAIL.top}
        width={CTA_EMAIL.width}
        height={CTA_EMAIL.height}
        zIndex={6}
        className={boxClassName}
      >
        <p
          aria-hidden={blurred || undefined}
          className="m-0 whitespace-nowrap font-figtree font-bold italic leading-normal"
          style={{
            fontSize: cqh(CTA_EMAIL.fontSize, CTA_EMAIL.height),
            filter: blurred
              ? `blur(${cqh(CTA_BLUR_RADIUS, CTA_EMAIL.height)})`
              : undefined,
          }}
        >
          Send us an inquiry @ sponsorships@hackthevalley.io
        </p>
      </DesignBox>
    </>
  );
}

/**
 * Editable foreground copy from the Figma sponsors title and Frame 207.
 */
export default function SponsorsTextOverlays() {
  return (
    <>
      <DesignBox
        designWidth={SPONSORS_DESIGN_WIDTH}
        designHeight={SPONSORS_DESIGN_HEIGHT}
        left={TITLE.left}
        top={TITLE.top}
        width={TITLE.width}
        height={TITLE.height}
        zIndex={7}
        className="text-center text-white"
      >
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 whitespace-nowrap font-vcr leading-none"
          style={{
            fontSize: cqh(TITLE.fontSize, TITLE.height),
            filter: `blur(${cqh(TITLE.blur, TITLE.height)})`,
          }}
        >
          Our Sponsors
        </span>
        <h1
          id="sponsors-title"
          className="relative m-0 whitespace-nowrap font-vcr font-normal leading-none"
          data-figma-id="1715:11650"
          style={{ fontSize: cqh(TITLE.fontSize, TITLE.height) }}
        >
          Our Sponsors
        </h1>
      </DesignBox>

      {TIER_TITLES.map((title) => (
        <DesignBox
          key={title.id}
          designWidth={SPONSORS_DESIGN_WIDTH}
          designHeight={SPONSORS_DESIGN_HEIGHT}
          left={title.left}
          top={title.top}
          width={TIER_TITLE_WIDTH}
          height={TIER_TITLE_HEIGHT}
          zIndex={7}
          className="text-center text-white"
        >
          <h2
            className="m-0 whitespace-nowrap font-figtree font-semibold leading-normal"
            data-figma-id={title.id}
            style={{
              fontSize: cqh(TIER_TITLE_FONT_SIZE, TIER_TITLE_HEIGHT),
              textShadow: `0 0 ${cqh(TIER_TITLE_GLOW_RADIUS, TIER_TITLE_HEIGHT)} #FFE6CC`,
            }}
          >
            {title.text}
          </h2>
        </DesignBox>
      ))}

      <CtaCopy blurred />
      <CtaCopy />

      <DesignBox
        designWidth={SPONSORS_DESIGN_WIDTH}
        designHeight={SPONSORS_DESIGN_HEIGHT}
        left={CTA_BUTTON.left}
        top={CTA_BUTTON.top}
        width={CTA_BUTTON.width}
        height={CTA_BUTTON.height}
        zIndex={8}
        className="group"
      >
        <a
          href="mailto:sponsorships@hackthevalley.io"
          aria-label="Become a Sponsor"
          className="absolute inset-0 rounded-full outline-none transition-[filter,transform] hover:brightness-110 active:translate-y-px active:brightness-90 focus-visible:ring-2 focus-visible:ring-white"
          data-figma-id="1715:11785"
        >
          <span
            className="pointer-events-none absolute flex items-center justify-center whitespace-nowrap font-figtree font-semibold leading-normal text-white"
            style={{
              left: `${(47 / CTA_BUTTON.width) * 100}%`,
              top: `${(21 / CTA_BUTTON.height) * 100}%`,
              width: `${(145 / CTA_BUTTON.width) * 100}%`,
              height: `${(19 / CTA_BUTTON.height) * 100}%`,
              fontSize: cqh(16, CTA_BUTTON.height),
            }}
          >
            Become a Sponsor
          </span>
        </a>
      </DesignBox>
    </>
  );
}
