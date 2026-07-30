"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import PortalBackButton from "@/components/layout/PortalBackButton";
import PortalContentStage from "@/components/layout/PortalContentStage";
import PortalNavbar from "@/components/layout/PortalNavbar";
import { useAuth } from "@/components/providers/AuthProvider";
import Button from "@/components/ui/Button";
import { apiUrl } from "@/lib/auth";

type DashboardStatus =
  | "apply"
  | "applying"
  | "pending"
  | "not-submitted"
  | "accepted"
  | "declined"
  | "loading"
  | "unavailable";

type UserResponse = {
  application_status: string | null;
};

type RegistrationTimeRange = {
  start_at: string;
  end_at: string;
};

type DashboardData = {
  deadline: string;
  status: DashboardStatus;
};

const STATUS_DETAILS: Record<
  DashboardStatus,
  {
    title: string;
    titleColor: string;
    action: string;
    disabled: boolean;
    potionClass: string;
  }
> = {
  apply: {
    title: "Apply Now",
    titleColor: "#71e4bc",
    action: "Apply Now",
    disabled: false,
    potionClass: "",
  },
  applying: {
    title: "Not Submitted",
    titleColor: "#71e4bc",
    action: "Apply Now",
    disabled: false,
    potionClass: "",
  },
  pending: {
    title: "Pending",
    titleColor: "#d1d5db",
    action: "Open",
    disabled: false,
    potionClass: "grayscale",
  },
  "not-submitted": {
    title: "Not Submitted",
    titleColor: "#d1d5db",
    action: "Application Closed",
    disabled: true,
    potionClass: "grayscale",
  },
  accepted: {
    title: "Accepted",
    titleColor: "#71e4bc",
    action: "Application Closed",
    disabled: true,
    potionClass: "",
  },
  declined: {
    title: "Declined",
    titleColor: "#ff6068",
    action: "Application Closed",
    disabled: true,
    potionClass: "",
  },
  loading: {
    title: "Loading...",
    titleColor: "#d1d5db",
    action: "Loading",
    disabled: true,
    potionClass: "grayscale",
  },
  unavailable: {
    title: "Unavailable",
    titleColor: "#ff6068",
    action: "Try Again Later",
    disabled: true,
    potionClass: "grayscale",
  },
};

const PENDING_STATUSES = new Set([
  "APPLIED",
  "UNDER_REVIEW",
  "WAITLISTED",
  "WALK_IN_SUBMITTED",
]);
const ACCEPTED_STATUSES = new Set([
  "ACCEPTED",
  "ACCEPTED_INVITE",
  "SCANNED_IN",
]);
const DECLINED_STATUSES = new Set(["REJECTED", "REJECTED_INVITE"]);

