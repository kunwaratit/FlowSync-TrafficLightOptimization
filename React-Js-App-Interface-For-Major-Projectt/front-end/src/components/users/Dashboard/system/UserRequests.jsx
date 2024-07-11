import React, { useEffect, useState } from "react";
import axios from "axios";
import "./UserRequests.css";

const UserRequests = () => {
  const [UserRequests, setUserRequests] = useState([]);
  
    useEffect(() => {
      fetchUser(); // Initial fetch on component mount
    }, []); 
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const response = await axios.get(
          "http://127.0.0.1:8000/api/dash/user-reg-requests/",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = response.data;
        setUserRequests(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
   
  const handleAcceptRequest = async (userId) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.post(
        `http://127.0.0.1:8000/api/dash/user-reg-requests/${userId}/`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const updatedRequests = UserRequests.map((user) =>
        user._id === userId ? { ...user, is_active: true } : user
      );
      setUserRequests(updatedRequests);
      fetchUser();
    } catch (error) {
      console.error("Error accepting user request:", error);
    }
  };
  return (
    <>
      <div className="dasheader">
        <h1>User Requests</h1>
        <p>
          This section is dedicated to managing user requests within the system.
          Each row represents a different
          user request, with options to either accept or decline the request. Administrators can effectively manage and
          maintain the integrity and functionality of the system.
        </p>

        <hr />
        <div className="table-container">
          <table>
            <thead>
              <tr>
              <th style={{ width: '40px' }}>S.N.</th>
                <th >Email</th>
                <th style={{ width: '150px' }}>Phone Number</th>
                <th style={{ width: '115px' }}>District</th>
                <th>Intersection</th>
                <th style={{ width: '115px' }}>Location id</th>
                <th style={{ width: '115px' }}>is_active</th>
                <th style={{ width: '78px' }}>Role</th>
                <th style={{ width: '78px' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {UserRequests.map((user, index) => (
                <tr key={user._id}>
                  <td>{index + 1}</td>
                  <td>{user.email}</td>
                  <td>{user.phone_number}</td>
                  <td>{user.district}</td>
                  <td>{user.intersection}</td>
                  <td>{user.location_id}</td>
                  <td>{user.is_active ? "Active" : "Inactive"}</td>
                  <td>
                    {user.is_admin ? "Admin" : user.is_user ? "User" : "-"}
                  </td>
                  {/* <td>{user.is_admin ? "Admin" : "-"}</td>
                  <td>{user.is_user ? "User" : "-"}</td> */}
                  <td>
                    <button
                      className="accept-btn"
                      onClick={() => handleAcceptRequest(user._id)}
                    >
                      Accept
                    </button>
                    <button className="decline-btn">Decline</button>
                  </td>
                </tr>
              ))}
              <tr>
                <td>0</td>
                <td>atit@gmail.com</td>
                <td>1234567890</td>
                <td>Gulmi</td>
                <td>Thankot Chowk</td>
                <td>44600</td>
                <td>
                <span className="dot red-dot"></span>
                  InActive
                </td>
                <td>Admin</td>
                <td>
                  <button className="accept-btn">Accept</button>
                  <button className="decline-btn">Decline</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default UserRequests;
