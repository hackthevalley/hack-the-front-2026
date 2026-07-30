"use client";

import Button from "@/components/ui/Button";

type SponsorCtaButtonProps = {
  className?: string;
};

export default function SponsorCtaButton({
  className = "",
}: SponsorCtaButtonProps) {
  return (
    <div className={`relative inline-block ${className}`}>
      <Button
        text=""
        width={190}
        onClick={() => {
          window.location.href = "mailto:sponsorships@hackthevalley.io";
        }}
      />
      <span
        className="pointer-events-none absolute inset-0 flex select-none items-center justify-center whitespace-nowrap font-figtree font-semibold leading-none text-white"
        style={{ fontSize: "14px" }}
      >
        Become a Sponsor
      </span>
    </div>
  );
}
