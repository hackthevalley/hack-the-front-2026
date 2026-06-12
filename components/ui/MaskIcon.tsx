type MaskIconProps = {
  /** Path to the SVG in /public, e.g. "/icons/instagram.svg". */
  src: string;
  /** Rendered width in px. */
  width: number;
  /** Rendered height in px. */
  height: number;
  /** CSS mask-position — corrects assets with uneven padding inside the SVG. */
  maskPosition?: string;
  /** Extra classes — notably `text-*` colors, which become the icon's color. */
  className?: string;
};

/**
 * Renders an SVG as a CSS mask so it can be recolored with `currentColor`.
 *
 * The SVG's own fill is ignored — only its shape (alpha channel) is used. The
 * icon paints in the inherited text color, so it adapts to light/dark mode via
 * Tailwind `text-*` / `dark:text-*` classes on this element or any ancestor.
 *
 * Requires a single-color vector SVG on a transparent background.
 */
export default function MaskIcon({
  src,
  width,
  height,
  maskPosition = "center",
  className,
}: MaskIconProps) {
  const maskImage = `url(${src})`;
  const mask = `${maskImage} ${maskPosition} / contain no-repeat`;

  return (
    <span
      aria-hidden="true"
      className={["block shrink-0 bg-current", className ?? ""].join(" ")}
      style={{
        width,
        height,
        mask,
        WebkitMask: mask,
      }}
    />
  );
}
