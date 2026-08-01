"use client";

import * as React from "react";
import {
  ACCESS_TOKEN_KEY,
  type TokenResponse,
} from "@/lib/auth";
import { apiFetch } from "@/lib/apiClient";

const REFRESH_LEEWAY_MS = 5 * 60 * 1000;
const REFRESH_RETRY_MS = 60 * 1000;

type AuthContextValue = {
  token: string | null;
  isAuthReady: boolean;
  isAuthenticated: boolean;
  login: (accessToken: string) => void;
  logout: () => void;
  refreshToken: () => Promise<string | null>;
};

const AuthContext = React.createContext<AuthContextValue | null>(null);

function getRefreshDelay(token: string): number {
  try {
    const encodedPayload = token.split(".")[1];
    if (!encodedPayload) return 0;

    const base64 = encodedPayload.replace(/-/g, "+").replace(/_/g, "/");
    const padded = base64.padEnd(Math.ceil(base64.length / 4) * 4, "=");
    const payload = JSON.parse(atob(padded)) as { exp?: unknown };

    if (typeof payload.exp !== "number") return 0;
    return Math.max(0, payload.exp * 1000 - Date.now() - REFRESH_LEEWAY_MS);
  } catch {
    return 0;
  }
}

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [token, setToken] = React.useState<string | null>(null);
  const [isAuthReady, setIsAuthReady] = React.useState(false);
  const refreshPromiseRef = React.useRef<Promise<string | null> | null>(null);

  const logout = React.useCallback(() => {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    setToken(null);
  }, []);

  const login = React.useCallback((accessToken: string) => {
    localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
    setToken(accessToken);
  }, []);

  const refreshToken = React.useCallback((): Promise<string | null> => {
    if (refreshPromiseRef.current) {
      return refreshPromiseRef.current;
    }

    const request = (async () => {
      const currentToken = localStorage.getItem(ACCESS_TOKEN_KEY);
      if (!currentToken) {
        setToken(null);
        return null;
      }

      const response = await apiFetch("/api/account/tokens", {
        method: "POST",
        signal: AbortSignal.timeout(10_000),
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${currentToken}`,
        },
      });

      if (response.status === 401 || response.status === 403) {
        logout();
        return null;
      }

      if (!response.ok) {
        throw new Error(`Token refresh failed with status ${response.status}`);
      }

      const data = (await response.json()) as Partial<TokenResponse>;
      if (
        typeof data.access_token !== "string" ||
        data.access_token.length === 0
      ) {
        throw new Error("Token refresh returned an invalid response");
      }

      login(data.access_token);
      return data.access_token;
    })().finally(() => {
      refreshPromiseRef.current = null;
    });

    refreshPromiseRef.current = request;
    return request;
  }, [login, logout]);

  React.useEffect(() => {
    let cancelled = false;

    function initializeAuth() {
      const storedToken = localStorage.getItem(ACCESS_TOKEN_KEY);
      if (!storedToken) {
        if (!cancelled) setIsAuthReady(true);
        return;
      }

      // Restore synchronously so protected pages can perform their own
      // authenticated load without waiting on a refresh request that may have
      // been suspended when a browser tab was closed and restored.
      setToken(storedToken);
      setIsAuthReady(true);
      void refreshToken().catch(() => {
        // A network failure should not deadlock route rendering. The protected
        // page request will independently validate the stored token.
      });
    }

    function handleStorage(event: StorageEvent) {
      if (event.key === ACCESS_TOKEN_KEY) {
        setToken(event.newValue);
        setIsAuthReady(true);
      }
    }

    initializeAuth();
    window.addEventListener("storage", handleStorage);
    return () => {
      cancelled = true;
      window.removeEventListener("storage", handleStorage);
    };
  }, [refreshToken]);

  React.useEffect(() => {
    if (!token) return;

    let timeoutId: number | undefined;
    let cancelled = false;

    const runRefresh = async () => {
      try {
        await refreshToken();
      } catch {
        if (!cancelled && localStorage.getItem(ACCESS_TOKEN_KEY)) {
          timeoutId = window.setTimeout(runRefresh, REFRESH_RETRY_MS);
        }
      }
    };

    const scheduleRefresh = () => {
      window.clearTimeout(timeoutId);
      timeoutId = window.setTimeout(runRefresh, getRefreshDelay(token));
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible" && getRefreshDelay(token) === 0) {
        void runRefresh();
      }
    };

    scheduleRefresh();
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      cancelled = true;
      window.clearTimeout(timeoutId);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [refreshToken, token]);

  const value = React.useMemo<AuthContextValue>(
    () => ({
      token,
      isAuthReady,
      isAuthenticated: token !== null,
      login,
      logout,
      refreshToken,
    }),
    [isAuthReady, login, logout, refreshToken, token],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
