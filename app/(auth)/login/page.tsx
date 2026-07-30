import type { Metadata } from "next";
import AuthRouteGuard from "@/components/providers/AuthRouteGuard";
import AuthFlow from "../_components/AuthFlow";

export const metadata: Metadata = {
  title: "Log In | Hack the Valley 11",
};

export default function LoginPage() {
  return (
    <AuthRouteGuard redirectAuthenticated>
      <AuthFlow initialView="login" />
    </AuthRouteGuard>
  );
}
