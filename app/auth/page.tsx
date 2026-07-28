import HomeNavbar from "@/components/layout/HomeNavbar";
import AuthTextOverlays from "./AuthTextOverlays";
import AuthBackground from "./background/AuthBackground";

export default function AuthPage() {
  return (
    <main>
      <AuthBackground>
        <HomeNavbar showSocialLinks={false} />
        <AuthTextOverlays />
      </AuthBackground>
    </main>
  );
}
