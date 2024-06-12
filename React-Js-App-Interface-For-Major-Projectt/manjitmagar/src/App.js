import React from "react";
import { Route } from "react-router-dom";
import "./style.css";
import Admin from "./components/admin/Admin";
import { useAuth } from "./components/users/AuthContext";

import MyUser from "./components/users/MyUser";
import UserDash from "./components/users/Dashboard/UserDash";
import RegistrationForm from "./components/users/registration";
// import User from "./components/users/User";
const App = () => {
  const { isAuthenticated } = useAuth();
  return (
    <>
      {!isAuthenticated && <MyUser />}

      {!isAuthenticated && <UserDash />}
      
      {/* <UserDash/> */}

      {/* Redirect to login page if trying to access admin page without login */}
      {/* {!isAuthenticated && <Route path="/admin" element={<Navigate to="/" replace />} />} */}
    </>
  );
};

export default App;
