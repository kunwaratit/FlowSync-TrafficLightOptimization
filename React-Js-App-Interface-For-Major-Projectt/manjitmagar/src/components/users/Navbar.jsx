import mainlogo from '../images/mainlogo.png';
// import Link from reactrou
import React,{ useEffect } from 'react';

import {Link,useLocation} from 'react-router-dom';
const Navbar = () => {

  const location = useLocation();
  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      window.scrollTo({
        top: section.offsetTop,
        behavior: "smooth"
      });
    }
  };
  useEffect(() => {
    if (location.hash) {
      const sectionId = location.hash.substring(1);
      scrollToSection(sectionId);
    }
  }, [location]);

  return (
    
    <header className="section-navbar">
      <div className="container">

      <div className="navbar-brand">
          <Link to="">
            <img
              src={mainlogo}
              height="100%"
              width="auto"
              alt="Portfolio Logo"
            />
          </Link>
        </div>

        <nav className="navbar">
          <ul>
            <li className="nav-item">
              <Link to="/home#call-me-home" className="nav-link">Home</Link>
            </li>
            <li className="nav-item">
              <Link to="/home#call-me-about" className="nav-link">About</Link>
            </li>
            <li className="nav-item">
              <Link to="/home#section-contact--homepage" className="nav-link">Contact</Link>
            </li>
            <li className="nav-item">
              <Link to="/setting" className="nav-link">Setting</Link>
            </li>
            <li className="nav-item">
              <Link to="/login" className="nav-link">Login</Link>
            </li>
            <li className="nav-item">
              <Link to="/register" className="nav-link">Register</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
