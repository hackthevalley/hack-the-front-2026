import type { Metadata } from "next";
import PortalNavbar from "@/components/layout/PortalNavbar";
import AuthBackground from "../_components/background/AuthBackground";
import ResetPasswordForm from "./ResetPasswordForm";

export const metadata: Metadata = {
  title: "Reset Password | Hack the Valley 11",
};

type ResetPasswordPageProps = {
  searchParams: Promise<{ token?: string | string[] }>;
};

export default async function ResetPasswordPage({
  searchParams,
}: ResetPasswordPageProps) {
  const { token } = await searchParams;

  return (
    <main>
      <AuthBackground>
        <PortalNavbar />
        <ResetPasswordForm
          token={typeof token === "string" ? token : undefined}
        />
      </AuthBackground>
    </main>
  );
}
