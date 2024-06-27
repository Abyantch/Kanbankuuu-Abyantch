import { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

function Calendar({ tasks, onEventClick }) {
  const [calendarEvents, setCalendarEvents] = useState([]);

  useEffect(() => {
    const newCalendarEvents = [];
    for (const column in tasks) {
      tasks[column].forEach((task) => {
        if (task.deadline) {
          newCalendarEvents.push({
            title: task.title,
            start: task.deadline,
            allDay: true, // Adjust if you have specific times
          });
        }
      });
    }
    setCalendarEvents(newCalendarEvents);
  }, [tasks]);

  return (
    <FullCalendar
      plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
      initialView="dayGridMonth"
      events={calendarEvents}
      height={400}
      eventClick={onEventClick}
    />
  );
}

export default Calendar;
