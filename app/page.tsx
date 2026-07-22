import HomeNavbar from "@/components/layout/HomeNavbar";
import Button from "@/components/ui/Button";
import FaqThemesContentLayer from "./faq-themes/FaqThemesContentLayer";
import FaqThemesBackground from "./faq-themes/background/FaqThemesBackground";
import {
  FAQ_THEMES_DESIGN_HEIGHT,
  FAQ_THEMES_DESIGN_WIDTH,
} from "./faq-themes/background/layers";
import FaqTitleOverlay from "./faq-themes/faq/FaqTitleOverlay";
import HomeBackground from "./home/background/HomeBackground";
import HomeTextOverlays from "./home/HomeTextOverlays";
import HomeToFaqTransition from "./transitions/home-to-faq/HomeToFaqTransition";

export default function Home() {
  return (
    <main className="relative w-full overflow-x-hidden bg-[#040142]">
      <HomeToFaqTransition className="pointer-events-none z-30" />

      <div className="relative">
        <section aria-labelledby="home-title">
          <HomeBackground>
            <div className="pointer-events-none absolute left-0 top-0 z-[9] h-[10.87%] w-full bg-[rgba(14,22,72,0.35)] blur-[50px]" />

            <div className="absolute left-0 top-0 z-20 w-full">
              <HomeNavbar />
            </div>

            <div
              className="absolute z-20 flex flex-col items-start"
              style={{
                left: "7.61%",
                top: "7.12%",
                width: "46.43%",
                height: "9.55%",
                containerType: "size",
              }}
            >
              <h1
                id="home-title"
                className="m-0 w-full font-figtree font-bold leading-[1.05] text-white"
                style={{
                  fontSize: "11.4cqw",
                  textShadow:
                    "0 0 24px rgba(255, 140, 180, 0.55), 0 0 48px rgba(223, 99, 220, 0.35)",
                }}
              >
                Hack the Valley 11
              </h1>
              <p
                className="m-0 mt-[2.3cqh] w-full font-figtree font-medium leading-normal text-white"
                style={{
                  fontSize: "2.85cqw",
                  textShadow: "0 0 12px rgba(255, 140, 180, 0.35)",
                }}
              >
                October 16-18, 2026 • In-person event
              </p>
              <div id="apply" className="mt-auto" style={{ width: "29.34%" }}>
                <Button text="Apply Now" width="100%" />
              </div>
            </div>

            <HomeTextOverlays />
          </HomeBackground>
        </section>
      </div>

      <section id="faq-themes" aria-label="FAQ and themes" className="relative">
        <FaqThemesBackground>
          <FaqThemesContentLayer />
        </FaqThemesBackground>

        <div className="pointer-events-none absolute inset-0 z-40">
          <div
            className="relative left-1/2 -translate-x-1/2"
            style={{
              width: `max(100vw, calc(100dvh * ${FAQ_THEMES_DESIGN_WIDTH} / ${FAQ_THEMES_DESIGN_HEIGHT}))`,
              aspectRatio: `${FAQ_THEMES_DESIGN_WIDTH} / ${FAQ_THEMES_DESIGN_HEIGHT}`,
              containerType: "inline-size",
            }}
          >
            <FaqTitleOverlay />
          </div>
        </div>
      </section>
    </main>
  );
}
