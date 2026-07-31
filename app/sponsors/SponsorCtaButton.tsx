"use client";

import Button from "@/components/ui/Button";

type SponsorCtaButtonProps = {
  className?: string;
};

export default function SponsorCtaButton({
  className = "",
}: SponsorCtaButtonProps) {
  return (
    <Button
      className={className}
      text="Become a Sponsor"
      width={206}
      onClick={() => {
        window.location.href = "mailto:sponsorships@hackthevalley.io";
      }}
    />
  );
}
