import type { CSSProperties, ReactNode } from "react";

type DesignBoxProps = {
  designWidth: number;
  designHeight: number;
  left: number;
  top: number;
  width: number;
  height: number;
  zIndex?: number;
  className?: string;
  style?: CSSProperties;
  compactRole?:
    | "title"
    | "subtitle"
    | "divider"
    | "field"
    | "error"
    | "action"
    | "secondary";
  compactOrder?: number;
  children: ReactNode;
};

export default function DesignBox({
  designWidth,
  designHeight,
  left,
  top,
  width,
  height,
  zIndex = 0,
  className = "",
  style,
  compactRole,
  compactOrder,
  children,
}: DesignBoxProps) {
  const compactStyle =
    compactOrder === undefined
      ? undefined
      : ({ "--auth-compact-order": compactOrder } as CSSProperties);

  return (
    <div
      className={`absolute ${className}`}
      data-auth-compact-role={compactRole}
      style={{
        left: `${(left / designWidth) * 100}%`,
        top: `${(top / designHeight) * 100}%`,
        width: `${(width / designWidth) * 100}%`,
        height: `${(height / designHeight) * 100}%`,
        zIndex,
        containerType: "size",
        ...style,
        ...compactStyle,
      }}
    >
      {children}
    </div>
  );
}
