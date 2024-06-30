import mainlogo from "../images/mainlogo1.png";
import React, { useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { ImHome3 } from "react-icons/im";
const Navbar = () => {
  const location = useLocation();

  // Scroll to section based on hash in URL
  useEffect(() => {
    const { hash } = location;
    if (hash) {
      const sectionId = hash.substring(1);
      const section = document.getElementById(sectionId);
      if (section) {
        window.scrollTo({
          top: section.offsetTop,
          behavior: "smooth",
        });
      }
    }
  }, [location]);

  return (
    <header className="section-navbar">
      <div className="container">
        <div className="navbar-brand">
          <NavLink to="/home">
            <img
              src={mainlogo}
              height="100%"
              width="auto"
              alt="Portfolio Logo"
            />
          </NavLink>
        </div>
        <nav className="navbar">
          <ul>
            <li className="nav-item">
              <NavLink to="/home"> Home</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/home#call-me-about">About</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/home#section-contact--homepage">Contact</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/check-status">
                Check Status
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink  to="/login">
                Login
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink  to="/register">
                Register
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
