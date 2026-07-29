import type { Metadata } from "next";
import AuthFlow from "../_components/AuthFlow";

export const metadata: Metadata = {
  title: "Log In | Hack the Valley 11",
};

export default function LoginPage() {
  return <AuthFlow initialView="login" />;
}
