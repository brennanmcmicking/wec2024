import FullCalendar from "@fullcalendar/react"
import timeGridPlugin from "@fullcalendar/timegrid"
import { AddEventDialog } from "./AddEventDialog"
import { CalendarDisplayEntry } from "../types"
import { EventInput } from "@fullcalendar/core/index.js"

export interface CalendarViewProps {
  events?: CalendarDisplayEntry[]
}

export const CalendarView = (props: CalendarViewProps) => {
  const formatEvents = (): EventInput[] => {
    if (props.events) {
      return props.events.map((event) => {
        return {
          id: event.id.toString(),
          title: event.title,
          start: event.start.toISOString(),
          end: event.end.toISOString(),
          color: event.type === "event" ? "blue" : "red",
        }
      })
    } else {
      return [
        {
          id: "wec-design",
          title: "WEC Design",
          start: "2024-01-27 10:00",
          end: "2024-01-27 19:00",
          color: "blue",
        },
        {
          id: "wec-present",
          title: "WEC Presentation (placeholder)",
          start: "2024-01-28 12:00",
          end: "2024-01-28 12:45",
          color: "blue",
        },
        // {
        //   id: "youre-mom",
        //   title: "Dinner with your mom",
        //   start: "2024-01-27 19:00",
        //   end: "2024-01-27 19:30",
        //   color: "red",
        // },
        {
          id: "lunch-with-michael",
          title: "Lunch with Michael Adams",
          start: "2024-01-31 12:00",
          end: "2024-01-31 13:00",
          color: "blue",
        },
      ]
    }
  }

  return (
    <div id="calendar-view-container" className="flex h-full w-full gap-5 p-10">
      <div id="calendar-container" className="w-full">
        <AddEventDialog />
        <FullCalendar
          height="100%"
          plugins={[timeGridPlugin]}
          initialView="timeGridWeek"
          events={formatEvents()}
          weekends
          eventInteractive={false}
        />
      </div>
    </div>
  )
}
