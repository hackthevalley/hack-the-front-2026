"use client";

import * as React from "react";
import TextField, { type TextFieldHandle } from "@/components/ui/TextField";
import SectionHeading from "./SectionHeading";
import type { SectionHandle, SectionProps } from "./types";
import { useFieldErrors } from "./useFieldErrors";
import type { AboutData } from "./data";

const AboutSection = React.forwardRef<SectionHandle, SectionProps<AboutData>>(
  ({ value, onChange, onValidityChange }, ref) => {
    const firstNameRef = React.useRef<TextFieldHandle>(null);
    const lastNameRef = React.useRef<TextFieldHandle>(null);
    const emailRef = React.useRef<TextFieldHandle>(null);
    const phoneRef = React.useRef<TextFieldHandle>(null);
    const setFieldError = useFieldErrors(onValidityChange);

    React.useImperativeHandle(ref, () => ({
      validate: () =>
        [
          firstNameRef.current?.validate() ?? true,
          lastNameRef.current?.validate() ?? true,
          emailRef.current?.validate() ?? true,
          phoneRef.current?.validate() ?? true,
        ].every(Boolean),
    }));

    function set<K extends keyof AboutData>(key: K, fieldValue: AboutData[K]) {
      onChange({ ...value, [key]: fieldValue });
    }

    return (
      <div className="flex flex-col gap-6">
        <SectionHeading>Profile Info</SectionHeading>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <TextField
            ref={firstNameRef}
            name="First Name"
            placeholder="First Name"
            required
            theme="application"
            value={value.firstName}
            onChange={(v) => set("firstName", v)}
            onValidityChange={(hasError) => setFieldError("firstName", hasError)}
          />
          <TextField
            ref={lastNameRef}
            name="Last Name"
            placeholder="Last Name"
            required
            theme="application"
            value={value.lastName}
            onChange={(v) => set("lastName", v)}
            onValidityChange={(hasError) => setFieldError("lastName", hasError)}
          />
        </div>

        <TextField
          ref={emailRef}
          name="Email"
          placeholder="Email"
          type="email"
          required
          theme="application"
          value={value.email}
          onChange={(v) => set("email", v)}
          onValidityChange={(hasError) => setFieldError("email", hasError)}
        />

        <TextField
          ref={phoneRef}
          name="Phone Number"
          placeholder="Phone Number"
          required
          theme="application"
          value={value.phone}
          onChange={(v) => set("phone", v)}
          onValidityChange={(hasError) => setFieldError("phone", hasError)}
        />
      </div>
    );
  },
);

AboutSection.displayName = "AboutSection";

export default AboutSection;
