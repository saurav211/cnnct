import { Card } from "primereact/card";
import { TabView, TabPanel } from "primereact/tabview";
import "../styles/Booking.css";
import { useEffect, useState } from "react";
import api from "../interceptor";
import { jwtDecode } from "jwt-decode";
import BookingCard from "./BookingCard";

const Booking = () => {
  const [pending, setPending] = useState([]);
  const [past, setPast] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [cancelled, setCancelled] = useState([]);
  const [userDetail, setUserDetail] = useState({});
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      setUserDetail(decodedToken._doc);
    }
  }, []);

  useEffect(() => {
    console.log("user", userDetail.email);
    if (userDetail.email) {
      fetchBookings();
    }
  }, [userDetail]);

  const fetchBookings = async () => {
    const response = await api.get("/event/getUserEvents");
    let respData = response.data;
    filterEvents(respData);
  };

  const filterEvents = (data) => {
    const today = new Date().toISOString();

    data = data.map((item) => {
      console.log("iteem", item);
      item.users.map((user) => {
        if (user.email === userDetail.email) {
          item.statusDetail = user;
        }
      });
      return item;
    });

    const pendingEvents = data.filter(
      (event) =>
        event.users.some(
          (user) => user.email === userDetail.email && user.status === "Pending"
        ) && event.dateTime >= today
    );
    setPending(pendingEvents);

    const pastEvents = data.filter((event) => event.dateTime < today);
    setPast(pastEvents);

    const upcomingEvents = data.filter(
      (event) =>
        event.users.some(
          (user) => user.email === userDetail.email && user.status === "Accept"
        ) && event.dateTime >= today
    );
    setUpcoming(upcomingEvents);
    console.log("upcoming", upcomingEvents);

    const cancelledEvents = data.filter(
      (event) =>
        event.users.some(
          (user) => user.email === userDetail.email && user.status === "Reject"
        ) && event.dateTime >= today
    );
    setCancelled(cancelledEvents);
  };

  return (
    <div className="BookingContainer">
      <div className="pageTitleCont">
        <div className="pageHeader">Booking</div>
        <div className="pageSubHeader">
          See upcoming and past events booked through your event type links.
        </div>
      </div>
      <Card className="bookingBody">
        <TabView>
          <TabPanel header="Upcoming">
            {upcoming.length > 0 ? (
              upcoming.map((item, key) => {
                return (
                  <BookingCard
                    data={item}
                    key={key}
                    fetchBooking={fetchBookings}
                  />
                );
              })
            ) : (
              <div>No Upcoming Event</div>
            )}
          </TabPanel>
          <TabPanel header="Pending">
            {pending.length > 0 ? (
              pending.map((item, key) => {
                return (
                  <BookingCard
                    data={item}
                    key={key}
                    fetchBooking={fetchBookings}
                  />
                );
              })
            ) : (
              <div>No Pending Event</div>
            )}
          </TabPanel>
          <TabPanel header="Cancelled">
            {cancelled.length > 0 ? (
              cancelled.map((item, key) => {
                return (
                  <BookingCard
                    data={item}
                    key={key}
                    fetchBooking={fetchBookings}
                  />
                );
              })
            ) : (
              <div>No Cancelled Event</div>
            )}
          </TabPanel>
          <TabPanel header="Past">
            {past.length > 0 ? (
              past.map((item, key) => {
                return (
                  <BookingCard
                    data={item}
                    key={key}
                    fetchBooking={fetchBookings}
                  />
                );
              })
            ) : (
              <div>No Past Event</div>
            )}
          </TabPanel>
        </TabView>
      </Card>
    </div>
  );
};

export default Booking;
