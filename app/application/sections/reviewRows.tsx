import type {
  AboutData,
  CustomData,
  DemographyData,
  DevSkillsData,
  ExperienceData,
  MlhData,
  OtherSkillsData,
  PortfolioData,
  SchoolData,
} from "./data";

export type ReviewFormData = {
  about: AboutData;
  school: SchoolData;
  demography: DemographyData;
  custom: CustomData;
  experience: ExperienceData;
  portfolio: PortfolioData;
  devSkills: DevSkillsData;
  otherSkills: OtherSkillsData;
  mlh: MlhData;
};

type SummaryRow = { label: string; get: (d: ReviewFormData) => string };
type SummaryGroup = { title: string; rows: SummaryRow[] };

// Left page: identity/background fields, in the order they were collected.
export const LEFT_GROUPS: SummaryGroup[] = [
  {
    title: "About",
    rows: [
      {
        label: "Name",
        get: (d) => `${d.about.firstName} ${d.about.lastName}`.trim() || "—",
      },
      { label: "Email", get: (d) => d.about.email || "—" },
      { label: "Phone", get: (d) => d.about.phone || "—" },
    ],
  },
  {
    title: "Education",
    rows: [
      { label: "Country", get: (d) => d.school.country || "—" },
      { label: "School", get: (d) => d.school.schoolName || "—" },
      { label: "Major", get: (d) => d.school.major || "—" },
      { label: "Level of Education", get: (d) => d.school.levelOfEducation || "—" },
      { label: "Year of Graduation", get: (d) => d.school.yearOfGraduation || "—" },
    ],
  },
  {
    title: "Demography",
    rows: [
      { label: "Age", get: (d) => d.demography.age || "—" },
      { label: "Gender", get: (d) => d.demography.gender || "—" },
      { label: "Race/Ethnicity", get: (d) => d.demography.raceEthnicity || "—" },
      { label: "LGBTQ+ Community", get: (d) => d.demography.lgbtq || "—" },
      { label: "Person With Disabilities", get: (d) => d.demography.disability || "—" },
    ],
  },
  {
    title: "General",
    rows: [
      { label: "T-Shirt Size", get: (d) => d.custom.tshirtSize || "—" },
      { label: "Dietary Restrictions", get: (d) => d.custom.dietaryRestrictions || "—" },
    ],
  },
];

// Right page: experience/skills/consent fields.
export const RIGHT_GROUPS: SummaryGroup[] = [
  {
    title: "Experience",
    rows: [
      { label: "Hackathon Count", get: (d) => d.experience.hackathonCount || "—" },
      { label: "Github", get: (d) => d.experience.github || "—" },
      { label: "Linkedin", get: (d) => d.experience.linkedin || "—" },
    ],
  },
  {
    title: "Portfolio",
    rows: [
      { label: "Portfolio", get: (d) => d.portfolio.portfolio || "—" },
      { label: "Resume", get: (d) => d.portfolio.resume?.name || "—" },
    ],
  },
  {
    title: "Dev Skills",
    rows: [
      { label: "UI/UX Design", get: (d) => d.devSkills.uiux || "—" },
      { label: "Front End Development", get: (d) => d.devSkills.frontend || "—" },
      { label: "Back End Development", get: (d) => d.devSkills.backend || "—" },
      { label: "Full Stack Development", get: (d) => d.devSkills.fullstack || "—" },
    ],
  },
  {
    title: "Other Skills",
    rows: [
      { label: "Product Management", get: (d) => d.otherSkills.productManagement || "—" },
      { label: "Web, Crypto, Blockchain", get: (d) => d.otherSkills.webCryptoBlockchain || "—" },
      { label: "Cyber Security", get: (d) => d.otherSkills.cyberSecurity || "—" },
      { label: "Machine Learning", get: (d) => d.otherSkills.machineLearning || "—" },
    ],
  },
];

export function ReviewGroupList({
  groups,
  formData,
}: {
  groups: SummaryGroup[];
  formData: ReviewFormData;
}) {
  return (
    <div className="flex flex-col gap-3">
      {groups.map((group) => (
        <div key={group.title} className="flex flex-col gap-1">
          <h2 className="font-vcr text-xs tracking-widest text-white/40 uppercase">
            {group.title}
          </h2>
          <dl className="flex flex-col gap-0.5">
            {group.rows.map((row) => (
              <div
                key={row.label}
                className="flex items-baseline justify-between gap-4 border-b border-white/10 py-0.5"
              >
                <dt className="text-xs text-white/60">{row.label}</dt>
                <dd className="text-right text-xs text-white">{row.get(formData)}</dd>
              </div>
            ))}
          </dl>
        </div>
      ))}
    </div>
  );
}
