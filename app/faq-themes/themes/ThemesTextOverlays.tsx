import { toScale, toStageHeight, toStageWidth, toStageX, toStageY } from "../faq/faqStage";

const THEMES = [
  {
    title: "Artificial Intelligence for Social Impact",
    description:
      "Apply AI to solve real-world challenges while emphasizing ethical design, transparency, and measurable societal impact. Hackers can build solutions across domains such as climate modeling, healthcare diagnostics, and equitable resource distribution.",
    glyph: "\u2726",
    top: 1854.5947,
    height: 233.5312,
    opacity: 0.9,
    iconSide: "left",
  },
  {
    title: "Climate Action & Sustainability",
    description:
      "Develop solutions that reduce environmental impact, promote renewable energy adoption, and advance sustainable systems at scale. Hackers may create projects that focus on carbon tracking, energy optimization, circular economies, or sustainable consumption.",
    glyph: "\u2767",
    top: 2134.126,
    height: 233.5312,
    opacity: 0.8,
    iconSide: "right",
  },
  {
    title: "Sustainable FinTech & Economic Inclusion",
    description:
      "Leverage technology to expand financial access, empower underserved communities, and drive equitable economic growth. Hackers can explore tools such as microfinance platforms, financial literacy apps, and inclusive digital banking solutions.",
    glyph: "$",
    top: 2413.6572,
    height: 233.5312,
    opacity: 0.7,
    iconSide: "left",
  },
  {
    title: "Healthcare Innovation & Well-being",
    description:
      "Design technologies that improve health outcomes, accessibility, and patient care through digital health tools and preventative solutions. This includes innovations in mental health, remote care, diagnostics, and personalized medicine.",
    glyph: "+",
    top: 2693.1885,
    height: 209.5312,
    opacity: 0.6,
    iconSide: "right",
  },
  {
    title: "Future of Sustainable Cities",
    description:
      "Reimagine urban living through smart infrastructure, resilient design, and efficient resource management. Hackers can build solutions around smart mobility, waste reduction, housing, and data-driven urban planning.",
    glyph: "\u25A6",
    top: 2948.7197,
    height: 233.5312,
    opacity: 0.5,
    iconSide: "left",
  },
] as const;

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
              gap: toScale(28),
              paddingInline: toScale(48),
              paddingBlock: toScale(32),
            }}
          >
            <div
              aria-hidden="true"
              className="grid shrink-0 place-items-center font-vcr text-[#FFF3EC]"
              style={{
                width: toScale(110),
                height: toScale(110),
                fontSize: toScale(72),
                textShadow: "0 0 20px rgba(184,190,255,.75)",
              }}
            >
              {theme.glyph}
            </div>
            <div className="min-w-0 grow" style={{ textAlign: "left" }}>
              <h3
                className="m-0 font-bold"
                style={{
                  fontSize: toScale(28),
                  lineHeight: toScale(34),
                  textShadow: "0 2px 8px rgba(16,20,74,.5)",
                }}
              >
                {theme.title}
              </h3>
              <p
                className="m-0"
                style={{
                  marginTop: toScale(8),
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
