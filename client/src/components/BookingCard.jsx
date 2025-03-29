import "../styles/Booking.css";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { useState } from "react";
import { TriStateCheckbox } from "primereact/tristatecheckbox";
import api from "../interceptor";

const BookingCard = ({ data, fetchBooking }) => {
  const {
    title,
    dateTime,
    start,
    end,
    description,
    isEventActive,
    backgroundColor,
    users,
    statusDetail,
    _id,
  } = data;
  console.log("data", data);
  const [visible, setVisible] = useState(false);

  const Status = () => {
    if (statusDetail.status === "Pending") {
      return (
        <div className="pendingCont">
          <Button
            icon="pi pi-ban"
            style={{ height: "2rem" }}
            label="Danger"
            severity="danger"
            onClick={() => {
              changeStatus("Reject");
            }}
          />
          <Button
            icon="pi pi-check"
            style={{ height: "2rem" }}
            label="Success"
            severity="success"
            onClick={() => {
              changeStatus("Accept");
            }}
          />
        </div>
      );
    } else if (statusDetail.status == "Reject") {
      return <div className="rejectedStatus">Rejected</div>;
    } else if (statusDetail.status == "Accept") {
      return <div className="approvedStatus">Accepted</div>;
    }
  };

  const getStatusValue = (status) => {
    if (status == "Pending") {
      return null;
    } else if (status == "Accept") {
      return true;
    } else {
      return false;
    }
  };

  const changeStatus = async (status) => {
    const body = {
      eventId: _id,
      status,
    };
    const respose = await api.post("/event/updateUserStatus", body);
    console.log("response", respose);
    fetchBooking();
  };

  return (
    <div className="BookingCardCont">
      <div className="BookingTimeDetail">
        <div>{new Date(dateTime).toDateString()}</div>
        <div style={{ color: "var(--primary-color)" }}>
          {new Date(start).toLocaleTimeString()} -{" "}
          {new Date(end).toLocaleTimeString()}
        </div>
      </div>
      <div className="BookingInfoDetail">
        <div className="BookingTitle">{title}</div>
        <div className="BookingPeople">You and {users.length - 1} people</div>
      </div>
      <div className="statusActionContainer">{<Status></Status>}</div>
      <div
        style={{
          display: "flex",
          gap: "0.5rem",
          alignItems: "center",
          cursor: "pointer",
        }}
        onClick={() => {
          setVisible(true);
        }}
      >
        <span
          className="material-symbols-outlined"
          style={{ fontSize: "1.3rem" }}
        >
          group
        </span>
        {users.length} people
      </div>
      <Dialog
        header={"Participants (" + users.length + " )"}
        visible={visible}
        position="right"
        style={{ width: "30vw" }}
        onHide={() => {
          if (!visible) return;
          setVisible(false);
        }}
        draggable={false}
        resizable={false}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {users.map((user, index) => {
            return (
              <div className="dialogUserList" key={index}>
                <div className="userDetailDialog">
                  <div className="profileIconDialog"></div>
                  <div className="userNameDialog">{user.email}</div>
                </div>
                <div className="userStatusCont">
                  <TriStateCheckbox
                    value={getStatusValue(user.status)}
                    readOnly
                  />
                </div>
              </div>
            );
          })}
        </div>
      </Dialog>
    </div>
  );
};
export default BookingCard;
