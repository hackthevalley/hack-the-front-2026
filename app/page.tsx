import NewHomeNavBar from "@/components/layout/NewHomeNavBar";
import {
  HOME_BACKGROUND_DESIGN_HEIGHT,
  HOME_BACKGROUND_DESIGN_WIDTH,
} from "./home/background/layers";
import DesktopHomeSection from "./home/DesktopHomeSection";
import FaqThemesContentLayer from "./faq-themes/FaqThemesContentLayer";
import FaqThemesBackground from "./faq-themes/background/FaqThemesBackground";
import {
  FAQ_THEMES_DESIGN_HEIGHT,
  FAQ_THEMES_DESIGN_WIDTH,
} from "./faq-themes/background/layers";
import FaqTitleOverlay from "./faq-themes/faq/FaqTitleOverlay";
import MobileHomeSection from "./home/MobileHomeSection";
import HomeToFaqTransition from "./transitions/home-to-faq/HomeToFaqTransition";

export default function Home() {
  const faqStageWidth = `max(100vw, calc(100dvh * ${HOME_BACKGROUND_DESIGN_WIDTH} / ${HOME_BACKGROUND_DESIGN_HEIGHT}))`;

  return (
    <main className="relative w-full overflow-x-hidden bg-[#040142]">
      <NewHomeNavBar />
      <HomeToFaqTransition className="pointer-events-none z-30 hidden md:block" />

      <div className="relative">
        <MobileHomeSection />
        <DesktopHomeSection />
      </div>

      <section id="faq" aria-label="FAQ and themes" className="relative">
        <FaqThemesBackground>
          <FaqThemesContentLayer />
        </FaqThemesBackground>

        <div className="pointer-events-none absolute inset-0 z-40">
          <div
            className="relative left-1/2 -translate-x-1/2"
            style={{
              width: faqStageWidth,
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
