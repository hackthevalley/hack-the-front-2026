import type { ReactNode } from "react";

/** Solid fill behind the character/accessory artwork. */
const FRAME_BACKGROUND = "#565DAA";

/** Silver-to-slate bevel for the thicker inner border, same diagonal-gradient
 * trick as Dropdown's BORDER_GRADIENT_BACKGROUND. */
const INNER_BORDER_GRADIENT =
  "linear-gradient(135deg, #EAEFFF 0%, #9CA3AF 100%)";
const INNER_BORDER_BACKGROUND = `linear-gradient(${FRAME_BACKGROUND}, ${FRAME_BACKGROUND}) padding-box, ${INNER_BORDER_GRADIENT} border-box`;

/** Square double-border frame used by the Custom screen's character/accessory
 * previews: a thin light outer ring, a gap, then a thicker silver-beveled
 * border around a solid-fill interior. */
export default function AvatarFrame({
  children,
  borderWidth = 10,
}: {
  children: ReactNode;
  /** Width in px of the thicker silver-beveled border. Defaults to 10, the
   * Custom screen's size; smaller previews (e.g. the review page) can pass a
   * thinner value so the border doesn't overwhelm the shrunk frame. */
  borderWidth?: number;
}) {
  return (
    <div className="relative aspect-square w-full max-w-[360px]">
      <div
        className="absolute inset-2 border-transparent"
        style={{
          background: INNER_BORDER_BACKGROUND,
          borderWidth: `${borderWidth}px`,
        }}
      >
        {children}
      </div>
    </div>
  );
}
