import React from "react";
import { Route, Routes } from "react-router-dom";
import Admin from "../../admin/Admin";

import LeftBar from "./LeftBar";
import DashRoutes from "./DashRoutes";
import './static/dashboard.css'
import VehicleCountTable from "./location";
import Check from "./check";
import { useAuth } from "../AuthContext";
import Sysleft from "./system/SysLeft";
const UserDash = () => {
  // const isAdmin = localStorage.getItem('is_admin') === 'true';
  const { IsSupAuthenticated } = useAuth();

  return (
    <>
      <div className="dashboard">
        <div className="dashleft">
          <div className="left">
           {IsSupAuthenticated?<Sysleft/>:<LeftBar />} 
          </div>
        </div>
        <div className="dashright">
          <div className="rightcontainer">
         <DashRoutes />
          </div>
        </div>
      </div>
    </>
  );
};
export default UserDash;
