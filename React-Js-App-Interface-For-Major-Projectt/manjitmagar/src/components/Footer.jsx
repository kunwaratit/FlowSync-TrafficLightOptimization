import React from 'react';

const Footer = () => {
  return (
    <footer>
      <div className="container grid grid-four--cols">
        <div className="footer-1--div">
          <div className="logo-brand">
            <a href="index.html" className="footer-subheading">Team Revolution Bytes</a>
          </div>
          <p>Lets Make it Happen Together</p>
          <div className="social-footer--icons">
            <a href="/" target="_blank">
              <i className="fa-brands fa-youtube"></i>
            </a>
            <a href="/" target="_blank">
              <i className="fa-brands fa-discord"></i>
            </a>
            <a href="/" target="_blank">
              <i className="fa-brands fa-twitter"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
