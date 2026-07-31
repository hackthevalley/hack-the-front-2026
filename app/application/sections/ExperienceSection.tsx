"use client";

import * as React from "react";
import TextField, { type TextFieldHandle } from "@/components/ui/TextField";
import { getProfileUrlValidationMessage } from "@/components/ui/validation";
import SectionHeading from "./SectionHeading";
import type { SectionHandle, SectionProps } from "./types";
import { useFieldErrors } from "./useFieldErrors";
import type { ExperienceData } from "./data";

const ExperienceSection = React.forwardRef<SectionHandle, SectionProps<ExperienceData>>(
  ({ value, onChange, onValidityChange }, ref) => {
    const hackathonCountRef = React.useRef<TextFieldHandle>(null);
    const githubRef = React.useRef<TextFieldHandle>(null);
    const linkedinRef = React.useRef<TextFieldHandle>(null);
    const devpostRef = React.useRef<TextFieldHandle>(null);
    const setFieldError = useFieldErrors(onValidityChange);

    React.useImperativeHandle(ref, () => ({
      validate: () =>
        [
          hackathonCountRef.current?.validate() ?? true,
          githubRef.current?.validate() ?? true,
          linkedinRef.current?.validate() ?? true,
          devpostRef.current?.validate() ?? true,
        ].every(Boolean),
    }));

    function set<K extends keyof ExperienceData>(key: K, fieldValue: ExperienceData[K]) {
      onChange({ ...value, [key]: fieldValue });
    }

    return (
      <div className="flex flex-col gap-6">
        <SectionHeading>Experience Info</SectionHeading>

        <TextField
          ref={hackathonCountRef}
          name="Hackathon Count?"
          placeholder="Hackathon Count"
          required
          type="number"
          min={0}
          theme="application"
          value={value.hackathonCount}
          onChange={(v) => set("hackathonCount", v)}
          onValidityChange={(hasError) => setFieldError("hackathonCount", hasError)}
        />

        <TextField
          ref={githubRef}
          name="Github"
          placeholder="Github"
          theme="application"
          autoComplete="url"
          validateValue={(v) => getProfileUrlValidationMessage(v, "GitHub")}
          value={value.github}
          onChange={(v) => set("github", v)}
          onValidityChange={(hasError) => setFieldError("github", hasError)}
        />

        <TextField
          ref={linkedinRef}
          name="Linkedin"
          placeholder="Linkedin"
          theme="application"
          autoComplete="url"
          validateValue={(v) => getProfileUrlValidationMessage(v, "LinkedIn")}
          value={value.linkedin}
          onChange={(v) => set("linkedin", v)}
          onValidityChange={(hasError) => setFieldError("linkedin", hasError)}
        />

        <TextField
          ref={devpostRef}
          name="Devpost"
          placeholder="Devpost"
          theme="application"
          autoComplete="url"
          validateValue={(v) => getProfileUrlValidationMessage(v, "Devpost")}
          value={value.devpost}
          onChange={(v) => set("devpost", v)}
          onValidityChange={(hasError) => setFieldError("devpost", hasError)}
        />
      </div>
    );
  },
);

ExperienceSection.displayName = "ExperienceSection";

export default ExperienceSection;
