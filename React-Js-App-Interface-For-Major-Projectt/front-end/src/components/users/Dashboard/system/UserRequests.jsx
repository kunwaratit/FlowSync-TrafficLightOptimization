import React, { useEffect, useState } from "react";
import axios from "axios";
import "./UserRequests.css";

const UserRequests = () => {
  const [UserRequests, setUserRequests] = useState([]);
  useEffect(() => {
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
    fetchUser();
  }, []);
  return (
    <>
      <div className="dasheader">
        <h1>User Details</h1>
        <p>
          This section is dedicated to managing user requests within the system.
          Below, you will find a table listing each user’s details, including
          their email, phone number, district, intersection, location ID, and
          their status (active, admin, or user). Each row represents a different
          user request, with options to either accept or decline the request. By
          carefully reviewing the information provided and making the
          appropriate decisions, administrators can effectively manage and
          maintain the integrity and functionality of the system.
        </p>

        <hr />
        <div className="table-container">
          <table>
            <thead>
              <tr>
              <th>S.N.</th>
                <th>email</th>
                <th>phone_number</th>
                <th>district</th>
                <th>intersection</th>
                <th>location_id</th>
                <th>is_active</th>
                <th>is_admin</th>
                <th>is_user</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
             
              {UserRequests.map((user, index) => (
                <tr key={UserRequests._id}>
                  <td>{index + 1}</td>
                  <td>{user.email}</td>
                  <td>{user.phone_number}</td>
                  <td>{user.district}</td>
                  <td>{user.intersection}</td>
                  <td>{user.location_id}</td>
                  <td>{user.is_active ? "Active" : "Inactive"}</td>
                  <td>{user.is_admin ? "Admin" : "-"}</td>
                  <td>{user.is_user ? "User" : "-"}</td>
                  <td>
                    <button className="accept-btn">Accept</button>
                    <button className="decline-btn">Decline</button>
                  </td>
                </tr>
              ))}
               <tr>
                <td>0</td>
                <td>atit@gmail.com</td>
                <td>atit@123</td>
                <td>Gulmi</td>
                <td>xxxxxxxxx</td>
                <td>xxxxxxxxx</td>
                <td>xxxxxxxxx</td>
                <td>xxxx</td>
                <td>xxxx</td>
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
