import React from "react";
import DashRoutes from "../DashRoutes";
import '../static/dashboard.css'
import Sysleft from "./SysLeft";


const SysRoutes = () => {
  return (
    <>
      <div className="dashboard">
        <div className="dashleft">
          <div className="left">
            <Sysleft /> sysleft
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
export default SysRoutes;
