import type { ComponentType } from "react";
import AboutSection from "./sections/AboutSection";
import CustomSection from "./sections/CustomSection";
import ExperienceSection from "./sections/ExperienceSection";
import SurveySection from "./sections/SurveySection";
import ReviewSection from "./sections/ReviewSection";
import WelcomeSection from "./sections/WelcomeSection";
import type {
  AboutData,
  CustomData,
  ExperienceData,
  ReviewData,
  SurveyData,
} from "./sections/data";

export type WizardFormData = {
  about: AboutData;
  custom: CustomData;
  experience: ExperienceData;
  survey: SurveyData;
  review: ReviewData;
};

export type SectionId = keyof WizardFormData;

export const initialFormData: WizardFormData = {
  about: { firstName: "", lastName: "", email: "", phone: "" },
  custom: { tshirtSize: "", dietaryRestrictions: "" },
  experience: { experienceLevel: "", pastHackathons: "" },
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
    id: "custom",
    label: "Custom",
    title: "Customize",
    Left: WelcomeSection,
    Right: CustomSection,
  },
  {
    id: "experience",
    label: "Experience",
    title: "Experience",
    Left: WelcomeSection,
    Right: ExperienceSection,
  },
  {
    id: "survey",
    label: "Survey",
    title: "Survey",
    Left: WelcomeSection,
    Right: SurveySection,
  },
  {
    id: "review",
    label: "Review",
    title: "Review",
    Left: WelcomeSection,
    Right: ReviewSection,
  },
];
