"use client";

import * as React from "react";
import TextField, { type TextFieldHandle } from "@/components/ui/TextField";
import SectionHeading from "./SectionHeading";
import type { SectionHandle, SectionProps } from "./types";
import { useFieldErrors } from "./useFieldErrors";
import type { CustomData } from "./data";

const GeneralSection = React.forwardRef<SectionHandle, SectionProps<CustomData>>(
  ({ value, onChange, onValidityChange }, ref) => {
    const dietaryRef = React.useRef<TextFieldHandle>(null);
    const tshirtRef = React.useRef<TextFieldHandle>(null);
    const setFieldError = useFieldErrors(onValidityChange);

    React.useImperativeHandle(ref, () => ({
      validate: () =>
        [
          dietaryRef.current?.validate() ?? true,
          tshirtRef.current?.validate() ?? true,
        ].every(Boolean),
    }));

    function set<K extends keyof CustomData>(key: K, fieldValue: CustomData[K]) {
      onChange({ ...value, [key]: fieldValue });
    }

    return (
      <div className="flex flex-col gap-6">
        <SectionHeading>General Info</SectionHeading>

        <TextField
          ref={dietaryRef}
          name="Dietary Restriction"
          placeholder="Type/Select An Answer"
          theme="application"
          value={value.dietaryRestrictions}
          onChange={(v) => set("dietaryRestrictions", v)}
          onValidityChange={(hasError) => setFieldError("dietaryRestrictions", hasError)}
        />

        <TextField
          ref={tshirtRef}
          name="T-Shirt Size"
          placeholder="Type/Select An Answer"
          theme="application"
          value={value.tshirtSize}
          onChange={(v) => set("tshirtSize", v)}
          onValidityChange={(hasError) => setFieldError("tshirtSize", hasError)}
        />
      </div>
    );
  },
);

GeneralSection.displayName = "GeneralSection";

export default GeneralSection;
