import Link from "next/link";
import IconLink from "@/components/ui/IconLink";
import MaskIcon from "@/components/ui/MaskIcon";

/**
 * Social links shown on the right side of the navbar, in display order.
 * TODO: replace the placeholder `href` values with the real URLs.
 */
const SOCIAL_LINKS = [
  {
    key: "instagram",
    label: "Instagram",
    href: "https://www.instagram.com/hackthevalley/",
    src: "/icons/instagram.svg",
    width: 30,
    height: 30,
  },
  {
    key: "linkedin",
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/hack-the-valley/",
    src: "/icons/linkedin.svg",
    width: 25,
    height: 25,
  },
  {
    key: "email",
    label: "Email us",
    href: "mailto:hello@hackthevalley.io",
    src: "/icons/email.svg",
    width: 30,
    height: 30,
  },
  {
    key: "mlh",
    label: "mlh",
    href: "https://www.mlh.com/",
    src: "/icons/mlh-logo.svg",
    width: 72.0580062866211,
    height: 123.2548828125,
    preserveOriginal: true,
  },
] as const;

/**
 * Site navbar: the Hack the Valley logo on the left, social icons on the right.
 * Single-color icons use MaskIcon so they recolor with light/dark mode.
 */
export default function HomeNavbar() {
  return (
    <header className="h-[123.2548828125px] w-full">
      <nav className="mx-auto flex h-[123.2548828125px] w-full max-w-[1512px] items-center justify-between px-[clamp(24px,7.9365vw,120px)] text-zinc-900 dark:text-zinc-50">
        <Link
          href="/"
          aria-label="Hack the Valley — home"
          className="inline-flex sparkle-icon"
        >
          <MaskIcon
            src="/icons/htv-logo.svg"
            width={45}
            height={45}
            className="text-white transition-colors duration-150 hover:text-zinc-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current"
          />
        </Link>

        <div className="flex items-center gap-1 text-zinc-500 dark:text-zinc-400 sm:gap-5">
          {SOCIAL_LINKS.map((link) => {
            const icon =
              "preserveOriginal" in link && link.preserveOriginal ? (
                <img
                  src={link.src}
                  width={link.width}
                  height={link.height}
                  alt=""
                  aria-hidden="true"
                  className="inline-block shrink-0"
                />
              ) : (
                <MaskIcon
                  src={link.src}
                  width={link.width}
                  height={link.height}
                  className="text-white transition-colors duration-150 group-hover:text-zinc-300"
                />
              );

            return (
              <IconLink
                key={link.key}
                href={link.href}
                label={link.label}
                icon={icon}
              />
            );
          })}
        </div>
      </nav>
    </header>
  );
}
