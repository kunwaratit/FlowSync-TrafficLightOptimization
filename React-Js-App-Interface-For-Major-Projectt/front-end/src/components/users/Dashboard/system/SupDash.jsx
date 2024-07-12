import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaUserAlt, FaUserCheck, FaUserClock } from "react-icons/fa";
import "./userDashboard.css";

const UserDashboard = () => {
  const [totalUsers, setTotalUsers] = useState(0);
  const [activeUsers, setActiveUsers] = useState(0);
  const [userRequests, setUserRequests] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
       
        const token = localStorage.getItem('authToken');
        const response = await axios.get("http://127.0.0.1:8000/api/dash/count-total/", {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
        
        const data = response.data;

        setTotalUsers(data.is_active_false + data.is_active_true); // Total users is sum of active and inactive
        setActiveUsers(data.is_active_true);
        setUserRequests(data.is_active_false);

      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();

    const intervalId = setInterval(fetchData, 20000); // Refresh data every 20 seconds

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, []);

  return (
    <>
      <div className="dasheader">
        <h1>User Dashboard</h1>
      </div>
      <hr />
      <div className="dashcontainer">
        <h1>Statistics</h1>
        <div className="holdcontainer flex">
          <a href="/sup-user-details" className="stat-box">
            <div>
              <FaUserAlt fill="white" size={56} />
              <div className="stat-info">
                <p>Total Users</p>
                <h1>{totalUsers}</h1>
              </div>
            </div>
          </a>
          <a href="/sup-user-details" className="stat-box">
            <div>
              <FaUserCheck fill="white" size={56} />
              <div className="stat-info">
                <p>Active Users</p>
                <h1>{activeUsers}</h1>
              </div>
            </div>
          </a>
          <a href="/sup-requests" className="stat-box">
            <div>
              <FaUserClock fill="white" size={56} />
              <div className="stat-info">
                <p>User Requests</p>
                <h1>{userRequests}</h1>
              </div>
            </div>
          </a>
        </div>
      </div>
    </>
  );
};

export default UserDashboard;
