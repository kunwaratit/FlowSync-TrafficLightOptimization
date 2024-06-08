import React from "react";
// import { useAuth } from "./AuthContext";
import Navbar from "./Navbar";
import Whole from "./Whole";
import Random from "./Random_page";
import Login from "./login";
import Register from "./Register";
import Footer from "./Footer"
import { Route,Routes } from "react-router-dom";
const MyUser = () => {
//   const { isAuthenticated } = useAuth();
  return (
    <>
      {/* {isAuthenticated && <Navbar />} */}
      <Navbar />
      <Routes>
       
        <Route path="/" element={<Whole />} />
        <Route path="/home" element={<Whole />} />
        <Route path="/random" element={<Random />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
       </Routes>
     <Footer/>
    </>
  );
};
export default MyUser;
