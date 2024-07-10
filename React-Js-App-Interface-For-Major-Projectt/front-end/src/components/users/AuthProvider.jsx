// import React, { createContext, useContext, useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';

// const AuthContext = createContext();

// export function AuthProvider({ children }) {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     // Check local storage for authentication status and token
//     const token = localStorage.getItem('authToken');
//     const authenticated = localStorage.getItem('authenticated') === 'true';
    
//     if (token && authenticated) {
//       setIsAuthenticated(true);
//     }
//   }, []);

//   const login = () => {
//     setIsAuthenticated(true);
//     // Store authentication status in local storage
//     localStorage.setItem('authenticated', 'true');
//   };

//   const logout = () => {
//     setIsAuthenticated(false);
//     // Remove authentication status and token from local storage
//     localStorage.removeItem('authToken');
//     localStorage.removeItem('authenticated');
//     localStorage.removeItem('message');
//     navigate('/login');
//   };

//   return (
//     <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// }

// export function useAuth() {
//   return useContext(AuthContext);
// }
