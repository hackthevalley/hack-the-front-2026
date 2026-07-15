"use client";

export type SectionNavItem = {
  id: string;
  label: string;
};

type SectionNavbarProps = {
  steps: SectionNavItem[];
  currentStep: number;
  furthestVisited: number;
  onStepClick: (index: number) => void;
  className?: string;
};

export default function SectionNavbar({
  steps,
  currentStep,
  furthestVisited,
  onStepClick,
  className = "",
}: SectionNavbarProps) {
  return (
    <nav className={`flex w-[220px] shrink-0 flex-col gap-8 ${className}`}>
      <img src="/icons/htv-logo.svg" alt="Hack the Valley" className="h-10 w-10" />

      <ul className="flex flex-col gap-4">
        {steps.map((step, index) => {
          const isActive = index === currentStep;
          const isLocked = index > furthestVisited;

          return (
            <li key={step.id} className="flex items-center gap-2">
              <span
                aria-hidden="true"
                className={`h-0 w-0 shrink-0 border-y-[7px] border-l-[9px] border-y-transparent transition-opacity ${
                  isActive ? "border-l-[#DF63DC] opacity-100" : "opacity-0"
                }`}
              />
              <button
                type="button"
                disabled={isLocked}
                onClick={() => onStepClick(index)}
                className={`flex-1 rounded-full border px-6 py-3 text-left text-sm font-semibold tracking-wide uppercase transition-colors ${
                  isActive
                    ? "border-transparent text-white [background:linear-gradient(#0B0730,#0B0730)_padding-box,linear-gradient(to_bottom_left,#FF7CCD,#7839DC)_border-box]"
                    : isLocked
                      ? "cursor-not-allowed border-white/15 text-white/30"
                      : "border-white/40 text-white/80 hover:border-white/70"
                }`}
              >
                {step.label}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
