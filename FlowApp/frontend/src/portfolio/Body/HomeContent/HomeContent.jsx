import React from "react";
import "./static/HomeContent.css";

function HomeContent({ MenuData }) {
  return (
    <>
      {MenuData.map((curElem) => {
        return (
          <>
            <div className="homeContent" id="home" key={curElem.id}>
              <div className="leftHomeContent ">
                <div className="vacant"></div>
                <div className="value">
                  <h5>{curElem.header}</h5>

                  <h1>
                    Hi, I am{" "}
                    <span
                      style={{
                        color: "#ffae0f",
                        fontSize: "45px",
                        letterSpacing: "3px",
                      }}
                    >
                      {curElem.name}
                    </span>
                  </h1>
                  <h4>
                    from {curElem.address}. {curElem.homeContentInfo}.
                  </h4>
                  <button className="resumeButton">View Resume</button>
                </div>
              </div>
              <div className="rightHomeContent">
                <div className="profile">
                  <div className="userphoto"></div>
                  <div className="userInfo">asdas</div>
                  <div className="userconnect">
                    <a href="https://github.com/kunwaratit/" target="_blank">
                      github
                    </a>
                    <a href="">Linkedin</a>
                    <a href="">Facebook</a>
                    <a href="">Discord</a>
                    <h3>Connect with me :</h3>
                    {/* <!--connect--> */}
                    <div className="as">
                      <ul id="connect" style={{ margin: "0px" }}>
                        {/* <!--facebook--> */}

                        <li id="facebook">
                          <a
                            href="#"
                            title="Facebook:Atit kunwar"
                            target="blank"
                          >
                            <i class="fab fa-facebook-f"></i>Fac
                          </a>
                        </li>
                        {/* <!--instagram--> */}
                        <li id="insta">
                          <a
                            href="https://instagram.com/kunwar_atit"
                            target="blank"
                          >
                            <i class="fab fa-instagram"></i>
                          </a>
                        </li>
                        {/* <!--github--> */}
                        <li>
                          <a
                            href="https://github.com/kunwaratit"
                            target="blank"
                            title="Github:kunwaratit"
                          >
                            <i class="fab fa-github"></i>
                          </a>
                        </li>
                        {/* <!--twitter--> */}
                        <li id="twitter">
                          <a
                            href="https://twitter.com/Atitkunwar2"
                            target="blank"
                            title="twitter:atitkunwar2"
                          >
                            <i class="fab fa-twitter"></i>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="ProjectInfo">
                  <div className="projInfo completedProj">
                    <h3>
                      <span>{curElem.completedProj}</span>
                    </h3>
                    <h5>Completed Projects</h5>
                  </div>
                  <div className="projInfo satisfiedClient">
                    <h3>
                      <span>{curElem.satisfiedClient}</span>
                    </h3>
                    <h5>Satisfied Client</h5>
                  </div>
                </div>
              </div>
            </div>
          </>
        );
      })}
    </>
  );
}
export default HomeContent;
