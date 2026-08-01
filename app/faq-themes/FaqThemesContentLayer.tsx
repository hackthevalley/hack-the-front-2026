"use client";

import { startTransition, useMemo, useState } from "react";
import { playChime } from "@/lib/sound";
import MobileFaqContent from "./faq/MobileFaqContent";
import FaqPaperPanel from "./faq/FaqPaperPanel";
import FaqQuestionList from "./faq/FaqQuestionList";
import { FAQ_ITEMS } from "./faq/faqContent";

export default function FaqThemesContentLayer() {
  const [activeId, setActiveId] = useState<string | null>(null);

  const activeItem = useMemo(
    () => FAQ_ITEMS.find((item) => item.id === activeId) ?? null,
    [activeId],
  );

  const handleSelect = (id: string) => {
    if (activeId !== id) {
      playChime();
    }

    startTransition(() => {
      setActiveId((currentId) => (currentId === id ? null : id));
    });
  };

  return (
    <>
      <div className="absolute inset-0 hidden font-figtree text-white md:block">
        <FaqQuestionList activeId={activeId} onSelect={handleSelect} />
        <FaqPaperPanel activeItem={activeItem} />
      </div>

      <MobileFaqContent activeId={activeId} onSelect={handleSelect} />
    </>
  );
}
