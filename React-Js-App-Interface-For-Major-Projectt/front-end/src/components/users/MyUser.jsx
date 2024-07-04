import React from "react";
import Navbar from "./Navbar";
import Whole from "./Whole";
import Login from "./login";
import Footer from "./Footer";
import RegistrationForm from "./registration";
import Homies from "./Dashboard/Homies";
import Invalid from "./Invalid";
import ContactForm from "./Dashboard/Contact";
import { Routes, Route } from "react-router-dom";
import { useAuth } from "./AuthContext";
import ProtectedRoute from "./ProtectedRoute";

const MyUser = () => {
  const { isAuthenticated } = useAuth();

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Whole />} />
        <Route path="/home" element={<Whole />} />
        <Route exact path="/login" element={<Login />} />
        <Route path="/register" element={<RegistrationForm />} />
        <Route path="/check-status" element={<Homies />} />
        <Route path="/contact" element={<ContactForm />} />
        <Route path="*" element={<Invalid />} />
      </Routes>
      <Footer />
    </>
  );
};

export default MyUser;
