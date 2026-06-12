"use client";

import { useEffect, useState } from "react";

const EVENT_DATE = new Date("2026-10-16T00:00:00-04:00");

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

type CountdownUnitProps = {
  value: string;
  label: string;
  widthClass: string;
};

function getTimeLeft(): TimeLeft {
  const diff = Math.max(0, EVENT_DATE.getTime() - Date.now());

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

function pad(value: number, length = 2): string {
  return String(value).padStart(length, "0");
}

function CountdownUnit({ value, label, widthClass }: CountdownUnitProps) {
  return (
    <div
      className={`flex shrink-0 flex-col items-center gap-0.5 text-center sm:gap-1 ${widthClass}`}
    >
      <span className="w-full font-vcr text-[clamp(1.5rem,4.233vw,4rem)] leading-none tracking-[-0.04em] text-white">
        {value}
      </span>
      <span className="w-full font-figtree text-[clamp(0.625rem,1.058vw,1rem)] font-medium leading-normal tracking-[-0.04em] text-[#E5E7EB]">
        {label}
      </span>
    </div>
  );
}

function CountdownColon() {
  return (
    <span
      className="shrink-0 pb-5 font-figtree text-[clamp(1.5rem,4.233vw,4rem)] font-medium leading-none tracking-[-0.04em] text-[#F3F4F6] sm:pb-[clamp(14px,1.85vw,28px)]"
      aria-hidden="true"
    >
      :
    </span>
  );
}

export default function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);

  useEffect(() => {
    setTimeLeft(getTimeLeft());

    const interval = window.setInterval(() => {
      setTimeLeft(getTimeLeft());
    }, 1000);

    return () => window.clearInterval(interval);
  }, []);

  const display = timeLeft ?? { days: 0, hours: 0, minutes: 0, seconds: 0 };

  return (
    <div
      className="mx-auto flex w-full max-w-full items-end justify-center gap-1.5 sm:gap-[clamp(10px,1.323vw,20px)]"
      role="timer"
      aria-live="polite"
      aria-label="Countdown to Hack the Valley 11"
    >
      <CountdownUnit
        value={pad(display.days, 3)}
        label="DAY(S)"
        widthClass="w-[clamp(2.75rem,7.87vw,7.4375rem)]"
      />
      <CountdownColon />
      <CountdownUnit
        value={pad(display.hours)}
        label="HOUR(S)"
        widthClass="w-[clamp(2.25rem,5.291vw,5rem)]"
      />
      <CountdownColon />
      <CountdownUnit
        value={pad(display.minutes)}
        label="MINUTE(S)"
        widthClass="w-[clamp(2.25rem,5.291vw,5rem)]"
      />
      <CountdownColon />
      <CountdownUnit
        value={pad(display.seconds)}
        label="SECOND(S)"
        widthClass="w-[clamp(2.375rem,5.49vw,5.1875rem)]"
      />
    </div>
  );
}
