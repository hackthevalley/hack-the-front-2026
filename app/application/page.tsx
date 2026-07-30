"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import LogoNavbar from "@/components/layout/LogoNavbar";
import AuthRouteGuard from "@/components/providers/AuthRouteGuard";
import { useAuth } from "@/components/providers/AuthProvider";
import { apiUrl } from "@/lib/auth";
import {
  hydrateApplicationAnswers,
  serializeApplicationAnswers,
  type BackendApplicationResponse,
  type BackendQuestion,
} from "./applicationData";
import Background from "./background/Background";
import BackgroundBook from "./backgroundBook";
import ProgressBar from "./progressBar";
import SectionNavbar from "./sectionNavbar";
import {
  GROUP_START_STEP_INDEX,
  SECTION_GROUPS,
  SECTIONS,
  initialFormData,
  type WizardFormData,
} from "./sectionConfig";
import type { SectionHandle } from "./sections/types";

const AUTOSAVE_TOAST_ID = "application-autosave";
const APPLICATION_STATUSES = new Set(["NOT_APPLIED", "APPLYING"]);

type UserResponse = {
  application_status: string | null;
};

type RegistrationTimeRange = {
  start_at: string;
  end_at: string;
};

function canAccessApplication(
  applicationStatus: string | null,
  registration: RegistrationTimeRange,
): boolean {
  // Walk-in applications are intentionally allowed outside the normal window.
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

export default function ApplicationPage() {
  const router = useRouter();
  const { logout, token } = useAuth();
  const [stepIndex, setStepIndex] = React.useState(0);
  const [furthestVisited, setFurthestVisited] = React.useState(0);
  const [formData, setFormData] =
    React.useState<WizardFormData>(initialFormData);
  const [sectionHasErrors, setSectionHasErrors] = React.useState(false);
  const [leftSectionHasErrors, setLeftSectionHasErrors] = React.useState(false);
  const [isLoadingApplication, setIsLoadingApplication] = React.useState(true);
  const [loadError, setLoadError] = React.useState<string | null>(null);
  const [questions, setQuestions] = React.useState<BackendQuestion[]>([]);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const sectionRef = React.useRef<SectionHandle>(null);
  const leftSectionRef = React.useRef<SectionHandle>(null);
  const lastSavedAnswersRef = React.useRef("");
  const lastUploadedResumeRef = React.useRef<File | null>(null);
  const saveQueueRef = React.useRef<Promise<void>>(Promise.resolve());

  const step = SECTIONS[stepIndex];
  const ActiveLeft = step.Left;
  const ActiveRight = step.Right;
  const leftId = step.leftId;
  const isLastStep = stepIndex === SECTIONS.length - 1;
  const furthestVisitedGroupIndex = SECTIONS[furthestVisited].groupIndex;
  const groupStepCounts = SECTION_GROUPS.map((group) => group.steps.length);

  React.useEffect(() => {
    if (!token) return;

    const controller = new AbortController();
    const requestSignal = AbortSignal.any([
      controller.signal,
      AbortSignal.timeout(10_000),
    ]);

    async function loadApplication() {
      setIsLoadingApplication(true);
      setLoadError(null);

      try {
        const headers = {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        };
        const [userResponse, registrationResponse] = await Promise.all([
          fetch(apiUrl("/api/account/me"), {
            headers,
            signal: requestSignal,
          }),
          fetch(apiUrl("/api/forms/registration-timerange"), {
            headers,
            signal: requestSignal,
          }),
        ]);

        if (
          userResponse.status === 401 ||
          userResponse.status === 403 ||
          registrationResponse.status === 401 ||
          registrationResponse.status === 403
        ) {
          logout();
          return;
        }

        if (!userResponse.ok || !registrationResponse.ok) {
          throw new Error("Unable to verify application access");
        }

        const user = (await userResponse.json()) as UserResponse;
        const registration =
          (await registrationResponse.json()) as RegistrationTimeRange;

        if (!canAccessApplication(user.application_status, registration)) {
          router.replace("/dashboard");
          return;
        }

        const [questionsResponse, applicationResponse] = await Promise.all([
          fetch(apiUrl("/api/forms/questions"), {
            headers,
            signal: requestSignal,
          }),
          fetch(apiUrl("/api/forms/application"), {
            headers,
            signal: requestSignal,
          }),
        ]);

        if (
          questionsResponse.status === 401 ||
          questionsResponse.status === 403 ||
          applicationResponse.status === 401 ||
          applicationResponse.status === 403
        ) {
          logout();
          return;
        }

        if (!questionsResponse.ok || !applicationResponse.ok) {
          throw new Error("Unable to load application");
        }

        const questions =
          (await questionsResponse.json()) as BackendQuestion[];
        const application =
          (await applicationResponse.json()) as BackendApplicationResponse;
        const hydrated = hydrateApplicationAnswers(
          questions,
          application.form_answers,
        );

        setQuestions(questions);
        setFormData(hydrated);
        lastSavedAnswersRef.current = JSON.stringify(
          serializeApplicationAnswers(hydrated, questions),
        );
      } catch (error) {
        if (error instanceof Error && error.name === "AbortError") return;
        setLoadError(
          "We couldn't load your application. Please refresh and try again.",
        );
      } finally {
        if (!controller.signal.aborted) setIsLoadingApplication(false);
      }
    }

    void loadApplication();
    return () => controller.abort();
  }, [logout, router, token]);

  React.useEffect(() => {
    if (!isLoadingApplication) return;

    const timeoutId = window.setTimeout(() => {
      setLoadError(
        "We couldn't load your application. Please refresh and try again.",
      );
      setIsLoadingApplication(false);
    }, 12_000);

    return () => window.clearTimeout(timeoutId);
  }, [isLoadingApplication]);

  React.useEffect(() => {
    if (
      isLoadingApplication ||
      isSubmitting ||
      loadError ||
      !token ||
      questions.length === 0
    ) {
      return;
    }

    const answerUpdates = serializeApplicationAnswers(formData, questions);
    const answersSnapshot = JSON.stringify(answerUpdates);
    const resume = formData.portfolio.resume;
    const hasUnsavedAnswers =
      answersSnapshot !== lastSavedAnswersRef.current;
    const hasUnsavedResume =
      resume !== null && resume !== lastUploadedResumeRef.current;
    if (!hasUnsavedAnswers && !hasUnsavedResume) return;

    const timeoutId = window.setTimeout(() => {
      const operation = saveQueueRef.current.then(async () => {
        const answersChanged =
          answersSnapshot !== lastSavedAnswersRef.current;
        const resumeChanged =
          resume !== null && resume !== lastUploadedResumeRef.current;
        if (!answersChanged && !resumeChanged) return;

        toast.loading("Saving...", {
          id: AUTOSAVE_TOAST_ID,
          duration: Infinity,
        });
        const headers = {
          Authorization: `Bearer ${token}`,
        };
        const requests: Promise<Response>[] = [];

        if (answersChanged) {
          requests.push(
            fetch(apiUrl("/api/forms/answers"), {
              method: "PUT",
              headers: {
                ...headers,
                "Content-Type": "application/json",
              },
              body: answersSnapshot,
            }),
          );
        }

        if (resumeChanged) {
          const body = new FormData();
          body.append("file", resume);
          requests.push(
            fetch(apiUrl("/api/forms/resume"), {
              method: "POST",
              headers,
              body,
            }),
          );
        }

        const responses = await Promise.all(requests);
        if (
          responses.some(
            (response) => response.status === 401 || response.status === 403,
          )
        ) {
          toast.dismiss(AUTOSAVE_TOAST_ID);
          logout();
          return;
        }
        if (responses.some((response) => !response.ok)) {
          throw new Error("Unable to save application");
        }

        if (answersChanged) lastSavedAnswersRef.current = answersSnapshot;
        if (resumeChanged) lastUploadedResumeRef.current = resume;
        toast.success("Saved", {
          id: AUTOSAVE_TOAST_ID,
          duration: 250,
        });
      });

      saveQueueRef.current = operation.catch(() => {
        toast.error("Autosave failed", {
          id: AUTOSAVE_TOAST_ID,
          duration: 900,
        });
      });
    }, 1000);

    return () => window.clearTimeout(timeoutId);
  }, [
    formData,
    isLoadingApplication,
    isSubmitting,
    loadError,
    logout,
    questions,
    token,
  ]);

  async function submitApplication() {
    if (!token || isSubmitting) return;

    setIsSubmitting(true);
    toast.loading("Submitting application...", {
      id: AUTOSAVE_TOAST_ID,
      duration: Infinity,
    });

    try {
      await saveQueueRef.current;

      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const answerUpdates = serializeApplicationAnswers(formData, questions);
      const answersSnapshot = JSON.stringify(answerUpdates);
      const resume = formData.portfolio.resume;
      const saveRequests: Promise<Response>[] = [
        fetch(apiUrl("/api/forms/answers"), {
          method: "PUT",
          headers: {
            ...headers,
            "Content-Type": "application/json",
          },
          body: answersSnapshot,
        }),
      ];

      if (resume && resume !== lastUploadedResumeRef.current) {
        const body = new FormData();
        body.append("file", resume);
        saveRequests.push(
          fetch(apiUrl("/api/forms/resume"), {
            method: "POST",
            headers,
            body,
          }),
        );
      }

      const saveResponses = await Promise.all(saveRequests);
      if (
        saveResponses.some(
          (response) => response.status === 401 || response.status === 403,
        )
      ) {
        toast.dismiss(AUTOSAVE_TOAST_ID);
        logout();
        return;
      }
      if (saveResponses.some((response) => !response.ok)) {
        throw new Error("Unable to save application before submission");
      }

      lastSavedAnswersRef.current = answersSnapshot;
      if (resume) lastUploadedResumeRef.current = resume;

      const submissionResponse = await fetch(
        apiUrl("/api/forms/submission"),
        {
          method: "POST",
          headers,
        },
      );
      if (
        submissionResponse.status === 401 ||
        submissionResponse.status === 403
      ) {
        toast.dismiss(AUTOSAVE_TOAST_ID);
        logout();
        return;
      }
      if (!submissionResponse.ok) {
        throw new Error("Unable to submit application");
      }

      toast.success("Application submitted", {
        id: AUTOSAVE_TOAST_ID,
        duration: 700,
      });
      router.replace("/dashboard");
    } catch {
      toast.error("Submission failed. Please review your application.", {
        id: AUTOSAVE_TOAST_ID,
        duration: 2500,
      });
      setIsSubmitting(false);
    }
  }

  function handleNext() {
    const isRightValid = sectionRef.current?.validate() ?? true;
    const isLeftValid = leftId
      ? (leftSectionRef.current?.validate() ?? true)
      : true;
    if (!isRightValid || !isLeftValid) return;

    if (isLastStep) {
      void submitApplication();
      return;
    }

    const next = Math.min(stepIndex + 1, SECTIONS.length - 1);
    setStepIndex(next);
    setFurthestVisited((prev) => Math.max(prev, next));
  }

  function handleBack() {
    // Hook point for persisting formData[step.id] to the backend once one exists.
    setStepIndex((prev) => Math.max(prev - 1, 0));
  }

  function handleGroupClick(groupIndex: number) {
    if (groupIndex > furthestVisitedGroupIndex) return;
    setStepIndex(GROUP_START_STEP_INDEX[groupIndex]);
  }

  return (
    <AuthRouteGuard requireAuth>
      {isLoadingApplication ? (
        <main className="flex min-h-screen items-center justify-center bg-[#0a0324] font-figtree text-white">
          Loading your application...
        </main>
      ) : loadError ? (
        <main className="flex min-h-screen items-center justify-center bg-[#0a0324] px-6 text-center font-figtree text-white">
          {loadError}
        </main>
      ) : (
        <div className="relative flex min-h-screen flex-col items-center justify-center px-6 pb-10 font-figtree">
          <Background />

          <LogoNavbar />

      {/* Grid rows are auto-sized from the tallest cell in each row, so the
       * nav list (lg:h-full) and the book wrapper (lg:row-start-2) always end
       * up the same height without any manual measurement — the nav's
       * buttons then center as a group against that height. The first column
       * is "auto"-width so it sizes to the nav's widest button instead of a
       * fixed pixel value. */}
        <div className="grid w-full items-center gap-6 lg:grid-cols-[auto_minmax(0,1100px)] lg:grid-rows-[auto_auto] lg:justify-center lg:gap-x-16 lg:gap-y-6">
          <SectionNavbar
            groups={SECTION_GROUPS.map((g) => ({ id: g.id, label: g.label }))}
            currentGroupIndex={step.groupIndex}
            furthestVisitedGroupIndex={furthestVisitedGroupIndex}
            onGroupClick={handleGroupClick}
          />

        <ProgressBar
          className="lg:col-start-2 lg:row-start-1"
          groupStepCounts={groupStepCounts}
          currentGroupIndex={step.groupIndex}
          currentStepInGroup={step.stepIndexInGroup}
        />

        <div className="relative z-10 w-full max-w-[1100px] lg:col-start-2 lg:row-start-2">
          <BackgroundBook
            onBack={stepIndex > 0 ? handleBack : undefined}
            onNext={handleNext}
            nextDisabled={
              sectionHasErrors || leftSectionHasErrors || isSubmitting
            }
            nextLabel={
              isLastStep && isSubmitting
                ? "Submitting..."
                : isLastStep
                  ? "Submit"
                  : "Next"
            }
            left={
              leftId ? (
                <ActiveLeft
                  ref={leftSectionRef}
                  value={formData[leftId]}
                  onChange={(value: WizardFormData[typeof leftId]) =>
                    setFormData((prev) => ({ ...prev, [leftId]: value }))
                  }
                  onValidityChange={setLeftSectionHasErrors}
                  formData={formData}
                />
              ) : (
                <ActiveLeft>{step.title}</ActiveLeft>
              )
            }
            right={
              <ActiveRight
                ref={sectionRef}
                value={formData[step.id]}
                onChange={(value: WizardFormData[typeof step.id]) =>
                  setFormData((prev) => ({ ...prev, [step.id]: value }))
                }
                onValidityChange={setSectionHasErrors}
                formData={formData}
              />
            }
          />
        </div>
        </div>
      </div>
      )}
    </AuthRouteGuard>
  );
}
