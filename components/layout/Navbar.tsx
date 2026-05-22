import Link from 'next/link';
import IconLink from '@/components/ui/IconLink';
import MaskIcon from '@/components/ui/MaskIcon';

/**
 * Social links shown on the right side of the navbar, in display order.
 * TODO: replace the placeholder `href` values with the real URLs.
 */
const SOCIAL_LINKS = [
  {
    key: 'instagram',
    label: 'Instagram',
    href: 'https://www.instagram.com/hackthevalley/',
    src: '/icons/instagram.svg',
    width: 24,
    height: 24,
  },
  {
    key: 'linkedin',
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/company/hack-the-valley/',
    src: '/icons/linkedin.svg',
    width: 24,
    height: 24,
  },
  {
    key: 'email',
    label: 'Email us',
    href: 'mailto:hello@hackthevalley.io',
    src: '/icons/email.svg',
    width: 24,
    height: 24,
  },
  {
    key: '2025',
    label: 'Hack the Valley 2025',
    href: 'https://hackthevalley.io/',
    src: '/icons/2025.svg',
    width: 60,
    height: 18,
  },
] as const;

/**
 * Site navbar: the Hack the Valley logo on the left, social icons on the right.
 * All icons are rendered via MaskIcon, so they recolor with light/dark mode.
 */
export default function Navbar() {
  return (
    <header className="w-full border-b border-black/8 dark:border-white/10">
      <nav className="mx-auto flex w-full max-w-5xl items-center justify-between px-6 py-4 text-zinc-900 dark:text-zinc-50">
        <Link href="/" aria-label="Hack the Valley — home" className="inline-flex">
          <MaskIcon src="/icons/htv-logo.svg" width={36} height={37} className="text-white" />
        </Link>

        <div className="flex items-center gap-1 text-zinc-500 dark:text-zinc-400 sm:gap-2">
          {SOCIAL_LINKS.map(({ key, label, href, src, width, height }) => (
            <IconLink
              key={key}
              href={href}
              label={label}
              icon={<MaskIcon src={src} width={width} height={height} className="text-white" />}
            />
          ))}
        </div>
      </nav>
    </header>
  );
}
