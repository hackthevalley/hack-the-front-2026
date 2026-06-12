import Image from "next/image";
import Link from "next/link";
import MlhTrustBadge from "@/components/landing/MlhTrustBadge";
import IconLink from "@/components/ui/IconLink";
import MaskIcon from "@/components/ui/MaskIcon";

const SOCIAL_ICON_SIZE = 30;

const SOCIAL_LINKS = [
  {
    key: "instagram",
    label: "Instagram",
    href: "https://www.instagram.com/hackthevalley/",
    src: "/icons/instagram.svg",
    maskPosition: "center",
  },
  {
    key: "linkedin",
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/hack-the-valley/",
    src: "/icons/linkedin.svg",
    maskPosition: "center calc(50% + 4px)",
  },
  {
    key: "email",
    label: "Email us",
    href: "mailto:hello@hackthevalley.io",
    src: "/icons/email.svg",
    // Original asset has drop-shadow padding below the glyph — nudge mask down.
    maskPosition: "center calc(50% + 5px)",
  },
] as const;

type NavbarProps = {
  variant?: "default" | "overlay";
};

export default function Navbar({ variant = "default" }: NavbarProps) {
  const isOverlay = variant === "overlay";

  return (
    <header
      className={
        isOverlay
          ? "w-full"
          : "w-full border-b border-black/8 dark:border-white/10"
      }
    >
      {isOverlay && (
        <div className="fixed top-0 right-[50px] z-100">
          <MlhTrustBadge />
        </div>
      )}

      <nav
        className={`mx-auto flex w-full max-w-[1512px] items-center justify-between ${
          isOverlay
            ? "py-[clamp(24px,3.307vw,50px)] pl-[clamp(24px,7.937vw,120px)] pr-[max(clamp(24px,7.937vw,120px),calc(50px+clamp(60px,6.614vw,100px)+16px))] text-white"
            : "h-16 px-[clamp(24px,7.937vw,120px)] text-zinc-900 dark:text-zinc-50"
        }`}
      >
        <Link
          href="/"
          aria-label="Hack the Valley — home"
          className="sparkle-icon flex h-[47px] w-[45px] shrink-0 items-center justify-center"
        >
          <Image
            src="/icons/htv-logo.svg"
            alt=""
            width={45}
            height={47}
            className="block h-[47px] w-[45px] object-contain transition-opacity duration-150 hover:opacity-80"
          />
        </Link>

        <div
          className={`flex h-[47px] items-center gap-[clamp(16px,1.587vw,22px)] ${
            isOverlay ? "text-white" : "text-zinc-500 dark:text-zinc-400"
          }`}
        >
          {SOCIAL_LINKS.map(({ key, label, href, src, maskPosition }) => (
            <IconLink
              key={key}
              href={href}
              label={label}
              icon={
                <span className="flex size-[30px] items-center justify-center">
                  <MaskIcon
                    src={src}
                    width={SOCIAL_ICON_SIZE}
                    height={SOCIAL_ICON_SIZE}
                    maskPosition={maskPosition}
                    className={
                      isOverlay
                        ? "text-white transition-opacity duration-150 group-hover:opacity-80"
                        : "text-current transition-colors duration-150 group-hover:text-zinc-300"
                    }
                  />
                </span>
              }
            />
          ))}
        </div>
      </nav>
    </header>
  );
}
