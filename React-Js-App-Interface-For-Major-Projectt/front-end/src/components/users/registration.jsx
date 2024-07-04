import React, { useState } from "react";
import provincesData from "./provincesData"; // Import provincesData from separate file
import "./registration.css";
import { validateForm } from "./Validation";
import axios from "axios";

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    phone_number: "",
    password: "",
    password2: "",
    district: "",
    intersection: "",
    province: "",
    // selectedDistrict: "",
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

  const handleProvinceChange = (e) => {
    const province = e.target.value;
    setFormData({
      ...formData,
      province,
      district: "",
    });
  };

  const handleDistrictChange = (e) => {
    const district = e.target.value;
    setFormData({
      ...formData,
      district,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { errors, formIsValid } = validateForm(formData);
    setErrors(errors);

    if (formIsValid) {
      try {
        const response = await axios.post(
          "http://127.0.0.1:8000/user/register/",
          formData,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.data.errors) {
          setErrors({ ...errors, ...response.data.errors }); // Set the error message in state
        } else {
          // Registration successful, handle accordingly
          console.log("Registration successful");
          setSuccessMessage("Request submitted successfully!");
          setFormData({
            email: "",
            phone_number: "",
            password: "",
            password2: "",
            district: "",
            intersection: "",
            province: "",
            // selectedDistrict: "",
          });
          setErrors({});
        }
      } catch (error) {
        if (
          error.response &&
          error.response.data &&
          error.response.data.errors
        ) {
          const serverErrors = error.response.data.errors;
          setErrors({ ...errors, ...serverErrors });
        } else {
          console.error(error);
        } // Handle the error response from the server, e.g., show an error message
      }
    }
  };

  return (
    <div className="center-container">
      <div className="form-container">
        <form id="registrationForm" onSubmit={handleSubmit}>
          <h2 className="heading">Register</h2>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <div>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`form-control ${errors.email ? "error" : ""}`}
              placeholder="user@example.com"
              // required
            /></div>
            {errors.email && (
              <div className="error-message">{errors.email}</div>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="phone_number">Phone Number</label>
            <div className="phone-group">
              <input
                type="tel"
                id="phone_number"
                name="phone_number"
                value={formData.phone_number}
                onChange={handleChange}
                className={`form-control ${errors.phone_number ? "error" : ""}`}
                placeholder="98********"
                // required
              />
            </div>
            {errors.phone_number && (
              <div className="error-message">{errors.phone_number}</div>
            )}
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
              placeholder="Password"
              // required
            />
            {errors.password && (
              <div className="error-message">{errors.password}</div>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="password2">Confirm Password</label>
            <input
              type="password"
              id="password2"
              name="password2"
              value={formData.password2}
              onChange={handleChange}
              className={`form-control ${errors.password2 ? "error" : ""}`}
              placeholder="Confirm Password"
              // required
            />
            {errors.password2 && (
              <div className="error-message">{errors.password2}</div>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="province">Province</label>
            <select
              id="province"
              name="province"
              value={formData.province}
              onChange={handleProvinceChange}
              className={`form-control ${errors.province ? "error" : ""}`}
              // required
            >
              <option value="">Select Province</option>
              {provincesData.map((province, index) => (
                <option key={index} value={province.province}>
                  {province.province}
                </option>
              ))}
            </select>
            {errors.province && (
              <div className="error-message">{errors.province}</div>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="district">District</label>
            <select
              id="district"
              name="district"
              value={formData.district}
              onChange={handleDistrictChange}
              className={`form-control ${errors.district ? "error" : ""}`}
              // required
            >
              <option value="">Select District</option>
              {formData.province &&
                provincesData
                  .find((prov) => prov.province === formData.province)
                  .districts.map((district, index) => (
                    <option key={index} value={district}>
                      {district}
                    </option>
                  ))}
            </select>
            {errors.district && (
              <div className="error-message">{errors.district}</div>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="intersection">Intersection Name</label>
            <input
              type="text"
              id="intersection"
              name="intersection"
              value={formData.intersection}
              onChange={handleChange}
              className={`form-control ${errors.intersection ? "error" : ""}`}
              placeholder="Intersection Name (e.g. Durbar Chowk)"
              // required
            />
            {errors.intersection && (
              <div className="error-message">{errors.intersection}</div>
            )}
          </div>
          <button type="submit" className="btn btn-primary">
            Register
          </button>
          {successMessage && (
            <div className="success-message">{successMessage}</div>
          )}
        </form>
      </div>
    </div>
  );
};

export default RegistrationForm;
