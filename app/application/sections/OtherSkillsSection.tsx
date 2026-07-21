"use client";

import * as React from "react";
import TextField, { type TextFieldHandle } from "@/components/ui/TextField";
import SectionHeading from "./SectionHeading";
import type { SectionHandle, SectionProps } from "./types";
import { useFieldErrors } from "./useFieldErrors";
import type { OtherSkillsData } from "./data";

const OtherSkillsSection = React.forwardRef<
  SectionHandle,
  SectionProps<OtherSkillsData>
>(({ value, onChange, onValidityChange }, ref) => {
  const productManagementRef = React.useRef<TextFieldHandle>(null);
  const webCryptoBlockchainRef = React.useRef<TextFieldHandle>(null);
  const cyberSecurityRef = React.useRef<TextFieldHandle>(null);
  const machineLearningRef = React.useRef<TextFieldHandle>(null);
  const setFieldError = useFieldErrors(onValidityChange);

  React.useImperativeHandle(ref, () => ({
    validate: () =>
      [
        productManagementRef.current?.validate() ?? true,
        webCryptoBlockchainRef.current?.validate() ?? true,
        cyberSecurityRef.current?.validate() ?? true,
        machineLearningRef.current?.validate() ?? true,
      ].every(Boolean),
  }));

  function set<K extends keyof OtherSkillsData>(
    key: K,
    fieldValue: OtherSkillsData[K],
  ) {
    onChange({ ...value, [key]: fieldValue });
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Invisible spacer matching Dev Skills' heading, so this panel's
       * fields line up with UI/UX Design on the opposite panel. */}
      <SectionHeading className="invisible text-lg">
        Tell Us How Comfy You Feel With...
      </SectionHeading>

      <TextField
        ref={productManagementRef}
        name="Product Management"
        placeholder="Beginner / Intermediate / Advanced / Expert"
        theme="application"
        value={value.productManagement}
        onChange={(v) => set("productManagement", v)}
        onValidityChange={(hasError) =>
          setFieldError("productManagement", hasError)
        }
      />

      <TextField
        ref={webCryptoBlockchainRef}
        name="Web, Crypto, Blockchain"
        placeholder="Beginner / Intermediate / Advanced / Expert"
        theme="application"
        value={value.webCryptoBlockchain}
        onChange={(v) => set("webCryptoBlockchain", v)}
        onValidityChange={(hasError) =>
          setFieldError("webCryptoBlockchain", hasError)
        }
      />

      <TextField
        ref={cyberSecurityRef}
        name="Cyber Security"
        placeholder="Beginner / Intermediate / Advanced / Expert"
        theme="application"
        value={value.cyberSecurity}
        onChange={(v) => set("cyberSecurity", v)}
        onValidityChange={(hasError) =>
          setFieldError("cyberSecurity", hasError)
        }
      />

      <TextField
        ref={machineLearningRef}
        name="Machine Learning"
        placeholder="Beginner / Intermediate / Advanced / Expert"
        theme="application"
        value={value.machineLearning}
        onChange={(v) => set("machineLearning", v)}
        onValidityChange={(hasError) =>
          setFieldError("machineLearning", hasError)
        }
      />
    </div>
  );
});

OtherSkillsSection.displayName = "OtherSkillsSection";

export default OtherSkillsSection;
