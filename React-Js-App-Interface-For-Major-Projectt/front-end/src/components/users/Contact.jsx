import contactus from "../images/contactus logo traffic police.png";
import ContactForm from "./Dashboard/Contact";
import React from "react";

const Contact = () => {
  return (
    <>
      {" "}

      <div className="section-contact--homepage" id="section-contact--homepage">
        <div className="container grid grid-two--cols">
          <div className="contact-content">
            <h2 className="contact-tittle">Let's Be in Touch</h2>
            <p>Contact us for more Details</p>
            <div className="btn">
              <a href="contact"> 
                Write Us
                <i className="fa-solid fa-arrow-circle-right"></i>
              </a>
            </div>
          </div>
          <div className="contact-image">
            <img src={contactus} alt="Contact" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
