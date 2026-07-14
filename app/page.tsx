import HomeNavbar from "@/components/layout/HomeNavbar";
import HomeBackground from "./home/background/HomeBackground";

export default function Home() {
  return (
    <main className="relative w-full overflow-x-hidden bg-[#040142]">
      <section className="sr-only" aria-labelledby="home-title">
        <h1 id="home-title">Hack the Valley 11</h1>
        <p>October 16-18, 2026. In-person event.</p>
        <h2>About Us</h2>
        <p>
          Join 750 innovative and creative developers, designers, and creators
          for 36 hours of hacking. You&apos;ll get access to some of the best
          hardware and APIs on the market. Plus, you get to meet some
          experienced and awesome mentors!
        </p>
        <p>Hosted at UofT Scarborough.</p>
      </section>

      <HomeBackground>
        <div className="pointer-events-none absolute left-0 top-0 z-[9] h-[10.87%] w-full bg-[rgba(14,22,72,0.35)] blur-[50px]" />

        <div className="absolute left-0 top-0 z-20 w-full">
          <HomeNavbar />
        </div>

        <a
          id="apply"
          href="#apply"
          aria-label="Apply now"
          className="absolute z-20 rounded-full focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
          style={{
            left: "7.61%",
            top: "14.02%",
            width: "13.62%",
            height: "2.65%",
          }}
        />
      </HomeBackground>
    </main>
  );
}
