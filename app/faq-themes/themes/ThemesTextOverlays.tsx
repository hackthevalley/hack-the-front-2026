import { toScale, toStageHeight, toStageWidth, toStageX, toStageY } from "../faq/faqStage";

const THEMES = [
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

export default function ThemesTextOverlays() {
  return (
    <section aria-label="Hackathon themes">
      {THEMES.map((theme) => {
        const iconOnLeft = theme.iconSide === "left";

        return (
          <article
            key={theme.title}
            className="absolute flex border border-white/10 text-white"
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
      })}
    </section>
  );
}
