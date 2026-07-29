import type { Metadata } from "next";
import AuthBackground from "../_components/background/AuthBackground";
import AuthNavbar from "../_components/AuthNavbar";
import ResetPasswordForm from "./ResetPasswordForm";

export const metadata: Metadata = {
  title: "Reset Password | Hack the Valley 11",
};

export default function ResetPasswordPage() {
  return (
    <main>
      <AuthBackground>
        <AuthNavbar />
        <ResetPasswordForm />
      </AuthBackground>
    </main>
  );
}
