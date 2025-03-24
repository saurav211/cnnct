import { useState, useEffect, useRef } from "react";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import api from "../interceptor";
import "../styles/Settings.css";
import { TabView, TabPanel } from "primereact/tabview";

const Settings = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const toast = useRef(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await api.get("/user/profile");
        const { firstName, lastName, email } = response.data;
        setFirstName(firstName);
        setLastName(lastName);
        setEmail(email);
      } catch (error) {
        toast.current.show({
          severity: "error",
          summary: "Error",
          detail: "Error fetching user data",
          life: 3000,
        });
      }
    };
    fetchUserData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const body = { firstName, lastName, email, password, confirmPassword };
      const response = await api.post("/user/updateProfile", body);
      toast.current.show({
        severity: "success",
        summary: "Success",
        detail: response.data.message,
        life: 3000,
      });
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
    <div className="settings-main-container">
      <div className="setting-header">
        <div className="pageTitleCont">
          <div className="pageHeader">Profile</div>
          <div className="pageSubHeader">Manage settings for your profile</div>
        </div>
      </div>
      <div className="settings-container">
        <TabView>
          <TabPanel header="Edit Profile">
            <form onSubmit={handleSubmit} className="settings-form">
              <label>First name</label>
              <InputText
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <label>Last name</label>
              <InputText
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
              <label>Email</label>
              <InputText
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label>Password</label>
              <Password
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                toggleMask
              />
              <label>Confirm Password</label>
              <Password
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                toggleMask
              />
              <Button type="submit" label="Save" className="p-button-primary" />
            </form>
          </TabPanel>
        </TabView>
        <Toast ref={toast} />
      </div>
    </div>
  );
};

export default Settings;
