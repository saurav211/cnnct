import { useState, useEffect, useRef } from "react";
import { Toast } from "primereact/toast";
import api from "../interceptor";
import { useNavigate } from "react-router-dom";

const Preferences = () => {
  const [username, setUsername] = useState("");
  const [profession, setProfession] = useState("");
  const navigate = useNavigate();
  const toast = useRef(null);

  useEffect(() => {}, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/user/preferences", {
        username,
        profession,
      });
      const data = response.data;
      if (data.message) {
        toast.current.show({
          severity: "success",
          summary: "Success",
          detail: data.message,
          life: 3000,
        });
        navigate("/events");
      } else {
        toast.current.show({
          severity: "error",
          summary: "Error",
          detail: data.error,
          life: 3000,
        });
      }
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
    <form onSubmit={handleSubmit}>
      <Toast ref={toast} />
      <h2>Preferences</h2>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
        required
      />
      <input
        type="text"
        value={profession}
        onChange={(e) => setProfession(e.target.value)}
        placeholder="Profession"
        required
      />
      <button type="submit">Save</button>
    </form>
  );
};

export default Preferences;
