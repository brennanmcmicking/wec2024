import moment, { duration } from "moment"
import { EventEntry, Priority, RecurranceRule, TaskEntry } from "../types"

export const mockTasks: TaskEntry[] = [
  {
    id: 0,
    title: "Task 0",
    durationEstimate: duration(1, "h"),
    deadline: moment({ month: 1, day: 28, hour: 12 }),
    priority: Priority.MEDIUM,
  },
  {
    id: 1,
    title: "Task 1",
    durationEstimate: duration(3, "h"),
    deadline: moment({ month: 1, day: 29, hour: 17 }),
    priority: Priority.MEDIUM,
  },
  {
    id: 2,
    title: "Task 2",
    durationEstimate: duration(20, "m"),
    deadline: moment({ month: 2, day: 1, hour: 17 }),
    priority: Priority.HIGH,
  },
  {
    id: 3,
    title: "Task 3",
    durationEstimate: duration(7, "h"),
    deadline: moment({ month: 2, day: 1, hour: 9 }),
    priority: Priority.MEDIUM,
  },
  {
    id: 4,
    title: "Task 4",
    durationEstimate: duration(1, "h"),
    deadline: moment({ month: 2, day: 3, hour: 17 }),
    priority: Priority.LOW,
  },
  {
    id: 5,
    title: "Task 5",
    durationEstimate: duration(4, "h"),
    deadline: moment({ month: 2, day: 4, hour: 12 }),
    priority: Priority.MEDIUM,
  },
  {
    id: 6,
    title: "Task 6",
    durationEstimate: duration(45, "m"),
    deadline: moment({ month: 2, day: 5, hour: 17 }),
    priority: Priority.MEDIUM,
  },

  {
    id: 7,
    title: "Task 7",
    durationEstimate: duration(45, "m"),
    deadline: moment({ month: 2, day: 5, hour: 17 }),
    priority: Priority.MEDIUM,
    reoccuranceRule: RecurranceRule.WEEKLY,
  },
  {
    id: 8,
    title: "Yoga",
    durationEstimate: duration(30, "m"),
    deadline: moment({ month: 2, day: 5, hour: 17 }),
    priority: Priority.MEDIUM,
    reoccuranceRule: RecurranceRule.DAILY,
  },
]

export const mockEvents: EventEntry[] = [
  {
    id: 0,
    title: "Lunch with Michael",
    start: moment({ month: 1, day: 28, hour: 12 }),
    end: moment({ month: 1, day: 28, hour: 13 }),
  },
  {
    id: 1,
    title: "ECE 260",
    start: moment({ month: 1, day: 29, hour: 17 }),
    end: moment({ month: 1, day: 29, hour: 18, minute: 20 }),
    reoccuranceRule: RecurranceRule.WEEKLY,
  },
  {
    id: 2,
    title: "Meal prep",
    start: moment({ month: 1, day: 28, hour: 17 }),
    end: moment({ month: 1, day: 28, hour: 19 }),
    reoccuranceRule: RecurranceRule.WEEKLY,
  },
]
