import { useEffect, useState, useRef } from "react";
import "../styles/AddEvent.css";
import { InputText } from "primereact/inputtext";
import { Calendar } from "primereact/calendar";
import { InputTextarea } from "primereact/inputtextarea";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { useNavigate, useParams } from "react-router-dom";
import { ColorPicker } from "primereact/colorpicker";
import profile from "../assets/profile.png";
import { Toast } from "primereact/toast";
import { jwtDecode } from "jwt-decode";
import { Chips } from "primereact/chips";
import api from "../interceptor";

const AddEvent = () => {
  const toast = useRef(null);
  const [step, setStep] = useState(1);
  const [date, setDate] = useState(null);
  const [time, setTime] = useState(null);
  const [hostList, setHostList] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const data = localStorage.getItem("token");
    if (data) {
      const decodedToken = jwtDecode(data);
      let user = {
        email: decodedToken._doc.email,
        id: decodedToken._doc._id,
        name: decodedToken._doc.firstName + " " + decodedToken._doc.lastName,
      };
      setHostList([user]);
    }
  }, []);

  useEffect(() => {
    if (id) {
      fetchEventDetails(id);
    }
  }, [id]);

  const fetchEventDetails = async (eventId) => {
    try {
      const response = await api.get(`/event/${eventId}`);
      const eventData = response.data;
      setFormData({
        title: eventData.title,
        password: eventData.password,
        backgroundColor: eventData.backgroundColor,
        hostname: eventData.hostname,
        description: eventData.description,
        dateTime: new Date(eventData.dateTime),
        duration: eventData.duration,
        link: eventData.link,
        users: eventData.users.map((user) => user.email),
      });
      setDate(new Date(eventData.dateTime));
      setTime(new Date(eventData.dateTime));
    } catch (error) {
      console.error("Error fetching event details:", error);
    }
  };

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    password: "",
    backgroundColor: "gray",
    hostname: "",
    description: "",
    dateTime: "",
    duration: "",
    link: "",
    users: [],
  });
  const cities = [
    { name: "15 min", value: 15 },
    { name: "30 min", value: 30 },
    { name: "1 hour", value: 60 },
    { name: "1 hour 30 min", value: 90 },
    { name: "2 hour", value: 120 },
  ];

  useEffect(() => {
    if (date && time) {
      const combinedDateTime =
        date && time
          ? new Date(date.setHours(time.getHours(), time.getMinutes()))
          : null;
      setFormData({ ...formData, dateTime: combinedDateTime });
      checkAvailabilityTime(formData.dateTime);
    }
  }, [time, date]);

  const nextStep = () => {
    if (
      formData.title == "" ||
      formData.title == null ||
      formData.title == undefined
    ) {
      toast.current.show({
        severity: "warn",
        summary: "Title is required",
        detail: "",
        life: 3000,
      });
      return;
    }
    if (
      formData.hostname == "" ||
      formData.hostname == null ||
      formData.hostname == undefined
    ) {
      toast.current.show({
        severity: "warn",
        summary: "Hostname is required",
        detail: "",
        life: 3000,
      });
      return;
    }
    if (date == "" || date == null || date == undefined) {
      toast.current.show({
        severity: "warn",
        summary: "Date is required",
        detail: "",
        life: 3000,
      });
      return;
    }
    if (time == "" || time == null || time == undefined) {
      toast.current.show({
        severity: "warn",
        summary: "Time is required",
        detail: "",
        life: 3000,
      });
      return;
    }
    setStep(2);
  };

  const submitForm = async () => {
    if (
      formData.link == "" ||
      formData.link == null ||
      formData.link == undefined
    ) {
      toast.current.show({
        severity: "warn",
        summary: "Link is required",
        detail: "",
        life: 3000,
      });
      return;
    }
    if (
      formData.users == "" ||
      formData.users == null ||
      formData.users == undefined ||
      formData.users.length == 0
    ) {
      toast.current.show({
        severity: "warn",
        summary: "Users are required",
        detail: "",
        life: 3000,
      });
      return;
    }

    try {
      let response;
      if (id) {
        response = await api.put(`/event/update/${id}`, formData);
      } else {
        response = await api.post("/event/create", formData);
      }
      if (response && response.data) {
        toast.current.show({
          severity: "success",
          summary: response.data.message,
          detail: "",
          life: 3000,
        });
        navigate("/events");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const checkAvailabilityTime = async (dateTime) => {
    const response = await api.post("/event/checkTimeAvailability", {
      dateTime,
    });
    if (!response.data.isAvailable) {
      toast.current.show({
        severity: "warn",
        summary: "You are not available in this time.",
        detail: "",
        life: 3000,
      });
      return;
    }
  };

  return (
    <div className="addEventCont">
      <Toast ref={toast} />
      <div className="pageTitleCont">
        <div className="pageHeader">{id ? "Edit Event" : "Create Event"}</div>
        <div className="pageSubHeader">
          {id
            ? "Edit the details of your event."
            : "Create events to share for people to book on your calendar."}
        </div>
      </div>
      <div className="addEventBody">
        <div className="addEventCard">
          <div className="addEventHeader">
            {id ? "Edit Event" : "Add Event"}
          </div>
          {step == 1 ? (
            <>
              <div className="formGroupBody">
                <div className="formGroup">
                  <div className="formLabel">
                    Event Topic <span className="formRequired">*</span>
                  </div>
                  <div className="formInput">
                    <InputText
                      value={formData.title}
                      placeholder="Set a conference topic before it starts"
                      onChange={(e) => {
                        formData.title = e.target.value;
                        setFormData({ ...formData });
                      }}
                      required
                    ></InputText>
                  </div>
                </div>
                <div className="formGroup">
                  <div className="formLabel">Password</div>
                  <div className="formInput">
                    <InputText
                      placeholder="Password"
                      value={formData.password}
                      onChange={(e) => {
                        formData.password = e.target.value;
                        setFormData({ ...formData });
                      }}
                    ></InputText>
                  </div>
                </div>
                <div className="formGroup">
                  <div className="formLabel">
                    Hostname <span className="formRequired">*</span>
                  </div>
                  <div className="formInput">
                    <Dropdown
                      value={formData.hostname}
                      options={hostList}
                      optionLabel="name"
                      style={{ width: "100%" }}
                      onChange={(e) => {
                        setFormData({ ...formData, hostname: e.value });
                      }}
                    ></Dropdown>
                  </div>
                </div>
                <div className="formGroup">
                  <div className="formLabel">Description</div>
                  <div className="formInput">
                    <InputTextarea
                      autoResize
                      rows={5}
                      cols={30}
                      value={formData.description}
                      onChange={(e) => {
                        formData.description = e.target.value;
                        setFormData({ ...formData });
                      }}
                    />
                  </div>
                </div>
              </div>
              <div>
                <div className="formGroup">
                  <div className="formLabel">
                    Date and time <span className="formRequired">*</span>
                  </div>
                  <div className="formInput">
                    <Calendar
                      className="formInputYear"
                      dateFormat="dd/mm/yy"
                      placeholder="dd/mm/yy"
                      value={date}
                      required
                      onChange={(e) => setDate(e.value)}
                    />
                    <Calendar
                      className="formInputTime"
                      timeOnly
                      value={time}
                      required
                      onChange={(e) => setTime(e.value)}
                    ></Calendar>
                  </div>
                </div>
                <div className="formGroup">
                  <div className="formLabel">Set Duration</div>
                  <div className="formInput">
                    <Dropdown
                      value={formData.duration}
                      onChange={(e) => {
                        setFormData({ ...formData, duration: e.value });
                      }}
                      options={cities}
                      optionLabel="name"
                      placeholder="Select duration"
                      className="w-full md:w-14rem"
                    />
                  </div>
                </div>
                <div className="formBtnCont">
                  <Button
                    label="Cancel"
                    text
                    rounded
                    onClick={(e) => {
                      navigate("/events");
                    }}
                  ></Button>
                  <Button label="Save" rounded onClick={nextStep}></Button>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="formGroupBody">
                <div className="formBackCont">
                  <div className="formGroupBack">
                    <div className="formBackTitle">Banner</div>
                    <div
                      className="formBackGround"
                      style={{ background: formData.backgroundColor }}
                    >
                      <div>
                        <img src={profile}></img>
                      </div>
                    </div>
                  </div>
                  <div className="predefinedColorCont">
                    <div className="predefinedHeader">
                      Choose Background Color
                    </div>
                    <div className="predefinedColorGroup">
                      <div
                        className="preDefinedColor"
                        style={{ background: "orange" }}
                        onClick={() => {
                          formData.backgroundColor = "#ffa500";
                          setFormData({ ...formData });
                        }}
                      ></div>
                      <div
                        className="preDefinedColor"
                        style={{ background: "yellow" }}
                        onClick={() => {
                          formData.backgroundColor = "#ffff00";
                          setFormData({ ...formData });
                        }}
                      ></div>
                      <div
                        className="preDefinedColor"
                        style={{ background: "black" }}
                        onClick={() => {
                          formData.backgroundColor = "#000000";
                          setFormData({ ...formData });
                        }}
                      ></div>
                    </div>
                    <div className="colorSelect">
                      <ColorPicker
                        format="hex"
                        value={formData.backgroundColor}
                        onChange={(e) => {
                          formData.backgroundColor = "#" + e.value;
                          setFormData({ ...formData });
                        }}
                      />
                      <InputText
                        style={{ marginLeft: "1rem" }}
                        value={formData.backgroundColor}
                        readOnly
                      ></InputText>
                    </div>
                  </div>
                </div>
              </div>
              <div className="formGroup">
                <div className="formLabel">
                  Add Link <span className="formRequired">*</span>
                </div>
                <div className="formInput">
                  <InputText
                    placeholder="Set a conference topic before it starts"
                    required
                    value={formData.link}
                    onChange={(e) => {
                      setFormData({ ...formData, link: e.target.value });
                    }}
                  ></InputText>
                </div>
              </div>
              <div className="formGroup">
                <div className="formLabel">
                  Add Emails <span className="formRequired">*</span>
                </div>
                <div className="formInput">
                  <Chips
                    value={formData.users}
                    onChange={(e) => {
                      if (
                        !validateEmail(
                          e.target.value[e.target.value.length - 1]
                        )
                      ) {
                        toast.current.show({
                          severity: "warn",
                          summary: "Enter valid email",
                          detail: "",
                          life: 3000,
                        });
                        return;
                      }
                      setFormData({ ...formData, users: e.value });
                    }}
                  />
                </div>
              </div>
              <div className="formBtnCont">
                <Button
                  label="Cancel"
                  text
                  rounded
                  onClick={(e) => {
                    navigate("/events");
                  }}
                ></Button>
                <Button label="Save" rounded onClick={submitForm}></Button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddEvent;
