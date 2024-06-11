import React from "react";
import "./static/dashboard.css";
import "./static/home.css";
import road from "../../images/image.png";

const Homies = () => {
  return (
    <>
      <div className="dasheader">
        <h1>Home</h1>
      </div>
      <hr />
      <div className="homeContainer">
        <div className="search">Search</div>
        <div className="InstalledList">
          <div className="installedInfo">
            <div className="card">
             
              <div className="roadimg">
                <p>Satdobato</p>
                <img src={road} alt="xaina picture nai" srcset="" />
              </div>
             
            </div>
            <div className="info">asbdjasdkasd</div>
          </div>
          <div className="installedInfo">
            Gwarko
            <p>asdasd</p>
            asdasd
          </div>
        </div>
      </div>
    </>
  );
};
export default Homies;
