"use client";

import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import DesignBox from "./DesignBox";

type PortalBackButtonProps = {
  href?: string;
  onClick?: () => void;
  text?: string;
  width?: number;
  tone?: "default" | "danger";
};

export default function PortalBackButton({
  href = "/",
  onClick,
  text = "Back",
  width = 133,
  tone = "default",
}: PortalBackButtonProps) {
  const router = useRouter();

  return (
    <DesignBox
      designWidth={1512}
      designHeight={982}
      left={108}
      top={145}
      width={width}
      height={45}
      zIndex={50}
      compactRole="secondary"
      compactOrder={0}
      className="auth-back-box pointer-events-auto"
    >
      <Button
        text={text}
        buttonType="direction"
        direction="back"
        directionAppearance="plain"
        directionIconSrc="/auth/back-chevron.svg"
        directionIconColor={tone === "danger" ? "#ff6068" : undefined}
        directionIconSize="77.871cqh"
        directionGap="17.778cqh"
        fontSize="82.222cqh"
        onClick={onClick ?? (() => router.push(href))}
        className={`h-full w-full whitespace-nowrap ${
          tone === "danger" ? "!text-[#ff6068]" : ""
        }`}
      />
    </DesignBox>
  );
}
