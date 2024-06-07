import React from "react";

import Hero from "./Hero";
import About from "./About";
import Output from "./Output";
import Contact from "./Contact";

const Whole = () => {
  return (
    <div>
      <div className="main">
        <Hero />
      </div>
      <div className="my-content">
        <main>
          <About />
          <Output />
          <Contact />
        </main>
      </div>
    </div>
  );
};

export default Whole;
