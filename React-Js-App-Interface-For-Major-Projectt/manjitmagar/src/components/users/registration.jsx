import React, { useState } from "react";
import "./registration.css";

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    district: "",
    chowk: "",
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    
    let errors = {};
    let formIsValid = true;

    
    if (!formData.email) {
      errors.email = "Email is required";
      formIsValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email address is invalid";
      formIsValid = false;
    }

    
    if (!formData.phone) {
      errors.phone = "Phone number is required";
      formIsValid = false;
    } else if (!/^\d{10}$/.test(formData.phone)) {
      errors.phone = "Phone number should be exactly 10 digits";
      formIsValid = false;
    }

    
    if (!formData.password) {
      errors.password = "Password is required";
      formIsValid = false;
    } else if (!/(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[^A-Za-z0-9]).{8,}/.test(formData.password)) {
      errors.password = "Password must contain at least one uppercase letter, one lowercase letter, one numeric digit, and one special character";
      formIsValid = false;
    }

    
    if (!formData.confirmPassword) {
      errors.confirmPassword = "Confirm Password is required";
      formIsValid = false;
    } else if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
      formIsValid = false;
    }

   
    if (!formData.district) {
      errors.district = "District is required";
      formIsValid = false;
    }

    
    if (!formData.chowk) {
      errors.chowk = "Chowk name is required";
      formIsValid = false;
    }

    
    setErrors(errors);

    
    if (formIsValid) {
      
      setTimeout(() => {  
        setSuccessMessage("Form submitted successfully!");
        
        setFormData({
          email: "",
          phone: "",
          password: "",
          confirmPassword: "",
          district: "",
          chowk: "",
        });
        
        setErrors({});
      }, 1000); 
    }
  };

  return (
    <div className="center-container">
      <div className="form-container">
        <form id="registrationForm" onSubmit={handleSubmit}>
          <h2 className="heading">Register</h2>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`form-control ${errors.email ? "error" : ""}`}
              required
            />
            {errors.email && <div className="error-message">{errors.email}</div>}
          </div>
          <div className="form-group">
            <label htmlFor="phone">Phone Number</label>
            <div className="phone-group">
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className={`form-control ${errors.phone ? "error" : ""}`}
                placeholder="Mobile number (e.g., 9876543210)"
                required
              />
            </div>
            {errors.phone && <div className="error-message">{errors.phone}</div>}
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={`form-control ${errors.password ? "error" : ""}`}
              placeholder="Password (min. 8 characters, at least one uppercase, one lowercase, one digit, one special character)"
              required
            />
            {errors.password && (
              <div className="error-message">{errors.password}</div>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="confirm-password">Confirm Password</label>
            <input
              type="password"
              id="confirm-password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={`form-control ${errors.confirmPassword ? "error" : ""}`}
              placeholder="Confirm Password"
              required
            />
            {errors.confirmPassword && (
              <div className="error-message">{errors.confirmPassword}</div>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="district">District</label>
            <select
              id="district"
              name="district"
              value={formData.district}
              onChange={handleChange}
              className={`form-control ${errors.district ? "error" : ""}`}
              required
            >
              <option value="">Select District</option>
              <option value="Kathmandu">Kathmandu</option>
              <option value="Lalitpur">Lalitpur</option>
              <option value="Bhaktapur">Bhaktapur</option>
            </select>
            {errors.district && (
              <div className="error-message">{errors.district}</div>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="chowk">Chowk Name</label>
            <input
              type="text"
              id="chowk"
              name="chowk"
              value={formData.chowk}
              onChange={handleChange}
              className={`form-control ${errors.chowk ? "error" : ""}`}
              placeholder="Chowk Name (e.g., Durbar Chowk)"
              required
            />
            {errors.chowk && <div className="error-message">{errors.chowk}</div>}
          </div>
          <button type="submit" className="btn btn-primary">Register</button>
          {successMessage && <div className="success-message">{successMessage}</div>}
        </form>
      </div>
    </div>
  );
};

export default RegistrationForm;
