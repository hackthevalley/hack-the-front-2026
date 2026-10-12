export type ScheduleEvent = {
  id: string;
  title: string;
  description: string | null;
  location: string | null;
  starts_at: string;
  ends_at: string;
};

export function groupScheduleEvents(events: ScheduleEvent[]) {
  return events.reduce<ScheduleEvent[][]>((groups, event) => {
    const current = groups.at(-1);
    // shortcut: concurrent sessions share a start time; use interval grouping for staggered overlaps.
    if (current?.[0]?.starts_at === event.starts_at) {
      current.push(event);
    } else {
      groups.push([event]);
    }
    return groups;
  }, []);
}
