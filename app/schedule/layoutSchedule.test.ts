import assert from "node:assert/strict";
import test from "node:test";
import { HOUR_MS, layoutSchedule, type ScheduleEvent } from "./layoutSchedule.ts";

const event = (id: string, startsAt: string, endsAt: string): ScheduleEvent => ({
  id,
  title: id,
  description: null,
  location: null,
  event_type: "general",
  is_important: false,
  starts_at: startsAt,
  ends_at: endsAt,
});

test("staggered overlapping events use separate timeline columns", () => {
  const [day] = layoutSchedule([
    event("later", "2026-10-17T19:00:00-04:00", "2026-10-17T21:00:00-04:00"),
    event("earlier", "2026-10-17T17:00:00-04:00", "2026-10-17T20:00:00-04:00"),
    event("after", "2026-10-17T21:00:00-04:00", "2026-10-17T22:00:00-04:00"),
  ]);

  assert.deepEqual(
    day.events.map(({ event: item, column, columns }) => [
      item.id,
      column,
      columns,
    ]),
    [
      ["earlier", 0, 2],
      ["later", 1, 2],
      ["after", 0, 1],
    ],
  );
  assert.equal(day.endAt - day.startAt, 5 * HOUR_MS);
});

test("deadlines receive visible timeline space", () => {
  const [day] = layoutSchedule([
    event("deadline", "2026-10-17T17:00:00-04:00", "2026-10-17T17:00:00-04:00"),
  ]);

  assert.equal(day.endAt - day.startAt, HOUR_MS);
  assert.equal(day.events[0].columns, 1);
});

test("short events receive enough layout space to remain readable", () => {
  const [day] = layoutSchedule([
    event("short", "2026-10-17T17:00:00-04:00", "2026-10-17T17:10:00-04:00"),
    event("next", "2026-10-17T17:15:00-04:00", "2026-10-17T18:00:00-04:00"),
  ]);

  assert.deepEqual(day.events.map(({ columns }) => columns), [2, 2]);
});
