"use client";

import { lazy, Suspense } from "react";
import { usePathname } from "next/navigation";

const Toaster = lazy(() =>
  import("sonner").then((module) => ({ default: module.Toaster })),
);

export default function RouteToaster() {
  const pathname = usePathname();
  if (pathname === "/") return null;

  return (
    <Suspense fallback={null}>
      <Toaster
        position="bottom-right"
        richColors
        closeButton
        toastOptions={{
          duration: 6000,
          style: { background: "#0E0D5B", color: "#FFFFFF" },
        }}
      />
    </Suspense>
  );
}
