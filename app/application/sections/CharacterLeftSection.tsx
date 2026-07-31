"use client";

import * as React from "react";
import Button from "@/components/ui/Button";
import SectionHeading from "./SectionHeading";
import type { SectionHandle, SectionProps } from "./types";
import type { CharacterData } from "./data";
import {
  AVATARS,
  CUSTOM_BUTTON_ASPECT_RATIO,
  CUSTOM_BUTTON_WIDTH,
} from "./avatarAssets";

const CharacterLeftSection = React.forwardRef<
  SectionHandle,
  SectionProps<CharacterData>
>(({ value, onChange, onValidityChange }, ref) => {
  const [error, setError] = React.useState<string | null>(null);

  React.useImperativeHandle(ref, () => ({
    validate: () => {
      const isValid = value.character !== "";
      setError(isValid ? null : "Please choose an avatar.");
      onValidityChange?.(!isValid);
      return isValid;
    },
  }));

  function select(character: CharacterData["character"]) {
    onChange({ character });
    setError(null);
    onValidityChange?.(false);
  }

  return (
    <div className="flex h-full flex-col gap-8">
      <SectionHeading className="text-3xl md:text-4xl">
        Choose An Avatar
      </SectionHeading>

      <div className="grid flex-1 auto-rows-max grid-cols-1 content-center justify-items-center gap-x-4 gap-y-8 sm:grid-cols-2">
        {AVATARS.map((avatar) => (
          <Button
            key={avatar.key}
            text={avatar.label}
            width={CUSTOM_BUTTON_WIDTH}
            aspectRatio={CUSTOM_BUTTON_ASPECT_RATIO}
            onClick={() => select(avatar.key)}
            className={
              value.character === avatar.key
                ? "ring-4 ring-white/80 ring-offset-2 ring-offset-transparent"
                : ""
            }
          />
        ))}
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

CharacterLeftSection.displayName = "CharacterLeftSection";

export default CharacterLeftSection;
