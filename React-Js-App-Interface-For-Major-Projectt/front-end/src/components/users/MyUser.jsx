import React from "react";
// import { useAuth } from "./AuthContext";
import Navbar from "./Navbar";
import Whole from "./Whole";

import Login from "./login";
// import Register from "./Register";
import Footer from "./Footer";
import { Route, Routes } from "react-router-dom";
import RegistrationForm from "./registration";
import Homies from "./Dashboard/Homies";
import Invalid from "./Invalid";
import ContactForm from "./Dashboard/Contact";

const MyUser = () => {
  //   const { isAuthenticated } = useAuth();
  return (
    <>
      {/* {isAuthenticated && <Navbar />} */}
      <Navbar />
      <Routes>
        <Route path="/" element={<Whole />} />
        <Route path="/home" element={<Whole />} />

        <Route exact path="/login" element={<Login />} />
        <Route path="/register" element={<RegistrationForm />} />
        {/* <div > */}
          <Route path="/check-status" element={<Homies />} />
          <Route path="ContactForm" element={<ContactForm/>} />
        {/* </div> */}
        <Route path="*" element={<Invalid />} />
        
      </Routes>
      <Footer />
    </>
  );
};
export default MyUser;
