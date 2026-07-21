import FaqThemesTextOverlays from "./FaqThemesTextOverlays";
import FaqThemesBackground from "./background/FaqThemesBackground";

export default function FaqThemesPage() {
  return (
    <main className="min-h-screen bg-[#030712]">
      <FaqThemesBackground>
        <FaqThemesTextOverlays />
      </FaqThemesBackground>
    </main>
  );
}
