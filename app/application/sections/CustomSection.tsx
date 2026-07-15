"use client";

import * as React from "react";
import TextField, { type TextFieldHandle } from "@/components/ui/TextField";
import SectionHeading from "./SectionHeading";
import type { SectionHandle, SectionProps } from "./types";
import { useFieldErrors } from "./useFieldErrors";
import type { CustomData } from "./data";

const CustomSection = React.forwardRef<SectionHandle, SectionProps<CustomData>>(
  ({ value, onChange, onValidityChange }, ref) => {
    const tshirtRef = React.useRef<TextFieldHandle>(null);
    const dietaryRef = React.useRef<TextFieldHandle>(null);
    const setFieldError = useFieldErrors(onValidityChange);

    React.useImperativeHandle(ref, () => ({
      validate: () =>
        [
          tshirtRef.current?.validate() ?? true,
          dietaryRef.current?.validate() ?? true,
        ].every(Boolean),
    }));

    function set<K extends keyof CustomData>(key: K, fieldValue: CustomData[K]) {
      onChange({ ...value, [key]: fieldValue });
    }

    return (
      <div className="flex flex-col gap-6">
        <SectionHeading>Customize</SectionHeading>

        <TextField
          ref={tshirtRef}
          name="T-Shirt Size"
          placeholder="e.g. Medium"
          required
          theme="application"
          value={value.tshirtSize}
          onChange={(v) => set("tshirtSize", v)}
          onValidityChange={(hasError) => setFieldError("tshirtSize", hasError)}
        />

        <TextField
          ref={dietaryRef}
          name="Dietary Restrictions"
          placeholder="e.g. None"
          theme="application"
          value={value.dietaryRestrictions}
          onChange={(v) => set("dietaryRestrictions", v)}
          onValidityChange={(hasError) => setFieldError("dietaryRestrictions", hasError)}
        />
      </div>
    );
  },
);

CustomSection.displayName = "CustomSection";

export default CustomSection;
