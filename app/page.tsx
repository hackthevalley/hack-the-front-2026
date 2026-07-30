import HomeNavbar from "@/components/layout/HomeNavbar";
import {
  HOME_BACKGROUND_DESIGN_HEIGHT,
  HOME_BACKGROUND_DESIGN_WIDTH,
} from "./home/background/layers";
import DesktopHomeSection from "./home/DesktopHomeSection";
import DeferredFaqThemesContent from "./faq-themes/DeferredFaqThemesContent";
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
      <HomeNavbar />
      <HomeToFaqTransition className="pointer-events-none z-30" />

      <div className="relative">
        <MobileHomeSection />
        <DesktopHomeSection />
      </div>

      <section id="faq" aria-label="FAQ and themes" className="relative">
        <FaqThemesBackground>
          <DeferredFaqThemesContent />
        </FaqThemesBackground>

        <div className="pointer-events-none absolute inset-0 z-40">
          <div className="absolute inset-x-0 top-[2.2%] flex justify-center md:hidden">
            <h1
              data-nav-target="faq"
              className="m-0 select-text font-vcr leading-none text-white"
              style={{
                fontSize: "clamp(2.5rem, 12vw, 3.6rem)",
                textShadow:
                  "0 0 8px rgba(255,255,255,.9), 0 0 24px rgba(202,210,255,.48)",
              }}
            >
              FAQ
            </h1>
          </div>

          <div
            className="relative left-1/2 hidden -translate-x-1/2 md:block"
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
