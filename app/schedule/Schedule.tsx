"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import PortalNavbar from "@/components/layout/PortalNavbar";
import { useAuth } from "@/components/providers/AuthProvider";
import { apiJson, isUnauthorizedError } from "@/lib/apiClient";
import {
  DEADLINE_BLOCK_MS,
  HOUR_MS,
  layoutSchedule,
  MIN_EVENT_BLOCK_MS,
  type ScheduleEvent,
} from "./layoutSchedule";

type ScheduleResponse = {
  events: ScheduleEvent[];
};

const dateFormatter = new Intl.DateTimeFormat("en-CA", {
  weekday: "long",
  month: "long",
  day: "numeric",
  timeZone: "America/Toronto",
});

const timeFormatter = new Intl.DateTimeFormat("en-CA", {
  hour: "numeric",
  minute: "2-digit",
  timeZone: "America/Toronto",
});

const PIXELS_PER_HOUR = 144;
const TIMELINE_PADDING = 16;

const EVENT_TYPE_STYLES: Record<
  ScheduleEvent["event_type"],
  { card: string; label: string }
> = {
  general: {
    card: "border-violet-400/50 bg-[#211b67]/95",
    label: "text-violet-200",
  },
  workshop: {
    card: "border-blue-400/60 bg-[#172b5b]/95",
    label: "text-blue-200",
  },
  ceremony: {
    card: "border-pink-400/60 bg-[#4a1742]/95",
    label: "text-pink-200",
  },
  food: {
    card: "border-amber-400/60 bg-[#493711]/95",
    label: "text-amber-200",
  },
  activity: {
    card: "border-emerald-400/60 bg-[#123e36]/95",
    label: "text-emerald-200",
  },
};

