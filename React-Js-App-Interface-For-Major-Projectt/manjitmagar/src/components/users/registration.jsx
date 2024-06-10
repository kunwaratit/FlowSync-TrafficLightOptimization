import React from "react";
import "./registration.css";

const RegistrationForm = () => {
  return (
    <div className="center-container">
      <div className="form-container center-container">
        <form id="registrationForm">
          <h2>Registration Form</h2>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" required />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Phone Number</label>
            <div className="phone-group">
              <input
                type="text"
                id="country-code"
                name="country-code"
                value="+977"
                readOnly
              />
              <input
                type="tel"
                id="phone"
                name="phone"
                placeholder="Mobile number"
                required
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" required />
          </div>
          <div className="form-group">
            <label htmlFor="confirm-password">Confirm Password</label>
            <input
              type="password"
              id="confirm-password"
              name="confirm-password"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="district">District</label>
            <select id="district" name="district" required>
              <option value="">Select District</option>
              <option value="Kathmandu">Kathmandu</option>
              <option value="Lalitpur">Lalitpur</option>
              <option value="Bhaktapur">Bhaktapur</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="chowk">Chowk Name</label>
            <input type="text" id="chowk" name="chowk" required />
          </div>
          <div className="error-message" id="error-message"></div>
          <button type="submit">Apply</button>
        </form>
      </div>
    </div>
  );
};

export default RegistrationForm;
