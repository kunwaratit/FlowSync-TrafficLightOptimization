import React from "react";

const UserSettiongsForm=()=>{
    return(<>
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
                    <input type="text" id="location" name="location" disabled />
                </div>
                <div className="form-group">
                    <label htmlFor="province">Province:</label>
                    <input type="text" id="province" name="province" disabled />
                </div>
                <div className="form-group">
                    <label htmlFor="district">District:</label>
                    <input type="text" id="district" name="district" disabled />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email" disabled />
                </div>
                
                <div className="form-group">
                    <label htmlFor="password">Old Password:</label>
                    <input type="password" id="password" name="old-password" rows="5" required></input>
                </div>
                <div className="form-group">
                    <label htmlFor="password">New Password:</label>
                    <input type="password" id="password" name="new-password" rows="5" required></input>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Confirm Password:</label>
                    <input type="password" id="password" name="confirm-password" rows="5" required></input>
                </div>
                <div className="form-group">
                    <label htmlFor="name">Is Active:</label>
                    <input type="text" id="isactive" name="isactive" disabled />
                </div>
                <div className="form-group">
                    <button type="submit">Update</button>
                </div>
            </form>
        </div>
        </div>
    </>)
}
export default UserSettiongsForm;