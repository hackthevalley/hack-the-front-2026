type ProgressBarProps = {
  /** Number of [Left, Right] subsections in each nav group, in order. */
  groupStepCounts: number[];
  currentGroupIndex: number;
  /** 0-based index of the current step within its group. */
  currentStepInGroup: number;
  className?: string;
};

export default function ProgressBar({
  groupStepCounts,
  currentGroupIndex,
  currentStepInGroup,
  className = "",
}: ProgressBarProps) {
  return (
    <div
      className={`flex w-full gap-3 ${className}`}
      role="progressbar"
      aria-valuenow={currentGroupIndex + 1}
      aria-valuemin={1}
      aria-valuemax={groupStepCounts.length}
    >
      {groupStepCounts.map((stepCount, index) => {
        const fillPercent =
          index < currentGroupIndex
            ? 100
            : index > currentGroupIndex
              ? 0
              : ((currentStepInGroup + 1) / stepCount) * 100;

        return (
          <div key={index} className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/15">
            <div
              className="h-full rounded-full bg-gradient-to-r from-[#FF7CCD] to-[#7839DC] transition-[width] duration-300"
              style={{ width: `${fillPercent}%` }}
            />
          </div>
        );
      })}
    </div>
  );
}
