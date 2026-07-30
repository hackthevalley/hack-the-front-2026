"use client";

import { startTransition } from "react";
import Button from "@/components/ui/Button";
import { FAQ_ITEMS, type FaqItem, type FaqTextRun } from "./faqContent";
import { QuestionIcon } from "./FaqQuestionList";

const MOBILE_FAQ_BUTTON_FILL =
  "linear-gradient(91.64deg, rgba(1, 5, 53, 0.92) 43.53%, rgba(25, 41, 133, 0.92) 100%)";
const MOBILE_FAQ_BUTTON_GLOW =
  "radial-gradient(70% 140% at 86% 52%, rgba(88,111,255,.22) 0%, rgba(88,111,255,0) 58%)";
const MOBILE_FAQ_PANEL_SHADOW = "0 18px 36px rgba(0,0,0,.18)";

function renderRuns(runs: readonly FaqTextRun[]) {
  return runs.map((run, index) => {
    const className = [
      run.weight === "bold" ? "font-bold" : undefined,
      run.style === "italic" ? "italic" : undefined,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <span key={`${run.text}-${index}`} className={className || undefined}>
        {run.text}
      </span>
    );
  });
}

function ChevronIcon({ isOpen }: { isOpen: boolean }) {
  return (
    <span aria-hidden="true" className="grid h-6 w-6 shrink-0 place-items-center text-white/80">
      <svg
        viewBox="0 0 20 20"
        className="h-5 w-5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.35"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d={isOpen ? "m5 12.5 5-5 5 5" : "m5 7.5 5 5 5-5"} />
      </svg>
    </span>
  );
}

function MobileFaqAnswer({
  item,
  isOpen,
}: {
  item: FaqItem;
  isOpen: boolean;
}) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="overflow-hidden">
      <div
        className="rounded-b-[1.15rem] border border-t-0 border-slate-200 bg-white px-5 pb-5 pt-4 text-[#181b45]"
        style={{ boxShadow: MOBILE_FAQ_PANEL_SHADOW }}
      >
        <div className="space-y-4 text-[0.94rem] leading-7">
          {item.blocks.map((block, index) => (
            <p key={index} className="m-0">
              {renderRuns(block.runs)}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function MobileFaqContent({
  activeId,
  onSelect,
}: {
  activeId: string | null;
  onSelect: (id: string) => void;
}) {
  return (
    <div className="absolute inset-0 font-figtree text-white md:hidden">
      <div className="absolute inset-x-0 top-[5.8%] px-5">
        <div className="mx-auto w-full max-w-[21rem]">
          {FAQ_ITEMS.map((item) => {
            const isActive = activeId === item.id;

            return (
              <div key={item.id} className="mb-5">
                <button
                  type="button"
                  aria-expanded={isActive}
                  onClick={() => {
                    startTransition(() => {
                      onSelect(item.id);
                    });
                  }}
                  className={[
                    "flex w-full cursor-pointer items-center gap-3 border border-white/12 px-4 py-4 text-left text-[#E5E7EB] outline-none transition-[border-radius,box-shadow] duration-200 focus-visible:ring-2 focus-visible:ring-white/60",
                    isActive
                      ? "rounded-t-[1.15rem] rounded-b-none"
                      : "rounded-[1.15rem]",
                  ].join(" ")}
                  style={{
                    background: [MOBILE_FAQ_BUTTON_GLOW, MOBILE_FAQ_BUTTON_FILL].join(
                      ", ",
                    ),
                    boxShadow: isActive
                      ? "0 16px 32px rgba(8,10,38,.35), inset 0 0 0 1px rgba(255,255,255,.22)"
                      : "0 12px 30px rgba(0,0,0,.2)",
                  }}
                >
                  <QuestionIcon
                    icon={item.icon}
                    style={{
                      width: "2.9rem",
                      height: "2.9rem",
                    }}
                  />
                  <span className="grow text-[1rem] font-medium leading-6">
                    {item.label}
                  </span>
                  <ChevronIcon isOpen={isActive} />
                </button>

                <MobileFaqAnswer item={item} isOpen={isActive} />
              </div>
            );
          })}

          <div className="mt-59 text-center text-white">
            <p
              className="m-0 text-[1.65rem] font-medium leading-tight"
              style={{ textShadow: "0 0 12px rgba(255,255,255,.75)" }}
            >
              Have more questions?
            </p>
            <p
              className="m-0 mt-3 text-[1rem] italic leading-7 text-white/92"
              style={{ textShadow: "0 0 12px rgba(255,255,255,.75)" }}
            >
              Message us at @hackthevalley.io
            </p>

            <div className="mx-auto mt-5 w-full max-w-[13rem]">
              <Button
                text="Contact Us"
                width="100%"
                onClick={() => {
                  window.location.href = "mailto:contact@hackthevalley.io";
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
