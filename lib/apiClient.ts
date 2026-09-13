import { apiUrl } from "./auth";

const DEFAULT_TIMEOUT_MS = 10_000;

export class ApiError extends Error {
  constructor(
    message: string,
    readonly status: number,
    readonly detail?: string,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

export function isUnauthorizedError(error: unknown): boolean {
  return error instanceof ApiError && (error.status === 401 || error.status === 403);
}

type ApiRequestOptions = RequestInit & {
  token?: string;
  timeoutMs?: number;
};

export async function apiFetch(
  path: string,
  {
    token,
    timeoutMs = DEFAULT_TIMEOUT_MS,
    headers,
    signal,
    ...init
  }: ApiRequestOptions = {},
): Promise<Response> {
  // AbortSignal.any() is unavailable before Safari/iOS 17.4. Combining the
  // caller signal and timeout with an AbortController keeps API requests
  // working across every iOS 17 release supported by the site.
  const controller = new AbortController();
  const abortRequest = () => controller.abort();
  const timeoutId = globalThis.setTimeout(abortRequest, timeoutMs);

  if (signal?.aborted) {
    abortRequest();
  } else {
    signal?.addEventListener("abort", abortRequest, { once: true });
  }

  try {
    return await fetch(apiUrl(path), {
      ...init,
      headers: {
        Accept: "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...headers,
      },
      signal: controller.signal,
    });
  } finally {
    globalThis.clearTimeout(timeoutId);
    signal?.removeEventListener("abort", abortRequest);
  }
}

export async function apiRequest(
  path: string,
  options?: ApiRequestOptions,
): Promise<Response> {
  const response = await apiFetch(path, options);
  if (!response.ok) {
    // Only expose expected client errors; server failures may contain internal details.
    let detail: string | undefined;
    if (response.status >= 400 && response.status < 500) {
      try {
        const body: unknown = await response.json();
        if (
          body !== null &&
          typeof body === "object" &&
          "detail" in body &&
          typeof body.detail === "string"
        ) {
          detail = body.detail.trim() || undefined;
        }
      } catch {
        // Empty or non-JSON responses still produce a usable ApiError.
      }
    }
    throw new ApiError(
      `Request failed with status ${response.status}`,
      response.status,
      detail,
    );
  }

  return response;
}

export async function apiJson<T>(
  path: string,
  options?: ApiRequestOptions,
): Promise<T> {
  const response = await apiRequest(path, options);
  return (await response.json()) as T;
}
