"use client";

import * as React from "react";
import TextField, { type TextFieldHandle } from "@/components/ui/TextField";
import SectionHeading from "./SectionHeading";
import type { SectionHandle, SectionProps } from "./types";
import { useFieldErrors } from "./useFieldErrors";
import type { DevSkillsData } from "./data";

const DevSkillsSection = React.forwardRef<
  SectionHandle,
  SectionProps<DevSkillsData>
>(({ value, onChange, onValidityChange }, ref) => {
  const uiuxRef = React.useRef<TextFieldHandle>(null);
  const frontendRef = React.useRef<TextFieldHandle>(null);
  const backendRef = React.useRef<TextFieldHandle>(null);
  const fullstackRef = React.useRef<TextFieldHandle>(null);
  const setFieldError = useFieldErrors(onValidityChange);

  React.useImperativeHandle(ref, () => ({
    validate: () =>
      [
        uiuxRef.current?.validate() ?? true,
        frontendRef.current?.validate() ?? true,
        backendRef.current?.validate() ?? true,
        fullstackRef.current?.validate() ?? true,
      ].every(Boolean),
  }));

  function set<K extends keyof DevSkillsData>(
    key: K,
    fieldValue: DevSkillsData[K],
  ) {
    onChange({ ...value, [key]: fieldValue });
  }

  return (
    <div className="flex flex-col gap-6">
      <SectionHeading className="text-lg">
        Tell Us How Comfy You Feel With...
      </SectionHeading>

      <TextField
        ref={uiuxRef}
        name="UI/UX Design"
        placeholder="Beginner / Intermediate / Advanced / Expert"
        theme="application"
        value={value.uiux}
        onChange={(v) => set("uiux", v)}
        onValidityChange={(hasError) => setFieldError("uiux", hasError)}
      />

      <TextField
        ref={frontendRef}
        name="Front End Development"
        placeholder="Beginner / Intermediate / Advanced / Expert"
        theme="application"
        value={value.frontend}
        onChange={(v) => set("frontend", v)}
        onValidityChange={(hasError) => setFieldError("frontend", hasError)}
      />

      <TextField
        ref={backendRef}
        name="Back End Development"
        placeholder="Beginner / Intermediate / Advanced / Expert"
        theme="application"
        value={value.backend}
        onChange={(v) => set("backend", v)}
        onValidityChange={(hasError) => setFieldError("backend", hasError)}
      />

      <TextField
        ref={fullstackRef}
        name="Full Stack Development"
        placeholder="Beginner / Intermediate / Advanced / Expert"
        theme="application"
        value={value.fullstack}
        onChange={(v) => set("fullstack", v)}
        onValidityChange={(hasError) => setFieldError("fullstack", hasError)}
      />
    </div>
  );
});

DevSkillsSection.displayName = "DevSkillsSection";

export default DevSkillsSection;
