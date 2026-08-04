import Link from "next/link";
import NavbarLogo from "@/components/layout/NavbarLogo";

/**
 * Minimal top navbar with just the Hack the Valley logo in the top-left
 * corner. Used on pages like the application flow that don't need the
 * social links row from the full Navbar.
 */
type LogoNavbarProps = {
  className?: string;
  navClassName?: string;
};

export default function LogoNavbar({
  className = "",
  navClassName = "",
}: LogoNavbarProps) {
  return (
    <header className={`w-full ${className}`}>
      <nav
        className={`lg:mx-32 md:mx-16 mx-auto flex h-20 w-full max-w-5xl items-center px-6 ${navClassName}`}
      >
        <Link
          href="/"
          aria-label="Hack the Valley — home"
          className="inline-flex h-10 w-10 items-center justify-center sparkle-icon"
        >
          <NavbarLogo />
        </Link>
      </nav>
    </header>
  );
}
