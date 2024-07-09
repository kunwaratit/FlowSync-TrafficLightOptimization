import React from "react";
import { NavLink } from "react-router-dom";
import "../static/dashboard.css";
import { AiFillHome } from "react-icons/ai";
import { RiDashboardHorizontalFill } from "react-icons/ri";
import { MdManageAccounts } from "react-icons/md";
import { IoSettings } from "react-icons/io5";
import { GrContact } from "react-icons/gr";
import { IoMdHelp } from "react-icons/io";
import { BiLogOutCircle } from "react-icons/bi";
import { TbAdjustmentsCog } from "react-icons/tb";
import { AiOutlineFileSearch } from "react-icons/ai";

const Sysleft =()=>{
    return (
        <>
          <div className="dashnav">
            <nav>
              <ul>
                <li>
                  <div className="admin-info"></div>
                </li>
                <NavLink activeClassName="active" to="/sup-user-details">
                  <li><RiDashboardHorizontalFill className="icon" />User Details</li>
                </NavLink>
                
                <NavLink activeClassName="active" to="/sup-requests">
                  <li><RiDashboardHorizontalFill className="icon" />User Request</li>
                </NavLink>
                
              </ul>
            </nav>
          </div>
        </>
      );
}
export default Sysleft;