import AuthFlow from "./AuthFlow";
import type { AuthView } from "./types";

type AuthPageProps = {
  searchParams: Promise<{ view?: string | string[] }>;
};

function getInitialView(view: string | string[] | undefined): AuthView {
  return view === "forgot-password" ? "forgot-password" : "login";
}

export default async function AuthPage({ searchParams }: AuthPageProps) {
  const { view } = await searchParams;

  return <AuthFlow initialView={getInitialView(view)} />;
}
