export const ACCESS_TOKEN_KEY = "access_token";
export const BACKEND_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL ?? "http://localhost:8000";

export type TokenResponse = {
  access_token: string;
  token_type: string;
};

export function apiUrl(path: string): string {
  return `${BACKEND_URL.replace(/\/+$/, "")}/${path.replace(/^\/+/, "")}`;
}
