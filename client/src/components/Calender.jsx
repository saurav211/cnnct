import { useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import api from "../interceptor";

const localizer = momentLocalizer(moment);

const Calender = () => {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  useEffect(() => {
    getCalendarEvents();
  }, []);

  const getCalendarEvents = async () => {
    const response = await api.get("/event/getCalendarEvents");
    if (response.data) {
      const eventsData = response.data.map((val) => {
        val.start = new Date(val.start);
        val.end = new Date(val.end);
        return val;
      });
      setEvents(eventsData);
    }
  };

  const [events, setEvents] = useState([]);

  const eventPropGetter = (event) => {
    const eventDate = new Date(event.start);
    if (eventDate < today) {
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
