"use client";

import { lazy, Suspense, useEffect, useRef, useState } from "react";

const FaqThemesContentLayer = lazy(() => import("./FaqThemesContentLayer"));

export default function DeferredFaqThemesContent() {
  const triggerRef = useRef<HTMLDivElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const trigger = triggerRef.current;
    if (!trigger || shouldLoad) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        setShouldLoad(true);
        observer.disconnect();
      },
      { rootMargin: "1200px 0px" },
    );

    observer.observe(trigger);
    return () => observer.disconnect();
  }, [shouldLoad]);

  return (
    <>
      <div
        ref={triggerRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
      />
      {shouldLoad ? (
        <Suspense fallback={null}>
          <FaqThemesContentLayer />
        </Suspense>
      ) : null}
    </>
  );
}
