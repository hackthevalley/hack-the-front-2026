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
      className={`flex shrink-0 flex-col items-center gap-1 text-center ${widthClass}`}
    >
      <span className="w-full font-vcr text-[clamp(32px,4.233vw,64px)] leading-none tracking-[-0.04em] text-white">
        {value}
      </span>
      <span className="w-full font-figtree text-[clamp(10px,1.058vw,16px)] font-medium leading-normal tracking-[-0.04em] text-[#E5E7EB]">
        {label}
      </span>
    </div>
  );
}

function CountdownColon() {
  return (
    <span
      className="shrink-0 pb-[clamp(14px,1.85vw,28px)] font-figtree text-[clamp(32px,4.233vw,64px)] font-medium leading-none tracking-[-0.04em] text-[#F3F4F6]"
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
      className="flex items-end justify-center gap-[clamp(10px,1.323vw,20px)]"
      role="timer"
      aria-live="polite"
      aria-label="Countdown to Hack the Valley 11"
    >
      <CountdownUnit
        value={pad(display.days, 3)}
        label="DAY(S)"
        widthClass="w-[clamp(60px,7.87vw,119px)]"
      />
      <CountdownColon />
      <CountdownUnit
        value={pad(display.hours)}
        label="HOUR(S)"
        widthClass="w-[clamp(48px,5.291vw,80px)]"
      />
      <CountdownColon />
      <CountdownUnit
        value={pad(display.minutes)}
        label="MINUTE(S)"
        widthClass="w-[clamp(48px,5.291vw,80px)]"
      />
      <CountdownColon />
      <CountdownUnit
        value={pad(display.seconds)}
        label="SECOND(S)"
        widthClass="w-[clamp(50px,5.49vw,83px)]"
      />
    </div>
  );
}
