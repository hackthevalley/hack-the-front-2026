"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import PortalNavbar from "@/components/layout/PortalNavbar";
import { useAuth } from "@/components/providers/AuthProvider";
import { apiJson, isUnauthorizedError } from "@/lib/apiClient";

type ScheduleEvent = {
  id: string;
  title: string;
  description: string | null;
  location: string | null;
  starts_at: string;
  ends_at: string;
};

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

export default function Schedule() {
  const router = useRouter();
  const { logout, token } = useAuth();
  const [events, setEvents] = useState<ScheduleEvent[] | null>(null);
  const [error, setError] = useState(false);
  const scheduleEvents = events ?? [];

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
      <div className="mx-auto w-full max-w-4xl px-5 pb-16 pt-8 md:px-8 md:pt-12">
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
          <div className="space-y-8">
            {scheduleEvents.map((event, index) => {
              const date = dateFormatter.format(new Date(event.starts_at));
              const previousDate =
                index > 0
                  ? dateFormatter.format(
                      new Date(scheduleEvents[index - 1].starts_at),
                    )
                  : null;
              return (
                <section key={event.id}>
                  {date !== previousDate && (
                    <h2 className="mb-4 border-b border-white/15 pb-3 font-vcr text-xl text-[#f6c7fc] md:text-2xl">
                      {date}
                    </h2>
                  )}
                  <article className="mb-3 grid gap-2 rounded-2xl border border-white/10 bg-white/[0.07] p-5 md:grid-cols-[170px_1fr] md:gap-6 md:p-6">
                    <time
                      dateTime={event.starts_at}
                      className="font-vcr text-sm text-[#b8c8ff]"
                    >
                      {timeFormatter.format(new Date(event.starts_at))} –{" "}
                      {timeFormatter.format(new Date(event.ends_at))}
                    </time>
                    <div>
                      <h3 className="font-figtree text-xl font-bold text-white">
                        {event.title}
                      </h3>
                      {event.location && (
                        <p className="mt-1 font-figtree font-semibold text-[#8df2cb]">
                          {event.location}
                        </p>
                      )}
                      {event.description && (
                        <p className="mt-2 whitespace-pre-wrap font-figtree leading-7 text-[#d5dced]">
                          {event.description}
                        </p>
                      )}
                    </div>
                  </article>
                </section>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}
