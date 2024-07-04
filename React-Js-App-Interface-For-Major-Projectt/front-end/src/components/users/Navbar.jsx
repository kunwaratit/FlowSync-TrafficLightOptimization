import React, { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import mainlogo from "../images/mainlogo1.png";
import "./navbar.css"; 

const Navbar = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileScreen, setIsMobileScreen] = useState(false);

  useEffect(() => {
    
    handleScreenResize();

    
    window.addEventListener("resize", handleScreenResize);

    
    return () => {
      window.removeEventListener("resize", handleScreenResize);
    };
  }, []);

  const handleScreenResize = () => {
    
    setIsMobileScreen(window.innerWidth <= 768);
    
    
    setIsMobileMenuOpen(false);
  };

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="section-navbar">
      <div className="container">
        <div className="navbar-brand">
          <NavLink to="/home">
            <img src={mainlogo} height="100%" width="auto" alt="Portfolio Logo" />
          </NavLink>
        </div>

        
        {!isMobileScreen && (
          <div className="hamburger-menu" onClick={handleMobileMenuToggle}>
            <div className="bar"></div>
            <div className="bar"></div>
            <div className="bar"></div>
          </div>
        )}

        
        {isMobileScreen && (
          <div className={`menu-button ${isMobileMenuOpen ? 'open' : ''}`} onClick={handleMobileMenuToggle}>
            <div className="menu-button-lines"></div>
            <div className="menu-button-lines"></div>
            <div className="menu-button-lines"></div>
          </div>
        )}

        
        <nav className={`navbar ${isMobileScreen && isMobileMenuOpen ? "open" : ""}`}>
          <ul>
            <li className="nav-item">
              <NavLink to="/home">Home</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/home#call-me-about">About</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/home#section-contact--homepage">Contact</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/check-status">Check Status</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/login">Login</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/register">Register</NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
