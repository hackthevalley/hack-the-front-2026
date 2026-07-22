"use client";

import * as React from "react";
import TextField, { type TextFieldHandle } from "@/components/ui/TextField";
import SectionHeading from "./SectionHeading";
import type { SectionHandle, SectionProps } from "./types";
import { useFieldErrors } from "./useFieldErrors";
import type { ExperienceData } from "./data";

const ExperienceSection = React.forwardRef<SectionHandle, SectionProps<ExperienceData>>(
  ({ value, onChange, onValidityChange }, ref) => {
    const hackathonCountRef = React.useRef<TextFieldHandle>(null);
    const githubRef = React.useRef<TextFieldHandle>(null);
    const linkedinRef = React.useRef<TextFieldHandle>(null);
    const setFieldError = useFieldErrors(onValidityChange);

    React.useImperativeHandle(ref, () => ({
      validate: () =>
        [
          hackathonCountRef.current?.validate() ?? true,
          githubRef.current?.validate() ?? true,
          linkedinRef.current?.validate() ?? true,
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
          value={value.github}
          onChange={(v) => set("github", v)}
          onValidityChange={(hasError) => setFieldError("github", hasError)}
        />

        <TextField
          ref={linkedinRef}
          name="Linkedin"
          placeholder="Linkedin"
          theme="application"
          value={value.linkedin}
          onChange={(v) => set("linkedin", v)}
          onValidityChange={(hasError) => setFieldError("linkedin", hasError)}
        />
      </div>
    );
  },
);

ExperienceSection.displayName = "ExperienceSection";

export default ExperienceSection;
