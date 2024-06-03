import React, { useState } from "react";
import Nav from "../../NavBar/Nav";
import Menu from "../Database/databaseApi";
import BlogContent from "./BlogContent";
function MainBlog() {
  const [MenuData, setMenuData] = useState(Menu);
  return (
    <>
      {/* <Nav MenuData={MenuData} /> */}
      {/* <div className="asd"> */}
      <BlogContent />
      {/* </div> */}
    </>
  );
}
export default MainBlog;
