import type { Moment, Duration } from "moment"

enum Priority {
  LOW = 0,
  MEDIUM = 1,
  HIGH = 2,
}

enum RecurranceRule {
  DAILY,
  WEEKLY,
  MONTHLY,
}

type EventEntry = {
  id: number
  title: string
  start: Moment
  end: Moment
  reoccuranceRule?: RecurranceRule
}

type TaskEntry = {
  id: number
  title: string
  durationEstimate: Duration
  deadline: Moment
  priority: Priority
  reoccuranceRule?: RecurranceRule
}

type Config = {
  workingHours: {
    start: number
    end: number
  }
}

type GlobalState = {
  tasks: TaskEntry[]
  events: EventEntry[]
  config: Config
}
