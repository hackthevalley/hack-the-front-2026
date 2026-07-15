"use client";

import * as React from "react";
import SectionHeading from "./SectionHeading";
import type { SectionHandle, SectionProps } from "./types";
import type { AboutData, CustomData, ExperienceData, ReviewData, SurveyData } from "./data";

export type ReviewFormData = {
  about: AboutData;
  custom: CustomData;
  experience: ExperienceData;
  survey: SurveyData;
};

type ReviewSectionProps = SectionProps<ReviewData> & {
  formData: ReviewFormData;
};

const SUMMARY_ROWS: { label: string; get: (data: ReviewFormData) => string }[] = [
  { label: "Name", get: (d) => `${d.about.firstName} ${d.about.lastName}`.trim() || "—" },
  { label: "Email", get: (d) => d.about.email || "—" },
  { label: "Phone", get: (d) => d.about.phone || "—" },
  { label: "T-Shirt Size", get: (d) => d.custom.tshirtSize || "—" },
  { label: "Dietary Restrictions", get: (d) => d.custom.dietaryRestrictions || "—" },
  { label: "Experience Level", get: (d) => d.experience.experienceLevel || "—" },
  { label: "Past Hackathons", get: (d) => d.experience.pastHackathons || "—" },
  { label: "How did you hear about us?", get: (d) => d.survey.howDidYouHear || "—" },
];

const ReviewSection = React.forwardRef<SectionHandle, ReviewSectionProps>(
  ({ formData }, ref) => {
    React.useImperativeHandle(ref, () => ({
      validate: () => true,
    }));

    return (
      <div className="flex flex-col gap-6">
        <SectionHeading>Review</SectionHeading>

        <dl className="flex flex-col gap-3">
          {SUMMARY_ROWS.map((row) => (
            <div key={row.label} className="flex items-baseline justify-between gap-4 border-b border-white/10 pb-2">
              <dt className="text-sm text-white/60">{row.label}</dt>
              <dd className="text-right text-white">{row.get(formData)}</dd>
            </div>
          ))}
        </dl>
      </div>
    );
  },
);

ReviewSection.displayName = "ReviewSection";

export default ReviewSection;
