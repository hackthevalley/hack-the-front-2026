import {
  FAQ_THEMES_DESIGN_HEIGHT,
  FAQ_THEMES_DESIGN_WIDTH,
} from "./background/layers";

const FAQ_ITEMS = [
  "What is Hack the Valley?",
  "What do I need to bring?",
  "How much does it cost to attend?",
  "How is Hack the Valley run?",
  "Where is it?",
  "When is it?",
] as const;

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

const toStageX = (px: number) => `${(px / FAQ_THEMES_DESIGN_WIDTH) * 100}%`;
const toStageY = (px: number) => `${(px / FAQ_THEMES_DESIGN_HEIGHT) * 100}%`;
const toStageWidth = (px: number) =>
  `${(px / FAQ_THEMES_DESIGN_WIDTH) * 100}%`;
const toStageHeight = (px: number) =>
  `${(px / FAQ_THEMES_DESIGN_HEIGHT) * 100}%`;
const toScale = (px: number) => `${(px / FAQ_THEMES_DESIGN_WIDTH) * 100}cqw`;

export default function FaqThemesTextOverlays() {
  return (
    <div className="absolute inset-0 font-figtree text-white">
      <h1
        className="absolute m-0 font-vcr font-normal leading-none"
        style={{
          left: toStageX(693),
          top: toStageY(101),
          fontSize: toScale(72),
          textShadow: HEADING_GLOW,
        }}
      >
        FAQ
      </h1>

      <section
        aria-label="Frequently asked questions"
        className="absolute flex flex-col"
        style={{
          left: toStageX(262),
          top: toStageY(225),
          width: toStageWidth(480),
          gap: toScale(33),
        }}
      >
        {FAQ_ITEMS.map((question, index) => (
          <button
            key={question}
            type="button"
            aria-expanded="false"
            className="flex w-full items-center border border-white/10 text-left font-medium text-[#E5E7EB]"
            style={{
              height: toScale(80),
              paddingInline: toScale(20),
              borderRadius: toScale(16),
              fontSize: toScale(20),
              boxShadow: "0 12px 30px rgba(0,0,0,.22)",
              background:
                index % 2 === 0
                  ? "linear-gradient(90deg, rgba(16,35,93,.96), rgba(22,40,112,.9))"
                  : "linear-gradient(90deg, rgba(22,25,93,.98), rgba(33,43,129,.9))",
            }}
          >
            <span
              aria-hidden="true"
              className="grid shrink-0 place-items-center rounded-full"
              style={{
                marginRight: toScale(20),
                width: toScale(48),
                height: toScale(48),
                fontSize: toScale(24),
                background:
                  index % 2 === 0
                    ? "linear-gradient(180deg,#55A295,#367C71)"
                    : "linear-gradient(180deg,#B553EA,#7839DC)",
                boxShadow: "inset 0 0 0 1px rgba(255,255,255,.18)",
              }}
            >
              {"\u2726"}
            </span>
            <span className="grow">{question}</span>
            <span
              aria-hidden="true"
              className="text-white/70"
              style={{ marginLeft: toScale(16), fontSize: toScale(24) }}
            >
              {"\u203A"}
            </span>
          </button>
        ))}
      </section>

      <aside
        className="absolute text-[#121221]"
        style={{
          left: toStageX(817),
          top: toStageY(265),
          width: toStageWidth(434),
          height: toStageHeight(560),
          padding: `${toScale(40)} ${toScale(40)} ${toScale(34)}`,
        }}
      >
        <p
          className="m-0 font-bold uppercase text-[#12184e]"
          style={{ fontSize: toScale(20), lineHeight: toScale(45) }}
        >
          Everything you need to know
        </p>
        <h2
          className="m-0 font-bold"
          style={{ fontSize: toScale(36), lineHeight: toScale(45) }}
        >
          To conquer Hack the Valley 11!
        </h2>
        <p
          className="m-0 text-[#12184e]"
          style={{
            marginTop: toScale(35),
            fontSize: toScale(20),
            lineHeight: toScale(45),
          }}
        >
          Browse our FAQs section to get the details on what we&apos;re about,
          where the event happens, and much more.
        </p>
        <p
          className="m-0 font-semibold"
          style={{
            marginTop: toScale(4),
            fontSize: toScale(24),
            lineHeight: toScale(45),
          }}
        >
          Still have a question?
        </p>
        <p
          className="m-0 italic text-[#12184e]"
          style={{ fontSize: toScale(20), lineHeight: toScale(45) }}
        >
          Ask our team below!
        </p>
      </aside>

      <div
        className="absolute"
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
        className="absolute m-0 font-vcr font-normal leading-none"
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
        className="absolute m-0"
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
              className="absolute border border-white/10"
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
    </div>
  );
}
