import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [IsSupAuthenticated, setIsSupAuthenticated] = useState(false); // Corrected naming

  const navigate = useNavigate();

  useEffect(() => {
    // Check local storage for authentication status and token
    const token = localStorage.getItem("authToken");
    const isAdmin = localStorage.getItem("is_admin") === "true";
    const isActive = localStorage.getItem("is_active") === "true";

    if (token && isActive) {
      setIsAuthenticated(true);
      setIsAdmin(isAdmin);
      setIsActive(isActive);

      if (isAdmin) {
        setIsSupAuthenticated(true);
        localStorage.setItem("supAdmin", "true");
      } else {
        setIsSupAuthenticated(false); // Ensure IsSupAuthenticated is false if not admin
        localStorage.setItem("supAdmin", IsSupAuthenticated);
      }
    } else {
      logout(); // Ensure logout if token or isActive is missing
    }
  }, []);

  const login = () => {
    const token = localStorage.getItem("authToken");
    const isAdmin = localStorage.getItem("is_admin") === "true";
    const isActive = localStorage.getItem("is_active") === "true";

    if (token && isActive) {
      setIsAuthenticated(true);
      setIsAdmin(isAdmin);
      setIsActive(true); // Optionally set isActive to true upon login
      localStorage.setItem("authenticated", "true");
      localStorage.setItem("isAdmin", isAdmin);

      if (isAdmin) {
        setIsSupAuthenticated(true);
        localStorage.setItem("supAdmin", "true");
        navigate("/sup-dash");
      } else {
        setIsSupAuthenticated(false);
        localStorage.setItem("supAdmin", IsSupAuthenticated);
        navigate("/dash");
      }
    } else {
      logout(); // Ensure logout if token or isActive is missing
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setIsAdmin(false);
    setIsActive(false);
    setIsSupAuthenticated(false); // Reset IsSupAuthenticated state upon logout
    localStorage.removeItem("authToken");
    localStorage.removeItem("authenticated");
    localStorage.removeItem("message");
    localStorage.removeItem("isAdmin");
    localStorage.removeItem("is_active");
    localStorage.removeItem("is_admin");
    localStorage.removeItem("supAdmin");
    navigate("/login");
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isAdmin,
        isActive,
        IsSupAuthenticated,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
