import React from "react";
import "./static/help.css";
const Help = () => {
  return (
    <>
      <div className="dasheader">
        <h1>Help</h1>
      </div>
      <hr />
      <div className="main_help_div">
        <div className="help1 help">
          <ol>
            <li>
              <span>Bad Results</span>
              <ul>
                <li>
                  Go through the manage setting and observe the camera angle,
                  and consult to the operator in case of the bad angle placement
                  of the camera.
                </li>
              </ul>
            </li>
            <li>
              <span>Bad detection</span>
              <ul>
                <li>
                  Go through the manage setting and predict the video and
                  observe the detection, and consult to operator in case of
                  wrong detection and any other problem persists.
                </li>
              </ul>
            </li>
<li><span></span></li>



          </ol>

        </div>

       
      </div>
    </>
  );
};
export default Help;
