"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "@/components/ui/OptimizedImage";
import PortalBackButton from "@/components/layout/PortalBackButton";
import PortalContentStage from "@/components/layout/PortalContentStage";
import PortalNavbar from "@/components/layout/PortalNavbar";
import { useAuth } from "@/components/providers/AuthProvider";
import Button from "@/components/ui/Button";
import {
  ACCESSORIES,
  AVATARS,
  getComboPlacement,
} from "@/app/application/sections/avatarAssets";
import type { AccessoryKey, AvatarKey } from "@/app/application/sections/data";
import { useDashboardData, type DashboardStatus } from "./useDashboardData";

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
  submitted: {
    title: "Submitted",
    titleColor: "#d1d5db",
    action: "Applied",
    disabled: true,
    potionClass: "grayscale",
  },
  pending: {
    title: "Pending",
    titleColor: "#d1d5db",
    action: "Applied",
    disabled: true,
    potionClass: "grayscale",
  },
  waitlisted: {
    title: "Waitlisted",
    titleColor: "#d1d5db",
    action: "Applied",
    disabled: true,
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
  rsvped: {
    title: "RSVPed",
    titleColor: "#71e4bc",
    action: "Applied",
    disabled: true,
    potionClass: "",
  },
  "scanned-in": {
    title: "Scanned In",
    titleColor: "#71e4bc",
    action: "Applied",
    disabled: true,
    potionClass: "",
  },
  rejected: {
    title: "Rejected",
    titleColor: "#ff6068",
    action: "Applied",
    disabled: true,
    potionClass: "",
  },
  declined: {
    title: "Declined",
    titleColor: "#ff6068",
    action: "Applied",
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

type ArtProps = {
  src: string;
  className: string;
};

function Art({ src, className }: ArtProps) {
  return (
    <Image
      src={src}
      alt=""
      aria-hidden="true"
      draggable="false"
      className={`pointer-events-none absolute max-w-none select-none ${className}`}
    />
  );
}

function MobileWoodenBoard() {
  return (
    <div
      className="dashboard-board-mobile pointer-events-none absolute inset-0"
      aria-hidden="true"
    >
      {Array.from({ length: 5 }, (_, index) => (
        <Image
          key={index}
          src="/dashboard/wooden-board.svg"
          alt=""
          draggable="false"
          className="dashboard-board-plank absolute left-0 w-full max-w-none select-none"
          style={{ top: `${index * 20}%` }}
        />
      ))}
    </div>
  );
}

// dashboard-avatar--right pairs with dashboard-right-foreground's >=768px
// translateX rule in globals.css, keeping the owl/chipmunk spot aligned to
// that background art on wide screens.
const AVATAR_FRAME_POSITION: Record<AvatarKey, string> = {
  raccoon: "left-[42.06%] top-[69.96%] w-[16.2%]",
  bear: "left-[59.92%] top-[67.62%] w-[16.73%]",
  owl: "dashboard-avatar--right left-[78.64%] top-[42.87%] w-[22.21%]",
  chipmunk: "dashboard-avatar--right left-[78.64%] top-[42.87%] w-[22.21%]",
};

// Square, unstyled frame — mirrors AvatarFrame's layout (avatar fills the
// frame via object-contain, accessory placed with getComboPlacement's raw
// percentages) so accessory positions stay consistent with avatarAssets.ts's
// COMBO_PLACEMENTS instead of drifting under a per-avatar custom transform.
function DashboardAvatar({
  accessoryKey,
  avatarKey,
}: {
  accessoryKey: AccessoryKey | null;
  avatarKey: AvatarKey;
}) {
  const avatar = AVATARS.find((option) => option.key === avatarKey);
  const accessory = ACCESSORIES.find((option) => option.key === accessoryKey);
  const placement =
    avatar && accessory
      ? getComboPlacement(avatar.key, accessory.key)
      : undefined;

  if (!avatar) return null;

  return (
    <div
      className={`dashboard-avatar pointer-events-none absolute z-10 aspect-square select-none ${AVATAR_FRAME_POSITION[avatar.key]}`}
    >
      <Image
        src={avatar.src}
        alt={`${avatar.label} avatar`}
        draggable="false"
        className="absolute inset-0 size-full max-w-none object-contain p-[9%]"
      />
      {accessory && placement && (
        <Image
          src={accessory.src}
          alt={`${accessory.label} accessory`}
          draggable="false"
          className="absolute h-auto max-w-none object-contain"
          style={{
            left: `${placement.left}%`,
            top: `${placement.top}%`,
            width: `${placement.width}%`,
            transform: placement.rotate
              ? `rotate(${placement.rotate}deg)`
              : undefined,
          }}
        />
      )}
    </div>
  );
}

export default function Dashboard() {
  const router = useRouter();
  const { logout, token } = useAuth();
  const dashboardData = useDashboardData({ logout, token });
  const status = dashboardData.status;
  const current = STATUS_DETAILS[status];
  const isNotSubmitted = status === "applying" || status === "not-submitted";

  useEffect(() => {
    if (status === "apply" || status === "applying") {
      router.prefetch("/application");
    }
  }, [router, status]);

  return (
    <main className="dashboard-page relative h-dvh min-h-[520px] overflow-hidden bg-[radial-gradient(circle_at_50%_55%,#171b70_0%,#0d0a46_42%,#07021d_100%)] text-white">
      <div
        className="dashboard-scene absolute left-1/2 top-1/2 aspect-[1512/982] overflow-hidden [&_img]:select-none"
        style={{
          width: "max(100vw, calc(100vh * 1512 / 982))",
          height: "max(100vh, calc(100vw * 982 / 1512))",
          transform: "translate(-50%, -50%)",
        }}
      >
        <Art
          src="/dashboard/back-tree-left.svg"
          className="dashboard-back-tree-left left-[6.08%] top-[-30.66%] h-[134.4%] w-[32.39%]"
        />
        <Art
          src="/dashboard/back-tree-right.svg"
          className="dashboard-back-tree-right left-[60.12%] top-[-20.57%] h-[137.42%] w-[37.57%] -scale-x-100"
        />
        <Art
          src="/dashboard/rear-trunk-left.svg"
          className="dashboard-rear-trunk-left left-[3.64%] top-[-15.3%] h-[117.2%] w-[5.36%]"
        />
        <Art
          src="/dashboard/rear-trunk-right.svg"
          className="dashboard-rear-trunk-right left-[93.85%] top-[-4.89%] h-[117.48%] w-[6.15%]"
        />
        <div className="dashboard-back-tree pointer-events-none absolute left-[24.41%] top-[-4.8%] h-[107.96%] w-[13.86%] origin-top-left rotate-[7.3251deg]">
          <Image
            src="/dashboard/back-tree.svg"
            alt=""
            aria-hidden="true"
            draggable="false"
            className="h-full w-full max-w-none"
          />
        </div>
        <Art
          src="/dashboard/leaves-right.svg"
          className="dashboard-leaves-right left-[68.25%] top-[65.28%] h-[23.7%] w-[12.09%]"
        />
        <Art
          src="/dashboard/leaves-left.svg"
          className="dashboard-leaves-left left-[14.68%] top-[81.67%] h-[12.34%] w-[9.25%]"
        />
        <Art
          src="/dashboard/rocks-right.svg"
          className="dashboard-rocks-right left-[66.27%] top-[95.72%] h-[5.3%] w-[9.79%]"
        />
        <Art
          src="/dashboard/small-mushroom.svg"
          className="dashboard-small-mushroom left-[2.78%] top-[88.55%] h-[44.25%] w-[25.58%]"
        />
        <div className="dashboard-desktop-decoration pointer-events-none absolute left-[15.55%] top-[69.05%] h-[12%] w-[7.8%]">
          <Image
            src="/dashboard/glow-orange.svg"
            alt=""
            aria-hidden="true"
            draggable="false"
            className="absolute inset-0 h-full w-full"
          />
          <Image
            src="/dashboard/star-left.svg"
            alt=""
            aria-hidden="true"
            draggable="false"
            className="absolute left-1/2 top-1/2 h-[69.69%] w-[58.39%] -translate-x-1/2 -translate-y-1/2 rotate-[-20.8417deg]"
          />
        </div>
        <div className="dashboard-board-star pointer-events-none absolute left-[81.35%] top-[44.1%] h-[12.41%] w-[8.06%]">
          <Image
            src="/dashboard/glow-cream.svg"
            alt=""
            aria-hidden="true"
            draggable="false"
            className="absolute inset-0 h-full w-full"
          />
          <Image
            src="/dashboard/star-right.svg"
            alt=""
            aria-hidden="true"
            draggable="false"
            className="absolute left-1/2 top-1/2 h-[91.09%] w-[76.32%] -translate-x-1/2 -translate-y-1/2 rotate-[9.4885deg]"
          />
        </div>
        <Art
          src="/dashboard/glow-large.svg"
          className="dashboard-desktop-decoration left-[79.8%] top-[45.8%] h-[4.2%] w-[2.7%]"
        />
        <Art
          src="/dashboard/glow-small.svg"
          className="dashboard-desktop-decoration left-[21.6%] top-[65.3%] h-[5%] w-[3.3%]"
        />
        <Art
          src="/dashboard/glow-tiny.svg"
          className="dashboard-desktop-decoration left-[82.5%] top-[20%] h-[3.9%] w-[2.6%]"
        />
        <Art
          src="/dashboard/glow-muted.svg"
          className="dashboard-desktop-decoration left-[78.2%] top-[56%] h-[5%] w-[3.3%]"
        />
        <Art
          src="/dashboard/glow-muted-right.svg"
          className="dashboard-desktop-decoration left-[96%] top-[30.5%] h-[5%] w-[3.3%]"
        />
        <Art
          src="/dashboard/glow-muted-left.svg"
          className="dashboard-desktop-decoration left-[18.5%] top-[43.5%] h-[4.8%] w-[3.1%]"
        />
        <Art
          src="/dashboard/left-grasses.svg"
          className="dashboard-left-grasses left-[-3.66%] top-[65.27%] h-[39.87%] w-[26.92%]"
        />
        <div className="dashboard-left-leaves pointer-events-none absolute left-[-9.66%] top-[70.95%] flex h-[43.57%] w-[25.35%] items-center justify-center">
          <div className="relative h-[92.1%] w-[89.75%] flex-none rotate-174 -scale-y-100">
            <Image
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
          className="dashboard-right-foreground left-[62.63%] top-[43.69%] h-[108.11%] w-[64.74%]"
        />
        <Art
          src="/dashboard/tree-trunk.svg"
          className="dashboard-tree-trunk left-[20.63%] top-[-2.14%] h-[91.45%] w-[58.73%]"
        />
        <Art
          src="/dashboard/rocks-left.svg"
          className="dashboard-rocks-left left-[27.65%] top-[84.32%] h-[4.11%] w-[6.68%]"
        />
        <Art
          src="/dashboard/rocks-center.svg"
          className="dashboard-rocks-center left-[57.59%] top-[85.92%] h-[4.87%] w-[9.58%]"
        />

        <h1 className="dashboard-welcome absolute top-[17.62%] z-10 whitespace-nowrap font-vcr text-[clamp(32px,4.23vw,64px)] leading-none tracking-[0.02em] [text-shadow:0_0_10px_rgba(255,255,255,.9),0_0_18px_#7075ff]">
          Welcome back, Hacker
        </h1>

        <section
          aria-labelledby="application-status-heading"
          className="dashboard-status-board absolute left-[26.26%] top-[30.5%] z-10 h-[30.55%] w-[47.27%]"
        >
          <Art
            src="/dashboard/wooden-board.svg"
            className={`dashboard-board ${
              isNotSubmitted
                ? "inset-0 h-full w-full origin-left scale-x-[1.1446]"
                : "inset-0 h-full w-full"
            }`}
          />
          <MobileWoodenBoard />
          <Art
            src={
              status === "declined" || status === "rejected"
                ? "/dashboard/declined-potion.svg"
                : "/dashboard/status-potion.svg"
            }
            className={`dashboard-status-potion left-[7.54%] top-[14.52%] h-[79.31%] w-[29.04%] rotate-[-13.27deg] ${current.potionClass}`}
          />

          <h2
            id="application-status-heading"
            className="dashboard-status-heading absolute left-1/2 top-[12.57%] w-[41.54%] -translate-x-1/2 whitespace-nowrap text-center font-figtree text-[clamp(14px,1.59vw,24px)] font-bold leading-[1.21] [text-shadow:0_0_10px_rgba(255,255,255,.5)]"
          >
            Current Application Status
          </h2>
          <p
            className={`dashboard-status-title absolute left-[61.2%] top-[28.59%] w-[41.96%] -translate-x-1/2 whitespace-nowrap text-center font-vcr text-[clamp(34px,4.23vw,64px)] leading-[0.98] ${
              current.title === "Not Submitted"
                ? "dashboard-status-title-long"
                : ""
            }`}
            style={{
              color: current.titleColor,
              textShadow: `0 0 7.8px ${current.titleColor}`,
            }}
          >
            {current.title}
          </p>
          <p className="dashboard-status-deadline absolute left-[61.2%] top-[54.26%] w-[38.89%] -translate-x-1/2 whitespace-nowrap text-center font-figtree text-[clamp(10px,1.06vw,16px)] leading-[1.2] text-[#cecece]">
            Application deadline: {dashboardData.deadline}
          </p>
          <div className="dashboard-status-action absolute left-[44.41%] top-[66.93%] h-[18.67%] w-[33.57%]">
            <Button
              text={current.action}
              state={current.disabled ? "disabled" : "default"}
              onClick={() => router.push("/application")}
            />
          </div>
        </section>

        {dashboardData.avatar && (
          <DashboardAvatar
            avatarKey={dashboardData.avatar}
            accessoryKey={dashboardData.accessory}
          />
        )}
      </div>

      <PortalContentStage className="dashboard-portal-stage pointer-events-none">
        <PortalNavbar />
        <PortalBackButton
          text="Log Out"
          width={170}
          tone="danger"
          placement="navbar-end"
          showArrow={false}
          onClick={() => {
            logout();
            router.replace("/login");
          }}
        />
      </PortalContentStage>
    </main>
  );
}
