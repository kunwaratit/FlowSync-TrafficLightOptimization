import React, { useState } from 'react';
import './setting.css';
import settingpic from '../../images/image.png'

const Setting = () => {
  const [key, setKey] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const validateKey = () => {
    if (key === 'master') {
      setIsAuthenticated(true);
    } else {
      alert('Incorrect master key!');
    }
  };

  return (
    <>
      <div className="dasheader">
        <h1>Setting</h1>
      </div>
      <hr />
      <div className="center">
      <div className="setting_cont">
        {!isAuthenticated ? (
          <div id="input-container">
            <label htmlFor="master-key"><p>Please enter the master key:</p></label>
            <p>Default key 'master'</p>
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
            <img src={settingpic} alt="Description of image" />
            <div className="buttons">
              <button className='edit'>Edit</button>
              <button className='save'>Save</button>
            </div>
          </div>
        )}
      </div>
      </div>
    </>
  );
};

export default Setting;
