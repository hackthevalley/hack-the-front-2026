import type {
  ComponentType,
  ElementType,
  ReactNode,
} from "react";
import AboutSection from "./sections/AboutSection";
import AccessoryLeftSection from "./sections/AccessoryLeftSection";
import AccessoryRightSection from "./sections/AccessoryRightSection";
import CharacterLeftSection from "./sections/CharacterLeftSection";
import CharacterRightSection from "./sections/CharacterRightSection";
import DemographySection from "./sections/DemographySection";
import SkillsLeftSection from "./sections/SkillsLeftSection";
import ExperienceSection from "./sections/ExperienceSection";
import GeneralSection from "./sections/GeneralSection";
import MlhSection from "./sections/MlhSection";
import SkillsRightSection from "./sections/SkillsRightSection";
import PortfolioSection from "./sections/PortfolioSection";
import SchoolSection from "./sections/SchoolSection";
import ReviewSectionRight from "./sections/ReviewSectionRight";
import ReviewSectionLeft from "./sections/ReviewSectionLeft";
import WelcomeSection from "./sections/WelcomeSection";
import type {
  AboutData,
  AccessoryData,
  CharacterData,
  CustomData,
  DemographyData,
  DevSkillsData,
  ExperienceData,
  MlhData,
  OtherSkillsData,
  PortfolioData,
  ReviewData,
  SchoolData,
} from "./sections/data";
import type { SectionProps } from "./sections/types";

export type WizardFormData = {
  about: AboutData;
  school: SchoolData;
  demography: DemographyData;
  custom: CustomData;
  customCharacter: CharacterData;
  customAccessory: AccessoryData;
  experience: ExperienceData;
  portfolio: PortfolioData;
  devSkills: DevSkillsData;
  otherSkills: OtherSkillsData;
  mlh: MlhData;
  review: ReviewData;
};

export type SectionId = keyof WizardFormData;

export const initialFormData: WizardFormData = {
  about: { firstName: "", lastName: "", email: "", phone: "" },
  school: {
    country: "",
    schoolName: "",
    major: "",
    levelOfEducation: "",
    yearOfGraduation: "",
  },
  demography: {
    age: "",
    gender: "",
    raceEthnicity: "",
    lgbtq: "",
    disability: "",
  },
  custom: { tshirtSize: "", dietaryRestrictions: "" },
  customCharacter: { character: "" },
  customAccessory: { accessory: "" },
  experience: { hackathonCount: "", github: "", linkedin: "" },
  portfolio: { portfolio: "", resume: null, savedResumeName: "" },
  devSkills: { uiux: "", frontend: "", backend: "", fullstack: "" },
  otherSkills: {
    productManagement: "",
    webCryptoBlockchain: "",
    cyberSecurity: "",
    machineLearning: "",
  },
  mlh: {
    agreedToCodeOfConduct: false,
    authorizedShareInfo: false,
    authorizedMlhEmails: false,
    consentMediaRelease: false,
  },
  review: {},
};

export type SectionConfigItem = {
  id: SectionId;
  title: string;
  Left: ElementType;
  Right: ElementType;
  // Most steps use a purely decorative Left (WelcomeSection, fed just `title`).
  // When a step needs real fields on both sides, set leftId to the form-data
  // key Left should be wired to — page.tsx then gives it the same
  // value/onChange/ref/onValidityChange treatment as Right.
  leftId?: SectionId;
};

type FormSectionComponent<K extends SectionId> =
  | ComponentType<SectionProps<WizardFormData[K]>>
  | ComponentType<
      SectionProps<WizardFormData[K]> & { formData: WizardFormData }
    >;

function defineStep<K extends SectionId>(step: {
  id: K;
  title: string;
  Left: ComponentType<{ children: ReactNode }>;
  Right: FormSectionComponent<K>;
}): SectionConfigItem {
  return step;
}

function defineSplitStep<
  K extends SectionId,
  L extends SectionId,
>(step: {
  id: K;
  leftId: L;
  title: string;
  Left: FormSectionComponent<L>;
  Right: FormSectionComponent<K>;
}): SectionConfigItem {
  return step;
}

export type SectionGroup = {
  id: string;
  label: string;
  // One pair of [Left, Right] panels per subsection. The nav bar shows one
  // button per group; "Next" walks through every group's steps in order,
  // and clicking a group's nav button always jumps to its first step.
  steps: SectionConfigItem[];
};

// Nav groups, in order. Add a group here to add a nav button; add/remove a
// step inside a group to change how many [Left, Right] subsections it has —
// the flattened step list, nav bar, and progress bar all derive from this.
export const SECTION_GROUPS: SectionGroup[] = [
  {
    id: "about",
    label: "About",
    steps: [
      defineStep<"about">({
        id: "about",
        title: "Join Us",
        Left: WelcomeSection,
        Right: AboutSection,
      }),
      defineSplitStep<"demography", "school">({
        id: "demography",
        leftId: "school",
        title: "Background",
        Left: SchoolSection,
        Right: DemographySection,
      }),
    ],
  },
  {
    id: "custom",
    label: "Custom",
    steps: [
      defineSplitStep<"customCharacter", "customCharacter">({
        id: "customCharacter",
        leftId: "customCharacter",
        title: "Choose An Avatar",
        Left: CharacterLeftSection,
        Right: CharacterRightSection,
      }),
      defineSplitStep<"customAccessory", "customAccessory">({
        id: "customAccessory",
        leftId: "customAccessory",
        title: "Choose An Accessory",
        Left: AccessoryLeftSection,
        Right: AccessoryRightSection,
      }),
    ],
  },
  {
    id: "experience",
    label: "Experience",
    steps: [
      defineSplitStep<"portfolio", "experience">({
        id: "portfolio",
        leftId: "experience",
        title: "Experience Info",
        Left: ExperienceSection,
        Right: PortfolioSection,
      }),
      defineSplitStep<"otherSkills", "devSkills">({
        id: "otherSkills",
        leftId: "devSkills",
        title: "Skill Confidence",
        Left: SkillsLeftSection,
        Right: SkillsRightSection,
      }),
    ],
  },
  {
    id: "survey",
    label: "Survey",
    steps: [
      defineSplitStep<"mlh", "custom">({
        id: "mlh",
        leftId: "custom",
        title: "General Info",
        Left: GeneralSection,
        Right: MlhSection,
      }),
    ],
  },
  {
    id: "review",
    label: "Review",
    steps: [
      defineSplitStep<"review", "review">({
        id: "review",
        leftId: "review",
        title: "Review",
        Left: ReviewSectionLeft,
        Right: ReviewSectionRight,
      }),
    ],
  },
];

export type FlatSectionStep = SectionConfigItem & {
  groupIndex: number;
  stepIndexInGroup: number;
};

// Flattened [Left, Right] steps in wizard order, each tagged with the group
// it belongs to. This is what page.tsx pages through with stepIndex.
export const SECTIONS: FlatSectionStep[] = SECTION_GROUPS.flatMap(
  (group, groupIndex) =>
    group.steps.map((step, stepIndexInGroup) => ({
      ...step,
      groupIndex,
      stepIndexInGroup,
    })),
);

// The flat step index each group's first subsection starts at, e.g. for
// groups of sizes [2, 1, 2, 1, 1] this is [0, 2, 3, 5, 6]. Used to jump to a
// group's first step when its nav button is clicked.
export const GROUP_START_STEP_INDEX: number[] = (() => {
  const starts: number[] = [];
  let stepCount = 0;
  for (const group of SECTION_GROUPS) {
    starts.push(stepCount);
    stepCount += group.steps.length;
  }
  return starts;
})();
