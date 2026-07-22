"use client";

import { useEffect, useMemo, useState } from "react";
import type { FaqItem, FaqTextRun } from "./faqContent";

type RevealedCardContent = {
  header: readonly FaqTextRun[];
  salutation: readonly FaqTextRun[];
  blocks: readonly (readonly FaqTextRun[])[];
  signature: readonly FaqTextRun[];
};

type TypewriterSegment = {
  key: string;
  runs: readonly FaqTextRun[];
};

function countChars(runs: readonly FaqTextRun[]) {
  return runs.reduce((total, run) => total + run.text.length, 0);
}

function sliceRuns(runs: readonly FaqTextRun[], visibleChars: number) {
  if (visibleChars <= 0) {
    return [] as const;
  }

  let remaining = visibleChars;
  const visible: FaqTextRun[] = [];

  for (const run of runs) {
    if (remaining <= 0) {
      break;
    }

    const nextText = run.text.slice(0, remaining);
    visible.push({
      ...run,
      text: nextText,
    });
    remaining -= nextText.length;
  }

  return visible;
}

export function useFaqTypewriter(item: FaqItem | null): RevealedCardContent {
  const segments = useMemo<TypewriterSegment[]>(() => {
    if (!item) {
      return [];
    }

    return [
      {
        key: `${item.id}:header`,
        runs: [{ text: item.paperHeader, weight: "bold" }],
      },
      {
        key: `${item.id}:salutation`,
        runs: [{ text: item.salutation, weight: "bold", style: "italic" }],
      },
      ...item.blocks.map((block, index) => ({
        key: `${item.id}:block:${index}`,
        runs: block.runs,
      })),
      {
        key: `${item.id}:signature`,
        runs: [{ text: item.signature, weight: "bold", style: "italic" }],
      },
    ];
  }, [item]);

  const totals = useMemo(() => segments.map((segment) => countChars(segment.runs)), [segments]);
  const [counts, setCounts] = useState<number[]>(() => totals.map(() => 0));

  useEffect(() => {
    if (!item) {
      setCounts([]);
      return;
    }

    setCounts(totals.map(() => 0));

    let cancelled = false;
    const nextCounts = totals.map(() => 0);
    const timers: number[] = [];
    let segmentIndex = 0;
    let visibleChars = 0;

    const schedule = (callback: () => void, delay: number) => {
      const timerId = window.setTimeout(callback, delay);
      timers.push(timerId);
    };

    const step = () => {
      if (cancelled || segmentIndex >= totals.length) {
        return;
      }

      visibleChars = Math.min(totals[segmentIndex], visibleChars + 3);
      nextCounts[segmentIndex] = visibleChars;
      setCounts([...nextCounts]);

      if (visibleChars >= totals[segmentIndex]) {
        segmentIndex += 1;
        visibleChars = 0;

        if (segmentIndex >= totals.length) {
          return;
        }

        schedule(step, 70);
        return;
      }

      schedule(step, 12);
    };

    schedule(step, 100);

    return () => {
      cancelled = true;
      for (const timerId of timers) {
        window.clearTimeout(timerId);
      }
    };
  }, [item, totals]);

  if (!item) {
    return {
      header: [],
      salutation: [],
      blocks: [],
      signature: [],
    };
  }

  return {
    header: sliceRuns([{ text: item.paperHeader, weight: "bold" }], counts[0] ?? 0),
    salutation: sliceRuns(
      [{ text: item.salutation, weight: "bold", style: "italic" }],
      counts[1] ?? 0,
    ),
    blocks: item.blocks.map((block, index) =>
      sliceRuns(block.runs, counts[index + 2] ?? 0),
    ),
    signature: sliceRuns(
      [{ text: item.signature, weight: "bold", style: "italic" }],
      counts[item.blocks.length + 2] ?? 0,
    ),
  };
}
