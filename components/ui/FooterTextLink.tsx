import type { ReactNode } from "react";

type FooterTextLinkProps = {
  href: string;
  children: ReactNode;
  external?: boolean;
};

const FOOTER_LINK_CLASS =
  "inline-flex items-center gap-1 font-figtree text-[clamp(12px,1.058vw,16px)] font-normal leading-normal text-white transition-opacity hover:opacity-80";

function ExternalArrowIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 12 12"
      className="size-3 shrink-0"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3.25 8.75L8.75 3.25M8.75 3.25H4M8.75 3.25V7.5"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function FooterTextLink({
  href,
  children,
  external = false,
}: FooterTextLinkProps) {
  return (
    <a
      href={href}
      className={FOOTER_LINK_CLASS}
      {...(external
        ? { target: "_blank", rel: "noopener noreferrer" }
        : {})}
    >
      <span>{children}</span>
      <ExternalArrowIcon />
    </a>
  );
}
