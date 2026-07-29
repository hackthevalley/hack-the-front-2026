import type { Metadata } from "next";
import AuthFlow from "../_components/AuthFlow";

export const metadata: Metadata = {
  title: "Sign Up | Hack the Valley 11",
};

export default function SignUpPage() {
  return <AuthFlow initialView="sign-up" />;
}
