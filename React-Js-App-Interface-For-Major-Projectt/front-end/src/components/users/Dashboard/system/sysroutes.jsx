import React from "react";
import { Route, Routes } from "react-router-dom";
import Admin from "../../../admin/Admin";

import LeftBar from "../LeftBar";
import DashRoutes from "../DashRoutes";
import '../static/dashboard.css'
import VehicleCountTable from "../location";
import Sysleft from "./SysLeft";
const UserDash = () => {
  return (
    <>
      <div className="dashboard">
        <div className="dashleft">
          <div className="left">
            <Sysleft/> sysleft
          </div>
        </div>
        <div className="dashright">
          <div className="rightcontainer">
            <DashRoutes />
            
          </div>
          {/* <Admin/> */}
        </div>
      </div>
    </>
  );
};
export default UserDash;
