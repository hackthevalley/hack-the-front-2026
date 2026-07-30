const FOOTER_LINKS = [
  {
    label: "hackthevalley on LinkedIn",
    href: "https://www.linkedin.com/company/hack-the-valley/",
    icon: "/icons/linkedin.svg",
    iconClassName: "h-[41px] w-[41px]",
  },
  {
    label: "hackthevalley on Instagram",
    href: "https://www.instagram.com/hackthevalley/",
    icon: "/icons/instagram.svg",
    iconClassName: "h-[41px] w-[41px]",
  },
  {
    label: "Email hackthevalley",
    href: "mailto:hello@hackthevalley.io",
    icon: "/icons/email.svg",
    iconClassName: "h-[41px] w-[41px]",
  },
] as const;

export default function SiteFooter() {
  return (
    <footer className="relative z-20 bg-[linear-gradient(180deg,#040815_0%,#303276_100%)] px-6 py-7 text-white md:h-[137px] md:py-0">
      <div className="mx-auto flex h-full max-w-[914px] flex-col items-center justify-center gap-6 md:gap-[18px]">
        <div className="flex w-full flex-col items-center justify-between gap-5 sm:flex-row sm:gap-10">
          {FOOTER_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target={link.href.startsWith("mailto:") ? undefined : "_blank"}
              rel={link.href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
              aria-label={link.label}
              className="flex items-center gap-[15px] whitespace-nowrap font-vcr text-xl text-white no-underline drop-shadow-[0_4px_4px_rgba(255,255,255,0.25)] transition-opacity hover:opacity-80 focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white md:text-2xl"
            >
              <img
                src={link.icon}
                alt=""
                aria-hidden="true"
                draggable="false"
                className={`${link.iconClassName} shrink-0 select-none object-contain`}
              />
              <span>hackthevalley</span>
            </a>
          ))}
        </div>

        <a
          href="https://mlh.io/code-of-conduct"
          target="_blank"
          rel="noopener noreferrer"
          className="font-figtree text-base font-medium text-white underline underline-offset-2 transition-opacity hover:opacity-80 focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
        >
          MLH Code of Conduct
        </a>
      </div>
    </footer>
  );
}
