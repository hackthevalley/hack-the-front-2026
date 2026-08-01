"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { hydrateApplicationAnswers } from "@/app/application/applicationData";
import {
  loadAccessContext,
  loadApplicationRecord,
  type RegistrationTimeRange,
} from "@/app/application/applicationApi";
import type { AccessoryKey, AvatarKey } from "@/app/application/sections/data";
import { isUnauthorizedError } from "@/lib/apiClient";

export type DashboardStatus =
  | "apply"
  | "applying"
  | "submitted"
  | "pending"
  | "waitlisted"
  | "not-submitted"
  | "accepted"
  | "rsvped"
  | "scanned-in"
  | "rejected"
  | "declined"
  | "loading"
  | "unavailable";

export type DashboardData = {
  accessory: AccessoryKey | null;
  avatar: AvatarKey | null;
  deadline: string;
  status: DashboardStatus;
};

const SUBMITTED_STATUSES = new Set(["APPLIED", "WALK_IN_SUBMITTED"]);
const NO_APPLICATION_STATUSES = new Set(["ACCOUNT_INACTIVE", "NOT_APPLIED"]);

function hasApplication(applicationStatus: string | null): boolean {
  return (
    applicationStatus !== null &&
    !NO_APPLICATION_STATUSES.has(applicationStatus)
  );
}

function resolveDashboardStatus(
  applicationStatus: string | null,
  registration: RegistrationTimeRange,
): DashboardStatus {
  if (SUBMITTED_STATUSES.has(applicationStatus ?? "")) return "submitted";
  if (applicationStatus === "UNDER_REVIEW") return "pending";
  if (applicationStatus === "WAITLISTED") return "waitlisted";
  if (applicationStatus === "ACCEPTED") return "accepted";
  if (applicationStatus === "ACCEPTED_INVITE") return "rsvped";
  if (applicationStatus === "SCANNED_IN") return "scanned-in";
  if (applicationStatus === "REJECTED") return "rejected";
  if (applicationStatus === "REJECTED_INVITE") return "declined";
  if (applicationStatus === "WALK_IN") return "apply";

  const now = Date.now();
  const start = new Date(registration.start_at).getTime();
  const end = new Date(registration.end_at).getTime();
  const registrationIsOpen =
    Number.isFinite(start) && Number.isFinite(end) && now > start && now < end;
  if (applicationStatus === "APPLYING") {
    return registrationIsOpen ? "applying" : "not-submitted";
  }
  return registrationIsOpen ? "apply" : "not-submitted";
}

function formatDeadline(value: string): string {
  const deadline = new Date(value);
  if (Number.isNaN(deadline.getTime())) return "Unavailable";
  return new Intl.DateTimeFormat("en-CA", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  }).format(deadline);
}

export function useDashboardData({
  logout,
  token,
}: {
  logout: () => void;
  token: string | null;
}): DashboardData {
  const router = useRouter();
  const [data, setData] = useState<DashboardData>({
    accessory: null,
    avatar: null,
    deadline: "Loading...",
    status: "loading",
  });

  useEffect(() => {
    if (!token) return;
    const accessToken = token;
    const controller = new AbortController();

    async function load() {
      try {
        const { user, registration } = await loadAccessContext(
          accessToken,
          controller.signal,
        );
        const status = resolveDashboardStatus(
          user.application_status,
          registration,
        );
        const deadline = formatDeadline(registration.end_at);

        // Status and deadline come from the access context and should remain
        // usable even if the optional avatar/application data cannot hydrate.
        setData({ accessory: null, avatar: null, deadline, status });

        if (hasApplication(user.application_status)) {
          try {
            const { questions, application } = await loadApplicationRecord(
              accessToken,
              controller.signal,
            );
            const hydrated = hydrateApplicationAnswers(
              questions,
              application.form_answers,
            );
            setData({
              accessory: hydrated.customAccessory.accessory || null,
              avatar: hydrated.customCharacter.character || null,
              deadline,
              status,
            });
          } catch (error) {
            if (controller.signal.aborted || isUnauthorizedError(error)) {
              throw error;
            }
            // Avatar data is decorative on the dashboard. Keep the valid
            // application status rather than replacing everything with an
            // unavailable state when its mapping is stale or malformed.
          }
        }
      } catch (error) {
        if (controller.signal.aborted) return;
        if (isUnauthorizedError(error)) {
          logout();
          router.replace("/login");
          return;
        }
        setData({
          accessory: null,
          avatar: null,
          deadline: "Unavailable",
          status: "unavailable",
        });
      }
    }

    void load();
    return () => controller.abort();
  }, [logout, router, token]);

  return data;
}
