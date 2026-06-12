import type { ReactNode } from "react";

type IconLinkProps = {
  icon: ReactNode;
  href: string;
  label: string;
  className?: string;
};

const BASE_CLASS =
  "sparkle-icon group inline-flex size-10 shrink-0 items-center justify-center rounded-lg text-current focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current sm:size-[47px]";

export default function IconLink({
  icon,
  href,
  label,
  className,
}: IconLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      title={label}
      className={[BASE_CLASS, className ?? ""].join(" ")}
    >
      {icon}
    </a>
  );
}
