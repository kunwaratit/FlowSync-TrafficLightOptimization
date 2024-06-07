import React from "react";
import { Route, Routes } from "react-router-dom";
import Whole from "./components/users/Whole";
import Navbar from "./components/users/Navbar";
import Footer from "./components/users/Footer";
import "./style.css";
import Random from "./components/users/Random_page";
import Login from "./components/users/login";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
      <Route path="/" element={<Whole />} />
        <Route path="/home" element={<Whole />} />
        <Route path="/random" element={<Random />} />
        <Route path="/login" element={<Login/>}/>
      </Routes>
      <Footer />
    </>
  );
};

export default App;
