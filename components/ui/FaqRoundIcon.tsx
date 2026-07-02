type FaqRoundIconProps = {
  /** Top of the gradient, e.g. "#55A295". */
  gradientStart: string;
  /** Bottom of the gradient, e.g. "#367C71". */
  gradientEnd: string;
  /** Path to the SVG in /public, e.g. "/icons/calendar.svg". */
  icon: string;
};

/**
 * Circular gradient badge with a centered icon, used in FAQ accordion rows.
 */
export default function FaqRoundIcon({
  gradientStart,
  gradientEnd,
  icon,
}: FaqRoundIconProps) {
  return (
    <div
      aria-hidden="true"
      className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full"
      style={{
        background: `linear-gradient(180deg, ${gradientStart}, ${gradientEnd})`,
      }}
    >
      <img src={icon} alt="" className="h-6 w-6" />
    </div>
  );
}
