export type AboutData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
};

export type CustomData = {
  tshirtSize: string;
  dietaryRestrictions: string;
};

export type ExperienceData = {
  experienceLevel: string;
  pastHackathons: string;
};

export type SurveyData = {
  howDidYouHear: string;
  excitedAbout: string;
};

export type ReviewData = Record<string, never>;
