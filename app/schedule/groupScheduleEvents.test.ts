import assert from "node:assert/strict";
import test from "node:test";
import { groupScheduleEvents, type ScheduleEvent } from "./groupScheduleEvents.ts";

const event = (id: string, startsAt: string): ScheduleEvent => ({
  id,
  title: id,
  description: null,
  location: null,
  starts_at: startsAt,
  ends_at: "2026-10-17T15:00:00-04:00",
});

test("groups events with the same start time", () => {
  const groups = groupScheduleEvents([
    event("workshop-a", "2026-10-17T14:00:00-04:00"),
    event("workshop-b", "2026-10-17T14:00:00-04:00"),
    event("ceremony", "2026-10-17T15:00:00-04:00"),
  ]);

  assert.deepEqual(
    groups.map((group) => group.map(({ id }) => id)),
    [["workshop-a", "workshop-b"], ["ceremony"]],
  );
});
