import type { Metadata } from "next";
import AuthFlow from "../_components/AuthFlow";

export const metadata: Metadata = {
  title: "Forgot Password | Hack the Valley 11",
};

export default function ForgotPasswordPage() {
  return <AuthFlow initialView="forgot-password" />;
}
