import SponsorsBackground from "./background/SponsorsBackground";
import SponsorsPanels from "./SponsorsPanels";
import SponsorsTextOverlays from "./SponsorsTextOverlays";

export default function SponsorsPage() {
  return (
    <main aria-labelledby="sponsors-title">
      <SponsorsBackground>
        <SponsorsPanels />
        <SponsorsTextOverlays />
      </SponsorsBackground>
    </main>
  );
}
