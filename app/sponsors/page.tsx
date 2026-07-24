import SponsorsBackground from "./background/SponsorsBackground";
import SponsorsForeground from "./foreground/SponsorsForeground";
import SponsorsTextOverlays from "./SponsorsTextOverlays";

export default function SponsorsPage() {
  return (
    <main aria-labelledby="sponsors-title">
      <SponsorsBackground>
        <SponsorsForeground />
        <SponsorsTextOverlays />
      </SponsorsBackground>
    </main>
  );
}
