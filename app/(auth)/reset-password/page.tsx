import type { Metadata } from "next";
import PortalNavbar from "@/components/layout/PortalNavbar";
import AuthBackground from "../_components/background/AuthBackground";
import ResetPasswordForm from "./ResetPasswordForm";

export const metadata: Metadata = {
  title: "Reset Password | Hack the Valley 11",
};

export default function ResetPasswordPage() {
  return (
    <main>
      <AuthBackground>
        <PortalNavbar />
        <ResetPasswordForm />
      </AuthBackground>
    </main>
  );
}
