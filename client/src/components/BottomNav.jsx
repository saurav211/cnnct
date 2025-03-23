import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "../styles/Bottomnav.css";

const BottomNav = () => {
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
    <div className="bottomLinkContainer">
      {links.map((link, index) => {
        return (
          <Link
            key={index}
            to={link.url}
            className={
              currentPath === link.url
                ? "active-bottom-link bottom-link"
                : "bottom-link"
            }
          >
            <span className="material-symbols-outlined">{link.icon}</span>
            <span>{link.name}</span>
          </Link>
        );
      })}
    </div>
  );
};

export default BottomNav;
