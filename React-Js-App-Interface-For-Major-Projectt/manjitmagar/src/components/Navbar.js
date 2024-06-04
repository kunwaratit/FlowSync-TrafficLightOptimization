import React from 'react';

const Navbar = () => {
  return (
    <header className="section-navbar">
      <div className="container">
        <nav className="navbar">
          <ul>
            <li className="nav-item">
              <a href="#call-me-home" className="nav-link">Home</a>
            </li>
            <li className="nav-item">
              <a href="#call-me-about" className="nav-link">About</a>
            </li>
            <li className="nav-item">
              <a href="#section-contact--homepage" className="nav-link">Contact</a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
