"use client";

import * as React from "react";
import TextField, { type TextFieldHandle } from "@/components/ui/TextField";
import SectionHeading from "./SectionHeading";
import type { SectionHandle, SectionProps } from "./types";
import { useFieldErrors } from "./useFieldErrors";
import type { ExperienceData } from "./data";

const ExperienceSection = React.forwardRef<SectionHandle, SectionProps<ExperienceData>>(
  ({ value, onChange, onValidityChange }, ref) => {
    const experienceLevelRef = React.useRef<TextFieldHandle>(null);
    const pastHackathonsRef = React.useRef<TextFieldHandle>(null);
    const setFieldError = useFieldErrors(onValidityChange);

    React.useImperativeHandle(ref, () => ({
      validate: () =>
        [
          experienceLevelRef.current?.validate() ?? true,
          pastHackathonsRef.current?.validate() ?? true,
        ].every(Boolean),
    }));

    function set<K extends keyof ExperienceData>(key: K, fieldValue: ExperienceData[K]) {
      onChange({ ...value, [key]: fieldValue });
    }

    return (
      <div className="flex flex-col gap-6">
        <SectionHeading>Experience</SectionHeading>

        <TextField
          ref={experienceLevelRef}
          name="Experience Level"
          placeholder="e.g. Beginner"
          required
          theme="application"
          value={value.experienceLevel}
          onChange={(v) => set("experienceLevel", v)}
          onValidityChange={(hasError) => setFieldError("experienceLevel", hasError)}
        />

        <TextField
          ref={pastHackathonsRef}
          name="Past Hackathons"
          placeholder="e.g. None yet"
          theme="application"
          value={value.pastHackathons}
          onChange={(v) => set("pastHackathons", v)}
          onValidityChange={(hasError) => setFieldError("pastHackathons", hasError)}
        />
      </div>
    );
  },
);

ExperienceSection.displayName = "ExperienceSection";

export default ExperienceSection;
