import React, { useState, useEffect } from "react";
import axios from "axios";

const UserSettingsForm = () => {
  const [userData, setUserData] = useState({
    email: "",
    phone_number: "",
    district: "",
    intersection: "",
    location_id: "",
    is_active: false,
    is_user: false,
    is_admin: false,
  });

  // Fetch user data from Django API on component mount
  useEffect(() => {
    const fetchUser = async () => {
        try {
          const token = localStorage.getItem('authToken');
          const response = await axios.get("http://127.0.0.1:8000/api/mydata", {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          const data = response.data; 
            setUserData(response.data);  // Assuming response.data matches userData structure
            console.log("User data:", response.data);  // Log the response data
      }
      catch (error) {
        console.error("Error fetching data:", error);
      }
    } 
    fetchUser();
  }, []);

  return (
    <>
      <div className="dasheader">
        <h1>User Settings</h1>
      </div>
      <hr />
      <div className="contact_cont">
        <div className="container_container">
          <h2>Update Profile</h2>
          <form action="" method="post">
            <div className="form-group">
              <label htmlFor="location">Location:</label>
              <input type="text" id="location" value={userData.location_id} name="location" disabled />
            </div>
            <div className="form-group">
              <label htmlFor="province">Province:</label>
              <input type="text" id="province" value={userData.intersection} name="province" disabled />
            </div>
            <div className="form-group">
              <label htmlFor="district">District:</label>
              <input type="text" id="district" value={userData.district} name="district" disabled />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input type="email" id="email" value={userData.email} name="email" disabled />
            </div>
            <div className="form-group">
              <label htmlFor="old-password">Old Password:</label>
              <input type="password" id="old-password" value='*****' name="old-password" rows="5" required />
            </div>
            <div className="form-group">
              <label htmlFor="new-password">New Password:</label>
              <input type="password" id="new-password" value='*****' name="new-password" rows="5" required />
            </div>
            <div className="form-group">
              <label htmlFor="confirm-password">Confirm Password:</label>
              <input type="password" id="confirm-password" value='*****' name="confirm-password" rows="5" required />
            </div>
            <div className="form-group">
              <label htmlFor="isactive">Is Active:</label>
              <input type="text" id="isactive" value={userData.is_active ? 'Active' : 'Inactive'} name="isactive" disabled />
            </div>
            <div className="form-group">
              <button type="submit">Update</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default UserSettingsForm;
