import FullCalendar from "@fullcalendar/react"
import timeGridPlugin from "@fullcalendar/timegrid"
import { AddEventDialog } from "./AddEventDialog"
import { CalendarDisplayEntry } from "../types"
import { EventInput } from "@fullcalendar/core/index.js"
import { createRef, useRef } from "react"

export interface CalendarViewProps {
  events?: CalendarDisplayEntry[]
}

const mockData = [
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
  {
    id: "lunch-with-michael",
    title: "Lunch with Michael Adams",
    start: "2024-01-31 12:00",
    end: "2024-01-31 13:00",
    color: "blue",
  },
]

export const CalendarView = (props: CalendarViewProps) => {
  const calendarRef = createRef<FullCalendar>()

  const formatEvents = (): EventInput[] => {
    if (props.events) {
      console.log("using real event data")
      console.log(props.events)
      const res = props.events.map((event) => {
        return {
          id: event.id.toString(),
          title: event.title,
          start: event.start.toISOString(),
          end: event.end.toISOString(),
          color: event.type === "event" ? "#09265e" : "#e84c4b",
        }
      })
      console.log(res)
      return res
    } else {
      return mockData
    }
  }

  return (
    <div id="calendar-view-container" className="flex h-full w-full gap-5 p-10">
      <div id="calendar-container" className="w-full">
        <div className="grid place-content-center">
          <AddEventDialog />
        </div>
        <FullCalendar
          ref={calendarRef}
          height="100%"
          plugins={[timeGridPlugin]}
          initialView="timeGridWeek"
          events={formatEvents()}
          weekends
          eventInteractive={false}
          headerToolbar={{
            start: "customPreviousButton",
            center: "title",
            end: "customNextButton",
          }}
          customButtons={{
            customPreviousButton: {
              text: "Previous",
              click: () => {
                let calendarApi = calendarRef.current?.getApi()
                calendarApi?.prev()
              },
            },
            customNextButton: {
              text: "Next",
              click: () => {
                let calendarApi = calendarRef.current?.getApi()
                calendarApi?.next()
              },
            },
          }}
        />
      </div>
    </div>
  )
}
