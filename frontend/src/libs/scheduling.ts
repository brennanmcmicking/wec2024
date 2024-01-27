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

function nextRecuranceTime(
  date: Moment,
  rule: RecurranceRule,
  times: number,
): Moment {
  let out = moment(date).add(times, rule)
  // console.log("INCREAING:", date, rule, times, out)
  return out
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

    for (let i = 0; i < recurTimesEvent; i++) {
      let tempRecurEvent: CalendarDisplayEntry = {
        id: event.id,
        title: event.title,
        type: "event",
        start: nextRecuranceTime(
          event.start,
          event.reoccuranceRule || RecurranceRule.DAILY,
          i,
        ),
        end: nextRecuranceTime(
          event.end,
          event.reoccuranceRule || RecurranceRule.DAILY,
          i,
        ),
      }
      console.log(tempRecurEvent)
      outputEvents.push(tempRecurEvent)
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
    let out = createUiSchedule([basicRecurring], [])
    expect(out.length === RECURRANCE_DEPTH).toBeTruthy()
    expect(out[1].start.toString()).toStrictEqual(
      moment("0000-01-02T00:08:00Z").toString(),
    )
  })
}
