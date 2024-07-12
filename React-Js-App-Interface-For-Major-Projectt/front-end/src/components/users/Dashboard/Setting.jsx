import React, { useState } from "react";
import axios from "axios"; // Import axios for making HTTP requests
import "./setting.css";
import settingpic from "../../images/1.jpg";

const Setting = () => {
  const [key, setKey] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [coordinates, setCoordinates] = useState({ x: 0, y: 0 });
  const [storedCoordinates, setStoredCoordinates] = useState([]);
  const [locationId, setLocationId] = useState("");
  const [selectedCamera, setSelectedCamera] = useState("Camera 1");

  const validateKey = () => {
    if (key === "master") {
      setIsAuthenticated(true);
    } else {
      alert("Incorrect master key!");
    }
  };

  const handleMouseMove = (event) => {
    const rect = event.target.getBoundingClientRect();
    const x = Math.round(event.clientX - rect.left);
    const y = Math.round(event.clientY - rect.top);
    setCoordinates({ x, y });
  };

  const handleClick = () => {
    const newCoord = `(${coordinates.x}, ${coordinates.y})`;
    setStoredCoordinates([...storedCoordinates, newCoord]);
  };

  const handleApply = () => {
    // Assuming your Django API endpoint is at this URL
    const apiUrl = "http://127.0.0.1:8000/api/dash/mask-area/";

    // Example data to send to the API
    const data = {
      coordinates: storedCoordinates,
      locationId: locationId,
      selectedCamera: selectedCamera,
    };

    // Example headers, adjust as per your API requirements
    const headers = {
      "Content-Type": "application/json",
    };

    // Make a POST request to send data to Django API
    axios.post(apiUrl, data, { headers })
      .then((response) => {
        console.log("Data sent successfully:", response.data);
        // Optionally, clear stored coordinates after successful submission
        setStoredCoordinates([]);
      })
      .catch((error) => {
        console.error("Error sending data:", error);
      });
  };

  return (
    <>
      <div className="dasheader">
        <h1>Setting</h1>
        <p>
          This is the System Admin. This system admin is accessed only by the
          authorized user from the System admin which provides him the 'master
          key' with which he can submit the detection area to which it should
          detect. This request to admin for manipulation of the area of interest
          if needed.
        </p>
      </div>
      <hr />
      <div className="center">
        <div className="setting_cont">
          {!isAuthenticated ? (
            <div id="input-container">
              <label htmlFor="master-key">
                <p>Please enter the master key:</p>
              </label>
              <input
                type="text"
                id="master-key"
                placeholder="Enter master key"
                value={key}
                onChange={(e) => setKey(e.target.value)}
              />
              <button onClick={validateKey}>Submit</button>
            </div>
          ) : (
            <div id="content-container">
              <div className="settings-controls">
              <div className="locationid">
                <input 
                  type="text" className="locid"
                  placeholder="Location ID"
                  value={locationId}
                  onChange={(e) => setLocationId(e.target.value)}
                />
                </div>
                <div className="select_id">
                <select
                  value={selectedCamera}
                  onChange={(e) => setSelectedCamera(e.target.value)}
                >
                  <option value="Camera 1">Camera 1</option>
                  <option value="Camera 2">Camera 2</option>
                  <option value="Camera 3">Camera 3</option>
                </select>
                </div>
                <div className="buttonsize">
                <button onClick={handleApply}>Apply</button>
                </div>
              </div>
              <div className="main-img">
                <img
                  src={settingpic}
                  alt="setting"
                  className="setimg"
                  onMouseMove={handleMouseMove}
                  onClick={handleClick}
                />
                <div className="coordinates">
                  Coordinates: ({coordinates.x}, {coordinates.y})
                </div>
              </div>
              <div className="stored-coordinates">
                <h3>Stored Coordinates:</h3>
                <div className="coord-list">
                  {storedCoordinates.join(", ")}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Setting;
