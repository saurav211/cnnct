import logo from "../assets/logo.png";
import profile from "../assets/profile.png";
import "../styles/Topnav.css";

const Topnav = () => {
  return (
    <div className="topnavCont">
      <div className="brandLogoTop">
        <img src={logo} />
      </div>
      <div className="profileTop">
        <img src={profile} />
      </div>
    </div>
  );
};

export default Topnav;
