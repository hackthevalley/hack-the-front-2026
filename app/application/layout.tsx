import type { ReactNode } from "react";
import ApplicationRestoreGuard from "./ApplicationRestoreGuard";
import "./application.css";

export default function ApplicationLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <>
      <ApplicationRestoreGuard />
      {children}
    </>
  );
}
