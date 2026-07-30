import HomeBackground from "./background/HomeBackground";
import HomeTextOverlays from "./HomeTextOverlays";
import HomeApplyButton from "./HomeApplyButton";

export default function DesktopHomeSection() {
  return (
    <section aria-labelledby="home-title" className="hidden md:block">
      <HomeBackground>
        <div className="pointer-events-none absolute left-0 top-0 z-[9] h-[10.87%] w-full bg-[rgba(14,22,72,0.35)] blur-[50px]" />

        <div
          className="absolute z-20 flex flex-col items-start"
          style={{
            left: "7.61%",
            top: "7.12%",
            width: "46.43%",
            height: "9.55%",
            containerType: "size",
          }}
        >
          <h1
            id="home-title"
            className="m-0 w-full font-figtree font-bold leading-[1.05] text-white"
            style={{
              fontSize: "11.4cqw",
              textShadow:
                "0 0 24px rgba(255, 140, 180, 0.55), 0 0 48px rgba(223, 99, 220, 0.35)",
            }}
          >
            Hack the Valley 11
          </h1>
          <p
            className="m-0 mt-[2.3cqh] w-full font-figtree font-medium leading-normal text-white"
            style={{
              fontSize: "2.85cqw",
              textShadow: "0 0 12px rgba(255, 140, 180, 0.35)",
            }}
          >
            October 16-18, 2026 • In-person event
          </p>
          <div id="apply" className="mt-auto" style={{ width: "29.34%" }}>
            <HomeApplyButton />
          </div>
        </div>

        <HomeTextOverlays />
      </HomeBackground>
    </section>
  );
}
