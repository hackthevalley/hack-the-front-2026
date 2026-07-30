import {
  initialFormData,
  type SectionId,
  type WizardFormData,
} from "./sectionConfig";

export type BackendQuestion = {
  label: string;
  question_id: string;
  required?: boolean;
};

export type BackendAnswer = {
  answer: string | null;
  question_id: string;
};

export type BackendApplicationResponse = {
  form_answers: BackendAnswer[];
  form_answersfile: string | null;
};

export type BackendAnswerUpdate = {
  answer: string;
  question_id: string;
};

type AnswerBinding = {
  field: string;
  section: SectionId;
  type?: "boolean";
};

const ANSWER_BINDINGS: Record<string, AnswerBinding> = {
  "First Name": { section: "about", field: "firstName" },
  "Last Name": { section: "about", field: "lastName" },
  Email: { section: "about", field: "email" },
  "Phone Number": { section: "about", field: "phone" },
  Country: { section: "school", field: "country" },
  "School Name": { section: "school", field: "schoolName" },
  Major: { section: "school", field: "major" },
  "Current Level of Study": {
    section: "school",
    field: "levelOfEducation",
  },
  "Expected Graduation Year": {
    section: "school",
    field: "yearOfGraduation",
  },
  Age: { section: "demography", field: "age" },
  Gender: { section: "demography", field: "gender" },
  "Race/Ethnicity (Select all that apply)": { section: "demography", field: "raceEthnicity" },
  "Part of the LGBTQ+ Community": {
    section: "demography",
    field: "lgbtq",
  },
  "Person with Disabilities?": {
    section: "demography",
    field: "disability",
  },
  "Hackathon Count?": { section: "experience", field: "hackathonCount" },
  Avatar: { section: "customCharacter", field: "character" },
  Accessory: { section: "customAccessory", field: "accessory" },
  Github: { section: "experience", field: "github" },
  LinkedIn: { section: "experience", field: "linkedin" },
  Portfolio: { section: "portfolio", field: "portfolio" },
  "UI/UX Design": { section: "devSkills", field: "uiux" },
  "Frontend Development": { section: "devSkills", field: "frontend" },
  "Backend Development": { section: "devSkills", field: "backend" },
  "Fullstack Development": { section: "devSkills", field: "fullstack" },
  "Project Management": {
    section: "otherSkills",
    field: "productManagement",
  },
  "Web, Crypto, Blockchain": {
    section: "otherSkills",
    field: "webCryptoBlockchain",
  },
  Cybersecurity: { section: "otherSkills", field: "cyberSecurity" },
  "Machine Learning": { section: "otherSkills", field: "machineLearning" },
  "Dietary Restrictions": {
    section: "custom",
    field: "dietaryRestrictions",
  },
  "T-Shirt Size": { section: "custom", field: "tshirtSize" },
  "MLH Code of Conduct": {
    section: "mlh",
    field: "agreedToCodeOfConduct",
    type: "boolean",
  },
  "MLH Privacy Policy, MLH Contest Terms and Conditions": {
    section: "mlh",
    field: "authorizedShareInfo",
    type: "boolean",
  },
  "MLH Event Communication": {
    section: "mlh",
    field: "authorizedMlhEmails",
    type: "boolean",
  },
  "Hack the Valley Consent Form Agreement": {
    section: "mlh",
    field: "consentMediaRelease",
    type: "boolean",
  },
};

function parseBoolean(value: string): boolean {
  return ["1", "on", "true", "yes"].includes(value.trim().toLowerCase());
}

export function hydrateApplicationAnswers(
  questions: BackendQuestion[],
  answers: BackendAnswer[],
): WizardFormData {
  const hydrated = structuredClone(initialFormData);
  const labelsById = new Map(
    questions.map((question) => [question.question_id, question.label]),
  );

  for (const answer of answers) {
    if (answer.answer === null) continue;

    const label = labelsById.get(answer.question_id);
    const binding = label ? ANSWER_BINDINGS[label] : undefined;
    if (!binding) continue;

    const section = hydrated[binding.section] as unknown as Record<
      string,
      boolean | File | null | string
    >;
    section[binding.field] =
      binding.type === "boolean"
        ? parseBoolean(answer.answer)
        : answer.answer;
  }

  return hydrated;
}

export function serializeApplicationAnswers(
  formData: WizardFormData,
  questions: BackendQuestion[],
): BackendAnswerUpdate[] {
  const questionIdsByLabel = new Map(
    questions.map((question) => [question.label, question.question_id]),
  );
  const updates: BackendAnswerUpdate[] = [];

  for (const [label, binding] of Object.entries(ANSWER_BINDINGS)) {
    const questionId = questionIdsByLabel.get(label);
    if (!questionId) continue;

    const section = formData[binding.section] as unknown as Record<
      string,
      boolean | File | null | string
    >;
    const value = section[binding.field];
    updates.push({
      question_id: questionId,
      answer: typeof value === "boolean" ? String(value) : String(value ?? ""),
    });
  }

  return updates;
}
