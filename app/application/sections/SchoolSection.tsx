"use client";

import * as React from "react";
import TextField, { type TextFieldHandle } from "@/components/ui/TextField";
import SectionHeading from "./SectionHeading";
import type { SectionHandle, SectionProps } from "./types";
import { useFieldErrors } from "./useFieldErrors";
import type { SchoolData } from "./data";

const SchoolSection = React.forwardRef<SectionHandle, SectionProps<SchoolData>>(
  ({ value, onChange, onValidityChange }, ref) => {
    const countryRef = React.useRef<TextFieldHandle>(null);
    const schoolNameRef = React.useRef<TextFieldHandle>(null);
    const majorRef = React.useRef<TextFieldHandle>(null);
    const levelOfEducationRef = React.useRef<TextFieldHandle>(null);
    const yearOfGraduationRef = React.useRef<TextFieldHandle>(null);
    const setFieldError = useFieldErrors(onValidityChange);

    React.useImperativeHandle(ref, () => ({
      validate: () =>
        [
          countryRef.current?.validate() ?? true,
          schoolNameRef.current?.validate() ?? true,
          majorRef.current?.validate() ?? true,
          levelOfEducationRef.current?.validate() ?? true,
          yearOfGraduationRef.current?.validate() ?? true,
        ].every(Boolean),
    }));

    function set<K extends keyof SchoolData>(
      key: K,
      fieldValue: SchoolData[K],
    ) {
      onChange({ ...value, [key]: fieldValue });
    }

    return (
      <div className="flex flex-col gap-6">
        <SectionHeading>Education Info</SectionHeading>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <TextField
            ref={countryRef}
            name="Country"
            placeholder="Country"
            required
            theme="application"
            value={value.country}
            onChange={(v) => set("country", v)}
            onValidityChange={(hasError) => setFieldError("country", hasError)}
          />
          <TextField
            ref={schoolNameRef}
            name="School"
            placeholder="School"
            required
            theme="application"
            value={value.schoolName}
            onChange={(v) => set("schoolName", v)}
            onValidityChange={(hasError) =>
              setFieldError("schoolName", hasError)
            }
          />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <TextField
            ref={majorRef}
            name="Major"
            placeholder="Major"
            required
            theme="application"
            value={value.major}
            onChange={(v) => set("major", v)}
            onValidityChange={(hasError) => setFieldError("major", hasError)}
          />
          <TextField
            ref={levelOfEducationRef}
            name="Current Level of Education"
            placeholder="Level of Education"
            required
            theme="application"
            value={value.levelOfEducation}
            onChange={(v) => set("levelOfEducation", v)}
            onValidityChange={(hasError) =>
              setFieldError("levelOfEducation", hasError)
            }
          />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <TextField
            ref={yearOfGraduationRef}
            name="Year of Graduation"
            placeholder="Year of Graduation"
            required
            type="number"
            theme="application"
            value={value.yearOfGraduation}
            onChange={(v) => set("yearOfGraduation", v)}
            onValidityChange={(hasError) =>
              setFieldError("yearOfGraduation", hasError)
            }
          />
        </div>
      </div>
    );
  },
);

SchoolSection.displayName = "SchoolSection";

export default SchoolSection;
