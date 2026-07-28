export type Sponsor = {
  id: string;
  name: string;
  href?: string;
  logoSrc?: string;
  placeholder?: boolean;
};

export type SponsorTier = {
  id: "gold" | "silver" | "bronze";
  title: string;
  sponsors: Sponsor[];
};

function createPlaceholderSponsors(prefix: string, count: number): Sponsor[] {
  return Array.from({ length: count }, (_, index) => ({
    id: `${prefix.toLowerCase().replace(/\s+/g, "-")}-${index + 1}`,
    name: `${prefix} ${index + 1}`,
    placeholder: true,
  }));
}

/**
 * Replace these placeholder entries with your real sponsor data.
 * You can freely add/remove items and the panel layout will adjust.
 */
export const sponsorTiers: readonly SponsorTier[] = [
  {
    id: "gold",
    title: "Our Gold Tier Sponsors",
    sponsors: createPlaceholderSponsors("Gold Sponsor", 3),
  },
  {
    id: "silver",
    title: "Our Silver Tier Sponsors",
    sponsors: createPlaceholderSponsors("Silver Sponsor", 6),
  },
  {
    id: "bronze",
    title: "Our Bronze Tier Sponsors",
    sponsors: createPlaceholderSponsors("Bronze Sponsor", 6),
  },
] as const;
