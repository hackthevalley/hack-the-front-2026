"use client";

import { useRouter } from "next/navigation";
import DesignBox from "@/components/layout/DesignBox";
import Button from "@/components/ui/Button";
import {
  AUTH_BACKGROUND_DESIGN_HEIGHT,
  AUTH_BACKGROUND_DESIGN_WIDTH,
} from "./background/layers";

export default function AuthBackButton() {
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
        onClick={() => router.push("/")}
        className="h-full w-full"
      />
    </DesignBox>
  );
}
