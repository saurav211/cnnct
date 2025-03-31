import logo from "../assets/logo.png";
import profile from "../assets/profile.png";
import "../styles/Topnav.css";
import { Menu } from "primereact/menu";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
const Topnav = () => {
  const navigate = useNavigate();
  const menuLeft = useRef(null);
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
  return (
    <div className="topnavCont">
      <div className="brandLogoTop">
        <img src={logo} />
      </div>
      <div className="profileTop">
        <img
          src={profile}
          onClick={(event) => menuLeft.current.toggle(event)}
        />
        <Menu model={items} popup ref={menuLeft} />
      </div>
    </div>
  );
};

export default Topnav;
