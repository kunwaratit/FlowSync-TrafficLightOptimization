import React, { useState, useEffect } from "react";
import "./static/dashboard.css";
import "./static/home.css";
import road from "../../images/image.png";
import { data } from "./data";
import VehicleCountTable from "./location";
import { useAuth } from "../AuthContext";

const Homies = () => {
  const [search, setSearch] = useState("");
  const { isAuthenticated } = useAuth();

  const [activeLight, setActiveLight] = useState("red");

  useEffect(() => {
    const lights = ["red", "yellow", "green"];
    let currentIndex = 0;

    const interval = setInterval(() => {
      setActiveLight(lights[currentIndex]);
      currentIndex = (currentIndex + 1) % lights.length;
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  console.log(search);
  return (
    <>
      <div className="my-content">
        <div className="dasheader">
          <h1>Check Status</h1>
          <p>
            This is the section to check the status of the traffic in current
            scenario.
          </p>
        </div>
        <hr />
        <div className="homeContainer">
        {isAuthenticated && <VehicleCountTable />}
          <div className="search">
            <input
              type="search"
              onChange={(e) => setSearch(e.target.value)}
              name=""
              id=""
              className="search-bar"
              placeholder="Search location ......"
              title="Search"
            />
          </div>
          <div className="InstalledList">
            {data
              .filter((item) => {
                return search.toLowerCase() === ""
                  ? item
                  : item.location_id.toLowerCase().includes(search);
              })
              .map((item) => (
                <div className="installedInfo" key={item.id}>
                  <div className="card">
                    <div className="roadimg">
                      <p>{item.location_id}</p>
                      <span className="live">Live</span>
                      <img src={road} alt="xaina picture nai" />
                    </div>
                  </div>
                  <div className="info">
                    <span>
                      <strong>Note: </strong>The Junction Looks {item.situation}
                    </span>
                    <br />
                    <p>{item.content}</p>
                  </div>
                </div>
              ))}

            {/* <div className="installedInfo">
              <div className="card">
                <div className="roadimg">
                  <p>Gwarko</p>
                  <img src={road} alt="xaina picture nai" />
                </div>
              </div>
              <div className="info">asbdjasdkasd</div>
            </div>
            <div className="installedInfo">
              <div className="card">
                <div className="roadimg">
                  <p>Ekantakuna</p>
                  <img src={road} alt="xaina picture nai" />
                </div>
              </div>
              <div className="info">asbdjasdkasd</div>
            </div> */}
          </div>
          {/* {isAuthenticated && <VehicleCountTable />} */}
        </div>
        <div className="lightbg">
        <div className="traffic-light">
          <div className={`lr light ${activeLight === "red" ? "red" : ""}`}></div>
          <div className={`ly light ${activeLight === "yellow" ? "yellow" : ""}`}></div>
          <div className={`lg light ${activeLight === "green" ? "green" : ""}`}></div>
          <div className="time">60</div>
        </div>
        </div>
      </div>
    </>
  );
};

export default Homies;
