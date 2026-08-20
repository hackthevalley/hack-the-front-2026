"use client";

import Button from "@/components/ui/Button";

const VOLUNTEER_FORM_URL = "https://forms.gle/p8MPffqLaWLXbu3B8";

type VolunteerCtaButtonProps = {
  className?: string;
};

export default function VolunteerCtaButton({
  className = "",
}: VolunteerCtaButtonProps) {
  return (
    <Button
      className={className}
      text="Become a Volunteer"
      onClick={() => {
        window.open(VOLUNTEER_FORM_URL, "_blank", "noopener,noreferrer");
      }}
    />
  );
}
