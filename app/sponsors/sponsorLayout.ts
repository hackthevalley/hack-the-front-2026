import { sponsorTiers, type SponsorTier } from "./data";

export type TierVariant = {
  outerFill: string;
  innerFill: string;
  badgeSrc: string;
  outerHeightForRows: (rows: number) => number;
  outerRadius: number;
  innerRadius: number;
  innerLeft: number;
  innerWidth: number;
  innerTopInset: number;
  innerBottomInset: number;
  plaqueOffsetTop: number;
  contentTop: number;
  maxColumns: number;
  cardWidth: number;
  columnGap: number;
  cardHeight: number;
  rowGap: number;
};

export const PANEL_LEFT = 193;
export const PANEL_WIDTH = 1127;
export const PLAQUE_LEFT = 510;
export const PLAQUE_WIDTH = 492;
export const PLAQUE_HEIGHT = 69;
export const BADGE_DIAMETER = 100;
export const BADGE_ICON_SIZE = 61;
export const TIER_TITLE_FONT_SIZE = 24;
export const TIER_TITLE_GLOW_RADIUS = 23.5711669921875 / 2;

export const GOLD_TOP = 232;
export const GAP_AFTER_GOLD = 66;
export const GAP_AFTER_SILVER = 71;
export const CTA_GAP = 50;

export const CTA_HEADING_LEFT = PANEL_LEFT + 1.5918079614639282;
export const CTA_HEADING_HEIGHT = 43;
export const CTA_HEADING_WIDTH = 1125.408203125;
export const CTA_EMAIL_LEFT = PANEL_LEFT;
export const CTA_EMAIL_HEIGHT = 29;
export const CTA_EMAIL_WIDTH = 1080.8375244140625;
export const CTA_BUTTON_WIDTH = 206;
export const CTA_BUTTON_HEIGHT = 72;
export const CTA_BLUR_RADIUS = 13.199999809265137 / 2;
export const CTA_EMAIL_OFFSET_TOP = 30;
export const CTA_BUTTON_OFFSET_LEFT = 460.5;
export const CTA_BUTTON_OFFSET_TOP = 96;

export const TIER_VARIANTS: Record<SponsorTier["id"], TierVariant> = {
  gold: {
    outerFill: "#715844",
    innerFill:
      "radial-gradient(56.11% 56.11% at 50% 50%, #B94EE0 0%, #080E2D 100%)",
    badgeSrc: "/sponsors/foreground/badges/goldstar.svg",
    outerHeightForRows: (rows) => 159 + rows * 189,
    outerRadius: 0,
    innerRadius: 0,
    innerLeft: 233,
    innerWidth: 1047,
    innerTopInset: 40,
    innerBottomInset: 40,
    plaqueOffsetTop: -14,
    contentTop: 86,
    maxColumns: 1,
    cardWidth: 877,
    columnGap: 0,
    cardHeight: 175,
    rowGap: 14,
  },
  silver: {
    outerFill: "#4C4F68",
    innerFill:
      "radial-gradient(50% 50% at 50% 50%, #B64CE1 0%, #080E2D 100%)",
    badgeSrc: "/sponsors/foreground/badges/silverstar.svg",
    outerHeightForRows: (rows) => 139 + rows * 156,
    outerRadius: 20,
    innerRadius: 20,
    innerLeft: 234,
    innerWidth: 1045,
    innerTopInset: 39,
    innerBottomInset: 39,
    plaqueOffsetTop: -16,
    contentTop: 76,
    maxColumns: 2,
    cardWidth: 425,
    columnGap: 27,
    cardHeight: 144,
    rowGap: 12,
  },
  bronze: {
    outerFill: "#4A382B",
    innerFill:
      "radial-gradient(50% 50% at 50% 50%, #B64CE1 0%, #080E2D 100%)",
    badgeSrc: "/sponsors/foreground/badges/bronzestar.svg",
    outerHeightForRows: (rows) => 164 + rows * 156,
    outerRadius: 0,
    innerRadius: 0,
    innerLeft: 234,
    innerWidth: 1045,
    innerTopInset: 36,
    innerBottomInset: 41,
    plaqueOffsetTop: -21,
    contentTop: 86,
    maxColumns: 3,
    cardWidth: 280,
    columnGap: 18.5,
    cardHeight: 144,
    rowGap: 12,
  },
};

export function rowsForTier(tier: SponsorTier) {
  const variant = TIER_VARIANTS[tier.id];
  return Math.max(1, Math.ceil(tier.sponsors.length / variant.maxColumns));
}

export function getSponsorsLayout(tiers: readonly SponsorTier[] = sponsorTiers) {
  const goldTier = tiers.find((tier) => tier.id === "gold");
  const silverTier = tiers.find((tier) => tier.id === "silver");
  const bronzeTier = tiers.find((tier) => tier.id === "bronze");

  if (!goldTier || !silverTier || !bronzeTier) {
    return null;
  }

  const goldTop = GOLD_TOP;
  const goldBottom =
    goldTop + TIER_VARIANTS.gold.outerHeightForRows(rowsForTier(goldTier));
  const silverTop = goldBottom + GAP_AFTER_GOLD;
  const silverBottom =
    silverTop + TIER_VARIANTS.silver.outerHeightForRows(rowsForTier(silverTier));
  const bronzeTop = silverBottom + GAP_AFTER_SILVER;
  const bronzeBottom =
    bronzeTop + TIER_VARIANTS.bronze.outerHeightForRows(rowsForTier(bronzeTier));
  const ctaTop = bronzeBottom + CTA_GAP;

  return {
    goldTier,
    silverTier,
    bronzeTier,
    goldTop,
    silverTop,
    bronzeTop,
    ctaTop,
    ctaEmailTop: ctaTop + CTA_EMAIL_OFFSET_TOP,
    ctaButtonLeft: PANEL_LEFT + CTA_BUTTON_OFFSET_LEFT,
    ctaButtonTop: ctaTop + CTA_BUTTON_OFFSET_TOP,
  };
}
