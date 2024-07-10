import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);
  useEffect(() => {
    // Check local storage for authentication status and token
    const token = localStorage.getItem('authToken');
    const authenticated = localStorage.getItem('authenticated') === 'true';
    const isAdmin = localStorage.getItem('is_admin') === 'true'; // Check if user is admin

    if (token && authenticated) {
      setIsAuthenticated(true);
      setIsAdmin(isAdmin)
    }
  }, []);

  const login = () => {
    setIsAuthenticated(true);
    const isAdmin = localStorage.getItem('is_admin') === 'true'; // Retrieve isAdmin from localStorage
    setIsAdmin(isAdmin);
    localStorage.setItem('authenticated', 'true');
  };

  const logout = () => {
    setIsAuthenticated(false);
    setIsAdmin(false);
    localStorage.removeItem('authToken');
    localStorage.removeItem('authenticated');
    localStorage.removeItem('message');
    localStorage.removeItem('isAdmin');
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated,isAdmin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
