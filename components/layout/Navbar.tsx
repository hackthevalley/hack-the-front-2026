import Image from 'next/image';
import Link from 'next/link';
import IconLink from '@/components/ui/IconLink';

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
 */
export default function Navbar() {
  return (
    <header className="w-full border-b border-black/8 dark:border-white/10">
      <nav className="mx-auto flex w-full max-w-5xl items-center justify-between px-6 py-4">
        <Link href="/" aria-label="Hack the Valley — home" className="inline-flex">
          <Image
            src="/icons/htv-logo.svg"
            alt="Hack the Valley logo"
            width={36}
            height={37}
            priority
          />
        </Link>

        <div className="flex items-center gap-1 sm:gap-2">
          {SOCIAL_LINKS.map(({ key, label, href, src, width, height }) => (
            <IconLink
              key={key}
              href={href}
              label={label}
              icon={<Image src={src} alt="" width={width} height={height} />}
            />
          ))}
        </div>
      </nav>
    </header>
  );
}
