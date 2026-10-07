export type Sponsor = {
  id: string;
  name: string;
  href?: string;
  logoSrc?: string;
  logoWidth?: number;
  logoHeight?: number;
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
        logoSrc: "/sponsors/logos/school-of-cities.png",
        logoWidth: 2614,
        logoHeight: 586,
      },
      {
        id: "ovpri",
        name: "Office of the Vice-Principal Research & Innovation",
        href: "https://www.utsc.utoronto.ca/research/",
        logoSrc: "/sponsors/logos/ovpri.png",
        logoWidth: 3637,
        logoHeight: 504,
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
      {
        id: "dell",
        name: "Dell",
        href: "https://www.dell.com/",
        logoSrc: "/sponsors/logos/dell.svg",
      },
      {
        id: "next-canada",
        name: "NEXT Canada",
        href: "https://www.nextcanada.com/",
        logoSrc: "/sponsors/logos/next-canada.png",
        logoWidth: 360,
        logoHeight: 360,
      },
    ],
  },
  {
    id: "bronze",
    title: "Our Bronze Tier Sponsors",
    sponsors: [
      {
        id: "fdm",
        name: "FDM",
        href: "https://www.fdmgroup.com/",
        logoSrc: "/sponsors/logos/fdm.svg",
      },
      {
        id: "accenture",
        name: "Accenture",
        href: "https://www.accenture.com/ca-en",
        logoSrc: "/sponsors/logos/accenture.svg",
        logoWidth: 163,
        logoHeight: 43,
      },
      {
        id: "bell",
        name: "Bell",
        href: "https://www.bell.ca/",
        logoSrc: "/sponsors/logos/bell.svg",
        logoWidth: 90,
        logoHeight: 52,
      },
      {
        id: "cse",
        name: "Communications Security Establishment Canada",
        href: "https://www.cse-cst.gc.ca/en",
        logoSrc: "/sponsors/logos/cse.jpg",
        logoWidth: 200,
        logoHeight: 200,
      },
    ],
  },
  {
    id: "in-kind",
    title: "Our In-Kind Sponsors",
    sponsors: [
      {
        id: "greenhouse",
        name: "Greenhouse",
        href: "https://www.greenhouse.ca/",
        logoSrc: "/sponsors/logos/greenhouse.svg",
      },
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
      {
        id: "papiers",
        name: "Papiers",
        href: "https://papiers.ai/",
        logoSrc: "/sponsors/logos/papiers.png",
        logoWidth: 2204,
        logoHeight: 338,
      },
      {
        id: "fgf-brands",
        name: "FGF Brands",
        href: "https://www.fgfbrands.com/",
        logoSrc: "/sponsors/logos/fgf-brands.svg",
        logoWidth: 288,
        logoHeight: 288,
      },
      {
        id: "backboard-io",
        name: "Backboard.io",
        href: "https://backboard.io/",
        logoSrc: "/sponsors/logos/backboard-io.png",
        logoWidth: 581,
        logoHeight: 72,
      },
      {
        id: "clay-moo",
        name: "Clay Moo",
        logoSrc: "/sponsors/logos/clay-moo.svg",
        logoWidth: 462,
        logoHeight: 356,
      },
    ],
  },
] as const;
