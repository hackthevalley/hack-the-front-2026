"use client";

import * as React from "react";
import TextField, { type TextFieldHandle } from "@/components/ui/TextField";
import FileUpload, { type FileUploadHandle } from "@/components/ui/FileUpload";
import SectionHeading from "./SectionHeading";
import type { SectionHandle, SectionProps } from "./types";
import { useFieldErrors } from "./useFieldErrors";
import type { PortfolioData } from "./data";

const PortfolioSection = React.forwardRef<SectionHandle, SectionProps<PortfolioData>>(
  ({ value, onChange, onValidityChange }, ref) => {
    const portfolioRef = React.useRef<TextFieldHandle>(null);
    const resumeRef = React.useRef<FileUploadHandle>(null);
    const setFieldError = useFieldErrors(onValidityChange);

    React.useImperativeHandle(ref, () => ({
      validate: () =>
        [
          portfolioRef.current?.validate() ?? true,
          resumeRef.current?.validate() ?? true,
        ].every(Boolean),
    }));

    function set<K extends keyof PortfolioData>(key: K, fieldValue: PortfolioData[K]) {
      onChange({ ...value, [key]: fieldValue });
    }

    return (
      <div className="flex flex-col gap-6">
        {/* Invisible spacer matching Experience Info's heading, so Portfolio
         * lines up with Hackathon Count on the opposite panel. */}
        <SectionHeading className="invisible text-2xl">
          Experience Info
        </SectionHeading>

        <TextField
          ref={portfolioRef}
          name="Portfolio"
          placeholder="Portfolio"
          theme="application"
          value={value.portfolio}
          onChange={(v) => set("portfolio", v)}
          onValidityChange={(hasError) => setFieldError("portfolio", hasError)}
        />

        <FileUpload
          ref={resumeRef}
          name="Attach Resume"
          placeholder="Attach Resume"
          required
          accept=".pdf,application/pdf"
          maxSizeBytes={5 * 1024 * 1024}
          value={value.resume}
          existingFileName={value.savedResumeName}
          onChange={(file) =>
            onChange({
              ...value,
              resume: file,
              savedResumeName: file?.name ?? value.savedResumeName,
            })
          }
          onValidityChange={(hasError) => setFieldError("resume", hasError)}
        />
      </div>
    );
  },
);

PortfolioSection.displayName = "PortfolioSection";

export default PortfolioSection;
