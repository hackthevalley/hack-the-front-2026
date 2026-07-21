"use client";

import { startTransition, useMemo, useState } from "react";
import FaqPaperPanel from "./faq/FaqPaperPanel";
import FaqQuestionList from "./faq/FaqQuestionList";
import FaqStaticOverlays from "./faq/FaqStaticOverlays";
import { FAQ_ITEMS } from "./faq/faqContent";

export default function FaqThemesContentLayer() {
  const [activeId, setActiveId] = useState<string | null>(null);

  const activeItem = useMemo(
    () => FAQ_ITEMS.find((item) => item.id === activeId) ?? null,
    [activeId],
  );

  const handleSelect = (id: string) => {
    startTransition(() => {
      setActiveId((currentId) => (currentId === id ? null : id));
    });
  };

  return (
    <div className="absolute inset-0 font-figtree text-white">
      <FaqStaticOverlays />
      <FaqQuestionList activeId={activeId} onSelect={handleSelect} />
      <FaqPaperPanel activeItem={activeItem} />
    </div>
  );
}
