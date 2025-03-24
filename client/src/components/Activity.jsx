import { useState, useEffect, useRef } from "react";
import { Checkbox } from "primereact/checkbox";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";
import api from "../interceptor";
import "../styles/Activity.css";
import { Calendar } from "primereact/calendar";

const Activity = () => {
  const [activities, setActivities] = useState([]);
  const [count, setCount] = useState(0);
  const [checked, setChecked] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const toast = useRef(null);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await api.get("/activity/getAllActivities");
        console.log("activities", response.data);
        let newActivities = response.data.map((activity) => {
          activity.addTime = { startTime: "", endTime: "" };
          return activity;
        });
        setActivities(newActivities);
      } catch (error) {
        toast.current.show({
          severity: "error",
          summary: "Error",
          detail: "Error fetching activities",
          life: 3000,
        });
      }
    };
    fetchActivities();
  }, [count]);

  const handleAddTime = async (activity) => {
    try {
      const startTime = activity.addTime.startTime.toTimeString().slice(0, 5);
      const endTime = activity.addTime.endTime.toTimeString().slice(0, 5);
      const response = await api.post("/activity/addAvailableTime", {
        day: activity.day,
        startTime,
        endTime,
      });
      setCount(count + 1);
      toast.current.show({
        severity: "success",
        summary: "Success",
        detail: "Time added successfully",
        life: 3000,
      });
    } catch (error) {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "Error adding time",
        life: 3000,
      });
    }
  };

  const handleDeleteTime = async (day, timeId) => {
    try {
      const response = await api.post("/activity/deleteAvailableTime", {
        day,
        timeId,
      });
      setCount(count + 1);
      toast.current.show({
        severity: "success",
        summary: "Success",
        detail: "Time deleted successfully",
        life: 3000,
      });
    } catch (error) {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "Error deleting time",
        life: 3000,
      });
    }
  };

  const handleCheckboxChange = async (activity) => {
    const day = activity.day;
    const isAvailable = activity.isAvailable;
    try {
      const response = await api.post("/activity/updateAvailability", {
        day,
        isAvailable,
      });
      setCount(count + 1);
      toast.current.show({
        severity: "success",
        summary: "Success",
        detail: "Availability updated successfully",
        life: 3000,
      });
    } catch (error) {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "Error updating availability",
        life: 3000,
      });
    }
  };

  return (
    <div className="activity-container-card">
      <Toast ref={toast} />
      <div className="activity-container-card-header">
        <div className="activity-d">
          <div className="activity-d-1">Activity</div>
          <div className="activity-d-2">Event Type</div>
        </div>
        <div className="activity-d">
          <div className="activity-d-1">Time Zone</div>
          <div className="activity-d-2">Indian Time Standard</div>
        </div>
      </div>
      <div className="activity-container-card-body">
        <div className="activity-body-title">Weekly hours</div>
        <div className="activity-body-content">
          {activities.map((activity, index) => {
            return (
              <div className="activity-item" key={activity._id}>
                <div className="activity-day">
                  <Checkbox
                    className="activity-checkbox"
                    inputId={activity.day}
                    checked={activity.isAvailable}
                    onChange={(e) => {
                      setChecked(e.checked);
                      activity.isAvailable = e.checked;
                      handleCheckboxChange(activity);
                    }}
                  />
                  <label htmlFor={activity.day}>{activity.day}</label>
                </div>
                {activity.isAvailable ? (
                  <div>
                    {activity.availableTimes.map((time) => {
                      return (
                        <div key={time._id} className="activity-time">
                          <InputText value={time.startTime} readOnly />
                          -<InputText value={time.endTime} readOnly />
                          <Button
                            icon="pi pi-times"
                            className="p-button-text p-button-plain p-button-rounded"
                            onClick={() =>
                              handleDeleteTime(activity.day, time._id)
                            }
                          />
                        </div>
                      );
                    })}
                    <div className="activity-add-time">
                      <Calendar
                        value={activity.addTime.startTime}
                        placeholder="Start Time"
                        onChange={(e) => {
                          setStartTime(e.value);
                          activity.addTime.startTime = e.value;
                        }}
                        timeOnly
                      />
                      -
                      <Calendar
                        value={activity.addTime.endTime}
                        placeholder="End Time"
                        onChange={(e) => {
                          setEndTime(e.value);
                          activity.addTime.endTime = e.value;
                        }}
                        timeOnly
                      />
                      <Button
                        icon="pi pi-plus"
                        className="p-button-text p-button-plain p-button-rounded"
                        onClick={() => handleAddTime(activity)}
                      />
                    </div>
                  </div>
                ) : (
                  <div>Unavailable</div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Activity;
