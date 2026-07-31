import type { ReactNode } from "react";
import Button from "@/components/ui/Button";

type BackgroundBookProps = {
  left: ReactNode;
  right: ReactNode;
  className?: string;
  onBack?: () => void;
  onNext?: () => void;
  /** Disables the "Next" button (e.g. while the current section has field errors). */
  nextDisabled?: boolean;
  nextLabel?: string;
};

export default function BackgroundBook({
  left,
  right,
  className = "",
  onBack,
  onNext,
  nextDisabled = false,
  nextLabel = "Next",
}: BackgroundBookProps) {
  return (
    <div
      className={`relative flex h-auto w-full flex-col overflow-hidden rounded-[28px] border border-white/10 md:h-[min(78vh,720px)] md:flex-row ${className}`}
    >
      {onBack && (
        <Button
          text="Back"
          variant="direction"
          direction="back"
          onClick={onBack}
          className="absolute bottom-6 left-6 z-10 md:bottom-8 md:left-8"
        />
      )}

      <div
        className="flex-1 px-8 py-10 backdrop-blur-sm md:overflow-y-auto md:px-10 md:py-12"
        style={{
          background:
            "linear-gradient(155deg, #3D35A0 0%, #2B2478 62%, #221C64 100%)",
        }}
      >
        {left}
      </div>
      <div className="hidden w-3 items-center justify-center md:flex">
        <div className="h-[80%] w-full bg-[#3949A6]" />
      </div>
      <div
        className="flex-1 px-8 pt-10 pb-[40vh] backdrop-blur-sm md:overflow-y-auto md:px-10 md:py-12"
        style={{
          background:
            "linear-gradient(155deg, #3D35A0 0%, #2B2478 62%, #221C64 100%)",
        }}
      >
        {right}
      </div>

      {onNext && (
        <Button
          text={nextLabel}
          variant="direction"
          direction="next"
          directionTextClassName="font-figtree text-base font-medium leading-normal"
          onClick={onNext}
          disabled={nextDisabled}
          className="absolute bottom-6 right-6 z-10 px-1 py-[3px] md:bottom-8 md:right-8"
        />
      )}
    </div>
  );
}
