import DesignBox from "@/components/layout/DesignBox";
import {
  SPONSORS_DESIGN_HEIGHT,
  SPONSORS_DESIGN_WIDTH,
} from "./background/layers";
import { type Sponsor, type SponsorTier, sponsorTiers } from "./data";
import {
  BADGE_DIAMETER,
  BADGE_ICON_SIZE,
  PANEL_LEFT,
  PANEL_WIDTH,
  PLAQUE_HEIGHT,
  PLAQUE_LEFT,
  PLAQUE_WIDTH,
  TIER_TITLE_FONT_SIZE,
  TIER_TITLE_GLOW_RADIUS,
  TIER_VARIANTS,
  getSponsorsLayout,
  rowsForTier,
} from "./sponsorLayout";

function cqh(value: number, boxHeight: number) {
  return `${(value / boxHeight) * 100}cqh`;
}

function TierBadge({
  left,
  top,
  src,
}: {
  left: number;
  top: number;
  src: string;
}) {
  return (
    <DesignBox
      designWidth={SPONSORS_DESIGN_WIDTH}
      designHeight={SPONSORS_DESIGN_HEIGHT}
      left={left}
      top={top}
      width={BADGE_DIAMETER}
      height={BADGE_DIAMETER}
      zIndex={7}
      className="pointer-events-none"
    >
      <div className="relative h-full w-full overflow-visible rounded-full bg-[#12184E]">
        <img
          src={src}
          alt=""
          aria-hidden="true"
          draggable="false"
          className="pointer-events-none absolute left-1/2 top-1/2 max-w-none -translate-x-1/2 -translate-y-1/2 select-none"
          style={{
            width: `${(BADGE_ICON_SIZE / BADGE_DIAMETER) * 100}%`,
            height: `${(BADGE_ICON_SIZE / BADGE_DIAMETER) * 100}%`,
          }}
        />
      </div>
    </DesignBox>
  );
}

function SponsorCard({
  sponsor,
  left,
  top,
  width,
  height,
}: {
  sponsor: Sponsor;
  left: number;
  top: number;
  width: number;
  height: number;
}) {
  const content = sponsor.logoSrc ? (
    <img
      src={sponsor.logoSrc}
      alt={sponsor.name}
      draggable="false"
      className="max-h-[56%] max-w-[72%] object-contain"
    />
  ) : (
    <span
      className={`px-[8%] text-center font-figtree font-semibold leading-tight ${
        sponsor.placeholder
          ? "uppercase tracking-[0.28em] text-[#5A5E88]/55"
          : "text-[#1D2357]"
      }`}
      style={{ fontSize: cqh(sponsor.placeholder ? 18 : 22, height) }}
    >
      {sponsor.name}
    </span>
  );

  const cardChild = sponsor.href ? (
    <a
      href={sponsor.href}
      target="_blank"
      rel="noreferrer"
      aria-label={sponsor.name}
      className="absolute inset-0 flex items-center justify-center rounded-[20px] outline-none transition-transform hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-[#6A8CFF]"
    >
      {content}
    </a>
  ) : (
    <div className="absolute inset-0 flex items-center justify-center rounded-[20px]">
      {content}
    </div>
  );

  return (
    <DesignBox
      designWidth={SPONSORS_DESIGN_WIDTH}
      designHeight={SPONSORS_DESIGN_HEIGHT}
      left={left}
      top={top}
      width={width}
      height={height}
      zIndex={6}
      className="overflow-hidden rounded-[20px] bg-white"
      style={{ boxShadow: "0 4px 4px rgba(0, 0, 0, 0.25)" }}
    >
      {cardChild}
    </DesignBox>
  );
}

function SponsorTierPanel({
  tier,
  top,
}: {
  tier: SponsorTier;
  top: number;
}) {
  const variant = TIER_VARIANTS[tier.id];
  const rows = rowsForTier(tier);
  const outerHeight = variant.outerHeightForRows(rows);
  const innerTop = top + variant.innerTopInset;
  const innerHeight =
    outerHeight - variant.innerTopInset - variant.innerBottomInset;
  const plaqueTop = top + variant.plaqueOffsetTop;
  const badgeLeft = PLAQUE_LEFT - BADGE_DIAMETER / 2;
  const badgeTop = plaqueTop - 15;
  const cards = tier.sponsors.map((sponsor, index) => {
    const column = variant.cardColumns[index % variant.cardColumns.length];
    const row = Math.floor(index / variant.cardColumns.length);

    return {
      sponsor,
      left: column.left,
      top: top + variant.contentTop + row * (variant.cardHeight + variant.rowGap),
      width: column.width,
      height: variant.cardHeight,
    };
  });

  return (
    <>
      <DesignBox
        designWidth={SPONSORS_DESIGN_WIDTH}
        designHeight={SPONSORS_DESIGN_HEIGHT}
        left={PANEL_LEFT}
        top={top}
        width={PANEL_WIDTH}
        height={outerHeight}
        zIndex={4}
        className="overflow-hidden"
        style={{
          background: variant.outerFill,
          borderRadius: `${variant.outerRadius}px`,
        }}
      >
        <div
          className="absolute"
          style={{
            left: `${((variant.innerLeft - PANEL_LEFT) / PANEL_WIDTH) * 100}%`,
            top: `${((innerTop - top) / outerHeight) * 100}%`,
            width: `${(variant.innerWidth / PANEL_WIDTH) * 100}%`,
            height: `${(innerHeight / outerHeight) * 100}%`,
            borderRadius: `${variant.innerRadius}px`,
            background: variant.innerFill,
          }}
        />
      </DesignBox>

      <TierBadge
        left={badgeLeft}
        top={badgeTop}
        src={variant.badgeSrc}
      />

      <DesignBox
        designWidth={SPONSORS_DESIGN_WIDTH}
        designHeight={SPONSORS_DESIGN_HEIGHT}
        left={PLAQUE_LEFT}
        top={plaqueTop}
        width={PLAQUE_WIDTH}
        height={PLAQUE_HEIGHT}
        zIndex={6}
        className="overflow-hidden"
        style={{ background: "#12184E" }}
      >
        <div
          className="absolute inset-y-0 right-0 flex items-center justify-center text-center font-figtree font-semibold"
          style={{
            left: `${(56 / PLAQUE_WIDTH) * 100}%`,
            fontSize: cqh(TIER_TITLE_FONT_SIZE, PLAQUE_HEIGHT),
            color: "#FFFFFF",
            textShadow: `0 0 ${cqh(TIER_TITLE_GLOW_RADIUS, PLAQUE_HEIGHT)} #FFE6CC`,
          }}
        >
          {tier.title}
        </div>
      </DesignBox>

      {cards.map((card) => (
        <SponsorCard key={card.sponsor.id} {...card} />
      ))}
    </>
  );
}

export default function SponsorsPanels() {
  const layout = getSponsorsLayout(sponsorTiers);

  if (!layout) {
    return null;
  }

  return (
    <>
      <SponsorTierPanel tier={layout.goldTier} top={layout.goldTop} />
      <SponsorTierPanel tier={layout.silverTier} top={layout.silverTop} />
      <SponsorTierPanel tier={layout.bronzeTier} top={layout.bronzeTop} />
    </>
  );
}
