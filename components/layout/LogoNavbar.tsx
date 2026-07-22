import Link from "next/link";
import MaskIcon from "@/components/ui/MaskIcon";

/**
 * Minimal top navbar with just the Hack the Valley logo in the top-left
 * corner. Used on pages like the application flow that don't need the
 * social links row from the full Navbar.
 */
export default function LogoNavbar() {
  return (
    <header className="w-full">
      <nav className="lg:mx-32 md:mx-16 mx-auto flex w-full max-w-5xl items-center px-6 h-20">
        <Link
          href="/"
          aria-label="Hack the Valley — home"
          className="inline-flex sparkle-icon"
        >
          <MaskIcon
            src="/icons/htv-logo.svg"
            width={40}
            height={40}
            className="text-white transition-colors duration-150 hover:text-zinc-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current"
          />
        </Link>
      </nav>
    </header>
  );
}
