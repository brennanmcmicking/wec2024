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
    // if we've been given a list of events, map them to the format expected by
    // the FullCalendar component and then pass them along
    if (props.events) {
      // console.log("using real event data")
      // console.log(props.events)
      const res = props.events.map((event) => {
        return {
          id: event.id.toString(), // the task scheduler stores event ids as numbers, but the calendar wants string
          title: event.title,
          start: event.start.toISOString(), // Moment --> ISO string
          end: event.end.toISOString(), // Moment --> ISO string
          color: event.type === "event" ? "#09265e" : "#e84c4b", // tasks and events have different colours to allow for easy differentiation
        }
      })
      // console.log(res)
      return res
    } else {
      // if we were not passed any data, use the mock data above
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
                // use the calendarRef to go to the previous page
                let calendarApi = calendarRef.current?.getApi()
                calendarApi?.prev()
              },
            },
            customNextButton: {
              text: "Next",
              click: () => {
                // use the calendarRef to go to the next page
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
