export type ScheduleEvent = {
  id: string;
  title: string;
  description: string | null;
  location: string | null;
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

const dayFormatter = new Intl.DateTimeFormat("en-CA", {
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  timeZone: "America/Toronto",
});

function layoutOverlaps(events: ScheduleEvent[]): TimelineEvent[] {
  const positioned: TimelineEvent[] = [];

  for (let index = 0; index < events.length; ) {
    let clusterEnd = new Date(events[index].ends_at).getTime();
    let clusterLimit = index + 1;

    while (
      clusterLimit < events.length &&
      new Date(events[clusterLimit].starts_at).getTime() < clusterEnd
    ) {
      clusterEnd = Math.max(
        clusterEnd,
        new Date(events[clusterLimit].ends_at).getTime(),
      );
      clusterLimit += 1;
    }

    const columnEnds: number[] = [];
    const cluster = events.slice(index, clusterLimit).map((event) => {
      const startsAt = new Date(event.starts_at).getTime();
      const endsAt = new Date(event.ends_at).getTime();
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
      ...dayEvents.map((event) => new Date(event.ends_at).getTime()),
    );

    return {
      key,
      startAt: Math.floor(firstStart / HOUR_MS) * HOUR_MS,
      endAt: Math.ceil(lastEnd / HOUR_MS) * HOUR_MS,
      events: layoutOverlaps(dayEvents),
    };
  });
}
