import React, { useState } from "react";
import Nav from "../support/NavBar/Nav.jsx";
import Footer from "../support/Footer/Footer.jsx";
// import HomeContent from "../support/Body/HomeContent/HomeContent.jsx";
// import Skill from "../../portfolio/Body/Skills/Skills.jsx";
import "./static/main.css";
import Contact from "../support/Body/Contact/Contact.jsx";

// import Blogs from "../../portfolio/Body/Blog/blog.jsx";

import Menu from "../support/Body/Database/databaseApi.js";
// import Projects from "../../portfolio/Body/Projects/Projects.jsx";
function Main() {
  const [MenuData, setMenuData] = useState(Menu);
  console.log(MenuData);
  return (
    <>
      <Nav MenuData={MenuData} />

      {/* <Routes>
            <Routes path='/' element={<HomeContent />} />
            <Route path='/blog' element={<Blogs />} />
            <Route path='/projects' element={<Projects />} />
        </Routes>
 */}

      {/* <HomeContent MenuData={MenuData} /> */}
      <div class="bodyContainer">
        <Contact MenuData={MenuData} />
      </div>
      <Footer />
    </>
  );
}
export default Main;
