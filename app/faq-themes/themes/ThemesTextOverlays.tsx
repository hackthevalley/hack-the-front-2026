"use client";

import { useEffect, useRef, useState } from "react";
import { toScale, toStageHeight, toStageWidth, toStageX, toStageY } from "../faq/faqStage";

export const THEMES = [
  {
    title: "Artificial Intelligence for Social Impact",
    description:
      "Apply AI to solve real-world challenges while emphasizing ethical design, transparency, and measurable societal impact. Hackers can build solutions across domains such as climate modeling, healthcare diagnostics, and equitable resource distribution.",
    iconSrc: "/faq-themes/themes/ai.png",
    iconWidth: 124.7844,
    iconHeight: 121.9424,
    textWidth: 534.355,
    textHeight: 161.5312,
    top: 1854.5947,
    height: 233.5312,
    opacity: 0.9,
    iconSide: "left",
  },
  {
    title: "Climate Action & Sustainability",
    description:
      "Develop solutions that reduce environmental impact, promote renewable energy adoption, and advance sustainable systems at scale. Hackers may create projects that focus on carbon tracking, energy optimization, circular economies, or sustainable consumption.",
    iconSrc: "/faq-themes/themes/climateaction.png",
    iconWidth: 126.8353,
    iconHeight: 142.2261,
    textWidth: 532.3036,
    textHeight: 161.5312,
    top: 2134.126,
    height: 233.5312,
    opacity: 0.8,
    iconSide: "right",
  },
  {
    title: "Sustainable FinTech & Economic Inclusion",
    description:
      "Leverage technology to expand financial access, empower underserved communities, and drive equitable economic growth. Hackers can explore tools such as microfinance platforms, financial literacy apps, and inclusive digital banking solutions.",
    iconSrc: "/faq-themes/themes/fintech.png",
    iconWidth: 87.2798,
    iconHeight: 112.4399,
    textWidth: 571.8594,
    textHeight: 161.5312,
    top: 2413.6572,
    height: 233.5312,
    opacity: 0.7,
    iconSide: "left",
  },
  {
    title: "Healthcare Innovation & Well-being",
    description:
      "Design technologies that improve health outcomes, accessibility, and patient care through digital health tools and preventative solutions. This includes innovations in mental health, remote care, diagnostics, and personalized medicine.",
    iconSrc: "/faq-themes/themes/healthcare.png",
    iconWidth: 100.0864,
    iconHeight: 79.192,
    textWidth: 559.0535,
    textHeight: 137.5312,
    top: 2693.1885,
    height: 209.5312,
    opacity: 0.6,
    iconSide: "right",
  },
  {
    title: "Future of Sustainable Cities",
    description:
      "Reimagine urban living through smart infrastructure, resilient design, and efficient resource management. Hackers can build solutions around smart mobility, waste reduction, housing, and data-driven urban planning.",
    iconSrc: "/faq-themes/themes/city.png",
    iconWidth: 156.9643,
    iconHeight: 106.6914,
    textWidth: 502.1759,
    textHeight: 161.5312,
    top: 2948.7197,
    height: 233.5312,
    opacity: 0.5,
    iconSide: "left",
  },
] as const;

const THEME_CARD_PADDING_X = 48;
const THEME_CARD_PADDING_Y = 32;
const THEME_CARD_INNER_GAP = 46.8606;
const THEME_TEXT_GAP = 7.53;
const THEME_TITLE_GLOW = "0 0 10px rgba(255,255,255,.5)";
const THEME_REVEAL_OFFSET = 42;
const THEME_REVEAL_VIEWPORT_RATIO_DESKTOP = 0.7;
const THEME_REVEAL_VIEWPORT_RATIO_MOBILE = 0.82;

function useThemeReveal(viewportRatio: number) {
  const cardRefs = useRef<Array<HTMLElement | null>>([]);
  const [revealed, setRevealed] = useState<boolean[]>(() => THEMES.map(() => false));

  useEffect(() => {
    let frameId = 0;

    const revealVisibleCards = () => {
      frameId = 0;
      const revealThreshold = window.innerHeight * viewportRatio;

      setRevealed((current) => {
        let changed = false;
        const next = [...current];

        cardRefs.current.forEach((card, index) => {
          if (!card || next[index]) {
            return;
          }

          const rect = card.getBoundingClientRect();
          const cardMidpoint = rect.top + rect.height / 2;

          if (cardMidpoint <= revealThreshold) {
            next[index] = true;
            changed = true;
          }
        });

        return changed ? next : current;
      });
    };

    const scheduleRevealCheck = () => {
      if (frameId) {
        return;
      }

      frameId = window.requestAnimationFrame(revealVisibleCards);
    };

    scheduleRevealCheck();
    window.addEventListener("scroll", scheduleRevealCheck, { passive: true });
    window.addEventListener("resize", scheduleRevealCheck);

    return () => {
      if (frameId) {
        window.cancelAnimationFrame(frameId);
      }

      window.removeEventListener("scroll", scheduleRevealCheck);
      window.removeEventListener("resize", scheduleRevealCheck);
    };
  }, [viewportRatio]);

  return { cardRefs, revealed };
}

