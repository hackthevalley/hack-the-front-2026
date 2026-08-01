import { apiUrl } from "./auth";

const DEFAULT_TIMEOUT_MS = 10_000;

export class ApiError extends Error {
  constructor(
    message: string,
    readonly status: number,
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
  const timeoutSignal = AbortSignal.timeout(timeoutMs);
  const requestSignal = signal
    ? AbortSignal.any([signal, timeoutSignal])
    : timeoutSignal;
  return fetch(apiUrl(path), {
    ...init,
    headers: {
      Accept: "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
    signal: requestSignal,
  });
}

export async function apiRequest(
  path: string,
  options?: ApiRequestOptions,
): Promise<Response> {
  const response = await apiFetch(path, options);
  if (!response.ok) {
    throw new ApiError(
      `Request failed with status ${response.status}`,
      response.status,
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
