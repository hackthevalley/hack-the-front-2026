"use client";

import * as React from "react";
import Image from "next/image";
import AvatarFrame from "./AvatarFrame";
import SectionHeading from "./SectionHeading";
import type { SectionHandle, SectionProps } from "./types";
import type { CharacterData } from "./data";
import { AVATARS } from "./avatarAssets";

const CharacterRightSection = React.forwardRef<
  SectionHandle,
  SectionProps<CharacterData>
>(({ value }, ref) => {
  React.useImperativeHandle(ref, () => ({
    validate: () => true,
  }));

  const avatar = AVATARS.find((a) => a.key === value.character);

  return (
    <div className="flex h-full flex-col items-center justify-center gap-6">
      <SectionHeading className="invisible text-3xl md:text-4xl">
        Choose An Avatar
      </SectionHeading>

      <AvatarFrame>
        {avatar ? (
          <Image
            src={avatar.src}
            alt={avatar.label}
            fill
            className="object-contain p-8"
          />
        ) : (
          <p className="flex h-full items-center justify-center px-6 text-center text-white/40">
            Pick an avatar to preview it here.
          </p>
        )}
      </AvatarFrame>
    </div>
  );
});

CharacterRightSection.displayName = "CharacterRightSection";

export default CharacterRightSection;
