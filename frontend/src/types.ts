import type { Moment, Duration } from "moment"

export enum Priority {
  LOW = 0,
  MEDIUM = 1,
  HIGH = 2,
}

export enum RecurranceRule {
  DAILY,
  WEEKLY,
  MONTHLY,
}

export type EventEntry = {
  id: number
  title: string
  start: Moment
  end: Moment
  reoccuranceRule?: RecurranceRule
  type?: "task" | "event"
}

export type TaskEntry = {
  id: number
  title: string
  durationEstimate: Duration
  deadline: Moment
  priority: Priority
  reoccuranceRule?: RecurranceRule
}

export type Config = {
  workingHours: {
    start: number
    end: number
  }
}

export type GlobalState = {
  tasks: TaskEntry[]
  events: EventEntry[]
  config: Config
}
