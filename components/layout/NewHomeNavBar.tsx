"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import IconLink from "@/components/ui/IconLink";
import MaskIcon from "@/components/ui/MaskIcon";

export type NewHomeNavItem = {
  key: string;
  label: string;
  targetId: string;
  offsetRatio?: number;
};

const DEFAULT_ITEMS: readonly NewHomeNavItem[] = [
  { key: "about", label: "About", targetId: "about", offsetRatio: 0.18 },
  { key: "faq", label: "FAQ", targetId: "faq", offsetRatio: 0.08 },
  { key: "themes", label: "Themes", targetId: "themes", offsetRatio: 0.16 },
];

const NAVBAR_HEIGHT = 123.2548828125;
const REVEAL_SCROLL_DELTA = 28;
const HIDE_SCROLL_DELTA = 20;
const SCROLL_EPSILON = 2;
const SHELL_BLEND_DISTANCE = 180;
const MAX_SHELL_INSET = 16;
const MAX_SHELL_RADIUS = 28;
const MAX_SHELL_ALPHA = 0.72;
const MAX_SHELL_BLUR = 10;
const MAX_SHADOW_ALPHA = 0.22;

const SOCIAL_LINKS = [
  {
    key: "instagram",
    label: "Instagram",
    href: "https://www.instagram.com/hackthevalley/",
    src: "/icons/instagram.svg",
    width: 30,
    height: 30,
  },
  {
    key: "linkedin",
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/hack-the-valley/",
    src: "/icons/linkedin.svg",
    width: 25,
    height: 25,
  },
  {
    key: "email",
    label: "Email us",
    href: "mailto:hello@hackthevalley.io",
    src: "/icons/email.svg",
    width: 30,
    height: 30,
  },
  {
    key: "mlh",
    label: "MLH",
    href: "https://www.mlh.com/",
    src: "/icons/mlh-logo.svg",
    width: 72.0580062866211,
    height: 123.2548828125,
    preserveOriginal: true,
  },
] as const;

type NewHomeNavBarProps = {
  items?: readonly NewHomeNavItem[];
};

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

function NavContents({
  items,
  onSectionClick,
}: {
  items: readonly NewHomeNavItem[];
  onSectionClick: (item: NewHomeNavItem) => void;
}) {
  return (
    <nav className="mx-auto flex h-[123.2548828125px] w-full max-w-[1512px] items-center justify-between gap-6 px-[clamp(24px,7.9365vw,120px)] text-white">
      <div className="flex min-w-0 items-center gap-[clamp(18px,2.8vw,44px)]">
        <Link
          href="/"
          aria-label="Hack the Valley home"
          className="inline-flex shrink-0 sparkle-icon"
        >
          <MaskIcon
            src="/icons/htv-logo.svg"
            width={45}
            height={45}
            className="text-white transition-colors duration-150 hover:text-zinc-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current"
          />
        </Link>

        <div className="flex flex-wrap items-center gap-x-[clamp(14px,2.2vw,38px)] gap-y-3">
          {items.map((item) => (
            <button
              key={item.key}
              type="button"
              onClick={() => onSectionClick(item)}
              className="home-nav-section-link cursor-pointer border-0 bg-transparent p-0 font-figtree text-[clamp(1rem,1.25vw,1.25rem)] font-semibold tracking-[-0.01em] text-white/88"
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-1 text-zinc-500 dark:text-zinc-400 sm:gap-5">
        {SOCIAL_LINKS.map((link) => {
          const icon =
            "preserveOriginal" in link && link.preserveOriginal ? (
              <img
                src={link.src}
                width={link.width}
                height={link.height}
                alt=""
                aria-hidden="true"
                className="inline-block shrink-0"
              />
            ) : (
              <MaskIcon
                src={link.src}
                width={link.width}
                height={link.height}
                className="text-white transition-colors duration-150 group-hover:text-zinc-300"
              />
            );

          return (
            <IconLink
              key={link.key}
              href={link.href}
              label={link.label}
              icon={icon}
            />
          );
        })}
      </div>
    </nav>
  );
}

/**
 * Single homepage navbar that hides on downward scroll, reappears on upward
 * scroll, and gradually gains a floating shell as the page moves away from the
 * hero's top edge.
 */
export default function NewHomeNavBar({
  items = DEFAULT_ITEMS,
}: NewHomeNavBarProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [scrollY, setScrollY] = useState(0);
  const lastScrollYRef = useRef(0);
  const upwardTravelRef = useRef(0);
  const downwardTravelRef = useRef(0);

  useEffect(() => {
    lastScrollYRef.current = window.scrollY;
    setScrollY(window.scrollY);

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const deltaY = currentScrollY - lastScrollYRef.current;

      setScrollY(currentScrollY);

      if (currentScrollY <= SCROLL_EPSILON) {
        setIsVisible(true);
        upwardTravelRef.current = 0;
        downwardTravelRef.current = 0;
        lastScrollYRef.current = currentScrollY;
        return;
      }

      if (lastScrollYRef.current <= SCROLL_EPSILON && deltaY >= SCROLL_EPSILON) {
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
  }, []);

  const handleSectionClick = (item: NewHomeNavItem) => {
    const target = document.getElementById(item.targetId);
    if (!target) return;

    const offset = window.innerHeight * (item.offsetRatio ?? 0.12);
    const targetTop = window.scrollY + target.getBoundingClientRect().top - offset;

    window.scrollTo({
      top: Math.max(0, targetTop),
      behavior: "smooth",
    });

    window.history.replaceState(null, "", `#${item.targetId}`);
  };

  const shellProgress = clamp(scrollY / SHELL_BLEND_DISTANCE, 0, 1);
  const shellInset = MAX_SHELL_INSET * shellProgress;
  const shellRadius = MAX_SHELL_RADIUS * shellProgress;
  const shellAlpha = MAX_SHELL_ALPHA * shellProgress;
  const shellBlur = MAX_SHELL_BLUR * shellProgress;
  const shellShadowAlpha = MAX_SHADOW_ALPHA * shellProgress;
  const translateY = isVisible ? 0 : -(NAVBAR_HEIGHT + shellInset + 24);

  return (
    <header
      className="fixed inset-x-0 top-0 z-50 w-full transition-transform duration-300 ease-out"
      style={{ transform: `translateY(${translateY}px)` }}
    >
      <div
        className="transition-[padding] duration-300 ease-out"
        style={{
          paddingTop: shellInset,
          paddingLeft: shellInset,
          paddingRight: shellInset,
        }}
      >
        <div
          className="mx-auto max-w-[1512px] overflow-hidden transition-[border-radius,background-color,border-color,box-shadow,backdrop-filter] duration-300 ease-out"
          style={{
            borderRadius: `${shellRadius}px`,
            backgroundColor: `rgba(17, 28, 99, ${shellAlpha})`,
            border: `1px solid rgba(255, 255, 255, ${0.12 * shellProgress})`,
            boxShadow:
              shellShadowAlpha > 0
                ? `0 18px 40px rgba(0, 0, 0, ${shellShadowAlpha})`
                : "none",
            backdropFilter: `blur(${shellBlur}px)`,
            WebkitBackdropFilter: `blur(${shellBlur}px)`,
          }}
        >
          <NavContents items={items} onSectionClick={handleSectionClick} />
        </div>
      </div>
    </header>
  );
}
