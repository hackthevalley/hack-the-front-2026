import Link from "next/link";
import MaskIcon from "@/components/ui/MaskIcon";

export default function AuthNavbar() {
  return (
    <header className="h-[123.2548828125px] w-full">
      <nav className="mx-auto flex h-full w-full max-w-[1512px] items-center px-[clamp(24px,7.9365vw,120px)]">
        <Link
          href="/"
          aria-label="Hack the Valley — home"
          className="sparkle-icon inline-flex"
        >
          <MaskIcon
            src="/icons/htv-logo.svg"
            width={45}
            height={45}
            className="text-white transition-colors duration-150 hover:text-zinc-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current"
          />
        </Link>
      </nav>
    </header>
  );
}
