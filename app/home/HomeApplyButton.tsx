"use client";

import { useAuth } from "@/components/providers/AuthProvider";
import Button from "@/components/ui/Button";

export default function HomeApplyButton() {
  const { isAuthReady, isAuthenticated } = useAuth();
  const showDashboard = isAuthReady && isAuthenticated;

  return (
    <Button
      text={showDashboard ? "View Dashboard" : "Apply Now"}
      width="100%"
      aspectRatio="206 / 72"
      href={showDashboard ? "/dashboard" : "/login"}
    />
  );
}
