import "../styles/Availability.css";
import { SelectButton } from "primereact/selectbutton";
import { useState } from "react";
import Activity from "./Activity";
import Calender from "./Calender";

const Availability = () => {
  const options = ["Availability", "Calender View"];
  const justifyOptions = [
    { icon: "list", value: "Availability" },
    { icon: "calendar_today", value: "Calender View" },
  ];
  const [value, setValue] = useState(options[0]);
  const justifyTemplate = (option) => {
    return (
      <div className="template-option">
        <span className="material-symbols-outlined">{option.icon}</span>
        <span>{option.value}</span>
      </div>
    );
  };

  return (
    <div className="availability-container">
      <div className="availability-header">Availability</div>
      <div className="availability-subheader">
        Configure times when you are available for bookings
      </div>
      <div className="availability-select">
        <SelectButton
          value={value}
          onChange={(e) => setValue(e.value)}
          itemTemplate={justifyTemplate}
          optionLabel="value"
          options={justifyOptions}
        />
      </div>

      <div className="availibility-body">
        {value === "Availability" ? <Activity /> : <Calender></Calender>}
      </div>
    </div>
  );
};

export default Availability;
