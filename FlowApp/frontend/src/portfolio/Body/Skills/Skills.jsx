import React, { useState } from "react";
import "./static/skill.css";

import Skilled from "../Database/skillApi";
function Skill({ MenuData }) {
  const [SkillData, setSkillData] = useState(Skilled);
  console.log(MenuData);
  console.log(SkillData);
  return (
    <>
      {MenuData.map((curElem) => {
        return (
          <>
            <div className="spm" id="my-skill" key={curElem.id}>
              {/* <!-- skillPageManagement --> */}
              <div className="skillPage">
                {/* <!-- <div className="skills"> --> */}
                <h1 style={{ color: "rebeccapurple" }}>My Skills</h1>
                <div className="skillShow">
                  <div className="AboutMe">
                    <div className="aboutimg"></div>
                    <div className="about">
                      <br />

                      <h2>About Me</h2>
                      <h5>
                        <span style={{ paddingLeft: "30px" }}> </span>
                        {curElem.aboutMe}
                      </h5>
                    </div>
                  </div>
                  <div className="AboutMeright">
                    <br />{" "}
                    <ul className="SEE">
                      <li>Skill</li>
                      <li>Experience</li>
                      <li>Education</li>
                    </ul>
                    <ul className="skillul">
                      <li>
                        Python
                        <div className="skillback">
                          <div className="skill py"></div>
                        </div>
                      </li>
                      <li>
                        PHP
                        <div class="skillback">
                          <div class="skill php" width="10%"></div>
                        </div>
                      </li>
                      <li>
                        Mysql
                        <div class="skillback">
                          <div class="skill Mysql" width="90%"></div>
                        </div>
                      </li>
                      <li>
                        Javascript
                        <div class="skillback">
                          <div class="skill Javascript" width="75%">
                            {" "}
                          </div>
                        </div>
                      </li>
                      <li>
                        React Js
                        <div class="skillback">
                          <div class="skill ReactJs" width="90%"></div>
                        </div>
                      </li>
                      <li>
                        C++
                        <div class="skillback">
                          <div class="skill C++" width="90%">
                            {" "}
                          </div>
                        </div>
                      </li>
                      <li>
                        {" "}
                        Java
                        <div class="skillback">
                          <div class="skill Java" width="90%"></div>
                        </div>
                      </li>
                      <li>
                        {" "}
                        CSS
                        <div class="skillback">
                          <div class="skill CSS" width="90%"></div>
                        </div>
                      </li>
                      <li>
                        {" "}
                        HTML
                        <div class="skillback">
                          <div class="skill HTML" width="90%"></div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* <!-- </div> --> */}
              </div>
            </div>
          </>
        );
      })}
    </>
  );
}
export default Skill;
