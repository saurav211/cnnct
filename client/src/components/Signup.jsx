import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../interceptor";
import "../styles/Signup.css";
import logo from "../assets/logo.png";

const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const body = { firstName, lastName, email, password, confirmPassword };
      const response = await api.post("/user/signup", body);
      navigate("/login");
    } catch (error) {
      alert(error.response.data.error);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-form-container">
        <img src={logo} alt="CNNCT Logo" className="signup-logo" />
        <form onSubmit={handleSubmit} className="signup-form">
          <h2>Signup</h2>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="First Name"
            required
          />
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Last Name"
            required
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm Password"
            required
          />
          <button type="submit">Signup</button>
          <a href="/login">Sign in instead</a>
        </form>
      </div>
      <div className="signup-bg"></div>
    </div>
  );
};

export default Signup;
