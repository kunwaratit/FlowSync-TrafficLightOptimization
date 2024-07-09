import React from "react";
import "./UserRequests.css";

const UserRequests = () => {
  return (
    <>
      <div className="dasheader">
        <h1>User Details</h1>
        <p>
          This section is dedicated to managing user requests within the system.
          Below, you will find a table listing each user’s details, including their
          email, phone number, district, intersection, location ID, and their status
          (active, admin, or user). Each row represents a different user request, with
          options to either accept or decline the request. By carefully reviewing the
          information provided and making the appropriate decisions, administrators can
          effectively manage and maintain the integrity and functionality of the system.
        </p>
     
      <hr />
      <div className="table-container">
        <table>
          <thead>
            <tr>
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
            <tr>
              <td>manjit@gmail.com</td>
              <td>password@123</td>
              <td>Rolpa</td>
              <td>xxxxxxxx</td>
              <td>xxxxxxxx</td>
              <td>xxxxxxxxxx</td>
              <td>xxxxxxxx</td>
              <td>xxxx</td>
              <td>
                <button className="accept-btn">Accept</button>
                <button className="decline-btn">Decline</button>
              </td>
            </tr>
            <tr>
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
            <tr>
              <td>xxxxxxxx</td>
              <td>xxxxxxxx</td>
              <td>xxxxxxxxxxxx</td>
              <td>xxxxxxxxxx</td>
              <td>xxxxxxxx</td>
              <td>xxxxxxxx</td>
              <td>xxxxxx</td>
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
