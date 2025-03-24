import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Toast } from "primereact/toast";
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
  const toast = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const body = { firstName, lastName, email, password, confirmPassword };
      const response = await api.post("/user/signup", body);
      toast.current.show({
        severity: "success",
        summary: "Success",
        detail: "Signup successful",
        life: 3000,
      });
      navigate("/login");
    } catch (error) {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: error.response.data.error,
        life: 3000,
      });
    }
  };

  return (
    <div className="signup-container">
      <Toast ref={toast} />
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
