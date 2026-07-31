"use client";

import * as React from "react";
import Button from "@/components/ui/Button";
import SectionHeading from "./SectionHeading";
import type { SectionHandle, SectionProps } from "./types";
import type { AccessoryData } from "./data";
import {
  ACCESSORIES,
  CUSTOM_BUTTON_ASPECT_RATIO,
  CUSTOM_BUTTON_WIDTH,
} from "./avatarAssets";

const AccessoryLeftSection = React.forwardRef<
  SectionHandle,
  SectionProps<AccessoryData>
>(({ value, onChange, onValidityChange }, ref) => {
  const [error, setError] = React.useState<string | null>(null);

  React.useImperativeHandle(ref, () => ({
    validate: () => {
      const isValid = value.accessory !== "";
      setError(isValid ? null : "Please choose an accessory.");
      onValidityChange?.(!isValid);
      return isValid;
    },
  }));

  function select(accessory: AccessoryData["accessory"]) {
    onChange({ accessory });
    setError(null);
    onValidityChange?.(false);
  }

  return (
    <div className="flex h-full flex-col gap-8">
      <SectionHeading className="text-3xl md:text-4xl">
        Choose An Accessory
      </SectionHeading>

      <div className="flex flex-1 flex-col items-center justify-center gap-x-4 gap-y-8">
        <div className="flex justify-center gap-4">
          {ACCESSORIES.slice(0, 2).map((accessory) => (
            <Button
              key={accessory.key}
              text={accessory.label}
              width={CUSTOM_BUTTON_WIDTH}
              aspectRatio={CUSTOM_BUTTON_ASPECT_RATIO}
              onClick={() => select(accessory.key)}
              className={
                value.accessory === accessory.key
                  ? "ring-4 ring-white/80 ring-offset-2 ring-offset-transparent"
                  : ""
              }
            />
          ))}
        </div>
        <div className="flex justify-center gap-4">
          {ACCESSORIES.slice(2).map((accessory) => (
            <Button
              key={accessory.key}
              text={accessory.label}
              width={CUSTOM_BUTTON_WIDTH}
              aspectRatio={CUSTOM_BUTTON_ASPECT_RATIO}
              onClick={() => select(accessory.key)}
              className={
                value.accessory === accessory.key
                  ? "ring-4 ring-white/80 ring-offset-2 ring-offset-transparent"
                  : ""
              }
            />
          ))}
        </div>
      </div>

      <p
        role="alert"
        aria-hidden={error === null}
        className={`text-center text-[clamp(12px,1.06vw,16px)] text-[#FFDADA] ${
          error ? "" : "invisible"
        }`}
      >
        {error ?? " "}
      </p>
    </div>
  );
});

AccessoryLeftSection.displayName = "AccessoryLeftSection";

export default AccessoryLeftSection;