function resolveDashboardStatus(
  applicationStatus: string | null,
  registration: RegistrationTimeRange,
): DashboardStatus {
  if (PENDING_STATUSES.has(applicationStatus ?? "")) return "pending";
  if (ACCEPTED_STATUSES.has(applicationStatus ?? "")) return "accepted";
  if (DECLINED_STATUSES.has(applicationStatus ?? "")) return "declined";
  if (applicationStatus === "WALK_IN") return "apply";

  const now = Date.now();
  const start = new Date(registration.start_at).getTime();
  const end = new Date(registration.end_at).getTime();
  const registrationIsOpen =
    Number.isFinite(start) &&
    Number.isFinite(end) &&
    now > start &&
    now < end;

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

type ArtProps = {
  src: string;
  className: string;
};

function Art({ src, className }: ArtProps) {
  return (
    <img
      src={src}
      alt=""
      aria-hidden="true"
      draggable="false"
      className={`pointer-events-none absolute max-w-none select-none ${className}`}
    />
  );
}

export default function Dashboard() {
  const router = useRouter();
  const { logout, token } = useAuth();
  const [dashboardData, setDashboardData] = useState<DashboardData>({
    deadline: "Loading...",
    status: "loading",
  });
  const status = dashboardData.status;
  const current = STATUS_DETAILS[status];
  const isNotSubmitted =
    status === "applying" || status === "not-submitted";

  useEffect(() => {
    if (!token) return;

    const controller = new AbortController();

    async function loadDashboard() {
      try {
        const headers = {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        };
        const [userResponse, registrationResponse] = await Promise.all([
          fetch(apiUrl("/api/account/me"), {
            headers,
            signal: controller.signal,
          }),
          fetch(apiUrl("/api/forms/registration-timerange"), {
            headers,
            signal: controller.signal,
          }),
        ]);

        if (
          userResponse.status === 401 ||
          userResponse.status === 403 ||
          registrationResponse.status === 401 ||
          registrationResponse.status === 403
        ) {
          logout();
          router.replace("/login");
          return;
        }

        if (!userResponse.ok || !registrationResponse.ok) {
          throw new Error("Unable to load dashboard");
        }

        const user = (await userResponse.json()) as UserResponse;
        const registration =
          (await registrationResponse.json()) as RegistrationTimeRange;

        setDashboardData({
          deadline: formatDeadline(registration.end_at),
          status: resolveDashboardStatus(
            user.application_status,
            registration,
          ),
        });
      } catch (error) {
        if (error instanceof Error && error.name === "AbortError") return;
        setDashboardData({
          deadline: "Unavailable",
          status: "unavailable",
        });
      }
    }

    void loadDashboard();
    return () => controller.abort();
  }, [logout, router, token]);

  return (
    <main className="relative h-dvh min-h-[520px] overflow-hidden bg-[radial-gradient(circle_at_50%_55%,#171b70_0%,#0d0a46_42%,#07021d_100%)] text-white">
      <div
        className="absolute left-1/2 top-1/2 aspect-[1512/982] -translate-x-1/2 -translate-y-1/2 overflow-hidden [&_img]:select-none"
        style={{
          width: "max(100vw, calc(100vh * 1512 / 982))",
          height: "max(100vh, calc(100vw * 982 / 1512))",
        }}
      >
        <Art
          src="/dashboard/back-tree-left.svg"
          className="left-[6.08%] top-[-30.66%] h-[134.4%] w-[32.39%]"
        />
        <Art
          src="/dashboard/back-tree-right.svg"
          className="left-[60.12%] top-[-20.57%] h-[137.42%] w-[37.57%] -scale-x-100"
        />
        <Art
          src="/dashboard/rear-trunk-left.svg"
          className="left-[3.64%] top-[-15.3%] h-[117.2%] w-[5.36%]"
        />
        <Art
          src="/dashboard/rear-trunk-right.svg"
          className="left-[93.85%] top-[-4.89%] h-[117.48%] w-[6.15%]"
        />
        <div className="pointer-events-none absolute left-[24.41%] top-[-4.8%] h-[107.96%] w-[13.86%] origin-top-left rotate-[7.3251deg]">
          <img
            src="/dashboard/back-tree.svg"
            alt=""
            aria-hidden="true"
            draggable="false"
            className="h-full w-full max-w-none"
          />
        </div>
        <Art
          src="/dashboard/leaves-right.svg"
          className="left-[68.25%] top-[65.28%] h-[23.7%] w-[12.09%]"
        />
        <Art
          src="/dashboard/leaves-left.svg"
          className="left-[14.68%] top-[81.67%] h-[12.34%] w-[9.25%]"
        />
        <Art
          src="/dashboard/rocks-right.svg"
          className="left-[66.27%] top-[95.72%] h-[5.3%] w-[9.79%]"
        />
        <Art
          src="/dashboard/small-mushroom.svg"
          className="left-[2.78%] top-[88.55%] h-[44.25%] w-[25.58%]"
        />
        <div className="pointer-events-none absolute left-[15.55%] top-[69.05%] h-[12%] w-[7.8%]">
          <img
            src="/dashboard/glow-orange.svg"
            alt=""
            aria-hidden="true"
            draggable="false"
            className="absolute inset-0 h-full w-full"
          />
          <img
            src="/dashboard/star-left.svg"
            alt=""
            aria-hidden="true"
            draggable="false"
            className="absolute left-1/2 top-1/2 h-[69.69%] w-[58.39%] -translate-x-1/2 -translate-y-1/2 rotate-[-20.8417deg]"
          />
        </div>
        <div className="pointer-events-none absolute left-[81.35%] top-[44.1%] h-[12.41%] w-[8.06%]">
          <img
            src="/dashboard/glow-cream.svg"
            alt=""
            aria-hidden="true"
            draggable="false"
            className="absolute inset-0 h-full w-full"
          />
          <img
            src="/dashboard/star-right.svg"
            alt=""
            aria-hidden="true"
            draggable="false"
            className="absolute left-1/2 top-1/2 h-[91.09%] w-[76.32%] -translate-x-1/2 -translate-y-1/2 rotate-[9.4885deg]"
          />
        </div>
        <Art
          src="/dashboard/glow-large.svg"
          className="left-[79.8%] top-[45.8%] h-[4.2%] w-[2.7%]"
        />
        <Art
          src="/dashboard/glow-small.svg"
          className="left-[21.6%] top-[65.3%] h-[5%] w-[3.3%]"
        />
        <Art
          src="/dashboard/glow-tiny.svg"
          className="left-[82.5%] top-[20%] h-[3.9%] w-[2.6%]"
        />
        <Art
          src="/dashboard/glow-muted.svg"
          className="left-[78.2%] top-[56%] h-[5%] w-[3.3%]"
        />
        <Art
          src="/dashboard/glow-muted-right.svg"
          className="left-[96%] top-[30.5%] h-[5%] w-[3.3%]"
        />
        <Art
          src="/dashboard/glow-muted-left.svg"
          className="left-[18.5%] top-[43.5%] h-[4.8%] w-[3.1%]"
        />
        <Art
          src="/dashboard/left-grasses.svg"
          className="left-[-3.66%] top-[65.27%] h-[39.87%] w-[26.92%]"
        />
        <div className="pointer-events-none absolute left-[-9.66%] top-[70.95%] flex h-[43.57%] w-[25.35%] items-center justify-center">
          <div className="relative h-[92.1%] w-[89.75%] flex-none rotate-174 -scale-y-100">
            <img
              src="/dashboard/left-leaves.svg"
              alt=""
              aria-hidden="true"
              draggable="false"
              className="absolute left-[-49.89%] top-[-40.87%] h-[169.41%] w-[194.69%] max-w-none select-none"
            />
          </div>
        </div>
        <Art
          src="/dashboard/right-foreground.svg"
          className="left-[62.63%] top-[43.69%] h-[108.11%] w-[64.74%]"
        />
        <Art
          src="/dashboard/tree-trunk.svg"
          className="left-[20.63%] top-[-2.14%] h-[91.45%] w-[58.73%]"
        />
        <Art
          src="/dashboard/rocks-left.svg"
          className="left-[27.65%] top-[84.32%] h-[4.11%] w-[6.68%]"
        />
        <Art
          src="/dashboard/rocks-center.svg"
          className="left-[57.59%] top-[85.92%] h-[4.87%] w-[9.58%]"
        />

        <h1 className="absolute left-1/2 top-[17.62%] z-10 -translate-x-1/2 whitespace-nowrap font-vcr text-[clamp(32px,4.23vw,64px)] leading-none tracking-[0.02em] [text-shadow:0_0_10px_rgba(255,255,255,.9),0_0_18px_#7075ff]">
          Welcome back, Hacker
        </h1>

        <section
          aria-labelledby="application-status-heading"
          className="absolute left-[26.26%] top-[30.5%] z-10 h-[30.55%] w-[47.27%]"
        >
          <Art
            src="/dashboard/wooden-board.svg"
            className={
              isNotSubmitted
                ? "inset-0 h-full w-full origin-left scale-x-[1.1446]"
                : "inset-0 h-full w-full"
            }
          />
          <Art
            src={
              status === "declined"
                ? "/dashboard/declined-potion.svg"
                : "/dashboard/status-potion.svg"
            }
            className={`left-[7.54%] top-[14.52%] h-[79.31%] w-[29.04%] rotate-[-13.27deg] ${current.potionClass}`}
          />

          <h2
            id="application-status-heading"
            className="absolute left-1/2 top-[12.57%] w-[41.54%] -translate-x-1/2 whitespace-nowrap text-center font-figtree text-[clamp(14px,1.59vw,24px)] font-bold leading-[1.21] [text-shadow:0_0_10px_rgba(255,255,255,.5)]"
          >
            Current Application Status
          </h2>
          <p
            className="absolute left-[61.2%] top-[28.59%] w-[41.96%] -translate-x-1/2 whitespace-nowrap text-center font-vcr text-[clamp(34px,4.23vw,64px)] leading-[0.98]"
            style={{
              color: current.titleColor,
              textShadow: `0 0 7.8px ${current.titleColor}`,
            }}
          >
            {current.title}
          </p>
          <p className="absolute left-[61.2%] top-[54.26%] w-[38.89%] -translate-x-1/2 whitespace-nowrap text-center font-figtree text-[clamp(10px,1.06vw,16px)] leading-[1.2] text-[#cecece]">
            Application deadline: {dashboardData.deadline}
          </p>
          <div className="absolute left-[44.41%] top-[66.93%] h-[18.67%] w-[33.57%]">
            <Button
              text={current.action}
              buttonType={current.disabled ? "disabled" : "primary"}
              width="100%"
              aspectRatio="240 / 56"
              artworkVariant="compact"
              onClick={() => router.push("/application")}
            />
          </div>
        </section>
      </div>

      <PortalContentStage className="pointer-events-none">
        <PortalNavbar />
        <PortalBackButton
          text="Log Out"
          width={170}
          tone="danger"
          onClick={() => {
            logout();
            router.replace("/login");
          }}
        />
      </PortalContentStage>
    </main>
  );
}
