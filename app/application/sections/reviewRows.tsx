import Image from "next/image";
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
  SchoolData,
} from "./data";
import { AVATARS, ACCESSORIES, getComboPlacement } from "./avatarAssets";
import AvatarFrame from "./AvatarFrame";
import { parseMultiSelectValue } from "@/lib/multiSelectValue";

export type ReviewFormData = {
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
      {
        label: "Level of Education",
        get: (d) => d.school.levelOfEducation || "—",
      },
      {
        label: "Year of Graduation",
        get: (d) => d.school.yearOfGraduation || "—",
      },
    ],
  },
  {
    title: "Demography",
    rows: [
      { label: "Age", get: (d) => d.demography.age || "—" },
      { label: "Gender", get: (d) => d.demography.gender || "—" },
      {
        label: "Race/Ethnicity (Select all that apply)",
        get: (d) =>
          parseMultiSelectValue(d.demography.raceEthnicity).join(", ") || "—",
      },
      { label: "LGBTQ+ Community", get: (d) => d.demography.lgbtq || "—" },
      {
        label: "Person With Disabilities",
        get: (d) => d.demography.disability || "—",
      },
    ],
  },
  {
    title: "Experience",
    rows: [
      {
        label: "Hackathon Count",
        get: (d) => d.experience.hackathonCount || "—",
      },
      { label: "Github", get: (d) => d.experience.github || "—" },
      { label: "Linkedin", get: (d) => d.experience.linkedin || "—" },
      { label: "Devpost", get: (d) => d.experience.devpost || "—" },
    ],
  },
];

// Right page: general/portfolio/skills/consent fields.
export const RIGHT_GROUPS: SummaryGroup[] = [
  {
    title: "General",
    rows: [
      { label: "T-Shirt Size", get: (d) => d.custom.tshirtSize || "—" },
      {
        label: "Dietary Restrictions",
        get: (d) => d.custom.dietaryRestrictions || "—",
      },
    ],
  },
  {
    title: "Portfolio",
    rows: [
      { label: "Portfolio", get: (d) => d.portfolio.portfolio || "—" },
      {
        label: "Resume",
        get: (d) =>
          d.portfolio.resume?.name || d.portfolio.savedResumeName || "—",
      },
    ],
  },
  {
    title: "Skills",
    rows: [
      { label: "UI/UX Design", get: (d) => d.devSkills.uiux || "—" },
      {
        label: "Front End Development",
        get: (d) => d.devSkills.frontend || "—",
      },
      { label: "Back End Development", get: (d) => d.devSkills.backend || "—" },
      {
        label: "Full Stack Development",
        get: (d) => d.devSkills.fullstack || "—",
      },
      {
        label: "Product Management",
        get: (d) => d.otherSkills.productManagement || "—",
      },
      {
        label: "Web, Crypto, Blockchain",
        get: (d) => d.otherSkills.webCryptoBlockchain || "—",
      },
      {
        label: "Cyber Security",
        get: (d) => d.otherSkills.cyberSecurity || "—",
      },
      {
        label: "Machine Learning",
        get: (d) => d.otherSkills.machineLearning || "—",
      },
    ],
  },
];

// Small composed avatar + accessory thumbnail, reusing the same overlay
// placement math as the Accessory step's preview, scaled down to sit
// alongside the review's text summary instead of filling its own frame.
export function ReviewAvatarPreview({
  formData,
}: {
  formData: ReviewFormData;
}) {
  const avatar = AVATARS.find(
    (a) => a.key === formData.customCharacter.character,
  );
  const accessory = ACCESSORIES.find(
    (a) => a.key === formData.customAccessory.accessory,
  );
  const placement =
    avatar && accessory
      ? getComboPlacement(avatar.key, accessory.key)
      : undefined;

  if (!avatar) return null;

  return (
    <div className="mx-auto w-48 shrink-0">
      <AvatarFrame borderWidth={4}>
        <Image
          src={avatar.src}
          alt={avatar.label}
          fill
          className="object-contain p-6"
        />
        {accessory && placement && (
          <Image
            src={accessory.src}
            alt={accessory.label}
            width={100}
            height={100}
            className="pointer-events-none absolute h-auto select-none"
            style={{
              left: `${placement.left}%`,
              top: `${placement.top}%`,
              width: `${placement.width}%`,
              transform: placement.rotate
                ? `rotate(${placement.rotate}deg)`
                : undefined,
            }}
          />
        )}
      </AvatarFrame>
    </div>
  );
}

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
                <dd className="text-right text-xs text-white">
                  {row.get(formData)}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      ))}
    </div>
  );
}
