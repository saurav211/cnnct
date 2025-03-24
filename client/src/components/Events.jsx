import { Button } from "primereact/button";
import "../styles/Event.css";
import { useNavigate } from "react-router-dom";

const Events = () => {
  const navigate = useNavigate();
  const addNewEvent = () => {
    navigate("/add-event");
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
    </div>
  );
};

export default Events;
