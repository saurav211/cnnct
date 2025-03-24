import React, { useState } from "react";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { InputSwitch } from "primereact/inputswitch";
import api from "../interceptor";
import { useNavigate } from "react-router-dom";

import "../styles/Event.css";

const EventCard = ({ data, onDelete }) => {
  const {
    title,
    dateTime,
    start,
    end,
    description,
    isEventActive,
    backgroundColor,
  } = data;

  const [isActive, setEventActive] = useState(isEventActive);
  const isPastEvent = new Date(dateTime) < new Date();
  const headerStyle = {
    borderTop: `1rem solid ${!isActive ? "dimgray" : "var(--primary-color)"}`,
  };

  const calculateDuration = (start, end) => {
    const durationMs = new Date(end) - new Date(start);
    const durationMin = Math.floor(durationMs / 60000);
    if (durationMin < 60) {
      return `${durationMin} min`;
    } else {
      const hours = Math.floor(durationMin / 60);
      const minutes = durationMin % 60;
      return minutes > 0 ? `${hours} hr ${minutes} min` : `${hours} hr`;
    }
  };

  const duration = calculateDuration(start, end);

  const updateEventActiveStatus = async (id, isActive) => {
    try {
      await api.put(`event/update/${id}`, { isEventActive: isActive });
    } catch (error) {
      console.error("Failed to update event status", error);
    }
  };

  const deleteEvent = async (id) => {
    try {
      await api.delete(`event/delete/${id}`);
      onDelete(id);
    } catch (error) {
      console.error("Failed to delete event", error);
    }
  };

  const handleActiveChange = (e) => {
    setEventActive(e.value);
    updateEventActiveStatus(data._id, e.value);
  };

  const navigate = useNavigate();

  const header = (
    <div className="event-header" style={headerStyle}>
      <h2>{title}</h2>
      <Button
        icon="pi pi-pencil"
        className="p-button-rounded p-button-text"
        plain
        text
        onClick={() => navigate(`/edit-event/${data._id}`)}
      />
    </div>
  );

  const footer = (
    <div className="event-footer">
      <InputSwitch checked={isActive} onChange={handleActiveChange} />
      <Button
        icon="pi pi-trash"
        className="p-button-rounded p-button-text"
        plain
        text
        onClick={() => deleteEvent(data._id)}
      />
    </div>
  );

  return (
    <Card header={header} footer={footer} className="event-card">
      <div className="event-details">
        <div>{new Date(dateTime).toDateString()}</div>
        <div style={{ color: "var(--primary-color)" }}>
          {new Date(start).toLocaleTimeString()} -{" "}
          {new Date(end).toLocaleTimeString()}
        </div>
        <p>{duration}, Group Meeting</p>
      </div>
    </Card>
  );
};

export default EventCard;
