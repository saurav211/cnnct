import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Toast } from "primereact/toast";
import api from "../interceptor";
import "../styles/Signup.css";
import logo from "../assets/logo.png";

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();
  const toast = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast.current.show({
        severity: "warn",
        summary: "Warning",
        detail: "Passwords do not match",
        life: 3000,
      });
      return;
    }
    try {
      await api.post("/user/signup", formData);
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
        detail: error.response?.data?.error || "Signup failed",
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
          <h2>Create an account</h2>
          <input
            type="text"
            placeholder="First Name"
            value={formData.firstName}
            onChange={(e) =>
              setFormData({ ...formData, firstName: e.target.value })
            }
            required
          />
          <input
            type="text"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={(e) =>
              setFormData({ ...formData, lastName: e.target.value })
            }
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            required
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={(e) =>
              setFormData({ ...formData, confirmPassword: e.target.value })
            }
            required
          />
          <button type="submit">Signup</button>
          <a href="/login">Sign in instead</a>
        </form>
        <div className="privacyText">
          This site is protected by reCAPTCHA and the{" "}
          <span className="privacyLink">Google Privacy Policy</span> and
          <span className="privacyLink">Terms of Service</span> apply.
        </div>
      </div>
      <div className="signup-bg"></div>
    </div>
  );
};

export default Signup;
