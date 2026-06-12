import type { ReactNode } from 'react';

type IconLinkProps = {
  /** The icon to render inside the button — any JSX/SVG/icon element. */
  icon: ReactNode;
  href: string;
  label: string;
  className?: string;
};

/**
 * A clickable icon that opens a link in a new browser tab.
 */
export default function IconLink({ icon, href, label, className }: IconLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      title={label}
      className={[
        'sparkle-icon',
        'group',
        'inline-flex size-[47px] shrink-0 items-center justify-center',
        'rounded-lg',
        'text-current',
        'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current',
        className ?? '',
      ].join(' ')}
    >
      {icon}
    </a>
  );
}
