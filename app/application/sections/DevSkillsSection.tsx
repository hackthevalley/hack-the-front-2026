"use client";

import * as React from "react";
import Dropdown, { type DropdownHandle } from "@/components/ui/Dropdown";
import SectionHeading from "./SectionHeading";
import type { SectionHandle, SectionProps } from "./types";
import { useFieldErrors } from "./useFieldErrors";
import type { DevSkillsData } from "./data";

const SKILL_LEVELS = ["Beginner", "Intermediate", "Advanced", "Expert"];

const DevSkillsSection = React.forwardRef<
  SectionHandle,
  SectionProps<DevSkillsData>
>(({ value, onChange, onValidityChange }, ref) => {
  const uiuxRef = React.useRef<DropdownHandle>(null);
  const frontendRef = React.useRef<DropdownHandle>(null);
  const backendRef = React.useRef<DropdownHandle>(null);
  const fullstackRef = React.useRef<DropdownHandle>(null);
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

      <Dropdown
        ref={uiuxRef}
        name="UI/UX Design"
        options={SKILL_LEVELS}
        value={value.uiux}
        onChange={(v) => set("uiux", v)}
        onValidityChange={(hasError) => setFieldError("uiux", hasError)}
      />

      <Dropdown
        ref={frontendRef}
        name="Front End Development"
        options={SKILL_LEVELS}
        value={value.frontend}
        onChange={(v) => set("frontend", v)}
        onValidityChange={(hasError) => setFieldError("frontend", hasError)}
      />

      <Dropdown
        ref={backendRef}
        name="Back End Development"
        options={SKILL_LEVELS}
        value={value.backend}
        onChange={(v) => set("backend", v)}
        onValidityChange={(hasError) => setFieldError("backend", hasError)}
      />

      <Dropdown
        ref={fullstackRef}
        name="Full Stack Development"
        options={SKILL_LEVELS}
        value={value.fullstack}
        onChange={(v) => set("fullstack", v)}
        onValidityChange={(hasError) => setFieldError("fullstack", hasError)}
      />
    </div>
  );
});

DevSkillsSection.displayName = "DevSkillsSection";

export default DevSkillsSection;
