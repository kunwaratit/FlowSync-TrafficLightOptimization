import React from "react";
import "./static/footer.css";

function Footer(MenuData) {
  return (
    <>
      <hr />
      <footer>
        <div className="footer">
          <div className="footerLeft">
            <ul>
              <li>
                <a href="#contact">Contact Us</a> |
              </li>
              <li>
                <a href="">Privacy Notice</a> |
              </li>
              <li>
                <a href="">FAQs</a> |
              </li>
              <li>
                <a href="https://kunwaratit.github.io/Portfolio/">
                  version 1.0
                </a>
                |
              </li>
            </ul>
          </div>
          <div className="footerRight">
            copyright&copy;<a href="Portfolio.html">atitKunwar</a>
          </div>
        </div>
      </footer>
    </>
  );
}
export default Footer;
