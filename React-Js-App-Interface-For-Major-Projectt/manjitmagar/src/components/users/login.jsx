import React, { useState } from "react";
import '../static/Login.css';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios'; 
import { useAuth } from './AuthContext';

const Login = () => {
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    general: ""
  });
  const navigate = useNavigate(); 

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrors({ ...errors, general: "" }); 

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/user/login/', formData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const { token: { access }, msg } = response.data;
      localStorage.setItem('authToken', access);
      localStorage.setItem('message', msg);

      login(); 
      navigate('/d-home'); 

    } catch (error) {
      if (error.response && error.response.data && error.response.data.errors) {
        const { errors: apiErrors } = error.response.data;

        setErrors({
          email: apiErrors.email ? apiErrors.email[0] : "",
          password: apiErrors.password ? apiErrors.password[0] : "",
          general: apiErrors.non_field_errors ? apiErrors.non_field_errors[0] : "Invalid Credintals Please try again."
        });
      } else {
        setErrors({ ...errors, general: "Network error. Please try again later." });
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" }); 
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      <form className="login-form" onSubmit={handleLogin}>
        {errors.general && <div className="error-messages" style={{ color: 'red' }}>{errors.general}</div>}
        <div className="error-messages" style={{ color: 'red' }}>{errors.email}</div>
        <input type="text" name="email" placeholder="User Email" value={formData.email} onChange={handleChange} />
        <div className="error-messages" style={{ color: 'red' }}>{errors.password}</div>
        <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} />
        <button type="submit">Login</button>
       
      </form>
      <div className="links">
        <Link to="/register">Sign up</Link> | <Link to="/forgot">Forgot password?</Link>
      </div>
    </div>
  );
}

export default Login;
