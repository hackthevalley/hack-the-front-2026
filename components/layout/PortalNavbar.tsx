import Link from "next/link";
import NavbarLogo from "@/components/layout/NavbarLogo";

export default function PortalNavbar() {
  return (
    <header className="site-navbar pointer-events-auto h-[72px] w-full md:h-[123.2548828125px]">
      <nav className="site-navbar__inner mx-auto flex h-full w-full max-w-[1512px] items-center px-4 md:px-[clamp(24px,7.9365vw,120px)]">
        <Link
          href="/"
          aria-label="Hack the Valley — home"
          className="sparkle-icon inline-flex h-10 w-10 shrink-0 items-center justify-center md:h-[45px] md:w-[45px]"
        >
          <NavbarLogo />
        </Link>
      </nav>
    </header>
  );
}