export default function Schedule() {
  const router = useRouter();
  const { logout, token } = useAuth();
  const [events, setEvents] = useState<ScheduleEvent[] | null>(null);
  const [error, setError] = useState(false);
  const scheduleEvents = events ?? [];
  const scheduleDays = layoutSchedule(scheduleEvents);

  useEffect(() => {
    if (!token) return;
    const controller = new AbortController();

    apiJson<ScheduleResponse>("/api/schedule/confirmed", {
      token,
      signal: controller.signal,
    })
      .then((schedule) => setEvents(schedule.events))
      .catch((caught: unknown) => {
        if (controller.signal.aborted) return;
        if (isUnauthorizedError(caught)) {
          if (caught instanceof Error && "status" in caught && caught.status === 401) {
            logout();
            router.replace("/login");
          } else {
            router.replace("/dashboard");
          }
          return;
        }
        setError(true);
      });

    return () => controller.abort();
  }, [logout, router, token]);

  return (
    <main className="min-h-dvh bg-[radial-gradient(circle_at_50%_0%,#29227c_0%,#0d0a46_42%,#07021d_100%)] text-white">
      <PortalNavbar />
      <div className="mx-auto w-full max-w-6xl px-5 pb-16 pt-8 md:px-8 md:pt-12">
        <div className="mb-10 flex items-end justify-between gap-4">
          <div>
            <p className="mb-2 font-vcr text-sm uppercase tracking-[0.18em] text-[#b8c8ff]">
              Hack the Valley 11
            </p>
            <h1 className="font-vcr text-4xl text-white md:text-6xl">Schedule</h1>
          </div>
          <Link
            href="/dashboard"
            className="font-figtree text-sm font-semibold text-[#f6c7fc] hover:text-white"
          >
            Back to dashboard
          </Link>
        </div>

        {events === null && !error ? (
          <p role="status" className="font-figtree text-lg text-[#d5dced]">
            Loading schedule…
          </p>
        ) : error ? (
          <p role="alert" className="font-figtree text-lg text-[#ff9aa0]">
            We couldn’t load the schedule. Please try again later.
          </p>
        ) : scheduleEvents.length === 0 ? (
          <p className="font-figtree text-lg text-[#d5dced]">
            No events have been scheduled yet.
          </p>
        ) : (
          <div className="space-y-12">
            {scheduleDays.map((day) => {
              const timelineHeight =
                ((day.endAt - day.startAt) / HOUR_MS) * PIXELS_PER_HOUR;
              const hourCount = (day.endAt - day.startAt) / HOUR_MS;
              return (
                <section key={day.key}>
                  <h2 className="mb-5 border-b border-white/15 pb-3 font-vcr text-xl text-[#f6c7fc] md:text-2xl">
                    {dateFormatter.format(new Date(day.events[0].event.starts_at))}
                  </h2>
                  <div className="overflow-x-auto pb-2">
                    <div
                      className="relative min-w-[680px]"
                      style={{ height: timelineHeight + TIMELINE_PADDING * 2 }}
                    >
                      {Array.from({ length: hourCount + 1 }, (_, hour) => {
                        const timestamp = day.startAt + hour * HOUR_MS;
                        return (
                          <div
                            key={timestamp}
                            className="absolute left-0 right-0 border-t border-white/10"
                            style={{
                              top: TIMELINE_PADDING + hour * PIXELS_PER_HOUR,
                            }}
                          >
                            <time
                              dateTime={new Date(timestamp).toISOString()}
                              className="absolute -top-2.5 left-0 w-16 font-vcr text-xs text-[#8997c4]"
                            >
                              {timeFormatter.format(new Date(timestamp))}
                            </time>
                          </div>
                        );
                      })}

                      <div className="absolute bottom-0 left-[72px] right-0 top-0">
                        {day.events.map(({ event, column, columns }) => {
                          const startsAt = new Date(event.starts_at).getTime();
                          const endsAt = new Date(event.ends_at).getTime();
                          const isDeadline = startsAt === endsAt;
                          const isCompact = endsAt - startsAt <= MIN_EVENT_BLOCK_MS;
                          const top =
                            TIMELINE_PADDING +
                            ((startsAt - day.startAt) / HOUR_MS) * PIXELS_PER_HOUR;
                          const height =
                            ((Math.max(
                              isDeadline ? DEADLINE_BLOCK_MS : endsAt - startsAt,
                              MIN_EVENT_BLOCK_MS,
                            ) /
                              HOUR_MS) *
                              PIXELS_PER_HOUR);
                          const gap = 8;
                          const left = `calc(${(column / columns) * 100}% + ${(column * gap) / columns}px)`;
                          const width = `calc(${100 / columns}% - ${((columns - 1) * gap) / columns}px)`;
                          const typeStyle = EVENT_TYPE_STYLES[event.event_type];

                          return (
                            <article
                              key={event.id}
                              className={`absolute overflow-hidden rounded-xl border shadow-[0_8px_24px_rgba(3,1,20,.28)] ${typeStyle.card} ${
                                isCompact ? "p-2" : "p-3 md:p-4"
                              } ${
                                event.is_important
                                  ? "ring-2 ring-inset ring-amber-300"
                                  : ""
                              }`}
                              style={{
                                top,
                                left,
                                width,
                                height: Math.max(height - 6, 1),
                              }}
                            >
                              <div className="flex min-w-0 items-center justify-between gap-2">
                                <time
                                  dateTime={event.starts_at}
                                  className="min-w-0 truncate font-vcr text-xs text-[#b8c8ff]"
                                >
                                  {isDeadline
                                    ? `Due ${timeFormatter.format(new Date(event.starts_at))}`
                                    : `${timeFormatter.format(new Date(event.starts_at))} – ${timeFormatter.format(new Date(event.ends_at))}`}
                                </time>
                                <span
                                  className={`shrink-0 font-figtree text-xs font-bold uppercase tracking-wide ${typeStyle.label}`}
                                >
                                  {event.is_important && "★ "}
                                  {event.event_type}
                                </span>
                              </div>
                              <h3
                                className={`mt-1 truncate font-figtree font-bold leading-tight text-white ${
                                  isCompact ? "text-base" : "text-lg md:text-xl"
                                }`}
                              >
                                {event.title}
                              </h3>
                              {event.is_important && !isCompact && (
                                <p className="mt-1 font-figtree text-xs font-bold uppercase tracking-wide text-amber-200">
                                  Important
                                </p>
                              )}
                              {event.location && !isCompact && (
                                <p className="mt-1 font-figtree text-sm font-semibold text-[#8df2cb]">
                                  {event.location}
                                </p>
                              )}
                              {event.description && !isCompact && (
                                <p className="mt-2 line-clamp-3 whitespace-pre-wrap font-figtree text-sm leading-5 text-[#d5dced]">
                                  {event.description}
                                </p>
                              )}
                            </article>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </section>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}
