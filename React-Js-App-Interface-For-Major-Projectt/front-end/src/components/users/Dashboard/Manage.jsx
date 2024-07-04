import React, { useState } from "react";
import "./manage.css"; // Import your CSS file
import camX from "../../images/camX.png";
const Manage = () => {
  const [userKey, setUserKey] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [selectedCity, setSelectedCity] = useState("city1"); // Set default value to 'city1'

  const validateKey = () => {
    if (userKey === "user") {
      setIsAuthenticated(true);
    } else {
      alert("Incorrect user key!");
    }
  };

  const handleCityChange = (event) => {
    setSelectedCity(event.target.value);
  };

  const handleCheckCameraAngle = () => {
    alert(`Checking camera angle for ${selectedCity}`);
    // Implement your logic here
  };

  const handlePredictDetection = () => {
    alert(`Predicting detection for ${selectedCity}`);
    // Implement your logic here
  };

  return (
    <>
      <div className="dasheader">
        <h1>Manage</h1>
        <p>
          This section manages the System. In this section you have to manage
          and observe the setting applied.The system setting applied can be
          observed in this section through the downloaded video. If there is any
          problem in camera angle, detection, counting with this we visualize
          the reason for exact problem we are facing in the system.
        </p>
      </div>
      <hr />
      {/* <div className="manage_cont"> */}
      {!isAuthenticated ? (
        <div className="center">
          <div className="manage_cont">
            <div className="manage-cont-hold">
              <div id="input-container">
                <label htmlFor="user-key">
                  <p>Please enter the user key:</p>
                </label>
                <input
                  type="text"
                  id="user-key"
                  placeholder="Enter user key"
                  value={userKey}
                  onChange={(e) => setUserKey(e.target.value)}
                />
                <button onClick={validateKey}>Submit</button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div id="form-container">
          <div className="operation-container">
            <div className="camera">
              <div>
                <p>
                  Choose the camera available below and check the condition of
                  camera,it's angle, response to the intensity of light and to
                  the different climatic condition.
                  <div className="cameraImg">
                    <a href={camX} target="_blank">
                      <img src={camX} alt="Camera" />
                    </a>
                  </div>
                </p>
              </div>
              <select name="" id="">
                <option value="">Cam_A</option>
                <option value="">Cam_B</option>
                <option value="">Cam_C</option>
                <option value="">Cam_D</option>
              </select>
              <button onClick={handleCheckCameraAngle} className="check-camera">
                Check Camera Angle
              </button>
            </div>
            <div className="detection">
              <div>
                <p>
                  Choose the camera available below to check the detection
                  condition of the camera,its angle and response to the
                  intensity of light different climatic condition.
                </p>
                <div className="detectionVid">
                  <a href={camX} target="_blank">
                    <img src={camX} alt="Camera" />
                  </a>
                </div>
              </div>
              <select name="" id="">
                <option value="">Cam_A</option>
                <option value="">Cam_B</option>
                <option value="">Cam_C</option>
                <option value="">Cam_D</option>
              </select>
              <button
                onClick={handlePredictDetection}
                className="predict-detection"
              >
                Predict Detection
              </button>
            </div>
          </div>
        </div>
      )}
      {/* </div> */}
    </>
  );
};

export default Manage;
