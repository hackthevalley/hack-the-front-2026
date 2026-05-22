import LandingBackground from "./landing/LandingBackground";

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
    </main>
  );
}
