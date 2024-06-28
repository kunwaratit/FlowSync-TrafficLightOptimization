import React from "react";
import { NavLink } from "react-router-dom";
import "./static/dashboard.css";
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
              <li>DashBoard</li>
            </NavLink>
            <NavLink activeClassName="active" to="/d-home">
              <li>Home</li>
            </NavLink>

            <NavLink activeClassName="active" to="/manage">
              <li>Manage</li>
            </NavLink>

            <NavLink activeClassName="active" to="/setting">
              <li>SYS-Setting </li>
            </NavLink>

            <NavLink activeClassName="active" to="/contact">
              {" "}
              <li>Contact</li>
            </NavLink>

            <NavLink activeClassName="active" to="/help">
              {" "}
              <li>?help </li>
            </NavLink>
            <NavLink activeClassName="active" to="/logout">
              {" "}
              <li>Logout</li>
            </NavLink>
          </ul>
        </nav>
      </div>
    </>
  );
};
export default LeftBar;
