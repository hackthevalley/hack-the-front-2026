import type { CSSProperties, ReactNode } from "react";

const DESIGN_WIDTH = 1512;
const DESIGN_HEIGHT = 982;

type PortalContentStageProps = {
  children: ReactNode;
  className?: string;
};

export default function PortalContentStage({
  children,
  className = "",
}: PortalContentStageProps) {
  const style: CSSProperties = {
    width: `min(100vw, calc(100dvh * ${DESIGN_WIDTH} / ${DESIGN_HEIGHT}))`,
    aspectRatio: `${DESIGN_WIDTH} / ${DESIGN_HEIGHT}`,
    transform: "translate(-50%, -50%)",
  };

  return (
    <div
      className={`auth-content-stage absolute left-1/2 top-1/2 z-30 ${className}`}
      style={style}
    >
      {children}
    </div>
  );
}
