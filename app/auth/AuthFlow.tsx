"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import HomeNavbar from "@/components/layout/HomeNavbar";
import AuthBackButton from "./AuthBackButton";
import AuthTextOverlays from "./AuthTextOverlays";
import AuthBackground from "./background/AuthBackground";
import ForgotPasswordSection from "./sections/ForgotPasswordSection";
import SignUpSection from "./sections/SignUpSection";
import type { AuthSectionProps, AuthView } from "./types";

type AuthFlowProps = {
  initialView?: AuthView;
};

type AuthViewConfig = {
  path: string;
  showMlhLink: boolean;
  Section: React.ComponentType<AuthSectionProps>;
};

const AUTH_VIEWS: Record<AuthView, AuthViewConfig> = {
  login: {
    path: "/auth",
    showMlhLink: false,
    Section: AuthTextOverlays,
  },
  "sign-up": {
    path: "/auth?view=sign-up",
    showMlhLink: false,
    Section: SignUpSection,
  },
  "forgot-password": {
    path: "/auth?view=forgot-password",
    showMlhLink: true,
    Section: ForgotPasswordSection,
  },
};

export default function AuthFlow({ initialView = "login" }: AuthFlowProps) {
  const router = useRouter();
  const [view, setView] = React.useState<AuthView>(initialView);
  const activeView = AUTH_VIEWS[view];
  const ActiveSection = activeView.Section;

  function handleNavigate(nextView: AuthView) {
    setView(nextView);
    router.push(AUTH_VIEWS[nextView].path);
  }

  function handleBack() {
    if (view === "login") {
      router.push("/");
      return;
    }

    handleNavigate("login");
  }

  return (
    <main>
      <AuthBackground>
        <HomeNavbar
          showSocialLinks={false}
          showMlhLink={activeView.showMlhLink}
        />
        <AuthBackButton onClick={handleBack} />
        <ActiveSection onNavigate={handleNavigate} />
      </AuthBackground>
    </main>
  );
}
