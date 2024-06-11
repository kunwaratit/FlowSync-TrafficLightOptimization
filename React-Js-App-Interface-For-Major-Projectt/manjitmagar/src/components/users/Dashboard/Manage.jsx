import React, { useState } from "react";
import './manage.css'; // Import your CSS file

const Manage = () => {
  const [userKey, setUserKey] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [selectedCity, setSelectedCity] = useState('city1'); // Set default value to 'city1'

  const validateKey = () => {
    if (userKey === 'user') {
      setIsAuthenticated(true);
    } else {
      alert('Incorrect user key!');
    }
  };

  const handleCityChange = (event) => {
    setSelectedCity(event.target.value);
  };

  const handleDownload = () => {
    alert(`Downloading data for ${selectedCity}`);
  };

  return (
    <>
      <div className="dasheader">
        <h1>Manage</h1>
      </div>
      <hr />
      <div className="homeContainer observe">
        <hr />
      </div>
     <div className="center">
      <div className="manage_cont"> 
        {!isAuthenticated ? (
          <div id="input-container">
            <label htmlFor="user-key"><p>Please enter the user key:</p></label> 
            <p>Default key 'user'</p>
            <input
              type="text"
              id="user-key"
              placeholder="Enter user key"
              value={userKey}
              onChange={(e) => setUserKey(e.target.value)}
            />
            <button onClick={validateKey}>Submit</button>
          </div>
        ) : (
          
          <div id="form-container">
            <label htmlFor="city" className="cityy">Select Time:</label>
            <select id="city" value={selectedCity} onChange={handleCityChange}>
              <option value="city1">5 seconds</option> 
              <option value="city2">10 seconds</option>
              <option value="city3">15 seconds</option>
            </select>
            <button onClick={handleDownload} className="download">Download</button>
          </div>
        )}
      </div>
      </div>
    </>
  );
};

export default Manage;
