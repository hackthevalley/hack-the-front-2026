"use client";

import * as React from "react";
import TextField, { type TextFieldHandle } from "@/components/ui/TextField";
import SectionHeading from "./SectionHeading";
import type { SectionHandle, SectionProps } from "./types";
import { useFieldErrors } from "./useFieldErrors";
import type { SurveyData } from "./data";

const SurveySection = React.forwardRef<SectionHandle, SectionProps<SurveyData>>(
  ({ value, onChange, onValidityChange }, ref) => {
    const howDidYouHearRef = React.useRef<TextFieldHandle>(null);
    const excitedAboutRef = React.useRef<TextFieldHandle>(null);
    const setFieldError = useFieldErrors(onValidityChange);

    React.useImperativeHandle(ref, () => ({
      validate: () =>
        [
          howDidYouHearRef.current?.validate() ?? true,
          excitedAboutRef.current?.validate() ?? true,
        ].every(Boolean),
    }));

    function set<K extends keyof SurveyData>(key: K, fieldValue: SurveyData[K]) {
      onChange({ ...value, [key]: fieldValue });
    }

    return (
      <div className="flex flex-col gap-6">
        <SectionHeading>Survey</SectionHeading>

        <TextField
          ref={howDidYouHearRef}
          name="How did you hear about us?"
          placeholder="e.g. Instagram"
          required
          theme="application"
          value={value.howDidYouHear}
          onChange={(v) => set("howDidYouHear", v)}
          onValidityChange={(hasError) => setFieldError("howDidYouHear", hasError)}
        />

        <TextField
          ref={excitedAboutRef}
          name="What are you most excited about?"
          placeholder="e.g. Workshops"
          theme="application"
          value={value.excitedAbout}
          onChange={(v) => set("excitedAbout", v)}
          onValidityChange={(hasError) => setFieldError("excitedAbout", hasError)}
        />
      </div>
    );
  },
);

SurveySection.displayName = "SurveySection";

export default SurveySection;
