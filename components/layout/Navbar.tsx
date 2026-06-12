import Image from "next/image";
import Link from "next/link";
import MlhTrustBadge from "@/components/landing/MlhTrustBadge";
import IconLink from "@/components/ui/IconLink";
import MaskIcon from "@/components/ui/MaskIcon";

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
      className={`relative w-full self-stretch ${
        isOverlay ? "" : "border-b border-black/8 dark:border-white/10"
      }`}
    >
      <nav
        className={`flex w-full items-center justify-between px-4 ${
          isOverlay
            ? "py-4 text-white sm:py-[clamp(24px,3.307vw,50px)] sm:px-[clamp(24px,7.937vw,120px)]"
            : "h-14 text-zinc-900 sm:h-16 sm:px-[clamp(24px,7.937vw,120px)] dark:text-zinc-50"
        }`}
      >
        <Link
          href="/"
          aria-label="Hack the Valley — home"
          className="sparkle-icon flex h-9 w-[34px] shrink-0 items-center justify-center sm:h-[47px] sm:w-[45px]"
        >
          <Image
            src="/icons/htv-logo.svg"
            alt=""
            width={45}
            height={47}
            priority
            className="block h-9 w-[34px] object-contain transition-opacity duration-150 hover:opacity-80 sm:h-[47px] sm:w-[45px]"
          />
        </Link>

        <div
          className={`flex h-9 shrink-0 items-center gap-2 sm:h-[47px] sm:gap-[clamp(16px,1.587vw,22px)] ${
            isOverlay
              ? "mr-15 text-white sm:mr-[calc(clamp(60px,6.614vw,100px)+1rem)]"
              : "text-zinc-500 dark:text-zinc-400"
          }`}
        >
          {SOCIAL_LINKS.map(({ key, label, href, src, maskPosition }) => (
            <IconLink
              key={key}
              href={href}
              label={label}
              icon={
                <span className="flex size-6 items-center justify-center sm:size-[30px]">
                  <MaskIcon
                    src={src}
                    width={30}
                    height={30}
                    maskPosition={maskPosition}
                    className={`origin-center scale-[0.8] sm:scale-100 ${
                      isOverlay
                        ? "text-white transition-opacity duration-150 group-hover:opacity-80"
                        : "text-current transition-colors duration-150 group-hover:text-zinc-300"
                    }`}
                  />
                </span>
              }
            />
          ))}
        </div>
      </nav>

      {isOverlay && (
        <MlhTrustBadge className="absolute top-0 right-4 sm:right-[clamp(24px,7.937vw,120px)]" />
      )}
    </header>
  );
}
