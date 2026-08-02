"use client";

import * as React from "react";
import StatusPage from "@/components/layout/StatusPage";
import { apiFetch } from "@/lib/apiClient";

type ActivationState = "activating" | "success" | "error";

export default function ActivateAccount({ token }: { token?: string }) {
  const [state, setState] = React.useState<ActivationState>(
    token ? "activating" : "error",
  );
  const requestStartedRef = React.useRef(false);

  React.useEffect(() => {
    if (!token || requestStartedRef.current) return;
    requestStartedRef.current = true;

    async function activate() {
      try {
        const response = await apiFetch("/api/account/activations", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token }),
        });

        setState(response.ok ? "success" : "error");
      } catch {
        setState("error");
      }
    }

    void activate();
  }, [token]);

  if (state === "activating") {
    return (
      <StatusPage
        title="Activating Account"
        message="Please wait while we activate your account."
        pulse
      />
    );
  }

  if (state === "success") {
    return (
      <StatusPage
        title="Account Successfully Activated"
        message="Your account is ready. You can now log in."
        buttonText="Log In"
        buttonHref="/login"
      />
    );
  }

  return (
    <StatusPage
      title="Account Activation Failed"
      message={
        token
          ? "This activation link is invalid, expired, or has already been used."
          : "This activation link is missing its token."
      }
      buttonText="Go to Login"
      buttonHref="/login"
    />
  );
}
