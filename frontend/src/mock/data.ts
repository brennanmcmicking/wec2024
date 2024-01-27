import moment from "moment"
import { EventEntry, Priority, RecurranceRule, TaskEntry } from "../types"

export const mockTasks: TaskEntry[] = [
  {
    id: 0,
    title: "Task 0",
    durationEstimate: moment.duration(1, "h"),
    deadline: moment({ month: 0, day: 28, hour: 12 }),
    priority: Priority.MEDIUM,
  },
  {
    id: 1,
    title: "Task 1",
    durationEstimate: moment.duration(3, "h"),
    deadline: moment({ month: 0, day: 29, hour: 17 }),
    priority: Priority.MEDIUM,
  },
  {
    id: 2,
    title: "Task 2",
    durationEstimate: moment.duration(20, "m"),
    deadline: moment({ month: 1, day: 1, hour: 17 }),
    priority: Priority.HIGH,
  },
  {
    id: 3,
    title: "Task 3",
    durationEstimate: moment.duration(7, "h"),
    deadline: moment({ month: 1, day: 1, hour: 9 }),
    priority: Priority.MEDIUM,
  },
  {
    id: 4,
    title: "Task 4",
    durationEstimate: moment.duration(1, "h"),
    deadline: moment({ month: 1, day: 3, hour: 17 }),
    priority: Priority.LOW,
  },
  {
    id: 5,
    title: "Task 5",
    durationEstimate: moment.duration(4, "h"),
    deadline: moment({ month: 1, day: 4, hour: 12 }),
    priority: Priority.MEDIUM,
  },
  {
    id: 6,
    title: "Task 6",
    durationEstimate: moment.duration(45, "m"),
    deadline: moment({ month: 1, day: 5, hour: 17 }),
    priority: Priority.MEDIUM,
  },

  {
    id: 7,
    title: "Task 7",
    durationEstimate: moment.duration(45, "m"),
    deadline: moment({ month: 1, day: 5, hour: 17 }),
    priority: Priority.MEDIUM,
    reoccuranceRule: RecurranceRule.WEEKLY,
  },
  {
    id: 8,
    title: "Yoga",
    durationEstimate: moment.duration(30, "m"),
    deadline: moment({ month: 1, day: 5, hour: 17 }),
    priority: Priority.MEDIUM,
    reoccuranceRule: RecurranceRule.DAILY,
  },
]

export const mockEvents: EventEntry[] = [
  {
    id: 0,
    title: "Lunch with Michael",
    start: moment({ month: 0, day: 28, hour: 12 }),
    end: moment({ month: 0, day: 28, hour: 13 }),
  },
  {
    id: 1,
    title: "ECE 260",
    start: moment({ month: 0, day: 29, hour: 17 }),
    end: moment({ month: 0, day: 29, hour: 18, minute: 20 }),
    reoccuranceRule: RecurranceRule.WEEKLY,
  },
  {
    id: 2,
    title: "Meal prep",
    start: moment({ month: 0, day: 28, hour: 17 }),
    end: moment({ month: 0, day: 28, hour: 19 }),
    reoccuranceRule: RecurranceRule.WEEKLY,
  },
]
