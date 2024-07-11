import React, { useEffect, useState } from "react";
import axios from "axios";
import "./UserRequests.css";
import { data } from "../data";

const UserRequests = () => {
  const [userData, setUserData] = useState([]);
  
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('authToken');
        const response = await axios.get("http://127.0.0.1:8000/api/dash/user-data/", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        const data = response.data;
        setUserData(data);
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
        This dashboard allows administrators to manage user by displaying a 
        list of users with their details such as email, phone number, district, 
        intersection, location ID, and status (admin, or user). 
        Each user's information is shown in a table, and administrators can 
        choose to edit or delete user authority. The dashboard retrieves this 
        information securely, ensuring only authorized individuals can view and 
        manage these details. 
        </p>
        <hr />
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th style={{ width: '40px' }}>S.N.</th>
                <th>Email</th>
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
              {userData.map((user, index) => (
                <tr key={user._id}>
                  <td>{index + 1}</td>
                  <td>{user.email}</td>
                  <td>{user.phone_number}</td>
                  <td>{user.district}</td>
                  <td>{user.intersection}</td>
                  <td>{user.location_id}</td>
                  <td>
                    <span className={`dot ${user.is_active ? 'green-dot' : 'red-dot'}`}></span>
                    {user.is_active ? 'Active' : 'Inactive'}
                  </td>
                  <td>{user.is_admin ? 'Admin' : user.is_user ? 'User' : '-'}</td>
                  <td>
                    <button className="accept-btn">Edit</button>
                    <button className="decline-btn">Delete</button>
                  </td>
                </tr>
              ))}
              <tr>
                <td>0</td>
                <td>manjit@gmail.com</td>
                <td>1234567890</td>
                <td>Rolpa</td>
                <td>Thankot Chowk</td>
                <td>43500</td>
                <td>
                  <span className="dot green-dot"></span>
                  Active
                </td>
                <td>Admin</td>
                <td>
                  <button className="accept-btn">Edit</button>
                  <button className="decline-btn">Delete</button>
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
