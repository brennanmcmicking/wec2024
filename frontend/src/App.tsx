import "./App.css"
import { CalendarView } from "./components/CalendarView"
import { TaskView } from "./components/TaskView"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/tabs"

function App() {
  return (
    <div className="App">
      <Tabs defaultValue="calendar" className="h-screen w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="calendar">Calendar</TabsTrigger>
          <TabsTrigger value="tasks">Tasks</TabsTrigger>
        </TabsList>
        <TabsContent value="calendar" className="h-5/6">
          <CalendarView />
        </TabsContent>
        <TabsContent value="tasks">
          <TaskView />
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default App
