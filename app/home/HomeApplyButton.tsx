"use client";

import { useAuth } from "@/components/providers/AuthProvider";
import Button from "@/components/ui/Button";

export default function HomeApplyButton() {
  const { isAuthReady, isAuthenticated } = useAuth();
  const showDashboard = isAuthReady && isAuthenticated;
  const width = showDashboard ? 190 : 175;

  return (
    <Button
      text={showDashboard ? "View Dashboard" : "Apply Now"}
      width={width}
      aspectRatio={`${width} / 56`}
      href={showDashboard ? "/dashboard" : "/login"}
      prefetch={false}
    />
  );
}
