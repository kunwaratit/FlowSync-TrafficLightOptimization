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

  const handleLinkClick = (event, target) => {
    if (location.pathname === "/home" && target.startsWith("#")) {
      event.preventDefault();
      document.querySelector(target).scrollIntoView({ behavior: "smooth" });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <header className="section-navbar">
      <div className="container">
        <div className="navbar-brand">
          <NavLink to="/home">
            <img src={mainlogo} height="100%" width="auto" alt="Portfolio Logo" />
          </NavLink>
        </div>

        {isMobileScreen && (
          <div className={`menu-button ${isMobileMenuOpen ? 'open' : ''}`} onClick={handleMobileMenuToggle}>
            <div className="menu-button-lines"></div>
            <div className="menu-button-lines"></div>
            <div className="menu-button-lines"></div>
          </div>
        )}

        <nav className={`navbar ${isMobileScreen && isMobileMenuOpen ? "open" : ""}`} >
          <ul>
            <li className="nav-item">
              <NavLink to="/home" onClick={(e) => handleLinkClick(e, "#call-me-home")}>Home</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/home" onClick={(e) => handleLinkClick(e, "#call-me-about")}>About</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/home" onClick={(e) => handleLinkClick(e, "#section-contact--homepage")}>Contact</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/check-status" onClick={() => setIsMobileMenuOpen(false)}>Check Status</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/login" onClick={() => setIsMobileMenuOpen(false)}>Login</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/register" onClick={() => setIsMobileMenuOpen(false)}>Register</NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
