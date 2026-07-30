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

export const sponsorTiers: readonly SponsorTier[] = [
  {
    id: "gold",
    title: "Our Gold Tier Sponsors",
    sponsors: [
      {
        id: "school-of-cities",
        name: "School of Cities",
        href: "https://schoolofcities.utoronto.ca/",
        logoSrc: "/sponsors/logos/school-of-cities.svg",
      },
    ],
  },
  {
    id: "silver",
    title: "Our Silver Tier Sponsors",
    sponsors: [
      {
        id: "pointclickcare",
        name: "PointClickCare",
        href: "https://pointclickcare.com/",
        logoSrc: "/sponsors/logos/pointclickcare.svg",
      },
      {
        id: "fidelity",
        name: "Fidelity",
        href: "https://www.fidelity.com/",
        logoSrc: "/sponsors/logos/fidelity.svg",
      },
    ],
  },
  {
    id: "bronze",
    title: "Our Bronze Tier Sponsors",
    sponsors: [
      {
        id: "dell",
        name: "Dell",
        href: "https://www.dell.com/",
        logoSrc: "/sponsors/logos/dell.svg",
      },
      {
        id: "fdm",
        name: "FDM",
        href: "https://www.fdmgroup.com/",
        logoSrc: "/sponsors/logos/fdm.svg",
      },
    ],
  },
] as const;
