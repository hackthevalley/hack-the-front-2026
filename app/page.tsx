import LandingBackground from "./landing/background/LandingBackground";
import NewsletterSignUp from "@/components/ui/NewsletterSignUp";

export default function Home() {
  return (
    <main
      className="relative min-h-screen w-full overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, #040142 15.36%, #C541E0 59.31%, #DF63DC 71.52%, #FFD668 95.53%)",
      }}
    >
      <LandingBackground />

      <section className="relative w-full min-h-screen">
        <div className="absolute left-1/2 top-[46.9%] -translate-x-1/2">
          <NewsletterSignUp />
        </div>
      </section>
    </main>
  );
}
