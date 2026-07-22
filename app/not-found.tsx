"use client";

import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";

export default function NotFound() {
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
        className="font-vcr leading-none text-white"
        style={{
          fontSize: "clamp(72px, 16vw, 128px)",
          textShadow: "0 0 16.6px #FEE9D3",
        }}
      >
        404
      </h1>

      <p
        className="mt-6 font-figtree font-medium leading-none"
        style={{
          fontSize: "clamp(28px, 6vw, 48px)",
          color: "#F6C7FC",
        }}
      >
        Oops, this page is not found!
      </p>

      <p
        className="mt-3 font-figtree font-normal leading-none"
        style={{
          fontSize: "clamp(15px, 3vw, 20px)",
          color: "#EAEFFF",
        }}
      >
        The link might be corrupted or the page may have been removed.
      </p>

      <div className="mt-10 w-[206px] max-w-full">
        <Button
          text="Go Back Home"
          width="100%"
          onClick={() => router.push("/")}
        />
      </div>
    </main>
  );
}
