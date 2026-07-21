import { toScale, toStageHeight, toStageWidth, toStageX, toStageY } from "./faqStage";

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

const HEADING_GLOW =
  "0 0 8px rgba(255,255,255,.9), 0 0 24px rgba(202,210,255,.48)";

export default function FaqStaticOverlays() {
  return (
    <>
      <h1
        className="absolute m-0 font-vcr font-normal leading-none text-white"
        style={{
          left: toStageX(693),
          top: toStageY(101),
          fontSize: toScale(72),
          textShadow: HEADING_GLOW,
        }}
      >
        FAQ
      </h1>

      <div
        className="absolute text-white"
        style={{
          left: toStageX(322),
          top: toStageY(1345),
          width: toStageWidth(363),
        }}
      >
        <p
          className="m-0 font-medium leading-none"
          style={{
            fontSize: toScale(36),
            textShadow: "0 0 12px rgba(255,255,255,.75)",
          }}
        >
          Have more questions?
        </p>
        <p
          className="m-0 italic leading-none"
          style={{ marginTop: toScale(15), fontSize: toScale(24) }}
        >
          Message us at @hackthevalley.io
        </p>
      </div>

      <a
        href="mailto:contact@hackthevalley.io"
        className="absolute grid place-items-center rounded-full border border-white/30 font-semibold text-white shadow-[0_0_24px_rgba(223,99,220,.55)]"
        style={{
          left: toStageX(908),
          top: toStageY(1365),
          width: toStageWidth(240),
          height: toStageHeight(56),
          fontSize: toScale(12),
          background: "linear-gradient(95deg,#ff7ccd,#7839dc)",
        }}
      >
        Contact Us
      </a>

      <h2
        className="absolute m-0 font-vcr font-normal leading-none text-white"
        style={{
          left: toStageX(629),
          top: toStageY(1569.708),
          width: toStageWidth(254),
          fontSize: toScale(72),
          textAlign: "center",
          textShadow: HEADING_GLOW,
        }}
      >
        Themes
      </h2>
      <p
        className="absolute m-0 text-white"
        style={{
          left: toStageX(593.5),
          top: toStageY(1676.7119),
          width: toStageWidth(325),
          fontSize: toScale(24),
          textAlign: "center",
        }}
      >
        Spark your build with purpose.
      </p>

      <section aria-label="Hackathon themes">
        {THEMES.map((theme) => {
          const iconOnLeft = theme.iconSide === "left";
          return (
            <article
              key={theme.title}
              className="absolute border border-white/10 text-white"
              style={{
                left: toStageX(355),
                top: toStageY(theme.top),
                width: toStageWidth(802),
                height: toStageHeight(theme.height),
                borderRadius: toScale(22),
                background: `rgba(82, 89, 189, ${theme.opacity})`,
                boxShadow: "inset 0 1px 0 rgba(255,255,255,.08)",
              }}
            >
              <div
                aria-hidden="true"
                className="absolute grid place-items-center font-vcr text-[#FFF3EC]"
                style={{
                  left: iconOnLeft ? toScale(42) : toScale(650),
                  top: toScale(50),
                  width: toScale(110),
                  height: toScale(110),
                  fontSize: toScale(72),
                  textShadow: "0 0 20px rgba(184,190,255,.75)",
                }}
              >
                {theme.glyph}
              </div>
              <div
                className="absolute"
                style={{
                  left: iconOnLeft ? toScale(219) : toScale(48),
                  top: toScale(36),
                  width: iconOnLeft ? toScale(534) : toScale(532),
                }}
              >
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
    </>
  );
}
