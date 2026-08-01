"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { isUnauthorizedError } from "@/lib/apiClient";
import {
  hydrateApplicationAnswers,
  isSupportedApplicationQuestion,
  serializeApplicationAnswers,
  type BackendQuestion,
} from "./applicationData";
import {
  loadAccessContext,
  loadApplicationRecord,
  saveApplicationDraft,
  submitApplicationRecord,
  type RegistrationTimeRange,
} from "./applicationApi";
import { initialFormData, type WizardFormData } from "./sectionConfig";

const AUTOSAVE_TOAST_ID = "application-autosave";
const APPLICATION_STATUSES = new Set(["NOT_APPLIED", "APPLYING"]);

function canAccessApplication(
  applicationStatus: string | null,
  registration: RegistrationTimeRange,
): boolean {
  if (applicationStatus === "WALK_IN") return true;
  if (
    applicationStatus !== null &&
    !APPLICATION_STATUSES.has(applicationStatus)
  ) {
    return false;
  }

  const now = Date.now();
  const start = new Date(registration.start_at).getTime();
  const end = new Date(registration.end_at).getTime();
  return (
    Number.isFinite(start) &&
    Number.isFinite(end) &&
    now > start &&
    now < end
  );
}

export function useApplicationWorkflow({
  logout,
  token,
}: {
  logout: () => void;
  token: string | null;
}) {
  const router = useRouter();
  const [formData, setFormData] = React.useState<WizardFormData>(initialFormData);
  const [isLoading, setIsLoading] = React.useState(true);
  const [loadError, setLoadError] = React.useState<string | null>(null);
  const [questions, setQuestions] = React.useState<BackendQuestion[]>([]);
  const [hasSavedResume, setHasSavedResume] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const lastSavedAnswersRef = React.useRef("");
  const lastUploadedResumeRef = React.useRef<File | null>(null);
  const saveQueueRef = React.useRef<Promise<void>>(Promise.resolve());

  const handleRequestError = React.useCallback(
    (error: unknown) => {
      if (isUnauthorizedError(error)) {
        logout();
        return true;
      }
      return false;
    },
    [logout],
  );

  React.useEffect(() => {
    if (!token) return;
    const accessToken = token;
    const controller = new AbortController();

    async function load() {
      setIsLoading(true);
      setLoadError(null);
      try {
        const { user, registration } = await loadAccessContext(
          accessToken,
          controller.signal,
        );
        if (!canAccessApplication(user.application_status, registration)) {
          router.replace("/dashboard");
          return;
        }

        const { questions: loadedQuestions, application } =
          await loadApplicationRecord(accessToken, controller.signal);
        const hydrated = hydrateApplicationAnswers(
          loadedQuestions,
          application.form_answers,
        );
        hydrated.portfolio.savedResumeName = application.form_answersfile ?? "";

        setQuestions(loadedQuestions);
        setFormData(hydrated);
        setHasSavedResume(Boolean(application.form_answersfile));
        lastSavedAnswersRef.current = JSON.stringify(
          serializeApplicationAnswers(hydrated, loadedQuestions),
        );
      } catch (error) {
        if (controller.signal.aborted || handleRequestError(error)) return;
        setLoadError(
          "We couldn't load your application. Please refresh and try again.",
        );
      } finally {
        if (!controller.signal.aborted) setIsLoading(false);
      }
    }

    void load();
    return () => controller.abort();
  }, [handleRequestError, router, token]);

  React.useEffect(() => {
    if (
      isLoading ||
      isSubmitting ||
      loadError ||
      !token ||
      questions.length === 0
    ) {
      return;
    }

    const answers = serializeApplicationAnswers(formData, questions);
    const answersSnapshot = JSON.stringify(answers);
    const resume = formData.portfolio.resume;
    if (
      answersSnapshot === lastSavedAnswersRef.current &&
      (resume === null || resume === lastUploadedResumeRef.current)
    ) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      const operation = saveQueueRef.current.then(async () => {
        const answersChanged = answersSnapshot !== lastSavedAnswersRef.current;
        const resumeChanged =
          resume !== null && resume !== lastUploadedResumeRef.current;
        if (!answersChanged && !resumeChanged) return;

        toast.loading("Saving...", {
          id: AUTOSAVE_TOAST_ID,
          duration: Infinity,
        });
        await saveApplicationDraft({
          token,
          answers: answersChanged ? answers : undefined,
          resume: resumeChanged ? resume : undefined,
        });
        if (answersChanged) lastSavedAnswersRef.current = answersSnapshot;
        if (resumeChanged) {
          lastUploadedResumeRef.current = resume;
          setHasSavedResume(true);
        }
        toast.success("Saved", { id: AUTOSAVE_TOAST_ID, duration: 250 });
      });

      saveQueueRef.current = operation.catch((error) => {
        if (!handleRequestError(error)) {
          toast.error("Autosave failed", {
            id: AUTOSAVE_TOAST_ID,
            duration: 900,
          });
        }
      });
    }, 1000);

    return () => window.clearTimeout(timeoutId);
  }, [
    formData,
    handleRequestError,
    isLoading,
    isSubmitting,
    loadError,
    questions,
    token,
  ]);

  const submit = React.useCallback(async () => {
    if (!token || isSubmitting) return false;
    const answers = serializeApplicationAnswers(formData, questions);
    const answerByQuestionId = new Map(
      answers.map((answer) => [answer.question_id, answer.answer.trim()]),
    );
    const missingQuestion = questions.find((question) => {
      if (!question.required) return false;
      if (!isSupportedApplicationQuestion(question)) return false;
      if (
        question.field_key === "portfolio.resume" ||
        question.label.toLowerCase().includes("resume")
      ) {
        return !formData.portfolio.resume && !hasSavedResume;
      }
      const answer = answerByQuestionId.get(question.question_id);
      return !answer || answer.toLowerCase() === "false";
    });

    if (missingQuestion) {
      toast.error(`Please complete: ${missingQuestion.label}`, {
        id: AUTOSAVE_TOAST_ID,
        duration: 2500,
      });
      return false;
    }

    setIsSubmitting(true);
    toast.loading("Submitting application...", {
      id: AUTOSAVE_TOAST_ID,
      duration: Infinity,
    });
    try {
      await saveQueueRef.current;
      const resume = formData.portfolio.resume;
      await saveApplicationDraft({
        token,
        answers,
        resume:
          resume && resume !== lastUploadedResumeRef.current ? resume : undefined,
      });
      await submitApplicationRecord(token);
      lastSavedAnswersRef.current = JSON.stringify(answers);
      if (resume) lastUploadedResumeRef.current = resume;
      toast.success("Application submitted", {
        id: AUTOSAVE_TOAST_ID,
        duration: 700,
      });
      router.replace("/dashboard");
      return true;
    } catch (error) {
      if (!handleRequestError(error)) {
        toast.error("Submission failed. Please review your application.", {
          id: AUTOSAVE_TOAST_ID,
          duration: 2500,
        });
      }
      setIsSubmitting(false);
      return false;
    }
  }, [
    formData,
    handleRequestError,
    hasSavedResume,
    isSubmitting,
    questions,
    router,
    token,
  ]);

  return {
    formData,
    isLoading,
    isSubmitting,
    loadError,
    setFormData,
    submit,
  };
}
