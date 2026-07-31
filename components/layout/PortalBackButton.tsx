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
  placement?: "back" | "navbar-end";
  showArrow?: boolean;
};

export default function PortalBackButton({
  href = "/",
  onClick,
  text = "Back",
  width = 125,
  tone = "default",
  placement = "back",
  showArrow = true,
}: PortalBackButtonProps) {
  const router = useRouter();

  return (
    <DesignBox
      designWidth={1512}
      designHeight={982}
      left={placement === "navbar-end" ? 1222 : 108}
      top={placement === "navbar-end" ? 39.127 : 145}
      width={width}
      height={placement === "navbar-end" ? 45 : 44}
      zIndex={50}
      compactRole={placement === "back" ? "secondary" : undefined}
      compactOrder={placement === "back" ? 0 : undefined}
      className={`pointer-events-auto ${
        placement === "navbar-end"
          ? "auth-navbar-end-box"
          : "auth-back-box"
      }`}
    >
      <Button
        text={text}
        variant="direction"
        direction="back"
        showDirectionIcon={showArrow}
        directionAppearance="plain"
        directionIconSrc="/auth/back-chevron.svg"
        directionIconColor={tone === "danger" ? "#ff6068" : undefined}
        directionIconSize="77.871cqh"
        directionGap="17.778cqh"
        fontSize={placement === "navbar-end" ? "55.556cqh" : 37}
        onClick={onClick ?? (() => router.push(href))}
        className={`h-full w-full whitespace-nowrap ${
          tone === "danger" ? "!text-[#ff6068]" : ""
        }`}
      />
    </DesignBox>
  );
}
