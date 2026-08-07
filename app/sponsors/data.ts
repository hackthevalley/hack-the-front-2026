export type Sponsor = {
  id: string;
  name: string;
  href?: string;
  logoSrc?: string;
  placeholder?: boolean;
};

export type SponsorTier = {
  id: "gold" | "silver" | "bronze" | "in-kind";
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
  {
    id: "in-kind",
    title: "Our In-Kind Sponsors",
    sponsors: [
      {
        id: "nordvpn",
        name: "NordVPN",
        href: "https://nordvpn.com/hackathons",
        logoSrc: "/sponsors/logos/nordvpn.svg",
      },
      {
        id: "nordpass",
        name: "NordPass",
        href: "https://nordpass.com/",
        logoSrc: "/sponsors/logos/nordpass.svg",
      },
      {
        id: "incogni",
        name: "Incogni",
        href: "https://incogni.com/",
        logoSrc: "/sponsors/logos/incogni.svg",
      },
      {
        id: "saily",
        name: "Saily",
        href: "https://saily.com/",
        logoSrc: "/sponsors/logos/saily.svg",
      },
    ],
  },
] as const;
