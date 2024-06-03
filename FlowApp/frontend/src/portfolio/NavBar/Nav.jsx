import React, { useState } from "react";
import "./static/Nav.css";
import "./static/mediaquery.css";
import logo from "./static/Icon1.png";
function Nav({ MenuData }) {
  // console.log(MenuData)
  return (
    <>
      {MenuData.map((curElem) => {
        return (
          <>
            <div id="navbar">
              <a href="#">
                <ul className="logo">
                  <img
                    src={logo}
                    alt=""
                    style={{ borderRadius: "30px", background: "#ffffff" }}
                  />
                  <h5>{curElem.companyName}</h5>
                </ul>
              </a>
              <ul className="nav">
                <li>
                  <a href="#home">Home</a>
                </li>

                <li>
                  <a href="#cv">Portfolio</a>
                </li>
                <li>
                  <a href="#my-skill">Skills</a>
                </li>
                <li>
                  <a href="#info-content">About</a>
                </li>

                <li>
                  <a href="blog.html">Blog</a>
                </li>
                {/* <!-- <li><a href="#contact">Contact</a></li> --> */}

                <li>
                  {" "}
                  <a href="gallery.html">Gallery</a>{" "}
                </li>
              </ul>
            </div>
          </>
        );
      })}
    </>
  );
}
export default Nav;
