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
  children,
}: DesignBoxProps) {
  return (
    <div
      className={`absolute ${className}`}
      style={{
        left: `${(left / designWidth) * 100}%`,
        top: `${(top / designHeight) * 100}%`,
        width: `${(width / designWidth) * 100}%`,
        height: `${(height / designHeight) * 100}%`,
        zIndex,
        containerType: "size",
        ...style,
      }}
    >
      {children}
    </div>
  );
}
