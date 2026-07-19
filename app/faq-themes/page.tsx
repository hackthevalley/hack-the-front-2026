import FaqThemesTextOverlays from "./FaqThemesTextOverlays";
import FaqThemesBackground from "./background/FaqThemesBackground";

export default function FaqThemesPage() {
  return (
    <main className="min-h-screen min-w-[1512px] overflow-x-auto bg-[#030712]">
      <div className="mx-auto w-[1512px]">
        <FaqThemesBackground>
          <FaqThemesTextOverlays />
        </FaqThemesBackground>
      </div>
    </main>
  );
}
