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
  const [error, setError] = useState('');
  const navigate = useNavigate(); 

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');

    axios.post('http://127.0.0.1:8000/api/user/login/', formData, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      console.log(response.data); // Log the response data to see its structure

      const { token: { access }, msg } = response.data;
      if (access) {
        localStorage.setItem('authToken', access);
        localStorage.setItem('message', msg);

        login(); // Call login to update the authentication state
        navigate('/d-home');
      }
    })
    .catch(error => {
      console.error(error);
      if (error.response && error.response.data && error.response.data.detail) {
        setError(error.response.data.detail);
      } else {
        setError("Invalid credentials! Try again.");
      }
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      {error && <div className="error-message" style={{ color: 'red' }}> {error}</div>}
      <form className="login-form" onSubmit={handleLogin}>
        <input type="text" name="email" placeholder="User Email" value={formData.email} onChange={handleChange} />
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
