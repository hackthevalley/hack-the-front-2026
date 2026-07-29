"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import AuthNavbar from "./AuthNavbar";
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
  Section: React.ComponentType<AuthSectionProps>;
};

const AUTH_VIEWS: Record<AuthView, AuthViewConfig> = {
  login: {
    path: "/login",
    Section: AuthTextOverlays,
  },
  "sign-up": {
    path: "/signup",
    Section: SignUpSection,
  },
  "forgot-password": {
    path: "/forgot-password",
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
        <AuthNavbar />
        <AuthBackButton onClick={handleBack} />
        <ActiveSection onNavigate={handleNavigate} />
      </AuthBackground>
    </main>
  );
}
