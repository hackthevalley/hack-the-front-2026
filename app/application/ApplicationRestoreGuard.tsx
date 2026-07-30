"use client";

import { useEffect } from "react";

const PAGE_HIDDEN_KEY = "htv-application-page-hidden";

export default function ApplicationRestoreGuard() {
  useEffect(() => {
    const navigation = performance.getEntriesByType(
      "navigation",
    )[0] as PerformanceNavigationTiming | undefined;

    if (navigation?.type === "reload") {
      sessionStorage.removeItem(PAGE_HIDDEN_KEY);
    } else if (sessionStorage.getItem(PAGE_HIDDEN_KEY) === "1") {
      sessionStorage.removeItem(PAGE_HIDDEN_KEY);
      window.location.reload();
      return;
    }

    function handlePageHide() {
      sessionStorage.setItem(PAGE_HIDDEN_KEY, "1");
    }

    function handlePageShow(event: PageTransitionEvent) {
      if (!event.persisted) return;

      sessionStorage.removeItem(PAGE_HIDDEN_KEY);
      window.location.reload();
    }

    window.addEventListener("pagehide", handlePageHide);
    window.addEventListener("pageshow", handlePageShow);

    return () => {
      window.removeEventListener("pagehide", handlePageHide);
      window.removeEventListener("pageshow", handlePageShow);
    };
  }, []);

  return null;
}
