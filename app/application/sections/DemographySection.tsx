"use client";

import * as React from "react";
import TextField, { type TextFieldHandle } from "@/components/ui/TextField";
import SectionHeading from "./SectionHeading";
import type { SectionHandle, SectionProps } from "./types";
import { useFieldErrors } from "./useFieldErrors";
import type { DemographyData } from "./data";

const DemographySection = React.forwardRef<SectionHandle, SectionProps<DemographyData>>(
  ({ value, onChange, onValidityChange }, ref) => {
    const ageRef = React.useRef<TextFieldHandle>(null);
    const genderRef = React.useRef<TextFieldHandle>(null);
    const raceEthnicityRef = React.useRef<TextFieldHandle>(null);
    const lgbtqRef = React.useRef<TextFieldHandle>(null);
    const disabilityRef = React.useRef<TextFieldHandle>(null);
    const setFieldError = useFieldErrors(onValidityChange);

    React.useImperativeHandle(ref, () => ({
      validate: () =>
        [
          ageRef.current?.validate() ?? true,
          genderRef.current?.validate() ?? true,
          raceEthnicityRef.current?.validate() ?? true,
          lgbtqRef.current?.validate() ?? true,
          disabilityRef.current?.validate() ?? true,
        ].every(Boolean),
    }));

    function set<K extends keyof DemographyData>(key: K, fieldValue: DemographyData[K]) {
      onChange({ ...value, [key]: fieldValue });
    }

    return (
      <div className="flex flex-col gap-6">
        <SectionHeading>Demography Info</SectionHeading>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <TextField
            ref={ageRef}
            name="Age"
            placeholder="Age"
            required
            type="number"
            min={1}
            errorMessages={{ invalid: "Age must be greater than 0." }}
            theme="application"
            value={value.age}
            onChange={(v) => set("age", v)}
            onValidityChange={(hasError) => setFieldError("age", hasError)}
          />
          <TextField
            ref={genderRef}
            name="Gender"
            placeholder="Gender"
            required
            theme="application"
            value={value.gender}
            onChange={(v) => set("gender", v)}
            onValidityChange={(hasError) => setFieldError("gender", hasError)}
          />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <TextField
            ref={raceEthnicityRef}
            name="Race/Ethnicity"
            placeholder="Race/Ethnicity"
            required
            theme="application"
            value={value.raceEthnicity}
            onChange={(v) => set("raceEthnicity", v)}
            onValidityChange={(hasError) => setFieldError("raceEthnicity", hasError)}
          />
        </div>

        <TextField
          ref={lgbtqRef}
          name="Part Of The 2SLGBTQI+ Community?"
          placeholder="Yes/No"
          theme="application"
          value={value.lgbtq}
          onChange={(v) => set("lgbtq", v)}
          onValidityChange={(hasError) => setFieldError("lgbtq", hasError)}
        />

        <TextField
          ref={disabilityRef}
          name="Person With Disabilities?"
          placeholder="Yes/No"
          theme="application"
          value={value.disability}
          onChange={(v) => set("disability", v)}
          onValidityChange={(hasError) => setFieldError("disability", hasError)}
        />
      </div>
    );
  },
);

DemographySection.displayName = "DemographySection";

export default DemographySection;
