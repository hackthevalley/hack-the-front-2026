"use client";

import * as React from "react";
import TextField, { type TextFieldHandle } from "@/components/ui/TextField";
import Dropdown, { type DropdownHandle } from "@/components/ui/Dropdown";
import SectionHeading from "./SectionHeading";
import type { SectionHandle, SectionProps } from "./types";
import { useFieldErrors } from "./useFieldErrors";
import type { DemographyData } from "./data";
import {
  GENDER_OPTIONS,
  RACE_ETHNICITY_OPTIONS,
} from "./applicationOptions";

const YES_NO_OPTIONS = ["Yes", "No", "Prefer not to say"];

const DemographySection = React.forwardRef<SectionHandle, SectionProps<DemographyData>>(
  ({ value, onChange, onValidityChange }, ref) => {
    const ageRef = React.useRef<TextFieldHandle>(null);
    const genderRef = React.useRef<DropdownHandle>(null);
    const raceEthnicityRef = React.useRef<DropdownHandle>(null);
    const lgbtqRef = React.useRef<DropdownHandle>(null);
    const disabilityRef = React.useRef<DropdownHandle>(null);
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
          <Dropdown
            ref={genderRef}
            name="Gender"
            placeholder="Select gender"
            options={GENDER_OPTIONS}
            required
            value={value.gender}
            onChange={(v) => set("gender", v)}
            onValidityChange={(hasError) => setFieldError("gender", hasError)}
          />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Dropdown
            ref={raceEthnicityRef}
            name="Race/Ethnicity (Select all that apply)"
            labelClassName="whitespace-nowrap"
            placeholder="Select race/ethnicity"
            options={RACE_ETHNICITY_OPTIONS}
            required
            multiple
            value={value.raceEthnicity}
            onChange={(v) => set("raceEthnicity", v)}
            onValidityChange={(hasError) => setFieldError("raceEthnicity", hasError)}
          />
        </div>

        <Dropdown
          ref={lgbtqRef}
          name="Part Of The 2SLGBTQI+ Community?"
          options={YES_NO_OPTIONS}
          value={value.lgbtq}
          onChange={(v) => set("lgbtq", v)}
          onValidityChange={(hasError) => setFieldError("lgbtq", hasError)}
        />

        <Dropdown
          ref={disabilityRef}
          name="Person With Disabilities?"
          options={YES_NO_OPTIONS}
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
