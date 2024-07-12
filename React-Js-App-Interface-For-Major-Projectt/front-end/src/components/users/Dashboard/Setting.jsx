import React, { useState } from "react";
import axios from "axios";
import "./setting.css";

const Setting = () => {
  const [key, setKey] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [coordinates, setCoordinates] = useState({ x: 0, y: 0 });
  const [storedCoordinates, setStoredCoordinates] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null); // State for selected file

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

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]); // Assuming single file selection
  };

  const handleFileUpload = async () => {
    try {
      const formData = new FormData();
      formData.append("image", selectedFile);

      const response = await axios.post("http://127.0.0.1:8000/api/upload-image/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Image uploaded successfully:", response.data);
      // Optionally, clear stored coordinates after successful upload
      setStoredCoordinates([]);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const handleClick = () => {
    const newCoord = `(${coordinates.x}, ${coordinates.y})`;
    setStoredCoordinates([...storedCoordinates, newCoord]);
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
                <div className="upload-section">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                  <button onClick={handleFileUpload}>Upload Image</button>
                </div>
                <div className="coordinates">
                  Coordinates: ({coordinates.x}, {coordinates.y})
                </div>
                <div className="stored-coordinates">
                  <h3>Stored Coordinates:</h3>
                  <div className="coord-list">
                    {storedCoordinates.join(", ")}
                  </div>
                </div>
              </div>
              <div className="main-img">
                {/* Placeholder for image display */}
                <div className="setimg"
                  onMouseMove={handleMouseMove}
                  onClick={handleClick}
                >
                  {/* Display image or image placeholder */}
                  {selectedFile ? (
                    <img
                      src={URL.createObjectURL(selectedFile)}
                      alt="Uploaded"
                      className="uploaded-image"
                    />
                  ) : (
                    <p>No image uploaded</p>
                  )}
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
