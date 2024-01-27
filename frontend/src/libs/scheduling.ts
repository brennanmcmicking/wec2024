import moment from "moment"
import {
  TaskEntry,
  EventEntry,
  RecurranceRule,
  CalendarDisplayEntry,
} from "../types"

const RECURRANCE_DEPTH = 20

function compareMoment(a: EventEntry, b: EventEntry): number {
  if (a.start.isBefore(b.start)) {
    return -1
  } else if (a.start.isAfter(b.start)) {
    return 1
  } else {
    return 0
  }
}

/**
 * Algorithm steps:
 * - Expand all calendar events for recurrance rules
 * - Sort calendar by start date & time
 * - Insert into outputEvents
 * - Expand Tasks for recurrance rules
 * - Sort Tasks by earliest deadline first
 * - Insert tasks into outputEvents
 *   - Find first available open slot in outputEvents
 *   - iterate through tasks list until find first task that can fit in that time spot
 *   - Insert task into outputEvents in that timeslot & remove from tasks list
 */
export function createUiSchedule(
  events: EventEntry[],
  tasks: TaskEntry[],
): CalendarDisplayEntry[] {
  let outputEvents: CalendarDisplayEntry[] = []

  ///
  for (const event of events) {
    let recurTimes = event.reoccuranceRule !== undefined ? RECURRANCE_DEPTH : 1
    for (let i = 0; i < recurTimes; i++) {
      let out: CalendarDisplayEntry = Object.assign({ type: "event" }, event)
      outputEvents.push(out)
    }
  }

  ///
  outputEvents.sort(compareMoment)

  ///

  return outputEvents
}

/**
 * Tests! Only imported in dev builds
 */
if (import.meta.vitest) {
  const { test, expect } = import.meta.vitest

  const basicEvent1: EventEntry = {
    id: 1,
    title: "test",
    start: moment("0000-01-01T00:00:00Z"),
    end: moment("0000-01-01T00:01:00Z"),
    type: "event",
  }

  const basicEvent2: EventEntry = {
    id: 1,
    title: "test",
    start: moment("0000-01-01T00:02:00Z"),
    end: moment("0000-01-01T00:03:00Z"),
    type: "event",
  }

  const basicRecurring: EventEntry = {
    id: 1,
    title: "test",
    start: moment("0000-01-01T00:08:00Z"),
    end: moment("0000-01-01T00:09:00Z"),
    type: "event",
    reoccuranceRule: RecurranceRule.DAILY,
  }

  test("Copies events", () => {
    expect(createUiSchedule([basicEvent1], [])).toStrictEqual([basicEvent1])
  })

  test("Sorts events", () => {
    expect(createUiSchedule([basicEvent2, basicEvent1], [])).toStrictEqual([
      basicEvent1,
      basicEvent2,
    ])
  })

  test("Basic Recurrance", () => {
    expect(createUiSchedule([basicRecurring], []).length === 20).toBeTruthy()
  })
}
