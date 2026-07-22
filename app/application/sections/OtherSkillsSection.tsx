"use client";

import * as React from "react";
import Dropdown, { type DropdownHandle } from "@/components/ui/Dropdown";
import SectionHeading from "./SectionHeading";
import type { SectionHandle, SectionProps } from "./types";
import { useFieldErrors } from "./useFieldErrors";
import type { OtherSkillsData } from "./data";

const SKILL_LEVELS = ["Beginner", "Intermediate", "Advanced", "Expert"];

const OtherSkillsSection = React.forwardRef<
  SectionHandle,
  SectionProps<OtherSkillsData>
>(({ value, onChange, onValidityChange }, ref) => {
  const productManagementRef = React.useRef<DropdownHandle>(null);
  const webCryptoBlockchainRef = React.useRef<DropdownHandle>(null);
  const cyberSecurityRef = React.useRef<DropdownHandle>(null);
  const machineLearningRef = React.useRef<DropdownHandle>(null);
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

      <Dropdown
        ref={productManagementRef}
        name="Product Management"
        options={SKILL_LEVELS}
        value={value.productManagement}
        onChange={(v) => set("productManagement", v)}
        onValidityChange={(hasError) =>
          setFieldError("productManagement", hasError)
        }
      />

      <Dropdown
        ref={webCryptoBlockchainRef}
        name="Web, Crypto, Blockchain"
        options={SKILL_LEVELS}
        value={value.webCryptoBlockchain}
        onChange={(v) => set("webCryptoBlockchain", v)}
        onValidityChange={(hasError) =>
          setFieldError("webCryptoBlockchain", hasError)
        }
      />

      <Dropdown
        ref={cyberSecurityRef}
        name="Cyber Security"
        options={SKILL_LEVELS}
        value={value.cyberSecurity}
        onChange={(v) => set("cyberSecurity", v)}
        onValidityChange={(hasError) =>
          setFieldError("cyberSecurity", hasError)
        }
      />

      <Dropdown
        ref={machineLearningRef}
        name="Machine Learning"
        options={SKILL_LEVELS}
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
