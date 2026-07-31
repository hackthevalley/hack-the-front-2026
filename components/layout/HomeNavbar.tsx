"use client";

import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

export type HomeNavItem = {
  key: string;
  label: string;
  targetId: string;
  offsetRatio?: number;
};

const DEFAULT_ITEMS: readonly HomeNavItem[] = [
  { key: "about", label: "About", targetId: "about", offsetRatio: 0.18 },
  { key: "faq", label: "FAQ", targetId: "faq", offsetRatio: 0.08 },
  { key: "themes", label: "Themes", targetId: "themes", offsetRatio: 0.16 },
  {
    key: "sponsors",
    label: "Sponsors",
    targetId: "sponsors",
    offsetRatio: 0.08,
  },
  { key: "team", label: "Team", targetId: "team", offsetRatio: 0.08 },
];

const DESKTOP_NAVBAR_HEIGHT = 123.2548828125;
const MOBILE_NAVBAR_HEIGHT = 72;
const REVEAL_SCROLL_DELTA = 28;
const HIDE_SCROLL_DELTA = 20;
const SCROLL_EPSILON = 2;
const SHELL_BLEND_DISTANCE = 280;
const MAX_SHELL_INSET = 16;
const MAX_SHELL_RADIUS = 28;
const MAX_SHELL_ALPHA = 0.72;
const MAX_SHELL_BLUR = 10;
const MAX_SHADOW_ALPHA = 0.22;
const MOBILE_SHELL_RADIUS = 14;
const MOBILE_SHELL_SIDE_PADDING = 4;
const MOBILE_SHELL_TOP_PADDING = 6;

type HomeNavbarProps = {
  items?: readonly HomeNavItem[];
};

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

function MlhTrustBadge({ fixed = false }: { fixed?: boolean }) {
  return (
    <a
      id={fixed ? "mlh-trust-badge" : undefined}
      href="https://mlh.io/na?utm_source=na-hackathon&utm_medium=TrustBadge&utm_campaign=2026-season&utm_content=white"
      target="_blank"
      rel="noopener noreferrer"
      className={fixed ? "fixed top-0 z-[10000] hidden md:block" : "block"}
      style={{
        maxWidth: 100,
        minWidth: 60,
        right: fixed ? "clamp(24px, 7.9365vw, 120px)" : undefined,
        width: 72.0580062866211,
      }}
    >
      <img
        src="https://logged-assets.s3.amazonaws.com/trust-badge/2027/mlh-trust-badge-2027-white.svg"
        alt="Major League Hacking 2026 Hackathon Season"
        className="block w-full"
      />
    </a>
  );
}

