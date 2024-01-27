import moment, { Moment } from "moment"
import {
  TaskEntry,
  EventEntry,
  RecurranceRule,
  CalendarDisplayEntry,
} from "../types"

const RECURRANCE_DEPTH = 20

function compareMoment(a: Moment, b: Moment): number {
  if (a.isBefore(b)) {
    return -1
  } else if (a.isAfter(b)) {
    return 1
  } else {
    return 0
  }
}

function compareEventEntry(a: EventEntry, b: EventEntry): number {
  return compareMoment(a.start, b.start)
}

function compareTaskEntry(a: TaskEntry, b: TaskEntry): number {
  return compareMoment(a.deadline, b.deadline)
}

function nextRecuranceTime(date: Moment, rule: RecurranceRule): Moment {
  return date.add("1" + rule)
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
    let recurTimesEvent = event.reoccuranceRule !== undefined ? RECURRANCE_DEPTH : 1
    let tempRecurEvent: CalendarDisplayEntry = Object.assign(
      { type: "event" },
      event,
    )

    for (let i = 0; i < recurTimesEvent; i++) {
      outputEvents.push(tempRecurEvent)
      tempRecurEvent.start = nextRecuranceTime(
        tempRecurEvent.start,
        tempRecurEvent.reoccuranceRule || RecurranceRule.DAILY,
      )
    }
  }

  ///
  outputEvents.sort(compareEventEntry)

  ///
  let newTasks: TaskEntry[] = []
  for (const task of tasks) {
    let recurTimesTask = task.reoccuranceRule !== undefined ? RECURRANCE_DEPTH : 1
    let tempRecurTask: TaskEntry = task

    for (let i = 0; i < recurTimesTask; i++) {
      newTasks.push(tempRecurTask)
      tempRecurTask.deadline = nextRecuranceTime(
        tempRecurTask.deadline,
        tempRecurTask.reoccuranceRule || RecurranceRule.DAILY,
      )
    }
  }
  ///
  newTasks.sort(compareTaskEntry)

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

  test("Basic event Recurrance", () => {
    expect(
      createUiSchedule([basicRecurring], []).length === RECURRANCE_DEPTH,
    ).toBeTruthy()
  })
}
