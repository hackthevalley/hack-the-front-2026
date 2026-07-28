import HomeNavbar from "@/components/layout/HomeNavbar";
import AuthBackground from "./background/AuthBackground";

export default function AuthPage() {
  return (
    <main>
      <AuthBackground>
        <HomeNavbar showSocialLinks={false} />
      </AuthBackground>
    </main>
  );
}
