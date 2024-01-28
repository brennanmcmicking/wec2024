import moment from "moment"
import { EventEntry, Priority, RecurranceRule, TaskEntry } from "../types"

/**
 * This is mock data for use on the calendar.
 * Each task must have an id, title, duration estimate,
 * deadline, and priority. Each event must have an id,
 * title, start, and end. Events can optionally have a 
 * recurrence rule as well.
 * Recurring tasks are not supported.
 */
export const mockTasks: TaskEntry[] = [
  {
    id: 1032498324892,
    title: "Laundry",
    durationEstimate: moment.duration(1, "h"),
    deadline: moment({ month: 0, day: 28, hour: 12 }),
    priority: Priority.MEDIUM,
  },
  {
    id: 12134398274,
    title: "ECE 260 Assignment",
    durationEstimate: moment.duration(3, "h"),
    deadline: moment({ month: 1, day: 3, hour: 17 }),
    priority: Priority.HIGH,
  },
  {
    id: 1232498324,
    title: "Reading",
    durationEstimate: moment.duration(20, "m"),
    deadline: moment({ month: 1, day: 1, hour: 17 }),
    priority: Priority.HIGH,
  },
]
export const mockEvents: EventEntry[] = [
  {
    id: 1238974321,
    title: "Lunch with Michael",
    start: moment({ month: 0, day: 29, hour: 12 }),
    end: moment({ month: 0, day: 29, hour: 13 }),
  },
  {
    id: 1873219123,
    title: "ECE 260",
    start: moment({ month: 0, day: 29, hour: 19 }),
    end: moment({ month: 0, day: 29, hour: 19, minute: 20 }),
    reoccuranceRule: RecurranceRule.WEEKLY,
  },
  {
    id: 287234,
    title: "Meal prep",
    start: moment({ month: 0, day: 28, hour: 17 }),
    end: moment({ month: 0, day: 28, hour: 19 }),
    reoccuranceRule: RecurranceRule.WEEKLY,
  },
  {
    id: 343523,
    title: "WEC Presentations/Judging",
    start: moment({ month: 0, day: 28, hour: 9 }),
    end: moment({ month: 0, day: 28, hour: 15 }),
  },
  {
    id: 876876,
    title: "Flying home",
    start: moment({ month: 0, day: 30, hour: 7 }),
    end: moment({ month: 0, day: 30, hour: 15 }),
  },
]
