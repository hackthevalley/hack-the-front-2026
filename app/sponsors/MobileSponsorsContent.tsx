import SponsorCtaButton from "./SponsorCtaButton";
import { sponsorTiers, type SponsorTier } from "./data";

const TIER_STYLES: Record<
  SponsorTier["id"],
  { frame: string; badge?: string }
> = {
  gold: {
    frame: "bg-[#715844]",
    badge: "/sponsors/foreground/badges/goldstar.svg",
  },
  silver: {
    frame: "bg-[#4C4F68]",
    badge: "/sponsors/foreground/badges/silverstar.svg",
  },
  bronze: {
    frame: "bg-[#4A382B]",
    badge: "/sponsors/foreground/badges/bronzestar.svg",
  },
  "in-kind": {
    frame: "border-4 border-black bg-black",
  },
};

export default function MobileSponsorsContent() {
  return (
    <div className="relative z-10 px-4 pb-24 pt-20 lg:hidden">
      <h1
        id="sponsors-title-mobile"
        className="m-0 text-center font-vcr text-[clamp(2.5rem,12vw,4rem)] font-normal leading-none text-white"
        style={{
          textShadow:
            "0 0 8px rgba(255,255,255,.75), 0 0 24px rgba(202,210,255,.35)",
        }}
      >
        Our Sponsors
      </h1>

      <div className="mx-auto mt-16 flex max-w-2xl flex-col gap-16">
        {sponsorTiers.map((tier) => {
          const tierStyle = TIER_STYLES[tier.id];

          return (
            <section
              key={tier.id}
              aria-labelledby={`mobile-${tier.id}-sponsors`}
              className={`relative rounded-2xl p-3 pt-12 shadow-[0_8px_24px_rgba(0,0,0,.28)] ${tierStyle.frame}`}
            >
              <div className="absolute left-1/2 top-0 flex h-16 w-[min(88%,25rem)] -translate-x-1/2 -translate-y-1/2 items-center justify-center bg-[#12184E] px-12">
                {tierStyle.badge ? (
                  <span className="absolute left-0 top-1/2 flex size-16 -translate-x-1/3 -translate-y-1/2 items-center justify-center rounded-full bg-[#12184E]">
                    <img
                      src={tierStyle.badge}
                      alt=""
                      aria-hidden="true"
                      draggable="false"
                      className="size-10 select-none object-contain"
                    />
                  </span>
                ) : null}
                <h2
                  id={`mobile-${tier.id}-sponsors`}
                  className="m-0 whitespace-nowrap text-center font-figtree text-sm font-semibold text-white min-[390px]:text-base"
                  style={{ textShadow: "0 0 12px #FFE6CC" }}
                >
                  {tier.title}
                </h2>
              </div>

              <div className="grid grid-cols-1 gap-3 rounded-xl bg-[radial-gradient(circle_at_center,#B64CE1_0%,#080E2D_100%)] p-3 min-[430px]:grid-cols-2">
                {tier.sponsors.map((sponsor) => (
                  <a
                    key={sponsor.id}
                    href={sponsor.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${sponsor.name} website`}
                    className={`flex min-h-28 items-center justify-center rounded-xl bg-white p-5 outline-none transition-[box-shadow,background-color] duration-200 hover:bg-[#F7F5FF] hover:shadow-[inset_0_0_0_3px_rgba(168,66,229,.35),0_8px_20px_rgba(8,14,45,.22)] focus-visible:ring-4 focus-visible:ring-[#A842E5] ${
                      tier.sponsors.length === 1
                        ? "min-[430px]:col-span-2 min-[430px]:mx-auto min-[430px]:w-1/2"
                        : ""
                    }`}
                  >
                    {sponsor.logoSrc ? (
                      <img
                        src={sponsor.logoSrc}
                        alt={sponsor.name}
                        draggable="false"
                        className="max-h-16 max-w-[85%] object-contain"
                      />
                    ) : (
                      <span className="text-center font-figtree font-semibold text-[#1D2357]">
                        {sponsor.name}
                      </span>
                    )}
                  </a>
                ))}
              </div>
            </section>
          );
        })}
      </div>

      <div className="mx-auto mt-16 max-w-xl text-center text-white">
        <p className="m-0 font-figtree text-2xl font-bold">
          Interested in supporting Hack the Valley?
        </p>
        <p className="mt-3 font-figtree text-sm font-bold italic min-[390px]:text-base">
          Send us an inquiry @ sponsorships@hackthevalley.io
        </p>
        <div className="mx-auto mt-7 w-full max-w-[13rem]">
          <SponsorCtaButton />
        </div>
      </div>
    </div>
  );
}
