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
import { FaUserPlus } from "react-icons/fa6";
import { FaUserFriends } from "react-icons/fa";
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./SysLeft.css"
import mainlogo1 from "../../../images/mainlogo1.png"

const Sysleft = () => {
  const [userData, setUserData] = useState([])
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('authToken');
        const response = await axios.get(
          "http://127.0.0.1:8000/api/dash/count-user/", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        const data = response.data;
        setUserData(data)
        console.log(data)
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchUser();
  }, []);

  return (
    <>
      <div className="dashnav">
        <nav>
          <ul>
            <li>
              <div className="admin-info">
                <img src={mainlogo1} alt="" className="user_img"/>
                <h3>System Admin</h3>
                <hr />
              </div>
             
            </li>
            <NavLink activeClassName="active" to="/sup-dash">
              <li>
                <RiDashboardHorizontalFill className="icon" />
                Sys-Dash
              </li>
            </NavLink>
            <NavLink activeClassName="active" to="/sup-user-details">
              <li>
                <FaUserFriends className="icon" />
                User Details
              </li>
            </NavLink>

            <NavLink activeClassName="active" to="/sup-requests">
              <li>
                <FaUserPlus className="icon" />
                User Request<span className="usercount"><sup>{userData.user_count}</sup></span>
              </li>
            </NavLink>
            <NavLink activeClassName="active" to="/setting">
              <li>
                <IoSettings className="icon" />
                SYS-Setting{" "}
              </li>
            </NavLink>
            <NavLink activeClassName="active" to="/logout">
              {" "}
              <li>
                <BiLogOutCircle className="icon" />
                Logout
              </li>
            </NavLink>
          </ul>
        </nav>
      </div>
    </>
  );
};
export default Sysleft;
