import { useState, useEffect, useRef } from "react";
import { Toast } from "primereact/toast";
import api from "../interceptor";
import { useNavigate } from "react-router-dom";
import "../styles/preferences.css";
import logo from "../assets/logo.png";
import { InputText } from "primereact/inputtext";
import finance from "../assets/finance.png";
import consulting from "../assets/consulting.png";
import recruit from "../assets/recruit.png";
import tech from "../assets/tech.png";
import market from "../assets/market.png";
import { Button } from "primereact/button";

const Preferences = () => {
  const [username, setUsername] = useState("");
  const [proffesion, setproffesion] = useState("");
  const navigate = useNavigate();
  const toast = useRef(null);

  useEffect(() => {}, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (username.length <= 0) {
        toast.current.show({
          severity: "warn",
          summary: "Required",
          detail: "User name is required",
          life: 3000,
        });
        return;
      }
      if (proffesion.length <= 0) {
        toast.current.show({
          severity: "warn",
          summary: "Required",
          detail: "Please select one proffesion field",
          life: 3000,
        });
        return;
      }
      const response = await api.post("/user/preferences", {
        username,
        proffesion,
      });
      const data = response.data;
      if (data.message) {
        toast.current.show({
          severity: "success",
          summary: "Success",
          detail: data.message,
          life: 3000,
        });
        const { token } = response.data;
        localStorage.setItem("token", token);
        navigate("/events");
      } else {
        toast.current.show({
          severity: "error",
          summary: "Error",
          detail: data.error,
          life: 3000,
        });
      }
    } catch (error) {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: error.response.data.error,
        life: 3000,
      });
    }
  };

  const proffesionList = [
    {
      name: "Sales",
      icon: "🏢",
    },
    {
      name: "Education",
      icon: "📚",
    },
    {
      name: "Finance",
      icon: finance,
      isIconUrl: true,
    },
    {
      name: "Government and Politics",
      icon: "⚖️",
    },
    {
      name: "Consulting",
      icon: consulting,
      isIconUrl: true,
    },
    {
      name: "Recruiting",
      icon: recruit,
      isIconUrl: true,
    },
    {
      name: "Tech",
      icon: tech,
      isIconUrl: true,
    },
    {
      name: "Marketing",
      icon: market,
      isIconUrl: true,
    },
  ];

  return (
    <div className="preferenceCont">
      <div className="leftCont">
        <div className="logoCont">
          <img src={logo} alt="CNNCT Logo" />
        </div>
        <div className="formCont">
          <form className="formPref" onSubmit={handleSubmit}>
            <Toast ref={toast} />
            <h1>Your Preferences</h1>
            <div className="usernameInp">
              <InputText
                value={username}
                style={{ borderRadius: "1rem", height: "3.5rem" }}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Tell Your Username"
                required
              />
            </div>
            <div className="proffesionSelect">
              <h3>Select one category that best describes your CNNCT:</h3>

              <div className="proffesionListCont">
                {proffesionList.map((val, index) => {
                  return (
                    <div
                      className={
                        proffesion == val.name
                          ? "proffestionCardSelected proffestionCard"
                          : "proffestionCard"
                      }
                      key={index}
                      onClick={() => {
                        setproffesion(val.name);
                      }}
                    >
                      <div className="proffesionIcon">
                        {val.isIconUrl ? (
                          <img src={val.icon}></img>
                        ) : (
                          <>{val.icon}</>
                        )}
                      </div>
                      <div className="proffsionName">{val.name}</div>
                    </div>
                  );
                })}
              </div>
            </div>
            {/* <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              required
            /> */}
            {/* <input
              type="text"
              value={proffesion}
              onChange={(e) => setproffesion(e.target.value)}
              placeholder="proffesion"
              required
            /> */}
            <Button
              rounded
              style={{
                width: "100%",
                marginTop: "2rem",
                height: "3.5rem",
                justifyContent: "center",
                fontSize: "1.5rem",
              }}
              type="submit"
            >
              Continue
            </Button>
          </form>
        </div>
      </div>
      <div className="preference-bg"></div>
    </div>
  );
};

export default Preferences;
