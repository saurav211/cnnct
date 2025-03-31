import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { useEffect, useState } from "react";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Preferences from "./components/Preferences";
import Landing from "./components/Landing";
import Events from "./components/Events";
import Availability from "./components/Availability";
import Activity from "./components/Activity";
import App from "./App";
import Booking from "./components/Booking";
import Settings from "./components/Settings";
import AddEvent from "./components/addEvent";
import { jwtDecode } from "jwt-decode";

const PrivateRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);
  return isAuthenticated ? children : <Navigate to="/login" />;
};

const PrefPrivateRoute = ({ children }) => {
  const [isPrefAuthenticated, setPrefIsAuthenticated] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    const decodedToken = jwtDecode(token);
    console.log("deco", decodedToken._doc.username);
    if (decodedToken && decodedToken._doc.username) {
      console.log("deco", decodedToken._doc.username);
      setPrefIsAuthenticated(false);
    }
  }, []);
  return isPrefAuthenticated ? children : <Navigate to="/events" />;
};

const CheckAlreadyLoggedIn = ({ children }) => {
  const [isLoggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setLoggedIn(!!token);
  }, []);
  return isLoggedIn ? <Navigate to="/events" /> : children;
};

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={
            <CheckAlreadyLoggedIn>
              <Login />
            </CheckAlreadyLoggedIn>
          }
        />
        <Route
          path="/signup"
          element={
            <CheckAlreadyLoggedIn>
              <Signup />
            </CheckAlreadyLoggedIn>
          }
        />
        <Route
          path="/"
          element={
            <CheckAlreadyLoggedIn>
              <Landing />
            </CheckAlreadyLoggedIn>
          }
        />
        <Route
          path="/preferences"
          element={
            <PrefPrivateRoute>
              <Preferences />
            </PrefPrivateRoute>
          }
        />
        <Route
          path="/events"
          element={
            <PrivateRoute>
              <App Component={Events} />
            </PrivateRoute>
          }
        />
        <Route
          path="/availability"
          element={
            <PrivateRoute>
              <App Component={Availability} />
            </PrivateRoute>
          }
        />
        <Route
          path="/activity"
          element={
            <PrivateRoute>
              <App Component={Activity} />
            </PrivateRoute>
          }
        />
        <Route
          path="/bookings"
          element={
            <PrivateRoute>
              <App Component={Booking} />
            </PrivateRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <PrivateRoute>
              <App Component={Settings} />
            </PrivateRoute>
          }
        />
        <Route
          path="/add-event"
          element={
            <PrivateRoute>
              <App Component={AddEvent} />
            </PrivateRoute>
          }
        />
        <Route
          path="/edit-event/:id"
          element={
            <PrivateRoute>
              <App Component={AddEvent} />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default AppRouter;
