export type FaqIconId =
  | "help"
  | "bag"
  | "dollar"
  | "shield"
  | "search"
  | "calendar";

export type FaqTextRun = {
  text: string;
  weight?: "regular" | "bold";
  style?: "normal" | "italic";
};

export type FaqTextBlock = {
  kind: "paragraph" | "signature";
  runs: readonly FaqTextRun[];
};

export type FaqButtonPose = {
  x: number;
  y: number;
  rotateDeg: number;
};

export type FaqPaperPose = {
  x: number;
  y: number;
  rotateDeg: number;
};

export type FaqStampPose = {
  x: number;
  y: number;
  rotateDeg: number;
  scale: number;
};

export type FaqDefaultCard = {
  eyebrow: string;
  titleLines: readonly string[];
  body: readonly FaqTextBlock[];
  closingHeading: string;
  closingText: string;
  paperPose: FaqPaperPose;
  stampPose: FaqStampPose;
};

export type FaqItem = {
  id: string;
  label: string;
  icon: FaqIconId;
  buttonPose: FaqButtonPose;
  paperPose: FaqPaperPose;
  stampPose: FaqStampPose;
  paperHeader: string;
  salutation: string;
  blocks: readonly FaqTextBlock[];
  signature: string;
};

const paragraph = (...runs: FaqTextRun[]) =>
  ({
    kind: "paragraph",
    runs,
  }) as const satisfies FaqTextBlock;

const text = (
  value: string,
  options?: Pick<FaqTextRun, "style" | "weight">,
) =>
  ({
    text: value,
    ...options,
  }) as const satisfies FaqTextRun;

export const FAQ_DEFAULT_CARD = {
  eyebrow: "EVERYTHING YOU NEED TO KNOW",
  titleLines: ["To Conquer Hack The", "Valley 11!"],
  body: [
    paragraph(
      text("Browse our "),
      text("FAQs section", { weight: "bold" }),
      text(
        " to get the details on what we're about, where the event happens, and much more.",
      ),
    ),
  ],
  closingHeading: "Still Have A Question?",
  closingText: "Ask Our Team Below!",
  paperPose: {
    x: 799,
    y: 244,
    rotateDeg: 0,
  },
  stampPose: {
    x: 302,
    y: 412,
    rotateDeg: -8,
    scale: 1,
  },
} as const satisfies FaqDefaultCard;