function SectionLinks({
  items,
  onSectionClick,
  className = "",
  itemClassName = "",
}: {
  items: readonly HomeNavItem[];
  onSectionClick: (item: HomeNavItem) => void;
  className?: string;
  itemClassName?: string;
}) {
  return (
    <div className={className}>
      {items.map((item) => (
        <button
          key={item.key}
          type="button"
          onClick={() => onSectionClick(item)}
          className={[
            "home-nav-section-link cursor-pointer border-0 bg-transparent p-0",
            itemClassName,
          ].join(" ")}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}

function MenuButton({
  isOpen,
  onClick,
}: {
  isOpen: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
      aria-expanded={isOpen}
      aria-controls="mobile-nav-overlay"
      className="group inline-flex h-10 w-10 items-center justify-center text-white transition-opacity duration-200 hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white md:hidden"
    >
      <span className="relative block h-4 w-5">
        <span
          className={[
            "absolute left-1/2 top-1/2 h-0.5 w-5 -translate-x-1/2 bg-current transition-transform duration-200",
            isOpen ? "translate-y-0 rotate-45" : "-translate-y-[6px]",
          ].join(" ")}
        />
        <span
          className={[
            "absolute left-1/2 top-1/2 h-0.5 w-5 -translate-x-1/2 bg-current transition-opacity duration-200",
            isOpen ? "opacity-0" : "opacity-100",
          ].join(" ")}
        />
        <span
          className={[
            "absolute left-1/2 top-1/2 h-0.5 w-5 -translate-x-1/2 bg-current transition-transform duration-200",
            isOpen ? "translate-y-0 -rotate-45" : "translate-y-[6px]",
          ].join(" ")}
        />
      </span>
    </button>
  );
}

function LogoButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Hack the Valley home"
      className="inline-flex h-10 w-10 shrink-0 items-center justify-center sparkle-icon md:h-[45px] md:w-[45px]"
    >
      <img
        src="/icons/htv-logo.svg"
        width={45}
        height={45}
        alt=""
        aria-hidden="true"
        className="block shrink-0 transition-opacity duration-150 hover:opacity-80"
      />
    </button>
  );
}

function NavBarFrame({
  items,
  isMenuOpen,
  onMenuToggle,
  onSectionClick,
  onLogoClick,
}: {
  items: readonly HomeNavItem[];
  isMenuOpen: boolean;
  onMenuToggle: () => void;
  onSectionClick: (item: HomeNavItem) => void;
  onLogoClick: () => void;
}) {
  return (
    <nav className="mx-auto flex h-[72px] w-full max-w-[1512px] items-center justify-between gap-4 px-4 text-white md:h-[123.2548828125px] md:gap-6 md:px-[clamp(24px,7.9365vw,120px)]">
      <LogoButton onClick={onLogoClick} />

      <SectionLinks
        items={items}
        onSectionClick={onSectionClick}
        className="mr-[112.058px] hidden shrink-0 items-center gap-10 md:flex"
        itemClassName="font-inter text-sm font-semibold text-white"
      />

      <MenuButton isOpen={isMenuOpen} onClick={onMenuToggle} />
    </nav>
  );
}

function MobileMenuOverlay({
  isOpen,
  items,
  onSectionClick,
}: {
  isOpen: boolean;
  items: readonly HomeNavItem[];
  onSectionClick: (item: HomeNavItem) => void;
}) {
  return (
    <div
      id="mobile-nav-overlay"
      aria-hidden={!isOpen}
      className={[
        "fixed inset-0 z-[70] md:hidden",
        "transition-[opacity,visibility] duration-300 ease-out",
        isOpen ? "visible opacity-100" : "invisible opacity-0",
      ].join(" ")}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(223,99,220,0.24),_transparent_30%),linear-gradient(180deg,rgba(4,7,30,0.997),rgba(15,27,96,0.988))]" />

      <div className="absolute inset-0 overflow-y-auto px-8 pb-10 pt-32">
        <div className="flex min-h-full flex-col items-center">
          <SectionLinks
            items={items}
            onSectionClick={onSectionClick}
            className="flex flex-1 flex-col items-center justify-center gap-8 text-center"
            itemClassName="font-figtree text-[clamp(2rem,8vw,3.25rem)] font-semibold leading-none tracking-[-0.03em] text-white"
          />

          <div className="mb-4 mt-12 h-px w-24 bg-white/12" />

          <MlhTrustBadge />
        </div>
      </div>
    </div>
  );
}

function NavContents({
  items,
  isMenuOpen,
  onMenuToggle,
  onSectionClick,
  onLogoClick,
}: {
  items: readonly HomeNavItem[];
  isMenuOpen: boolean;
  onMenuToggle: () => void;
  onSectionClick: (item: HomeNavItem) => void;
  onLogoClick: () => void;
}) {
  return (
    <NavBarFrame
      items={items}
      isMenuOpen={isMenuOpen}
      onMenuToggle={onMenuToggle}
      onSectionClick={onSectionClick}
      onLogoClick={onLogoClick}
    />
  );
}

