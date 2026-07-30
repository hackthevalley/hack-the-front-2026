import type { ReactNode } from "react";
import ApplicationRestoreGuard from "./ApplicationRestoreGuard";

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
