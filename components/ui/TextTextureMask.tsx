import type { CSSProperties, ElementType, ReactNode } from "react";

type TextTextureMaskProps<T extends ElementType = "span"> = {
  as?: T;
  className?: string;
  children: ReactNode;
};

const HERO_MASK_STYLE: CSSProperties = {
  backgroundImage: [
    'url("/landing/text-texture.jpg")',
    "linear-gradient(180deg, #ffffff 0%, #f2f3f6 28%, #c5cad3 58%, #8f97a6 100%)",
  ].join(", "),
  backgroundSize: "150% auto, 100% 100%",
  backgroundPosition: "center 38%, center",
  WebkitBackgroundClip: "text",
  backgroundClip: "text",
  WebkitTextFillColor: "transparent",
  color: "transparent",
};

export default function TextTextureMask<T extends ElementType = "span">({
  as,
  className = "",
  children,
}: TextTextureMaskProps<T>) {
  const Tag = as ?? "span";

  return (
    <Tag
      className={className.trim()}
      style={HERO_MASK_STYLE}
    >
      {children}
    </Tag>
  );
}