function Shell({
  children,
  shellProgress,
}: {
  children: ReactNode;
  shellProgress: number;
}) {
  const shellInset = MAX_SHELL_INSET * shellProgress;
  const shellRadius = MAX_SHELL_RADIUS * shellProgress;
  const shellAlpha = MAX_SHELL_ALPHA * shellProgress;
  const shellBlur = MAX_SHELL_BLUR * shellProgress;
  const shellShadowAlpha = MAX_SHADOW_ALPHA * shellProgress;
  const shellTopPadding = MOBILE_SHELL_TOP_PADDING * shellProgress;
  const shellSidePadding = MOBILE_SHELL_SIDE_PADDING * shellProgress;
  const shellBorderAlpha = 0.12 * shellProgress;
  const shellOutsetX = shellSidePadding + shellInset;
  const shellOutsetY = shellTopPadding + shellInset;
  const shellBottomOutset = shellOutsetY * 0.16;
  const shellRadiusValue = MOBILE_SHELL_RADIUS * shellProgress + shellRadius;

  return (
    <div className="relative mx-auto max-w-[1512px]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute overflow-hidden transition-[inset,border-radius,box-shadow,backdrop-filter,background] duration-300 ease-out"
        style={{
          left: `${-shellOutsetX}px`,
          right: `${-shellOutsetX}px`,
          top: `${-shellOutsetY}px`,
          bottom: `${-shellBottomOutset}px`,
          borderRadius: `${shellRadiusValue}px`,
          background: `linear-gradient(180deg, rgba(17, 28, 99, ${shellAlpha}) 0%, rgba(17, 28, 99, ${shellAlpha * 0.98}) 48%, rgba(17, 28, 99, ${shellAlpha * 0.82}) 72%, rgba(17, 28, 99, ${shellAlpha * 0.42}) 90%, rgba(17, 28, 99, 0) 100%)`,
          boxShadow:
            shellShadowAlpha > 0
              ? `0 18px 40px rgba(0, 0, 0, ${shellShadowAlpha})`
              : "none",
          backdropFilter: `blur(${shellBlur}px)`,
          WebkitBackdropFilter: `blur(${shellBlur}px)`,
          maskImage:
            "linear-gradient(180deg, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 52%, rgba(0,0,0,.96) 64%, rgba(0,0,0,.88) 74%, rgba(0,0,0,.72) 82%, rgba(0,0,0,.48) 89%, rgba(0,0,0,.22) 95%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(180deg, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 52%, rgba(0,0,0,.96) 64%, rgba(0,0,0,.88) 74%, rgba(0,0,0,.72) 82%, rgba(0,0,0,.48) 89%, rgba(0,0,0,.22) 95%, transparent 100%)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute overflow-hidden transition-[inset,border-radius,opacity] duration-300 ease-out"
        style={{
          left: `${-shellOutsetX}px`,
          right: `${-shellOutsetX}px`,
          top: `${-shellOutsetY}px`,
          bottom: `${-shellBottomOutset}px`,
          borderRadius: `${shellRadiusValue}px`,
          opacity: shellProgress,
          background: `linear-gradient(180deg, rgba(255, 255, 255, ${shellBorderAlpha}) 0%, rgba(255, 255, 255, ${shellBorderAlpha * 0.4}) 10%, rgba(255, 255, 255, ${shellBorderAlpha * 0.12}) 18%, transparent 28%)`,
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}

/**
 * Single homepage navbar that hides on downward scroll, reappears on upward
 * scroll, and gradually gains a floating shell as the page moves away from the
 * hero's top edge.
 */
export default function HomeNavbar({ items = DEFAULT_ITEMS }: HomeNavbarProps) {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const lastScrollYRef = useRef(0);
  const upwardTravelRef = useRef(0);
  const downwardTravelRef = useRef(0);

  useEffect(() => {
    router.prefetch("/login");
  }, [router]);

  useEffect(() => {
    lastScrollYRef.current = window.scrollY;
    setScrollY(window.scrollY);

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const deltaY = currentScrollY - lastScrollYRef.current;

      setScrollY(currentScrollY);

      if (isMenuOpen) {
        setIsVisible(true);
        upwardTravelRef.current = 0;
        downwardTravelRef.current = 0;
        lastScrollYRef.current = currentScrollY;
        return;
      }

      if (currentScrollY <= SCROLL_EPSILON) {
        setIsVisible(true);
        upwardTravelRef.current = 0;
        downwardTravelRef.current = 0;
        lastScrollYRef.current = currentScrollY;
        return;
      }

      if (
        lastScrollYRef.current <= SCROLL_EPSILON &&
        deltaY >= SCROLL_EPSILON
      ) {
        setIsVisible(false);
        upwardTravelRef.current = 0;
        downwardTravelRef.current = 0;
        lastScrollYRef.current = currentScrollY;
        return;
      }

      if (deltaY <= -SCROLL_EPSILON) {
        upwardTravelRef.current += Math.abs(deltaY);
        downwardTravelRef.current = 0;

        if (upwardTravelRef.current >= REVEAL_SCROLL_DELTA) {
          setIsVisible(true);
        }
      } else if (deltaY >= SCROLL_EPSILON) {
        downwardTravelRef.current += deltaY;
        upwardTravelRef.current = 0;

        if (downwardTravelRef.current >= HIDE_SCROLL_DELTA) {
          setIsVisible(false);
        }
      }

      lastScrollYRef.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMenuOpen]);

  useEffect(() => {
    if (!isMenuOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    const previousTouchAction = document.body.style.touchAction;

    document.body.style.overflow = "hidden";
    document.body.style.touchAction = "none";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.body.style.touchAction = previousTouchAction;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMenuOpen]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 768px)");

    const handleDesktopMatch = (event: MediaQueryListEvent) => {
      if (event.matches) {
        setIsMenuOpen(false);
      }
    };

    mediaQuery.addEventListener("change", handleDesktopMatch);
    return () => mediaQuery.removeEventListener("change", handleDesktopMatch);
  }, []);

  const resolveTargetElement = (targetId: string) => {
    const exactMatch = document.getElementById(targetId);

    if (exactMatch && exactMatch.getClientRects().length > 0) {
      return exactMatch;
    }

    const dataTargetMatches = Array.from(
      document.querySelectorAll<HTMLElement>(`[data-nav-target="${targetId}"]`),
    );

    return (
      dataTargetMatches.find(
        (element) => element.getClientRects().length > 0,
      ) ?? exactMatch
    );
  };

  const handleSectionClick = (item: HomeNavItem) => {
    const target = resolveTargetElement(item.targetId);
    if (!target) return;

    const offset = window.innerHeight * (item.offsetRatio ?? 0.12);
    const targetTop =
      window.scrollY + target.getBoundingClientRect().top - offset;

    window.scrollTo({
      top: Math.max(0, targetTop),
      behavior: "smooth",
    });

    window.history.replaceState(null, "", `#${item.targetId}`);
  };

  const handleOverlaySectionClick = (item: HomeNavItem) => {
    setIsMenuOpen(false);
    handleSectionClick(item);
  };

  const handleLogoClick = () => {
    setIsMenuOpen(false);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    window.history.replaceState(null, "", window.location.pathname);
  };

  const shellProgress = clamp(scrollY / SHELL_BLEND_DISTANCE, 0, 1);
  const translateY = isVisible
    ? 0
    : -(Math.max(MOBILE_NAVBAR_HEIGHT, DESKTOP_NAVBAR_HEIGHT) + 24);

  return (
    <>
      <header
        className="fixed inset-x-0 top-0 z-[80] w-full transition-transform duration-300 ease-out"
        style={{ transform: `translateY(${translateY}px)` }}
      >
        <MlhTrustBadge fixed />

        <Shell shellProgress={isMenuOpen ? 0 : shellProgress}>
          <NavContents
            items={items}
            isMenuOpen={isMenuOpen}
            onMenuToggle={() => setIsMenuOpen((current) => !current)}
            onSectionClick={handleSectionClick}
            onLogoClick={handleLogoClick}
          />
        </Shell>
      </header>

      <MobileMenuOverlay
        isOpen={isMenuOpen}
        items={items}
        onSectionClick={handleOverlaySectionClick}
      />
    </>
  );
}
