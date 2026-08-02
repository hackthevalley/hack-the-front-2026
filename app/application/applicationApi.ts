import { apiJson, apiRequest } from "@/lib/apiClient";
import type {
  BackendAnswerUpdate,
  BackendApplicationResponse,
  BackendQuestion,
} from "./applicationData";

export type UserResponse = {
  application_status: string | null;
};

export type RegistrationTimeRange = {
  start_at: string;
  end_at: string;
};

export async function loadAccessContext(token: string, signal?: AbortSignal) {
  const options = { token, signal };
  const [user, registration] = await Promise.all([
    apiJson<UserResponse>("/api/account/me", options),
    apiJson<RegistrationTimeRange>("/api/forms/registration-timerange", options),
  ]);
  return { user, registration };
}

export async function loadApplicationRecord(token: string, signal?: AbortSignal) {
  const options = { token, signal };
  const [questions, application] = await Promise.all([
    apiJson<BackendQuestion[]>("/api/forms/questions", options),
    apiJson<BackendApplicationResponse>("/api/forms/application", options),
  ]);
  return { questions, application };
}

export async function saveApplicationDraft({
  answers,
  resume,
  token,
}: {
  answers?: BackendAnswerUpdate[];
  resume?: File;
  token: string;
}): Promise<void> {
  const requests: Promise<Response>[] = [];

  if (answers) {
    requests.push(
      apiRequest("/api/forms/answers", {
        method: "PUT",
        token,
        timeoutMs: 15_000,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(answers),
      }),
    );
  }

  if (resume) {
    const body = new FormData();
    body.append("file", resume);
    requests.push(
      apiRequest("/api/forms/resume", {
        method: "POST",
        token,
        timeoutMs: 30_000,
        body,
      }),
    );
  }

  await Promise.all(requests);
}

export async function submitApplicationRecord(token: string): Promise<void> {
  await apiRequest("/api/forms/submission", { method: "POST", token });
}
