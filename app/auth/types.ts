export type AuthView = "login" | "forgot-password";

export type AuthSectionProps = {
  onNavigate: (view: AuthView) => void;
};
