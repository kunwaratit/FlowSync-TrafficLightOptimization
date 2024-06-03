import React, { useState } from "react";
import Blog from "../Database/BlogApi.js";

import "./blog.css";
function BlogContent() {
  const [Blogdata, setBlogdata] = useState(Blog);
  const [Blogdatas, setBlogdatas] = useState(Blog);
  const [Bloglist, setBloglist] = useState(Blog);
  console.log(Blogdata);
  return (
    <>
      <div className="blogHeading">
        <h4>Cheatsheets</h4>
      </div>
      <div className="blogMainContainer">
        <div className="rightblogContainer">
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

          {Blogdata.map((curElem) => {
            return (
              <>
                <div className="Bpm">
                  {/* <!-- BlogPageManagement --> */}
                  <div className="blogPages" key={curElem.id}>
                    <div className="Blogheader">
                      <h1 className="courseHead">{curElem.course}</h1>
                      {curElem.headers.map((dat) => {
                        return (
                          <>
                            <div key={dat.headerId}>
                              <div className="headerCont">
                                <div className="headerName">
                                  <h1>
                                    {dat.headerId}. {dat.headerName}
                                  </h1>
                                  <p> {dat.headerdesc}</p>
                                </div>
                                {dat.content.map((cont) => {
                                  return (
                                    <>
                                      <div key={cont.contentId}>
                                        <div className="content">
                                          <h2>{cont.topic}</h2>
                                          <img src={cont.img} alt="" />
                                          <p>{cont.desc}</p>
                                          <p>{cont.code}</p>
                                        </div>
                                      </div>
                                    </>
                                  );
                                })}
                              </div>
                            </div>
                          </>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </>
            );
          })}
          <br />
        </div>
      </div>
    </>
  );
}
export default BlogContent;
