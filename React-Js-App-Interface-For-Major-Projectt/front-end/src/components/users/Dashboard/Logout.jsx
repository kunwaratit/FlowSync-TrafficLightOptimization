import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext'; // Assuming you have an AuthContext for managing authentication

const Logout = () => {
  const { logout } = useAuth(); 
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('authenticated');
    localStorage.removeItem('message');

    logout();
    navigate('/home')
  };

  return (<>
    <p>Are You sure You are going to log out the system?</p>
    <button onClick={handleLogout}>Logout</button>
    </>);
};

export default Logout;
