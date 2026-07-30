"use client";

import * as React from "react";
import Dropdown, { type DropdownHandle } from "@/components/ui/Dropdown";
import TextField, { type TextFieldHandle } from "@/components/ui/TextField";
import {
  COUNTRY_OPTIONS,
  EDUCATION_LEVEL_OPTIONS,
  MAJOR_OPTIONS,
  SCHOOL_OPTIONS,
} from "./applicationOptions";
import SectionHeading from "./SectionHeading";
import type { SectionHandle, SectionProps } from "./types";
import { useFieldErrors } from "./useFieldErrors";
import type { SchoolData } from "./data";

const SchoolSection = React.forwardRef<SectionHandle, SectionProps<SchoolData>>(
  ({ value, onChange, onValidityChange }, ref) => {
    const countryRef = React.useRef<DropdownHandle>(null);
    const schoolNameRef = React.useRef<DropdownHandle>(null);
    const majorRef = React.useRef<DropdownHandle>(null);
    const levelOfEducationRef = React.useRef<DropdownHandle>(null);
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
          <Dropdown
            ref={countryRef}
            name="Country"
            placeholder="Select country"
            options={COUNTRY_OPTIONS}
            required
            value={value.country}
            onChange={(v) => set("country", v)}
            onValidityChange={(hasError) => setFieldError("country", hasError)}
          />
          <Dropdown
            ref={schoolNameRef}
            name="School"
            placeholder="Select school"
            options={SCHOOL_OPTIONS}
            required
            value={value.schoolName}
            onChange={(v) => set("schoolName", v)}
            onValidityChange={(hasError) =>
              setFieldError("schoolName", hasError)
            }
          />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Dropdown
            ref={majorRef}
            name="Major"
            placeholder="Select major"
            options={MAJOR_OPTIONS}
            required
            value={value.major}
            onChange={(v) => set("major", v)}
            onValidityChange={(hasError) => setFieldError("major", hasError)}
          />
          <Dropdown
            ref={levelOfEducationRef}
            name="Current Level of Education"
            placeholder="Select level of education"
            options={EDUCATION_LEVEL_OPTIONS}
            required
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
