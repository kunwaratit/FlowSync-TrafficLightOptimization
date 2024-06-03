import React, { useState } from "react";
import "./static/project.css";
import Project from "../Database/Project";
function Projects() {
  const [ProjData, setProjData] = useState(Project);
  return (
    <>
      <div className="ppm">
        {/* ProjectPageManagement  */}
        <div className="projectPage">
          <div className="projectContainer">
            <div className="projLeft">
              {" "}
              <h3>Projects</h3>
            </div>{" "}
            <div className="projRight">
              {ProjData.slice(0, 6).map((curElem) => {
                return (
                  <>
                    <div className="projCard">
                      <div className="projImg">
                        <p>heloo</p>
                        <img src={curElem.projImg} alt="" srcset="" />
                      </div>
                      <div className="projInfo">
                        <h3>{curElem.projName}</h3>
                        <div className="projDesc">This Project</div>
                      </div>
                    </div>
                  </>
                );
              })}{" "}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Projects;
