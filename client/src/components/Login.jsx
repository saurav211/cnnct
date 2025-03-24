import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../interceptor";
import { jwtDecode } from "jwt-decode";
import "../styles/Login.css";
import logo from "../assets/logo.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Login details:", { email, password });
      const response = await api.post("/user/login", { email, password });
      const data = response.data;
      if (data.token) {
        localStorage.setItem("token", data.token);
        const decodedToken = jwtDecode(data.token);
        console.log("Decoded token:", decodedToken);
        if (decodedToken._doc && decodedToken._doc.username) {
          navigate("/events");
        } else {
          navigate("/preferences");
        }
      } else {
        alert(data.error);
      }
    } catch (error) {
      alert(error.response.data.error);
    }
  };

  return (
    <div className="login-container">
      <div className="login-form-container">
        <img src={logo} alt="CNNCT Logo" className="login-logo" />
        <form onSubmit={handleSubmit} className="login-form">
          <h2>Login</h2>
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
          <button type="submit">Login</button>
          <a href="/signup">Create an account</a>
        </form>
      </div>
      <div className="login-bg"></div>
    </div>
  );
};

export default Login;
