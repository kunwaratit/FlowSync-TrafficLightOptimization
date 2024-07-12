import React, { useState, useEffect } from "react";
import axios from 'axios';
import { FaUserAlt, FaUserCheck, FaUserClock } from "react-icons/fa";
import "./userDashboard.css"; 

const UserDashboard = () => {
  const [totalUsers, setTotalUsers] = useState(15);
  const [activeUsers, setActiveUsers] = useState(12);
  const [userRequests, setUserRequests] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/user-data/");
        const data = response.data.data; 
        
        
        setTotalUsers(data.totalUsers);
        setActiveUsers(data.activeUsers);
        setUserRequests(data.userRequests);

      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData(); 

    const intervalId = setInterval(fetchData, 20000); 

    return () => clearInterval(intervalId); 
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
          <div >
            <FaUserAlt fill="white" size={250} />
            <div className="stat-info">
              <p>Total Users</p>
              <h1>{totalUsers}</h1>
            </div>
          </div>
          </a>
          <a href="/sup-user-details" className="stat-box">
          <div >
            <FaUserCheck fill="white" size={56} />
            <div className="stat-info">
              <p>Active Users</p>
              <h1>{activeUsers}</h1>
            </div>
          </div>
          </a>
          
          <a href="/sup-requests" className="stat-box">
          <div >
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
