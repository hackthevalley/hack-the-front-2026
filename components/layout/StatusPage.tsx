"use client";

import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";

type StatusPageProps = {
  title: string;
  message: string;
  detail?: string;
  buttonText?: string;
  buttonHref?: string;
  titleSize?: "default" | "large";
  messageSize?: "default" | "large";
  pulse?: boolean;
};

export default function StatusPage({
  title,
  message,
  detail,
  buttonText,
  buttonHref,
  titleSize = "default",
  messageSize = "default",
  pulse = false,
}: StatusPageProps) {
  const router = useRouter();

  return (
    <main
      className="relative flex min-h-[100dvh] w-full flex-col items-center justify-center overflow-hidden px-6 text-center"
      style={{
        background:
          "radial-gradient(120% 75% at 50% 108%, rgba(141, 168, 255, 0.45) 0%, rgba(120, 57, 220, 0.28) 32%, rgba(4, 1, 66, 0) 68%), linear-gradient(180deg, #05021c 0%, #060332 55%, #0a0850 100%)",
      }}
    >
      <h1
        className={`font-vcr leading-[1.1] text-white ${pulse ? "animate-pulse" : ""}`}
        style={{
          fontSize:
            titleSize === "large"
              ? "clamp(72px, 16vw, 128px)"
              : "clamp(40px, 8vw, 72px)",
          textShadow: "0 0 16.6px #FEE9D3",
        }}
      >
        {title}
      </h1>

      <p
        className="mt-6 max-w-2xl font-figtree font-medium leading-snug"
        style={{
          fontSize:
            messageSize === "large"
              ? "clamp(28px, 6vw, 48px)"
              : "clamp(18px, 3vw, 24px)",
          color: "#F6C7FC",
        }}
      >
        {message}
      </p>

      {detail ? (
        <p
          className="mt-3 max-w-2xl font-figtree font-normal leading-snug"
          style={{
            fontSize: "clamp(15px, 3vw, 20px)",
            color: "#EAEFFF",
          }}
        >
          {detail}
        </p>
      ) : null}

      {buttonText && buttonHref ? (
        <div className="mt-10 w-[237px] max-w-full">
          <Button
            text={buttonText}
            width="100%"
            aspectRatio="237 / 73"
            onClick={() => router.push(buttonHref)}
          />
        </div>
      ) : null}
    </main>
  );
}
