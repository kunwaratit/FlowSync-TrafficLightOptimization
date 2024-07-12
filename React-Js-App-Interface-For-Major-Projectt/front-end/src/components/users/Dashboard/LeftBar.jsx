import React from "react";
import { NavLink } from "react-router-dom";
import "./static/dashboard.css";
import { AiFillHome } from "react-icons/ai";
import { RiDashboardHorizontalFill } from "react-icons/ri";
import { MdManageAccounts } from "react-icons/md";
import { IoSettings } from "react-icons/io5";
import { GrContact } from "react-icons/gr";
import { IoMdHelp } from "react-icons/io";
import { RxUpdate } from "react-icons/rx";
import { BiLogOutCircle } from "react-icons/bi";
import { TbAdjustmentsCog } from "react-icons/tb";
import { AiOutlineFileSearch } from "react-icons/ai";
import user from "./images/user.png"
const LeftBar = () => {
        
  return (
    <>
      <div className="dashnav">
        <nav>
          <ul>
            <li>
              <div className="admin-info">
              <img src={user} alt="" className="user_img1"/>
              </div>
            </li>
            <NavLink activeClassName="active" to="/dash">
              <li><RiDashboardHorizontalFill className="icon" />Dashboard</li>
            </NavLink>
            <NavLink activeClassName="active" to="/d-home">
              <li><AiOutlineFileSearch  className="icon"/>
              Check Status</li>
            </NavLink>

            <NavLink activeClassName="active" to="/manage">
              <li><TbAdjustmentsCog  className="icon" />Manage</li>
            </NavLink>

            

            <NavLink activeClassName="active" to="/contact">
              {" "}
              <li><GrContact  className="icon" />Contact</li>
            </NavLink>

            <NavLink activeClassName="active" to="/help">
              {" "}
              <li><IoMdHelp  className="icon" />Help </li>
            </NavLink>

            <NavLink activeClassName="active" to="/user_setting">
              {" "}
              <li><RxUpdate  className="icon" />Update User</li>
            </NavLink>
            <NavLink activeClassName="active" to="/logout">
              {" "}
              <li><BiLogOutCircle  className="icon"/>Logout</li>
            </NavLink>
          </ul>
        </nav>
      </div>
    </>
  );
};
export default LeftBar;
