import "../styles/Sidenav.css";
import logo from "../assets/logo.png";
import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "primereact/button";
import profile from "../assets/profile.png";
import { jwtDecode } from "jwt-decode";
import { Menu } from "primereact/menu";

const SideNav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [userName, setUserName] = useState("");
  const [currentPath, setCurrentPath] = useState(location.pathname);
  useEffect(() => {
    const data = localStorage.getItem("token");
    if (data) {
      const decodedToken = jwtDecode(data);
      setUserName(
        decodedToken._doc.firstName + " " + decodedToken._doc.lastName
      );
    }
    setCurrentPath(location.pathname);
  }, [location]);
  const links = [
    {
      name: "Events",
      url: "/events",
      icon: "link",
    },
    {
      name: "Bookings",
      url: "/bookings",
      icon: "event",
    },
    {
      name: "Availability",
      url: "/availability",
      icon: "schedule",
    },
    {
      name: "Settings",
      url: "/settings",
      icon: "settings",
    },
  ];
  const items = [
    {
      label: "Sign out",
      icon: "pi pi-sign-out",
      command: (event) => {
        localStorage.removeItem("token");
        navigate("/login");
      },
    },
  ];
  const menuLeft = useRef(null);
  return (
    <div className="sidenavCont">
      <div className="topPart">
        <div className="brandLogo">
          <img src={logo} />
        </div>
        <div className="linkContainer">
          {links.map((link, index) => {
            return (
              <Link
                key={index}
                to={link.url}
                className={
                  currentPath === link.url ? "active-link link" : "link"
                }
              >
                <span className="material-symbols-outlined">{link.icon}</span>
                <span>{link.name}</span>
              </Link>
            );
          })}
        </div>
        <div style={{ padding: "1rem" }}>
          <Button
            label="Create"
            icon="pi pi-plus"
            rounded
            onClick={() => {
              navigate("/add-event");
            }}
          ></Button>
        </div>
      </div>
      <div className="bottomPart">
        <Menu model={items} popup ref={menuLeft} />
        <Button
          rounded
          className="signOutBtn"
          onClick={(event) => menuLeft.current.toggle(event)}
        >
          <img src={profile} style={{ width: "2.5rem" }} />
          <span style={{ marginLeft: "2px" }}>{userName}</span>
        </Button>
      </div>
    </div>
  );
};

export default SideNav;
