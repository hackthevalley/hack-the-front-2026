"use client";

import * as React from "react";
import Image from "@/components/ui/OptimizedImage";
import AvatarFrame from "./AvatarFrame";
import SectionHeading from "./SectionHeading";
import type { SectionHandle, SectionProps } from "./types";
import type { AccessoryData } from "./data";
import type { WizardFormData } from "../sectionConfig";
import { ACCESSORIES, AVATARS, getComboPlacement } from "./avatarAssets";

type AccessoryRightSectionProps = SectionProps<AccessoryData> & {
  formData: WizardFormData;
};

// Old accessory shrinks/fades out, then the new one pops in with a springy
// overshoot — see the .accessory-pop-out / .accessory-pop-in keyframes below.
const EXIT_DURATION_MS = 150;

const AccessoryRightSection = React.forwardRef<
  SectionHandle,
  AccessoryRightSectionProps
>(({ value, formData }, ref) => {
  React.useImperativeHandle(ref, () => ({
    validate: () => true,
  }));

  const avatar = AVATARS.find(
    (a) => a.key === formData.customCharacter.character,
  );
  const accessory = ACCESSORIES.find((a) => a.key === value.accessory);

  // Tracks what's actually rendered, which lags one tick behind `accessory`
  // while the previous pick plays its exit animation.
  const [displayedAccessory, setDisplayedAccessory] = React.useState(accessory);
  const [isExiting, setIsExiting] = React.useState(false);

  React.useEffect(() => {
    if (accessory?.key === displayedAccessory?.key) return;

    if (!displayedAccessory) {
      setDisplayedAccessory(accessory);
      return;
    }

    setIsExiting(true);
    const timeout = setTimeout(() => {
      setDisplayedAccessory(accessory);
      setIsExiting(false);
    }, EXIT_DURATION_MS);
    return () => clearTimeout(timeout);
  }, [accessory, displayedAccessory]);

  const placement =
    avatar && displayedAccessory
      ? getComboPlacement(avatar.key, displayedAccessory.key)
      : undefined;

  return (
    <div className="flex h-full flex-col items-center justify-center gap-6">
      <SectionHeading className="invisible text-3xl md:text-4xl">
        Choose An Accessory
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
            Pick an avatar on the previous step first.
          </p>
        )}

        {avatar && displayedAccessory && placement && (
          <div
            key={`${avatar.key}-${displayedAccessory.key}`}
            className="pointer-events-none absolute h-auto select-none"
            style={{
              left: `${placement.left}%`,
              top: `${placement.top}%`,
              width: `${placement.width}%`,
              transform: placement.rotate
                ? `rotate(${placement.rotate}deg)`
                : undefined,
            }}
          >
            <Image
              src={displayedAccessory.src}
              alt={displayedAccessory.label}
              width={100}
              height={100}
              className={`h-auto w-full select-none ${
                isExiting ? "accessory-pop-out" : "accessory-pop-in"
              }`}
            />
          </div>
        )}
      </AvatarFrame>
    </div>
  );
});

AccessoryRightSection.displayName = "AccessoryRightSection";

export default AccessoryRightSection;
