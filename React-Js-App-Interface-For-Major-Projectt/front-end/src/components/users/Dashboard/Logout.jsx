import React from 'react';
import { useAuth } from '../AuthContext'; // Assuming you have an AuthContext for managing authentication
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const { logout } = useAuth(); // Assuming you have a logout function in your AuthContext
  const navigate = useNavigate();
  const handleLogout = () => {
    // Clear authentication state and tokens from local storage
    localStorage.removeItem('authToken');
    localStorage.removeItem('authenticated');
    localStorage.removeItem('message');

    // Call the logout function from AuthContext to clear any other authentication-related state
    // logout();
    navigate('/home')
  };

  return (<>
    <p>Are You sure You are going to log out the system?</p>
    <button onClick={handleLogout}>Logout</button>
    </>);
};

export default Logout;
