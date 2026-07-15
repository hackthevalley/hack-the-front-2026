import Image from "next/image";
import type { ReactNode } from "react";
import SectionHeading from "./SectionHeading";

export default function WelcomeSection({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col items-center gap-8">
      <Image
        src="/application/stamp.svg"
        alt=""
        width={220}
        height={220}
        className="h-40 w-40 md:h-56 md:w-56"
      />
      <SectionHeading className="text-4xl md:text-6xl">
        {children}
      </SectionHeading>

      <div className="flex max-w-sm flex-col gap-3 text-center text-[#EAEFFF]">
        <p className="text-xl md:text-2xl">Welcome Dearest Hacker.</p>
        <p className="text-base md:text-lg">
          You have now entered the sign up and hacker customization form.
        </p>
        <p className="text-base md:text-lg">Proceed with caution.</p>
      </div>
    </div>
  );
}
