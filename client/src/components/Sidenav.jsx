import "../styles/Sidenav.css";
import logo from "../assets/logo.png";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const SideNav = () => {
  const location = useLocation();
  const [currentPath, setCurrentPath] = useState(location.pathname);
  useEffect(() => {
    console.log("Current URL:", location.pathname);
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
  return (
    <div className="sidenavCont">
      <div className="topPart">
        <div className="brandLogo">
          <img src={logo} />
        </div>
        <div className="linkContainer">
          {links.map((link, index) => {
            return (
              <Link key={index} to={link.url} className={currentPath === link.url ? "active-link link" : "link"}>
                <span className="material-symbols-outlined">{link.icon}</span>
                <span>{link.name}</span>
              </Link>
            );
          })}
        </div>
      </div>
      <div className="bottomPart"></div>
    </div>
  );
};

export default SideNav;
