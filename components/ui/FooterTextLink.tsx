import type { ReactNode } from "react";

type FooterTextLinkProps = {
  href: string;
  children: ReactNode;
  external?: boolean;
};

const FOOTER_LINK_CLASS =
  "font-figtree text-[clamp(12px,1.058vw,16px)] font-normal leading-normal text-white transition-opacity hover:opacity-80";

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
      {children} ↗
    </a>
  );
}
