import DesignBox from "@/components/layout/DesignBox";
import { SPONSORS_DESIGN_HEIGHT, SPONSORS_DESIGN_WIDTH } from "./background/layers";
import SponsorCtaButton from "./SponsorCtaButton";
import { sponsorTiers } from "./data";
import {
  CTA_BLUR_RADIUS,
  CTA_BUTTON_HEIGHT,
  CTA_BUTTON_WIDTH,
  CTA_EMAIL_HEIGHT,
  CTA_EMAIL_LEFT,
  CTA_EMAIL_WIDTH,
  CTA_HEADING_HEIGHT,
  CTA_HEADING_LEFT,
  CTA_HEADING_WIDTH,
  getSponsorsLayout,
} from "./sponsorLayout";

const TITLE = {
  left: 502.5,
  top: 90.16959381103516,
  width: 507,
  height: 70,
  fontSize: 72,
  blur: 3.4,
} as const;

function cqh(value: number, boxHeight: number) {
  return `${(value / boxHeight) * 100}cqh`;
}

/**
 * Editable foreground copy for the section heading and CTA.
 */
export default function SponsorsTextOverlays() {
  const layout = getSponsorsLayout(sponsorTiers);

  if (!layout) {
    return null;
  }

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

      <DesignBox
        designWidth={SPONSORS_DESIGN_WIDTH}
        designHeight={SPONSORS_DESIGN_HEIGHT}
        left={CTA_HEADING_LEFT}
        top={layout.ctaTop}
        width={CTA_HEADING_WIDTH}
        height={CTA_HEADING_HEIGHT}
        zIndex={7}
        className="relative select-text text-center text-white"
      >
        <p
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 m-0 whitespace-nowrap font-figtree font-bold leading-normal"
          style={{
            fontSize: cqh(36, CTA_HEADING_HEIGHT),
            filter: `blur(${cqh(CTA_BLUR_RADIUS, CTA_HEADING_HEIGHT)})`,
          }}
        >
          Interested in supporting Hack the Valley?
        </p>
        <p
          className="relative m-0 whitespace-nowrap font-figtree font-bold leading-normal"
          style={{ fontSize: cqh(36, CTA_HEADING_HEIGHT) }}
        >
          Interested in supporting Hack the Valley?
        </p>
      </DesignBox>

      <DesignBox
        designWidth={SPONSORS_DESIGN_WIDTH}
        designHeight={SPONSORS_DESIGN_HEIGHT}
        left={CTA_EMAIL_LEFT}
        top={layout.ctaEmailTop}
        width={CTA_EMAIL_WIDTH}
        height={CTA_EMAIL_HEIGHT}
        zIndex={7}
        className="relative select-text text-center text-white"
      >
        <p
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 m-0 whitespace-nowrap font-figtree font-bold italic leading-normal"
          style={{
            fontSize: cqh(24, CTA_EMAIL_HEIGHT),
            filter: `blur(${cqh(CTA_BLUR_RADIUS, CTA_EMAIL_HEIGHT)})`,
          }}
        >
          Send us an inquiry @ sponsorships@hackthevalley.io
        </p>
        <p
          className="relative m-0 whitespace-nowrap font-figtree font-bold italic leading-normal"
          style={{ fontSize: cqh(24, CTA_EMAIL_HEIGHT) }}
        >
          Send us an inquiry @ sponsorships@hackthevalley.io
        </p>
      </DesignBox>

      <DesignBox
        designWidth={SPONSORS_DESIGN_WIDTH}
        designHeight={SPONSORS_DESIGN_HEIGHT}
        left={layout.ctaButtonLeft}
        top={layout.ctaButtonTop}
        width={CTA_BUTTON_WIDTH}
        height={CTA_BUTTON_HEIGHT}
        zIndex={8}
        className="relative"
      >
        <SponsorCtaButton className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />
      </DesignBox>
    </>
  );
}
