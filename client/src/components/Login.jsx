import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../interceptor";
import { jwtDecode } from "jwt-decode";

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
    <form onSubmit={handleSubmit}>
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
    </form>
  );
};

export default Login;
