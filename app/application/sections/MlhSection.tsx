"use client";

import * as React from "react";
import Checkbox, { type CheckboxHandle } from "@/components/ui/Checkbox";
import SectionHeading from "./SectionHeading";
import type { SectionHandle, SectionProps } from "./types";
import type { MlhData } from "./data";

const MLH_CODE_OF_CONDUCT_URL = "https://mlh.io/code-of-conduct";
const MLH_PRIVACY_URL = "https://mlh.io/privacy";
const MLH_CONTEST_TERMS_URL =
  "https://github.com/MLH/mlh-policies/blob/main/contest-terms.md";

type CheckboxErrors = Record<keyof MlhData, boolean>;

const NO_ERRORS: CheckboxErrors = {
  agreedToCodeOfConduct: false,
  authorizedShareInfo: false,
  authorizedMlhEmails: false,
  consentMediaRelease: false,
};

// Kept separate from a full-width TextField-style error line since these
// rows are checkbox + label, not a full-width input: indenting past the
// checkbox lines the message up under the label text instead of the box.
function RequiredMessage({ show }: { show: boolean }) {
  return (
    <p
      role="alert"
      aria-hidden={!show}
      className={`pl-[44px] text-sm text-[#FFDADA] ${show ? "" : "invisible"}`}
    >
      This is required.
    </p>
  );
}

const MlhSection = React.forwardRef<SectionHandle, SectionProps<MlhData>>(
  ({ value, onChange }, ref) => {
    const agreedRef = React.useRef<CheckboxHandle>(null);
    const shareInfoRef = React.useRef<CheckboxHandle>(null);
    const mlhEmailsRef = React.useRef<CheckboxHandle>(null);
    const mediaReleaseRef = React.useRef<CheckboxHandle>(null);
    // Local only — deliberately not reported up via onValidityChange, so an
    // unchecked required box shows an inline message on a failed Next
    // attempt instead of disabling the Next button.
    const [errors, setErrors] = React.useState<CheckboxErrors>(NO_ERRORS);

    function setFieldError(key: keyof MlhData, hasError: boolean) {
      setErrors((prev) => (prev[key] === hasError ? prev : { ...prev, [key]: hasError }));
    }

    React.useImperativeHandle(ref, () => ({
      validate: () =>
        [
          agreedRef.current?.validate() ?? true,
          shareInfoRef.current?.validate() ?? true,
          mlhEmailsRef.current?.validate() ?? true,
          mediaReleaseRef.current?.validate() ?? true,
        ].every(Boolean),
    }));

    function set<K extends keyof MlhData>(key: K, fieldValue: MlhData[K]) {
      onChange({ ...value, [key]: fieldValue });
    }

    return (
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <SectionHeading>MLH Code Of Conduct</SectionHeading>
          <a
            href={MLH_CODE_OF_CONDUCT_URL}
            target="_blank"
            rel="noreferrer"
            className="text-sm text-white underline underline-offset-2"
          >
            View MLH Code Of Conduct
          </a>
        </div>

        <div className="flex flex-col gap-1">
          <label className="flex cursor-pointer items-start gap-3">
            <Checkbox
              ref={agreedRef}
              name="I have read and agree to the MLH Code of Conduct."
              required
              checked={value.agreedToCodeOfConduct}
              onChange={(v) => set("agreedToCodeOfConduct", v)}
              onValidityChange={(hasError) =>
                setFieldError("agreedToCodeOfConduct", hasError)
              }
            />
            <span className="text-sm text-white">
              I Have Read And Agree To The MLH Code Of Conduct.
            </span>
          </label>
          <RequiredMessage show={errors.agreedToCodeOfConduct} />

          <label className="flex cursor-pointer items-start gap-3">
            <Checkbox
              ref={shareInfoRef}
              name="I authorize you to share my application/registration information."
              required
              checked={value.authorizedShareInfo}
              onChange={(v) => set("authorizedShareInfo", v)}
              onValidityChange={(hasError) =>
                setFieldError("authorizedShareInfo", hasError)
              }
            />
            <span className="text-sm text-white">
              I Authorize You To Share My Application/Registration Information.
            </span>
          </label>
          <p className="pl-[44px] text-sm text-white">
              Review the{" "}
              <a
                href={MLH_PRIVACY_URL}
                target="_blank"
                rel="noreferrer"
                className="underline underline-offset-2"
              >
                Privacy Policy
              </a>{" "}
              and{" "}
              <a
                href={MLH_CONTEST_TERMS_URL}
                target="_blank"
                rel="noreferrer"
                className="underline underline-offset-2"
              >
                Contest Terms.
              </a>
          </p>
          <RequiredMessage show={errors.authorizedShareInfo} />

          <label className="flex cursor-pointer items-start gap-3">
            <Checkbox
              ref={mlhEmailsRef}
              name="I authorize MLH + DEV to send me occasional emails about relevant events, career opportunities, and community announcements."
              checked={value.authorizedMlhEmails}
              onChange={(v) => set("authorizedMlhEmails", v)}
              onValidityChange={(hasError) =>
                setFieldError("authorizedMlhEmails", hasError)
              }
            />
            <span className="text-sm text-white">
              I Authorize MLH + DEV To Send Me Occasional Emails About Relevant
              Events, Career Opportunities, And Community Announcements.
            </span>
          </label>
          <RequiredMessage show={errors.authorizedMlhEmails} />
        </div>

        <div className="flex flex-col gap-1">
          <SectionHeading>Consent Form</SectionHeading>

          <label className="flex cursor-pointer items-start gap-3">
            <Checkbox
              ref={mediaReleaseRef}
              name="I grant permission to Hack The Valley to use screenshots and/or video of me taken during Hack The Valley 11."
              required
              checked={value.consentMediaRelease}
              onChange={(v) => set("consentMediaRelease", v)}
              onValidityChange={(hasError) =>
                setFieldError("consentMediaRelease", hasError)
              }
            />
            <span className="text-sm text-white">
              I, Hereby Grant Permission To Hack The Valley To Use Screenshots
              And/Or Video Of Me Taken During Hack The Valley 11.
            </span>
          </label>
          <RequiredMessage show={errors.consentMediaRelease} />
        </div>
      </div>
    );
  },
);

MlhSection.displayName = "MlhSection";

export default MlhSection;
