import React, { useState } from "react"
import "./App.css"
import { CalendarView } from "./components/CalendarView"
import { TaskView } from "./components/TaskView"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/tabs"

function App() {
  const [tabIndex, setTabIndex] = useState(0)

  const handleTabClick = (event: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue)
  }

  return (
    <div className="App">
      <Tabs defaultValue="calendar" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="calendar">Calendar</TabsTrigger>
          <TabsTrigger value="password">Tasks</TabsTrigger>
        </TabsList>
        <TabsContent value="calendar">
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
