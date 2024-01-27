import { autorun, makeAutoObservable } from "mobx"
import { GlobalState } from "./types"
import moment from "moment"
import { mockEvents, mockTasks } from "./mock/data"

const LOCAL_STORAGE_STATE_KEY = "MICHEALS-ANGELS-STORE"

const DEFAULT_STATE: GlobalState = {
  events: mockEvents,
  tasks: mockTasks,
  config: {
    workingHours: {
      start: 9,
      end: 12 + 5,
    },
  },
}

function serialize(state: GlobalState): unknown {
  return {
    ...state,
    events: [
      state.events.map((event) => ({
        ...event,
        start: event.start.toISOString(),
        end: event.end.toISOString(),
      })),
    ],
    tasks: [
      state.tasks.map((task) => ({
        ...task,
        deadline: task.deadline.toISOString(),
        durationEstimate: task.durationEstimate.toISOString(),
      })),
    ],
  }
}

function deserialize(raw: any): GlobalState {
  return {
    ...raw,
    events: [
      raw.events.map((event: any) => ({
        ...event,
        start: moment(event.start),
        end: moment(event.end),
      })),
    ],
    tasks: [
      raw.tasks.map((task: any) => ({
        ...task,
        deadline: moment(task.deadline),
        durationEstimate: moment.duration(task.durationEstimate),
      })),
    ],
  }
}

function getGlobalStore(): GlobalState {
  const item = window.localStorage.getItem(LOCAL_STORAGE_STATE_KEY)
  if (item === null) return DEFAULT_STATE
  return deserialize(JSON.parse(item))
}

export const store = makeAutoObservable(getGlobalStore())

autorun(() =>
  window.localStorage.setItem(
    LOCAL_STORAGE_STATE_KEY,
    JSON.stringify(serialize(store)),
  ),
)
