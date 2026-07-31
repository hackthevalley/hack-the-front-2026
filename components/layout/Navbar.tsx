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
    width: 32,
    height: 32,
  },
  {
    key: "linkedin",
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/hack-the-valley/",
    src: "/icons/linkedin.svg",
    width: 32,
    height: 32,
  },
  {
    key: "email",
    label: "Email us",
    href: "mailto:hello@hackthevalley.io",
    src: "/icons/email.svg",
    width: 36,
    height: 36,
  },
] as const;

const HTV_2025_HREF = "https://hackthevalley.io/";

/**
 * Site navbar: the Hack the Valley logo on the left, social icons on the right.
 * Social icons use MaskIcon so they can recolor with light/dark mode.
 */
export default function Navbar() {
  return (
    <header className="w-full border-b border-black/8 dark:border-white/10">
      <nav className="mx-auto flex w-full max-w-5xl items-center justify-between px-6 h-16 text-zinc-900 dark:text-zinc-50">
        <Link
          href="/"
          aria-label="Hack the Valley — home"
          className="inline-flex sparkle-icon"
        >
          <img
            src="/icons/htv-logo.svg"
            width={45}
            height={45}
            alt=""
            aria-hidden="true"
            className="block shrink-0 transition-opacity duration-150 hover:opacity-80"
          />
        </Link>

        <div className="flex items-center gap-1 text-zinc-500 dark:text-zinc-400 sm:gap-5">
          {SOCIAL_LINKS.map(({ key, label, href, src, width, height }) => (
            <IconLink
              key={key}
              href={href}
              label={label}
              icon={
                <MaskIcon
                  src={src}
                  width={width}
                  height={height}
                  className="text-white transition-colors duration-150 group-hover:text-zinc-300"
                />
              }
            />
          ))}
          <a
            href={HTV_2025_HREF}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Hack the Valley 2025"
            className="sparkle-icon inline-flex items-center px-2 h-10 text-white font-vcr text-2xl tracking-wide transition-colors duration-150 hover:text-zinc-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current"
          >
            2025
          </a>
        </div>
      </nav>
    </header>
  );
}
