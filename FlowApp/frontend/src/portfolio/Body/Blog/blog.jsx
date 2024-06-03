import React, { useState } from "react";
import Blog from "../Database/BlogApi.js";

import "./blog.css";
function Blogs() {
  const [Blogdata, setBlogdata] = useState(Blog);
  const [Bloglist, setBloglist] = useState(Blog);
  console.log(Blogdata);
  return (
    <>
      <div className="blogHeading">
        <h4>Cheatsheets</h4>
        <div className="whSpace"></div>
      </div>
      <div className="blogMain">
        <div className="leftBlog">
          <div>
            <h1>Cheat Sheets For different Programming Languages</h1>
          </div>
        </div>
        <div className="rightblog">
          <div className="courseList">
            {Bloglist.map((curElem) => {
              return (
                <>
                  <div className="courseName" key={curElem.id}>
                    {curElem.course}
                  </div>
                </>
              );
            })}
          </div>

          {Blogdata.slice(0, 3).map((curElem) => {
            return (
              <>
                <div className="Bpm">
                  {/* <!-- BlogPageManagement --> */}
                  <div className="blogPage" key={curElem.id}>
                    <div className="course">
                      <div className="courseImg">
                        <img
                          src={curElem.courseImg}
                          alt=""
                          sizes=""
                          srcset=""
                        />
                      </div>
                      <div className="courseInfo">
                        <div className="courseDesc">
                          <h2>{curElem.course}</h2>
                          {curElem.courseInfo}
                        </div>
                      </div>
                    </div>

                    {/* <div className="blogContainer" >
                                {curElem.headers.map((header) => {
                                    return (
                                        <> <div className="blogCard" key={header.headerId}>
                                            <div className="blogTitle">
                                                <h2>
                                                    {curElem.id}.{header.headerName}
                                                </h2>
                                            </div>
                                            <div className="blogImg"></div>
                                            <div className="code"></div>
                                            <div className="blogDesc">

                                            </div>
                                        </div></>)
                                }

                                )}



                            </div> */}
                  </div>
                </div>
              </>
            );
          })}
          <br />
          <button>Explore All</button>
        </div>
      </div>
    </>
  );
}
export default Blogs;
