import React from "react";
import "./UserRequests.css";

const UserRequests = () => {
  return (
    <>
      <div className="dasheader">
        <h1>Manage</h1>
        <p>
          This section manages the System. In this section you have to manage
          and observe the setting applied. The system setting applied can be
          observed in this section through the downloaded video. If there is any
          problem in camera angle, detection, counting with this we visualize
          the reason for exact problem we are facing in the system.
        </p>
      </div>
      <hr />
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
            {/* <th>Actions</th> */}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>user1</td>
            <td>password1</td>
            <td>district1</td>
            <td>intersection1</td>
            <td>location_id1</td>
            <td>is_active1</td>
            <td>is_admin1</td>
            <td>is_user1</td>
            <td>
              <button className="accept-btn">Accept</button>
              <button className="decline-btn">Decline</button>
            </td>
          </tr>
          <tr>
            <td>user2</td>
            <td>password2</td>
            <td>district2</td>
            <td>intersection2</td>
            <td>location_id2</td>
            <td>is_active2</td>
            <td>is_admin2</td>
            <td>is_user2</td>
            <td>
              <button className="accept-btn">Accept</button>
              <button className="decline-btn">Decline</button>
            </td>
          </tr>
          <tr>
            <td>user3</td>
            <td>password3</td>
            <td>district3</td>
            <td>intersection3</td>
            <td>location_id3</td>
            <td>is_active3</td>
            <td>is_admin3</td>
            <td>is_user3</td>
            <td>
              <button className="accept-btn">Accept</button>
              <button className="decline-btn">Decline</button>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default UserRequests;
