import Navbar from "@/components/layout/Navbar";
import CountdownTimer from "@/components/landing/CountdownTimer";
import LandingBackground from "./landing/background/LandingBackground";
import FooterTextLink from "@/components/ui/FooterTextLink";

const MLH_CODE_OF_CONDUCT_HREF =
  "https://github.com/MLH/mlh-policies/blob/main/code-of-conduct.md";

export default function Home() {
  return (
    <main
      className="relative flex min-h-screen w-full flex-col overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, #040142 15.36%, #C541E0 59.31%, #DF63DC 71.52%, #FFD668 95.53%)",
      }}
    >
      <LandingBackground />

      <div className="relative z-10 flex min-h-screen w-full flex-col items-center">
        <Navbar variant="overlay" />

        <section className="flex w-full max-w-[1512px] flex-1 flex-col items-center justify-center px-[clamp(24px,7.937vw,120px)]">
          <div className="flex w-full max-w-[800px] flex-col items-center text-center font-figtree text-white">
            <h1 className="w-full text-[clamp(40px,5.291vw,80px)] font-bold leading-[1.02] tracking-[-0.02em]">
              Hack the Valley 11
            </h1>

            <p className="mt-[clamp(16px,1.587vw,24px)] w-full text-[clamp(14px,1.323vw,20px)] font-medium leading-normal">
              October 16-18, 2026 • In-person event
            </p>

            <a
              href="https://forms.gle/ubFkgUa8S38XRcKo8"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-[clamp(24px,2.116vw,32px)] inline-flex items-center justify-center rounded-full bg-white px-[clamp(24px,2.646vw,32px)] py-[clamp(10px,0.926vw,14px)] text-[clamp(14px,1.058vw,16px)] font-medium leading-normal text-[#1a1033] transition-opacity hover:opacity-90"
            >
              Pre-Register for Hack the Valley
            </a>

            <div className="mt-[clamp(28px,3.307vw,50px)] w-full">
              <CountdownTimer />
            </div>
          </div>
        </section>

        <footer className="w-full max-w-[1512px] px-[clamp(24px,7.937vw,120px)] pb-[clamp(24px,4.786vw,48px)]">
          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-8">
            <FooterTextLink href="mailto:hello@hackthevalley.io?subject=Sponsorship%20Inquiry">
              Want to be a sponsor?
            </FooterTextLink>
            <FooterTextLink href={MLH_CODE_OF_CONDUCT_HREF} external>
              MLH Code-Of-Conduct
            </FooterTextLink>
          </div>
        </footer>
      </div>
    </main>
  );
}
