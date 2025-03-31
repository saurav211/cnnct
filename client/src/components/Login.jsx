import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Toast } from "primereact/toast";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import api from "../interceptor";
import { jwtDecode } from "jwt-decode";
import "../styles/Login.css";
import logo from "../assets/logo.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const toast = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/user/login", { email, password });
      const { token } = response.data;
      localStorage.setItem("token", token);
      const decodedToken = jwtDecode(token);
      navigate(decodedToken._doc.username ? "/events" : "/preferences");
      toast.current.show({
        severity: "success",
        summary: "Success",
        detail: "Login successful",
        life: 3000,
      });
    } catch (error) {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: error.response?.data?.error || "Login failed",
        life: 3000,
      });
    }
  };

  return (
    <div className="login-container">
      <Toast ref={toast} />
      <div className="login-form-container">
        <img src={logo} alt="CNNCT Logo" className="connect-logo" />
        <form onSubmit={handleSubmit} className="login-form">
          <h2 style={{ textAlign: "start" }}>Sign in</h2>
          <div className="p-field">
            <span className="p-float-label">
              <InputText
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="custom-input"
              />
              <label htmlFor="email">Email</label>
            </span>
          </div>
          <div className="p-field">
            <span className="p-float-label">
              <Password
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                feedback={false}
                className="custom-input"
                toggleMask
              />
              <label htmlFor="password">Password</label>
            </span>
          </div>
          <Button
            style={{ width: "100%", marginTop: "2rem" }}
            rounded
            type="submit"
            label="Log in"
            className="p-button"
          />
          <div className="login-footer">
            <span>Don't have an account? </span>
            <a href="/signup" className="signup-link">
              Sign up
            </a>
          </div>
        </form>
        <div className="privacyText">
          This site is protected by reCAPTCHA and the{" "}
          <span className="privacyLink">Google Privacy Policy</span> and
          <span className="privacyLink">Terms of Service</span> apply.
        </div>
      </div>
      <div className="login-bg"></div>
    </div>
  );
};

export default Login;
