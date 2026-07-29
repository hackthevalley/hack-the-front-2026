import AuthFlow from "./AuthFlow";
import type { AuthView } from "./types";

type AuthPageProps = {
  searchParams: Promise<{ view?: string | string[] }>;
};

function getInitialView(view: string | string[] | undefined): AuthView {
  if (view === "sign-up" || view === "forgot-password") {
    return view;
  }

  return "login";
}

export default async function AuthPage({ searchParams }: AuthPageProps) {
  const { view } = await searchParams;
  const initialView = getInitialView(view);

  return <AuthFlow key={initialView} initialView={initialView} />;
}
