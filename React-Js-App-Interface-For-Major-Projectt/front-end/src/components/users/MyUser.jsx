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
import { AuthProvider } from "./AuthContext";

const MyUser = () => {
  //   const { isAuthenticated } = useAuth();
  return (
    <>
      {/* {isAuthenticated && <Navbar />} */}

      {/* <AuthProvider> */}
        <Navbar />
        <Routes>
          <Route path="/" element={<Whole />} />
          <Route path="/home" element={<Whole />} />

          <Route exact path="/login" element={<Login />} />
          <Route path="/register" element={<RegistrationForm />} />
          <Route path="/check-status" element={<Homies />} />
          <Route path="ContactForm" element={<ContactForm />} />
          <Route path="*" element={<Invalid />} />
        </Routes>
        <Footer />
        //{" "}
      {/* </AuthProvider> */}
    </>
  );
};
export default MyUser;
