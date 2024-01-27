import "./App.css"
import { CalendarView } from "./components/CalendarView"
import { TaskView } from "./components/TaskView"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/tabs"
import { createUiSchedule } from "./libs/scheduling"
import { store } from "./store"
import { observer } from "mobx-react-lite"

const App = observer(() => {
  return (
    <div className="App">
      <Tabs defaultValue="calendar" className="h-screen w-full">
        <TabsList
          className="grid w-full grid-cols-2"
          aria-label="Calendar and Task selection bar"
        >
          <TabsTrigger value="calendar" aria-label="Calendar tab selector">
            Calendar
          </TabsTrigger>
          <TabsTrigger value="password" aria-label="Task tab selector">
            Tasks
          </TabsTrigger>
        </TabsList>
        <TabsContent value="calendar" className="h-5/6">
          <CalendarView events={createUiSchedule(store.events, store.tasks)} />
        </TabsContent>
        <TabsContent value="tasks">
          <TaskView />
        </TabsContent>
      </Tabs>
    </div>
  )
})

export default App
