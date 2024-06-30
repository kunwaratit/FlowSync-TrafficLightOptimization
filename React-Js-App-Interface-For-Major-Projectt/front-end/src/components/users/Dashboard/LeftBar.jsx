import React from "react";
import { NavLink } from "react-router-dom";
import "./static/dashboard.css";
import { AiFillHome } from "react-icons/ai";
import { RiDashboardHorizontalFill } from "react-icons/ri";
import { MdManageAccounts } from "react-icons/md";
import { IoSettings } from "react-icons/io5";
import { GrContact } from "react-icons/gr";
import { IoMdHelp } from "react-icons/io";
import { BiLogOutCircle } from "react-icons/bi";
const LeftBar = () => {
        
  return (
    <>
      <div className="dashnav">
        <nav>
          <ul>
            <li>
              <div className="admin-info"></div>
            </li>
            <NavLink activeClassName="active" to="/dash">
              <li><RiDashboardHorizontalFill className="icon" />DashBoard</li>
            </NavLink>
            <NavLink activeClassName="active" to="/d-home">
              <li><AiFillHome className="icon"/>Home</li>
            </NavLink>

            <NavLink activeClassName="active" to="/manage">
              <li><MdManageAccounts  className="icon" />Manage</li>
            </NavLink>

            <NavLink activeClassName="active" to="/setting">
              <li><IoSettings  className="icon" />SYS-Setting </li>
            </NavLink>

            <NavLink activeClassName="active" to="/contact">
              {" "}
              <li><GrContact  className="icon" />Contact</li>
            </NavLink>

            <NavLink activeClassName="active" to="/help">
              {" "}
              <li><IoMdHelp  className="icon" />help </li>
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
