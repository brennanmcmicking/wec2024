import { autorun, makeAutoObservable } from "mobx"
import { GlobalState } from "./types"
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

function getGlobalStore(): GlobalState {
  const item = window.localStorage.getItem(LOCAL_STORAGE_STATE_KEY)
  if (item === null) return DEFAULT_STATE
  return JSON.parse(item)
}

export const store = makeAutoObservable(getGlobalStore())

autorun(() =>
  window.localStorage.setItem(LOCAL_STORAGE_STATE_KEY, JSON.stringify(store)),
)
