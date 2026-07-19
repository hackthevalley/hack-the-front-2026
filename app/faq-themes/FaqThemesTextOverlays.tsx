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
    glyph: "✦",
    top: 1854.5947,
    height: 233.5312,
    opacity: 0.9,
    iconSide: "left",
  },
  {
    title: "Climate Action & Sustainability",
    description:
      "Develop solutions that reduce environmental impact, promote renewable energy adoption, and advance sustainable systems at scale. Hackers may create projects that focus on carbon tracking, energy optimization, circular economies, or sustainable consumption.",
    glyph: "❧",
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
    glyph: "▦",
    top: 2948.7197,
    height: 233.5312,
    opacity: 0.5,
    iconSide: "left",
  },
] as const;

const HEADING_GLOW =
  "0 0 8px rgba(255,255,255,.9), 0 0 24px rgba(202,210,255,.48)";

export default function FaqThemesTextOverlays() {
  return (
    <div className="absolute inset-0 font-figtree text-white">
      <h1
        className="absolute m-0 font-vcr font-normal leading-none"
        style={{ left: 693, top: 101, fontSize: 72, textShadow: HEADING_GLOW }}
      >
        FAQ
      </h1>

      <section
        aria-label="Frequently asked questions"
        className="absolute flex flex-col gap-[33px]"
        style={{ left: 262, top: 225, width: 480 }}
      >
        {FAQ_ITEMS.map((question, index) => (
          <button
            key={question}
            type="button"
            aria-expanded="false"
            className="flex h-20 w-full items-center rounded-2xl border border-white/10 px-5 text-left text-xl font-medium text-[#E5E7EB] shadow-[0_12px_30px_rgba(0,0,0,.22)]"
            style={{
              background:
                index % 2 === 0
                  ? "linear-gradient(90deg, rgba(16,35,93,.96), rgba(22,40,112,.9))"
                  : "linear-gradient(90deg, rgba(22,25,93,.98), rgba(33,43,129,.9))",
            }}
          >
            <span
              aria-hidden="true"
              className="mr-5 grid h-12 w-12 shrink-0 place-items-center rounded-full text-2xl"
              style={{
                background:
                  index % 2 === 0
                    ? "linear-gradient(180deg,#55A295,#367C71)"
                    : "linear-gradient(180deg,#B553EA,#7839DC)",
                boxShadow: "inset 0 0 0 1px rgba(255,255,255,.18)",
              }}
            >
              ✦
            </span>
            <span className="grow">{question}</span>
            <span aria-hidden="true" className="ml-4 text-2xl text-white/70">
              ›
            </span>
          </button>
        ))}
      </section>

      <aside
        className="absolute text-[#121221]"
        style={{
          left: 817,
          top: 265,
          width: 434,
          height: 560,
          padding: "40px 40px 34px",
        }}
      >
        <p className="m-0 text-xl font-bold uppercase leading-[45px] text-[#12184e]">
          Everything you need to know
        </p>
        <h2 className="m-0 text-4xl font-bold leading-[45px]">
          To conquer Hack the Valley 11!
        </h2>
        <p className="m-0 mt-[35px] text-xl leading-[45px] text-[#12184e]">
          Browse our FAQs section to get the details on what we&apos;re about,
          where the event happens, and much more.
        </p>
        <p className="m-0 mt-[4px] text-2xl font-semibold leading-[45px]">
          Still have a question?
        </p>
        <p className="m-0 text-xl italic leading-[45px] text-[#12184e]">
          Ask our team below!
        </p>
      </aside>

      <div className="absolute" style={{ left: 322, top: 1345, width: 363 }}>
        <p
          className="m-0 text-4xl font-medium leading-none"
          style={{ textShadow: "0 0 12px rgba(255,255,255,.75)" }}
        >
          Have more questions?
        </p>
        <p className="m-0 mt-[15px] text-2xl italic leading-none">
          Message us at @hackthevalley.io
        </p>
      </div>

      <a
        href="mailto:contact@hackthevalley.io"
        className="absolute grid place-items-center rounded-full border border-white/30 text-xs font-semibold text-white shadow-[0_0_24px_rgba(223,99,220,.55)]"
        style={{
          left: 908,
          top: 1365,
          width: 240,
          height: 56,
          background: "linear-gradient(95deg,#ff7ccd,#7839dc)",
        }}
      >
        Contact Us
      </a>

      <h2
        className="absolute m-0 font-vcr font-normal leading-none"
        style={{
          left: 629,
          top: 1569.708,
          width: 254,
          fontSize: 72,
          textAlign: "center",
          textShadow: HEADING_GLOW,
        }}
      >
        Themes
      </h2>
      <p
        className="absolute m-0 text-2xl"
        style={{ left: 593.5, top: 1676.7119, width: 325, textAlign: "center" }}
      >
        Spark your build with purpose.
      </p>

      <section aria-label="Hackathon themes">
        {THEMES.map((theme) => {
          const iconOnLeft = theme.iconSide === "left";
          return (
            <article
              key={theme.title}
              className="absolute rounded-[22px] border border-white/10"
              style={{
                left: 355,
                top: theme.top,
                width: 802,
                height: theme.height,
                background: `rgba(82, 89, 189, ${theme.opacity})`,
                boxShadow: "inset 0 1px 0 rgba(255,255,255,.08)",
              }}
            >
              <div
                aria-hidden="true"
                className="absolute grid place-items-center font-vcr text-7xl text-[#FFF3EC]"
                style={{
                  left: iconOnLeft ? 42 : 650,
                  top: 50,
                  width: 110,
                  height: 110,
                  textShadow: "0 0 20px rgba(184,190,255,.75)",
                }}
              >
                {theme.glyph}
              </div>
              <div
                className="absolute"
                style={{
                  left: iconOnLeft ? 219 : 48,
                  top: 36,
                  width: iconOnLeft ? 534 : 532,
                }}
              >
                <h3
                  className="m-0 text-[28px] font-bold leading-[34px]"
                  style={{ textShadow: "0 2px 8px rgba(16,20,74,.5)" }}
                >
                  {theme.title}
                </h3>
                <p className="m-0 mt-2 text-xl leading-6">{theme.description}</p>
              </div>
            </article>
          );
        })}
      </section>
    </div>
  );
}
