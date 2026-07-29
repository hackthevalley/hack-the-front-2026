export type AuthView = "login" | "sign-up" | "forgot-password";

export type AuthSectionProps = {
  onNavigate: (view: AuthView) => void;
};
