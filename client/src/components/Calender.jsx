import { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

const Calender = () => {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  const [events, setEvents] = useState([
    {
      title: "Meeting",
      start: new Date(today.setHours(10, 0)),
      end: new Date(today.setHours(12, 0)),
    },
    {
      title: "Lunch",
      start: new Date(tomorrow.setHours(12, 0)),
      end: new Date(tomorrow.setHours(13, 0)),
    },
    {
      title: "Conference",
      start: new Date(yesterday.setHours(9, 0)),
      end: new Date(yesterday.setHours(10, 0)),
    },
  ]);

  const eventPropGetter = (event) => {
    const eventDate = new Date(event.start);
    if (
      eventDate.getFullYear() === yesterday.getFullYear() &&
      eventDate.getMonth() === yesterday.getMonth() &&
      eventDate.getDate() === yesterday.getDate()
    ) {
      return { style: { backgroundColor: "gray" } };
    }
    return {};
  };

  return (
    <div>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        views={["month", "week", "day", "agenda"]}
        defaultView="week"
        toolbar={true}
        popup={true}
        eventPropGetter={eventPropGetter}
      />
    </div>
  );
};

export default Calender;
