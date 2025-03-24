import { Button } from "primereact/button";
import "../styles/Event.css";
import { useNavigate } from "react-router-dom";
import api from "../interceptor";
import { useEffect, useState } from "react";
import EventCard from "./EventCard";

const Events = () => {
  const navigate = useNavigate();
  const addNewEvent = () => {
    navigate("/add-event");
  };

  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    const response = await api.get("/event/getEvents");
    console.log("response", response.data);
    const respData = response.data;
    await setEvents(respData);
  };

  const handleDelete = (id) => {
    setEvents(events.filter((event) => event._id !== id));
  };

  return (
    <div className="eventCont">
      <div className="eventHeader">
        <div className="pageTitleCont">
          <div className="pageHeader">Event Types</div>
          <div className="pageSubHeader">
            Create events to share for people to book on your calendar. New
          </div>
        </div>
        <div className="addEvent">
          <Button
            className="p-button-rounded"
            outlined
            label="Add new event"
            icon="pi pi-plus"
            onClick={addNewEvent}
          ></Button>
        </div>
      </div>

      <div className="eventBodyCont">
        {events.length === 0 ? (
          <div className="noEventsMessage">No events created</div>
        ) : (
          events.map((event, index) => {
            return (
              <EventCard
                data={event}
                key={index}
                onDelete={handleDelete}
              ></EventCard>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Events;
