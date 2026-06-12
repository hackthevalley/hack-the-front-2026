import Navbar from "@/components/layout/Navbar";
import CountdownTimer from "@/components/landing/CountdownTimer";
import LandingBackground from "./landing/background/LandingBackground";
import FooterTextLink from "@/components/ui/FooterTextLink";

const MLH_CODE_OF_CONDUCT_HREF =
  "https://github.com/MLH/mlh-policies/blob/main/code-of-conduct.md";

export default function Home() {
  return (
    <main
      className="relative flex min-h-dvh w-full flex-col overflow-x-hidden"
      style={{
        background:
          "linear-gradient(180deg, #040142 15.36%, #C541E0 59.31%, #DF63DC 71.52%, #FFD668 95.53%)",
      }}
    >
      <LandingBackground />

      <div className="relative z-10 flex min-h-dvh w-full flex-col">
        <Navbar variant="overlay" />

        <section className="mx-auto flex w-full max-w-[1512px] flex-1 flex-col items-center justify-center px-4 py-8 sm:px-[clamp(24px,7.937vw,120px)] sm:py-0">
          <div className="flex w-full max-w-[800px] flex-col items-center text-center font-figtree text-white">
            <h1 className="w-full text-balance text-[clamp(2rem,5.291vw,5rem)] font-bold leading-[1.02] tracking-[-0.02em]">
              Hack the Valley 11
            </h1>

            <p className="mt-4 w-full text-balance text-[clamp(0.875rem,1.323vw,1.25rem)] font-medium leading-normal sm:mt-[clamp(16px,1.587vw,24px)]">
              October 16-18, 2026 • In-person event
            </p>

            <a
              href="https://forms.gle/ubFkgUa8S38XRcKo8"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex max-w-full items-center justify-center rounded-full bg-white px-6 py-2.5 text-center text-[clamp(0.875rem,1.058vw,1rem)] font-medium leading-normal text-[#1a1033] transition-opacity hover:opacity-90 sm:mt-[clamp(24px,2.116vw,32px)] sm:px-[clamp(24px,2.646vw,32px)] sm:py-[clamp(10px,0.926vw,14px)]"
            >
              Pre-Register for Hack the Valley
            </a>

            <div className="mt-8 w-full max-w-full sm:mt-[clamp(28px,3.307vw,50px)]">
              <CountdownTimer />
            </div>
          </div>
        </section>

        <footer className="mx-auto w-full max-w-[1512px] px-4 pb-[max(1.5rem,env(safe-area-inset-bottom))] sm:px-[clamp(24px,7.937vw,120px)] sm:pb-[clamp(24px,4.786vw,48px)]">
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
