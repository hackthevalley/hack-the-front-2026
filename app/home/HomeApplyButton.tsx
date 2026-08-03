"use client";

import { useAuth } from "@/components/providers/AuthProvider";
import Button from "@/components/ui/Button";
import { apiFetch } from "@/lib/apiClient";

const PAST_APPLYING_STATUSES = new Set([
  "APPLIED",
  "UNDER_REVIEW",
  "WAITLISTED",
  "ACCEPTED",
  "REJECTED",
  "ACCEPTED_INVITE",
  "REJECTED_INVITE",
  "SCANNED_IN",
  "WALK_IN_SUBMITTED",
]);

type AccountResponse = {
  application_status: string | null;
};

let statusRequest:
  | {
      token: string;
      promise: Promise<boolean>;
    }
  | undefined;

function isPastApplying(token: string): Promise<boolean> {
  if (statusRequest?.token === token) return statusRequest.promise;

  const promise = apiFetch("/api/account/me", {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then(async (response) => {
      if (!response.ok) return false;

      const account = (await response.json()) as AccountResponse;
      return PAST_APPLYING_STATUSES.has(account.application_status ?? "");
    })
    .catch(() => false);

  statusRequest = { token, promise };
  return promise;
}

export default function HomeApplyButton() {
  const { isAuthReady, isAuthenticated } = useAuth();
  const showDashboard = isAuthReady && isAuthenticated;

  return (
    <Button
      text={showDashboard ? "View Dashboard" : "Apply Now"}
      width="100%"
      aspectRatio="206 / 72"
      href={showDashboard ? "/dashboard" : "/login"}
    />
  );
}
