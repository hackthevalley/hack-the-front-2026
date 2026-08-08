"use client";

import { useEffect, useRef } from "react";

export default function SectionAnimationController() {
  const sentinelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const container = sentinelRef.current?.parentElement;
    if (!container) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        container.dataset.animationsActive = String(
          entry?.isIntersecting ?? false,
        );
      },
      { rootMargin: "200px 0px" },
    );

    observer.observe(container);
    return () => {
      observer.disconnect();
      delete container.dataset.animationsActive;
    };
  }, []);

  return (
    <span
      ref={sentinelRef}
      aria-hidden="true"
      className="pointer-events-none absolute left-0 top-0 size-px opacity-0"
    />
  );
}
