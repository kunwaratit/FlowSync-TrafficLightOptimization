import React from "react";
import { Route, Routes } from "react-router-dom";
import Admin from "../../admin/Admin";
import SupDash from "./system/SupDash";
import UserRequests from "./system/UserRequests";
import Homies from "./Homies";
import Manage from "./Manage";
import Setting from "./Setting";
import ContactForm from "./Contact";
import Help from "./Help";
import Logout from "./Logout";
import VideoPlayer from "./system/VideoPlayer.jsx";
import UserDetails from "./system/UserDetails";
import { useAuth } from "../AuthContext";
import Invalid from "../Invalid.jsx";
import UserSettiongsForm from "./user_setting.jsx";
import Whole from "../Whole";

const DashRoutes = () => {
  const { IsSupAuthenticated } = useAuth();

  return (
    <Routes>
      {IsSupAuthenticated ? (
        <>
          <Route path="/a" element={<VideoPlayer />} />
          <Route path="/sup-dash" element={<SupDash />} />
          <Route path="/setting" element={<Setting />} />
          <Route path="/sup-user-details" element={<UserDetails />} />
          <Route path="/sup-requests" element={<UserRequests />} />
        </>
      ) : (
        <>
          <Route path="/dash" element={<Admin />} />
          <Route path="/d-home" element={<Homies />} />
          <Route path="/manage" element={<Manage />} />
          <Route path="/contact" element={<ContactForm />} />
          <Route path="/help" element={<Help />} />
        </>
      )}
      {/* Catch all route for any invalid paths */}
      <Route path="*" element={<Invalid />} />
      <Route path="/logout" element={<Logout />} />
    </Routes>
  );
};

export default DashRoutes;
