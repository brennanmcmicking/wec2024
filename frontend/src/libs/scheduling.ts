import moment, { Moment } from "moment"
import {
  TaskEntry,
  EventEntry,
  RecurranceRule,
  CalendarDisplayEntry,
  Priority,
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
  return out
}

function deepCloneArrayWithMoment(arr: any[]): any[] {
  return arr.map((item) => {
    if (moment.isMoment(item)) {
      return item.clone()
    } else if (Array.isArray(item)) {
      return deepCloneArrayWithMoment(item)
    } else if (typeof item === "object" && item !== null) {
      return deepCloneObjectWithMoment(item)
    } else {
      return item
    }
  })
}

function deepCloneObjectWithMoment(obj: { [key: string]: any }): {
  [key: string]: any
} {
  const clone: { [key: string]: any } = Array.isArray(obj) ? [] : {}
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const value = obj[key]
      if (moment.isMoment(value)) {
        clone[key] = value.clone()
      } else if (Array.isArray(value)) {
        clone[key] = deepCloneArrayWithMoment(value)
      } else if (typeof value === "object" && value !== null) {
        clone[key] = deepCloneObjectWithMoment(value)
      } else {
        clone[key] = value
      }
    }
  }
  return clone
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
  eventsMut: EventEntry[],
  tasksMut: TaskEntry[],
): CalendarDisplayEntry[] {
  let outputEvents: CalendarDisplayEntry[] = []
  let events: EventEntry[] = deepCloneArrayWithMoment(eventsMut)
  let tasks: TaskEntry[] = deepCloneArrayWithMoment(tasksMut)
  ///
  for (const event of events) {
    let recurTimesEvent = event.reoccuranceRule !== undefined ? RECURRANCE_DEPTH : 1

    for (let i = 0; i < recurTimesEvent; i++) {
      let tempRecurEvent: CalendarDisplayEntry = {
        id: event.id + i * 100000,
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
      outputEvents.push(tempRecurEvent)
    }
  }

  ///
  outputEvents.sort(compareEventEntry)
  ///
  let allTasks: TaskEntry[] = []
  for (const task of tasks) {
    let recurTimesTask = task.reoccuranceRule !== undefined ? RECURRANCE_DEPTH : 1

    for (let i = 0; i < recurTimesTask; i++) {
      let tempRecurTask: TaskEntry = {
        id: task.id,
        title: task.title,
        deadline: nextRecuranceTime(
          task.deadline,
          task.reoccuranceRule || RecurranceRule.DAILY,
          i,
        ),
        durationEstimate: task.durationEstimate,
        priority: task.priority,
      }
      allTasks.push(tempRecurTask)
    }
  }

  ///
  allTasks.sort(compareTaskEntry)

  ///
  const startSearchingAt = moment()

  for (const task of tasks) {
    for (let i = 0; i < outputEvents.length; i++) {
      let thisEventEnd = outputEvents[i].end
      let nextEventStart =
        outputEvents.length > i + 1
          ? outputEvents[i + 1].start
          : moment(outputEvents[i].end).add(1, "year")

      if (
        !startSearchingAt.isBefore(thisEventEnd) &&
        startSearchingAt.isAfter(nextEventStart)
      ) {
        continue
      }

      let thisEvent = outputEvents[i].title
      let nextEvent = outputEvents[i + 1].title

      let availTime = moment.duration(nextEventStart.diff(thisEventEnd))

      if (task.durationEstimate._milliseconds > availTime._milliseconds) {
        continue
      }

      // let newStart =
      let newEnd = moment(thisEventEnd).add(
        task.durationEstimate._milliseconds,
        "milliseconds",
      )

      let createdEvent: CalendarDisplayEntry = {
        id: task.id,
        title: task.title,
        start: outputEvents[i].end,
        end: newEnd,
        type: "task",
      }

      outputEvents.splice(i + 1, 0, createdEvent)
      break
    }
  }

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

  const eventInFuture: EventEntry = {
    id: 3,
    title: "Future",
    start: moment("2300-01-01T00:02:00Z"),
    end: moment("2300-01-01T00:03:00Z"),
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

  const basicTask: TaskEntry = {
    id: 1,
    title: "Do Task",
    deadline: moment("0000-01-01T00:09:00Z"),
    durationEstimate: moment.duration(1, "hour"),
    priority: Priority.LOW,
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
    expect(out[2].start.toString()).toStrictEqual(
      moment("0000-01-03T00:08:00Z").toString(),
    )
  })
}
