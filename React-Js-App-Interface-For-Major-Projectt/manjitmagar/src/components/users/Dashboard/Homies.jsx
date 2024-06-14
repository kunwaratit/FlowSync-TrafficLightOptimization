import React, { useState } from "react";
import "./static/dashboard.css";
import "./static/home.css";
import road from "../../images/image.png";
import { data } from "./data";
const Homies = () => {
  const [search, setSearch] = useState("");

  console.log(search);
  return (
    <>
      {/* <div className="my-content"> */}
        <div className="dasheader">
          <h1>Home</h1>
        </div>
        <hr />
        <div className="homeContainer">
          <div className="search">
            <input
              type="search"
              onChange={(e) => setSearch(e.target.value)}
              name=""
              id=""
              className="search-bar"
              placeholder="Type location ......"
              title="Search"
            />
          </div>
          <div className="InstalledList">
            {data
              .filter((item) => {
                return search.toLowerCase() == ""
                  ? item
                  : item.location_id.toLowerCase().includes(search);
              })
              .map((item) => (
                <div className="installedInfo">
                  <div className="card" key={item.id}>
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
                  </div>
                </div>
              ))}

            <div className="installedInfo">
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
            </div>
            <div className="installedInfo">
              Gwarko
              <p>asdasd</p>
              asdasd
            </div>
          </div>
          {/* <VehicleCountTable /> */}
        </div>
      {/* </div> */}
    </>
  );
};

export default Homies;
