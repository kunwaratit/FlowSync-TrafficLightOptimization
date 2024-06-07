import React from "react";
import Whole from "./components/Whole";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import "./style.css";

const App = () => {
  return (
    <>
      <Navbar />

      <Whole />
      {/* Routes haru rakhna parxa tesaile */}

      <Footer />
    </>
  );
};

export default App;
