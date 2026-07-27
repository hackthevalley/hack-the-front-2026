import type { ReactNode } from "react";

export default function SectionHeading({
  children,
  className = "text-2xl",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <h1
      className={`font-vcr tracking-wide text-white ${className}`}
      style={{ textShadow: "0px 0px 16.6px #FEE9D3" }}
    >
      {children}
    </h1>
  );
}
