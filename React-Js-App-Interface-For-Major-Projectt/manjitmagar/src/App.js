import React from "react";
import { Route, Routes } from "react-router-dom";
import Whole from "./components/Whole";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import "./style.css";
import Random from "./components/Random_page";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
      <Route path="/" element={<Whole />} />
        <Route path="/home" element={<Whole />} />
        <Route path="/random" element={<Random />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
