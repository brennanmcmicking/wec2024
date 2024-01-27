import FullCalendar from "@fullcalendar/react"
import timeGridPlugin from "@fullcalendar/timegrid"

export interface CalendarViewProps {}

export const CalendarView = (props: CalendarViewProps) => {
  return (
    <div id="calendar-view-container" className="flex h-full w-full gap-5 p-10">
      <div id="calendar-container" className="w-full">
        <FullCalendar
          height="100%"
          weekends
          plugins={[timeGridPlugin]}
          initialView="timeGridWeek"
        />
      </div>
    </div>
  )
}
