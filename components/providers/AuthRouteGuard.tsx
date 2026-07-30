"use client";

import { useEffect, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "./AuthProvider";

type AuthRouteGuardProps = {
  children: ReactNode;
  requireAuth?: boolean;
  redirectAuthenticated?: boolean;
};

export default function AuthRouteGuard({
  children,
  requireAuth = false,
  redirectAuthenticated = false,
}: AuthRouteGuardProps) {
  const router = useRouter();
  const { isAuthReady, isAuthenticated } = useAuth();

  const shouldRedirectToLogin =
    isAuthReady && requireAuth && !isAuthenticated;
  const shouldRedirectToDashboard =
    isAuthReady && redirectAuthenticated && isAuthenticated;

  useEffect(() => {
    if (shouldRedirectToLogin) {
      router.replace("/login");
    } else if (shouldRedirectToDashboard) {
      router.replace("/dashboard");
    }
  }, [router, shouldRedirectToDashboard, shouldRedirectToLogin]);

  if (!isAuthReady) {
    return (
      <main
        role="status"
        className="flex min-h-screen items-center justify-center bg-[#0a0324] font-figtree text-white"
      >
        Loading...
      </main>
    );
  }

  if (shouldRedirectToLogin || shouldRedirectToDashboard) {
    return null;
  }

  return children;
}
