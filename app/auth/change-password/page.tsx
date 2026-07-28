import type { Metadata } from "next";
import HomeNavbar from "@/components/layout/HomeNavbar";
import AuthBackground from "../background/AuthBackground";
import ChangePasswordForm from "./ChangePasswordForm";

export const metadata: Metadata = {
  title: "Password Reset | Hack the Valley 11",
};

export default function ChangePasswordPage() {
  return (
    <main>
      <AuthBackground>
        <HomeNavbar showSocialLinks={false} showMlhLink={false} />
        <ChangePasswordForm />
      </AuthBackground>
    </main>
  );
}
