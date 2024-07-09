import React from "react";
import { Route, Routes } from "react-router-dom";
import Admin from "../../admin/Admin";
import SupDash from "./system/SupDash"
import UserRequests from "./system/UserRequests"

import Homies from "./Homies";
import Manage from "./Manage";
import Setting from "./Setting";
import ContactForm from "./Contact";
import Help from "./Help";
import Logout from "./Logout";
import { AuthProvider } from "../AuthContext";
import Whole from "../Whole";
import VideoPlayer from "./system/VideoPlayer.jsx";
import UserDetails from "./system/UserDetails";
const DashRoutes = () => {
  return (
    <>
      {/* <AuthProvider> */}
        <Routes>
          <Route path="/dash" element={<Admin />} />
          <Route path="/d-home" element={<Homies />} />
          <Route path="/manage" element={<Manage />} />
          <Route path="/setting" element={<Setting />} />
          <Route path="/contact" element={<ContactForm />} />
          <Route path="/help" element={<Help />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/a" element={<VideoPlayer/>} />
          <Route path="/sup-dash" element={<SupDash />} />
          <Route path="/sup-user-details" element={<UserDetails />} />
          <Route path="/sup-requests" element={<UserRequests />} />

          {/* <Route path="*" element={<Whole/>} /> */}
        </Routes>
      {/* </AuthProvider> */}
    </>
  );
};
export default DashRoutes;
