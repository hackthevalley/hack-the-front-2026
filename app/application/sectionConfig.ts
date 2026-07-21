import type { ComponentType } from "react";
import AboutSection from "./sections/AboutSection";
import DemographySection from "./sections/DemographySection";
import DevSkillsSection from "./sections/DevSkillsSection";
import ExperienceSection from "./sections/ExperienceSection";
import GeneralSection from "./sections/GeneralSection";
import MlhSection from "./sections/MlhSection";
import OtherSkillsSection from "./sections/OtherSkillsSection";
import PortfolioSection from "./sections/PortfolioSection";
import SchoolSection from "./sections/SchoolSection";
import SurveySection from "./sections/SurveySection";
import ReviewSection from "./sections/ReviewSection";
import WelcomeSection from "./sections/WelcomeSection";
import type {
  AboutData,
  CustomData,
  DemographyData,
  DevSkillsData,
  ExperienceData,
  MlhData,
  OtherSkillsData,
  PortfolioData,
  ReviewData,
  SchoolData,
  SurveyData,
} from "./sections/data";

export type WizardFormData = {
  about: AboutData;
  school: SchoolData;
  demography: DemographyData;
  custom: CustomData;
  experience: ExperienceData;
  portfolio: PortfolioData;
  devSkills: DevSkillsData;
  otherSkills: OtherSkillsData;
  mlh: MlhData;
  survey: SurveyData;
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
  experience: { hackathonCount: "", github: "", linkedin: "" },
  portfolio: { portfolio: "", resume: null },
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
  survey: { howDidYouHear: "", excitedAbout: "" },
  review: {},
};

export type SectionConfigItem = {
  id: SectionId;
  label: string;
  title: string;
  // Each section has a different data shape, so the shared registry type-erases
  // the component's props; page.tsx supplies value/onChange (and formData for
  // the review step) matching whichever section is currently active.
  Left: ComponentType<any>; // eslint-disable-line @typescript-eslint/no-explicit-any
  Right: ComponentType<any>; // eslint-disable-line @typescript-eslint/no-explicit-any
  // Most steps use a purely decorative Left (WelcomeSection, fed just `title`).
  // When a step needs real fields on both sides, set leftId to the form-data
  // key Left should be wired to — page.tsx then gives it the same
  // value/onChange/ref/onValidityChange treatment as Right.
  leftId?: SectionId;
};

// [Left, Right] component pair for each step, alongside the metadata (id/label/title)
// still needed for form-data keys, nav labels, and the Left's title text.
export const SECTIONS: SectionConfigItem[] = [
  {
    id: "about",
    label: "About",
    title: "Join Us",
    Left: WelcomeSection,
    Right: AboutSection,
  },
  {
    id: "demography",
    leftId: "school",
    label: "Background",
    title: "Background",
    Left: SchoolSection,
    Right: DemographySection,
  },
  {
    id: "portfolio",
    leftId: "experience",
    label: "Experience",
    title: "Experience Info",
    Left: ExperienceSection,
    Right: PortfolioSection,
  },
  {
    id: "otherSkills",
    leftId: "devSkills",
    label: "Skills",
    title: "Skill Confidence",
    Left: DevSkillsSection,
    Right: OtherSkillsSection,
  },
  {
    id: "mlh",
    leftId: "custom",
    label: "Survey",
    title: "General Info",
    Left: GeneralSection,
    Right: MlhSection,
  },
  {
    id: "review",
    label: "Review",
    title: "Review",
    Left: WelcomeSection,
    Right: ReviewSection,
  },
];
