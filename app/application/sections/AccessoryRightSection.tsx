"use client";

import * as React from "react";
import Image from "next/image";
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
          <Image
            key={`${avatar.key}-${displayedAccessory.key}`}
            src={displayedAccessory.src}
            alt={displayedAccessory.label}
            width={100}
            height={100}
            className={`pointer-events-none absolute h-auto select-none ${
              isExiting ? "accessory-pop-out" : "accessory-pop-in"
            }`}
            style={{
              left: `${placement.left}%`,
              top: `${placement.top}%`,
              width: `${placement.width}%`,
              "--accessory-rotate": `${placement.rotate ?? 0}deg`,
            } as React.CSSProperties}
          />
        )}
      </AvatarFrame>

      <style jsx>{`
        @keyframes accessory-pop-in {
          0% {
            transform: scale(0) rotate(var(--accessory-rotate, 0deg));
            opacity: 0;
          }
          60% {
            transform: scale(1.12) rotate(var(--accessory-rotate, 0deg));
            opacity: 1;
          }
          100% {
            transform: scale(1) rotate(var(--accessory-rotate, 0deg));
            opacity: 1;
          }
        }
        @keyframes accessory-pop-out {
          0% {
            transform: scale(1) rotate(var(--accessory-rotate, 0deg));
            opacity: 1;
          }
          100% {
            transform: scale(0.6) rotate(var(--accessory-rotate, 0deg));
            opacity: 0;
          }
        }
        .accessory-pop-in {
          animation: accessory-pop-in 350ms cubic-bezier(0.34, 1.56, 0.64, 1)
            forwards;
        }
        .accessory-pop-out {
          animation: accessory-pop-out ${EXIT_DURATION_MS}ms ease-in forwards;
        }
      `}</style>
    </div>
  );
});

AccessoryRightSection.displayName = "AccessoryRightSection";

export default AccessoryRightSection;
