"use client";

import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import DesignBox from "./DesignBox";

type PortalBackButtonProps = {
  href?: string;
  onClick?: () => void;
};

export default function PortalBackButton({
  href = "/",
  onClick,
}: PortalBackButtonProps) {
  const router = useRouter();

  return (
    <DesignBox
      designWidth={1512}
      designHeight={982}
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