function ThemeCard({
  theme,
  revealed,
  onRegister,
}: {
  theme: (typeof THEMES)[number];
  revealed: boolean;
  onRegister: (node: HTMLElement | null) => void;
}) {
  const iconOnLeft = theme.iconSide === "left";

  return (
    <article
      ref={onRegister}
      className="pointer-events-auto absolute flex select-text border border-white/10 text-white duration-700 ease-out"
      style={{
        left: toStageX(355),
        top: toStageY(theme.top),
        width: toStageWidth(802),
        height: toStageHeight(theme.height),
        borderRadius: toScale(22),
        background: `rgba(82, 89, 189, ${theme.opacity})`,
        boxShadow: "inset 0 1px 0 rgba(255,255,255,.08)",
        flexDirection: iconOnLeft ? "row" : "row-reverse",
        alignItems: "center",
        gap: toScale(THEME_CARD_INNER_GAP),
        paddingInline: toScale(THEME_CARD_PADDING_X),
        paddingBlock: toScale(THEME_CARD_PADDING_Y),
        opacity: revealed ? 1 : 0,
        filter: revealed ? "blur(0px)" : "blur(8px)",
        transform: revealed
          ? "translate3d(0, 0, 0) scale(1)"
          : `translate3d(0, ${toScale(THEME_REVEAL_OFFSET)}, 0) scale(.985)`,
        transitionProperty: "opacity, transform, filter",
        willChange: "opacity, transform, filter",
      }}
    >
      <div
        aria-hidden="true"
        className="grid shrink-0 place-items-center"
        style={{
          width: toScale(theme.iconWidth),
          height: toScale(theme.iconHeight),
        }}
      >
        <img
          src={theme.iconSrc}
          alt=""
          draggable="false"
          className="h-full w-full select-none object-contain"
        />
      </div>
      <div
        className="min-w-0 shrink-0"
        style={{
          width: toScale(theme.textWidth),
          height: toScale(theme.textHeight),
          textAlign: "left",
        }}
      >
        <h3
          className="m-0 font-bold"
          style={{
            fontSize: toScale(28),
            lineHeight: "100%",
            textShadow: THEME_TITLE_GLOW,
          }}
        >
          {theme.title}
        </h3>
        <p
          className="m-0"
          style={{
            marginTop: toScale(THEME_TEXT_GAP),
            fontSize: toScale(20),
            lineHeight: toScale(24),
          }}
        >
          {theme.description}
        </p>
      </div>
    </article>
  );
}

export default function ThemesTextOverlays() {
  const { cardRefs, revealed } = useThemeReveal(
    THEME_REVEAL_VIEWPORT_RATIO_DESKTOP,
  );

  return (
    <section aria-label="Hackathon themes" className="hidden md:block">
      {THEMES.map((theme, index) => (
        <ThemeCard
          key={theme.title}
          theme={theme}
          revealed={revealed[index]}
          onRegister={(node) => {
            cardRefs.current[index] = node;
          }}
        />
      ))}
    </section>
  );
}

export function MobileThemesTextOverlays() {
  const { cardRefs, revealed } = useThemeReveal(THEME_REVEAL_VIEWPORT_RATIO_MOBILE);

  return (
    <section
      aria-label="Hackathon themes"
      className="absolute inset-x-0 top-[52.6%] px-6 md:hidden"
    >
      <div className="mx-auto w-full max-w-[22.75rem]">
        {THEMES.map((theme, index) => {
          return (
            <article
              key={theme.title}
              ref={(node) => {
                cardRefs.current[index] = node;
              }}
              className="mb-9 rounded-[1.65rem] border border-white/10 px-6 py-5 text-white shadow-[inset_0_1px_0_rgba(255,255,255,.08),0_18px_36px_rgba(0,0,0,.18)] last:mb-0"
              style={{
                background: `rgba(82, 89, 189, ${Math.min(theme.opacity + 0.12, 0.92)})`,
                opacity: revealed[index] ? 1 : 0,
                filter: revealed[index] ? "blur(0px)" : "blur(8px)",
                transform: revealed[index]
                  ? "translate3d(0, 0, 0) scale(1)"
                  : "translate3d(0, 28px, 0) scale(.985)",
                transitionProperty: "opacity, transform, filter",
                transitionDuration: "700ms",
                transitionTimingFunction: "ease-out",
                willChange: "opacity, transform, filter",
              }}
            >
              <div className="flex items-start gap-4">
                <div className="grid h-[3.25rem] w-[3.25rem] shrink-0 place-items-center">
                  <img
                    src={theme.iconSrc}
                    alt=""
                    draggable="false"
                    className="h-full w-full select-none object-contain"
                  />
                </div>

                <h3
                  className="m-0 min-w-0 flex-1 font-bold text-[1.3rem] leading-[1.22]"
                  style={{ textShadow: THEME_TITLE_GLOW }}
                >
                  {theme.title}
                </h3>
              </div>

              <p className="m-0 mt-4 text-[1rem] leading-[1.55] text-white/92">
                {theme.description}
              </p>
            </article>
          );
        })}
      </div>
    </section>
  );
}