export const FAQ_ITEMS = [
  {
    id: "what-is-hack-the-valley",
    label: "What Is Hack The Valley?",
    icon: "help",
    buttonPose: { x: 260.08, y: 211.13, rotateDeg: -3.33 },
    paperPose: { x: 799, y: 244, rotateDeg: 3.33 },
    stampPose: { x: 22, y: 18, rotateDeg: 0, scale: 1 },
    paperHeader: "WHAT IS HACK THE VALLEY?",
    salutation: "Dear Hacker,",
    blocks: [
      paragraph(
        text("Hack the Valley is a "),
        text("36-hour student-run hackathon", { weight: "bold" }),
        text(" hosted at the University of Toronto Scarborough."),
      ),
      paragraph(
        text("Open to "),
        text("all skill levels", { weight: "bold" }),
        text(
          ", it brings together hundreds of students to build innovative tech projects, attend workshops, network with mentors, and compete for prizes — all in a fun, ",
        ),
        text("beginner-friendly environment", { weight: "bold" }),
        text("."),
      ),
    ],
    signature: "-Hack The Valley 11",
  },
  {
    id: "what-do-i-need-to-bring",
    label: "What Do I Need To Bring?",
    icon: "bag",
    buttonPose: { x: 260.08, y: 324.13, rotateDeg: 3.33 },
    paperPose: { x: 799, y: 244, rotateDeg: -3.33 },
    stampPose: { x: 22, y: 18, rotateDeg: 0, scale: 1 },
    paperHeader: "WHAT DO I NEED TO BRING?",
    salutation: "Dear Hacker,",
    blocks: [
      paragraph(
        text("You'll need: "),
        text("A laptop and charger.", { weight: "bold" }),
        text(
          " We'd also recommend a sleeping bag if you plan to stay the night at the venue. Everything else is optional.",
        ),
      ),
      paragraph(
        text(
          "You don't need: An idea and a team. You can create your own team (teams of 4 recommended) during the hackathon, and ",
        ),
        text("generate some amazing ideas along the way.", { weight: "bold" }),
        text(" You also don't need to worry about food, we've got you covered."),
      ),
    ],
    signature: "-Hack The Valley 11",
  },
  {
    id: "how-much-does-it-cost-to-attend",
    label: "How Much Does It Cost To Attend?",
    icon: "dollar",
    buttonPose: { x: 260.08, y: 437.13, rotateDeg: -3.33 },
    paperPose: { x: 799, y: 244, rotateDeg: 3.33 },
    stampPose: { x: 22, y: 18, rotateDeg: 0, scale: 1 },
    paperHeader: "HOW MUCH DOES IT COST TO ATTEND?",
    salutation: "Dear Hacker,",
    blocks: [
      paragraph(
        text("It's "),
        text("completely free", { weight: "bold" }),
        text(", so don't worry!"),
      ),
      paragraph(
        text(
          "We'll provide you with a weekend's worth of meals, drinks, and snacks and a place to crash when you need a break from coding.",
        ),
      ),
      paragraph(
        text("In fact, you'll probably walk away "),
        text("loaded with all the swag", { weight: "bold" }),
        text(" that you'll get at Hack the Valley."),
      ),
    ],
    signature: "-Hack The Valley 11",
  },
  {
    id: "how-is-hack-the-valley-run",
    label: "How Is Hack The Valley Run?",
    icon: "shield",
    buttonPose: { x: 260.08, y: 550.13, rotateDeg: 3.33 },
    paperPose: { x: 799, y: 244, rotateDeg: -3.33 },
    stampPose: { x: 22, y: 18, rotateDeg: 0, scale: 1 },
    paperHeader: "HOW IS HACK THE VALLEY RUN?",
    salutation: "Dear Hacker,",
    blocks: [
      paragraph(
        text("Hack The Valley is ran almost entirely by "),
        text("(sleep-deprived) University of Toronto students along with our friends from other universities", {
          weight: "bold",
        }),
        text(
          " with some advice and assistance from our friends at the Department of Student Life and Association of Mathematical and Computer Science Students.",
        ),
      ),
      paragraph(
        text(
          "One hundred percent of the funding for Hack the Valley comes from corporate sponsor donations.",
        ),
      ),
    ],
    signature: "-Hack The Valley 11",
  },
  {
    id: "where-is-it",
    label: "Where Is It?",
    icon: "search",
    buttonPose: { x: 260.08, y: 663.13, rotateDeg: -3.33 },
    paperPose: { x: 799, y: 244, rotateDeg: 3.33 },
    stampPose: { x: 22, y: 18, rotateDeg: 0, scale: 1 },
    paperHeader: "WHERE IS IT?",
    salutation: "Dear Hacker,",
    blocks: [
      paragraph(
        text("Hack the Valley 11 will be held at the University of Toronto Scarborough campus in the "),
        text("IA building", { weight: "bold" }),
        text("."),
      ),
      paragraph(
        text(
          "All event activities will be hosted in the building, and participants will be able to stay in the building for the entire ",
        ),
        text("duration of the weekend", { weight: "bold" }),
        text(" (including overnight)."),
      ),
    ],
    signature: "-Hack The Valley 11",
  },
  {
    id: "when-is-it",
    label: "When Is It?",
    icon: "calendar",
    buttonPose: { x: 260.08, y: 776.13, rotateDeg: 3.33 },
    paperPose: { x: 799, y: 244, rotateDeg: -3.33 },
    stampPose: { x: 22, y: 18, rotateDeg: 0, scale: 1 },
    paperHeader: "WHEN IS IT?",
    salutation: "Dear Hacker,",
    blocks: [
      paragraph(
        text("Hack the Valley will be taking place on: "),
        text("October 16th - 18th, 2026.", { weight: "bold" }),
      ),
    ],
    signature: "-Hack The Valley 11",
  },
] as const satisfies readonly FaqItem[];
