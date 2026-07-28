import HomeNavbar from "@/components/layout/HomeNavbar";
import AuthBackButton from "./AuthBackButton";
import AuthTextOverlays from "./AuthTextOverlays";
import AuthBackground from "./background/AuthBackground";

export default function AuthPage() {
  return (
    <main>
      <AuthBackground>
        <HomeNavbar showSocialLinks={false} />
        <AuthBackButton />
        <AuthTextOverlays />
      </AuthBackground>
    </main>
  );
}
