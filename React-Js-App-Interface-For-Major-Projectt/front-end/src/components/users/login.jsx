import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "./AuthContext";
import "../static/Login.css";

const Login = () => {
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    general: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Use useNavigate hook for navigation

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrors({ ...errors, general: "" });
    setLoading(true);
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/user/login/",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const {
        token: { access },
        msg,is_admin,
      } = response.data;
      localStorage.setItem("authToken", access);
      localStorage.setItem("authenticated", "true");
      localStorage.setItem("is_admin", is_admin);
      localStorage.setItem("message", msg);

      login();
      navigate("/dash"); 
    } catch (error) {
      if (error.response && error.response.data && error.response.data.errors) {
        const { errors: apiErrors } = error.response.data;

        setErrors({
          email: apiErrors.email ? apiErrors.email[0] : "",
          password: apiErrors.password ? apiErrors.password[0] : "",
          general: apiErrors.non_field_errors
            ? apiErrors.non_field_errors[0]
            : "Invalid Credentials. Please try again.",
        });
      } else {
        setErrors({
          ...errors,
          general: "Network error. Please try again later.",
        });
      }
    } finally {
      setLoading(false); // Set loading state to false after login attempt is finished
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  return (
    <div className="login-container" id="login">
      <h1>Login</h1>
      <form className="login-form" onSubmit={handleLogin}>
        {errors.general && (
          <div className="error-messages" style={{ color: "red" }}>
            {errors.general}
          </div>
        )}
        <div className="error-messages" style={{ color: "red" }}>
          {errors.email}
        </div>
        <input
          type="text"
          name="email"
          placeholder="User Email"
          value={formData.email}
          onChange={handleChange}
        />
        <div className="error-messages" style={{ color: "red" }}>
          {errors.password}
        </div>
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />
        <button type="submit">
          {loading ? <div className="loader">Loading...</div> : "Login"}
        </button>
      </form>
      <div className="links">
        <Link to="/register">Sign up</Link> |{" "}
        <Link to="/forgot">Forgot password?</Link>
      </div>
    </div>
  );
};

export default Login;
