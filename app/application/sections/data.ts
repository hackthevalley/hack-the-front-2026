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
  hackathonCount: string;
  github: string;
  linkedin: string;
};

export type PortfolioData = {
  portfolio: string;
  resume: File | null;
};

export type DevSkillsData = {
  uiux: string;
  frontend: string;
  backend: string;
  fullstack: string;
};

export type OtherSkillsData = {
  productManagement: string;
  webCryptoBlockchain: string;
  cyberSecurity: string;
  machineLearning: string;
};

export type SchoolData = {
  country: string;
  schoolName: string;
  major: string;
  levelOfEducation: string;
  yearOfGraduation: string;
};

export type DemographyData = {
  age: string;
  gender: string;
  raceEthnicity: string;
  lgbtq: string;
  disability: string;
};

export type MlhData = {
  agreedToCodeOfConduct: boolean;
  authorizedShareInfo: boolean;
  authorizedMlhEmails: boolean;
  consentMediaRelease: boolean;
};

export type ReviewData = Record<string, never>;

export type AvatarKey = "owl" | "bear" | "chipmunk" | "raccoon";

export type AccessoryKey = "hat" | "book" | "potion";

export type CharacterData = {
  character: AvatarKey | "";
};

export type AccessoryData = {
  accessory: AccessoryKey | "";
};
