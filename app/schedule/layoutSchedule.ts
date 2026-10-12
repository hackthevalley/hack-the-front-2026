export type ScheduleEvent = {
  id: string;
  title: string;
  description: string | null;
  location: string | null;
  event_type: "general" | "workshop" | "ceremony" | "food" | "activity";
  is_important: boolean;
  starts_at: string;
  ends_at: string;
};

export type TimelineEvent = {
  event: ScheduleEvent;
  column: number;
  columns: number;
};

export type ScheduleDay = {
  key: string;
  startAt: number;
  endAt: number;
  events: TimelineEvent[];
};

export const HOUR_MS = 60 * 60 * 1000;
export const MIN_EVENT_BLOCK_MS = 30 * 60 * 1000;
export const DEADLINE_BLOCK_MS = 45 * 60 * 1000;

const dayFormatter = new Intl.DateTimeFormat("en-CA", {
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  timeZone: "America/Toronto",
});

function layoutEnd(event: ScheduleEvent): number {
  const startsAt = new Date(event.starts_at).getTime();
  const endsAt = new Date(event.ends_at).getTime();
  return startsAt + Math.max(
    startsAt === endsAt ? DEADLINE_BLOCK_MS : endsAt - startsAt,
    MIN_EVENT_BLOCK_MS,
  );
}

function layoutOverlaps(events: ScheduleEvent[]): TimelineEvent[] {
  const positioned: TimelineEvent[] = [];

  for (let index = 0; index < events.length; ) {
    let clusterEnd = layoutEnd(events[index]);
    let clusterLimit = index + 1;

    while (
      clusterLimit < events.length &&
      new Date(events[clusterLimit].starts_at).getTime() < clusterEnd
    ) {
      clusterEnd = Math.max(
        clusterEnd,
        layoutEnd(events[clusterLimit]),
      );
      clusterLimit += 1;
    }

    const columnEnds: number[] = [];
    const cluster = events.slice(index, clusterLimit).map((event) => {
      const startsAt = new Date(event.starts_at).getTime();
      const endsAt = layoutEnd(event);
      let column = columnEnds.findIndex((end) => end <= startsAt);
      if (column === -1) column = columnEnds.length;
      columnEnds[column] = endsAt;
      return { event, column };
    });

    positioned.push(
      ...cluster.map(({ event, column }) => ({
        event,
        column,
        columns: columnEnds.length,
      })),
    );
    index = clusterLimit;
  }

  return positioned;
}

export function layoutSchedule(events: ScheduleEvent[]): ScheduleDay[] {
  const days = new Map<string, ScheduleEvent[]>();
  const sorted = [...events].sort(
    (left, right) =>
      new Date(left.starts_at).getTime() - new Date(right.starts_at).getTime(),
  );

  for (const event of sorted) {
    const key = dayFormatter.format(new Date(event.starts_at));
    days.set(key, [...(days.get(key) ?? []), event]);
  }

  return [...days.entries()].map(([key, dayEvents]) => {
    const firstStart = new Date(dayEvents[0].starts_at).getTime();
    const lastEnd = Math.max(
      ...dayEvents.map(layoutEnd),
    );

    return {
      key,
      startAt: Math.floor(firstStart / HOUR_MS) * HOUR_MS,
      endAt: Math.ceil(lastEnd / HOUR_MS) * HOUR_MS,
      events: layoutOverlaps(dayEvents),
    };
  });
}
