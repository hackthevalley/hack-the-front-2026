"use client";

import { useRouter } from "next/navigation";
import DesignBox from "@/components/layout/DesignBox";
import Button from "@/components/ui/Button";
import {
  AUTH_BACKGROUND_DESIGN_HEIGHT,
  AUTH_BACKGROUND_DESIGN_WIDTH,
} from "./background/layers";

type AuthBackButtonProps = {
  href?: string;
  onClick?: () => void;
};

export default function AuthBackButton({
  href = "/",
  onClick,
}: AuthBackButtonProps) {
  const router = useRouter();

  return (
    <DesignBox
      designWidth={AUTH_BACKGROUND_DESIGN_WIDTH}
      designHeight={AUTH_BACKGROUND_DESIGN_HEIGHT}
      left={108}
      top={145}
      width={133}
      height={45}
      zIndex={50}
      compactRole="secondary"
      compactOrder={0}
      className="auth-back-box"
    >
      <Button
        text="Back"
        buttonType="direction"
        direction="back"
        directionAppearance="plain"
        directionIconSrc="/auth/back-chevron.svg"
        directionIconSize="77.871cqh"
        directionGap="17.778cqh"
        fontSize="82.222cqh"
        onClick={onClick ?? (() => router.push(href))}
        className="h-full w-full"
      />
    </DesignBox>
  );
}
