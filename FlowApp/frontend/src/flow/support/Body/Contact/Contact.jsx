import React from "react";
import "./static/contact.css";
function Contact({ MenuData }) {
  return (
    <>
      <div class="cpm">
        {/* <!-- contactpageManagement --> */}

        <div class="contactPage" id="contact">
          <div class="contactMsg">
            <h3>Contact for more info</h3>
            <h4>To Contact with us </h4>
            <span>
              Provide your detail information and the explain the subject matter
              briefly and contact
              <ul>
                <li>contact to our mail id </li>
                <li>contact to our contact number</li>
                <li>or Directly visit to our office</li>
                <li>
                  <a href="">9842803777</a>
                </li>
                <li>
                  <a href="">atit.191508@ncit.edu.np</a>
                </li>
              </ul>
            </span>
          </div>
          <div class="contact-container">
            <h1>Contact Us</h1>
            <form class="contact-form">
              <input type="text" placeholder="Your Name" />
              <input type="email" placeholder="Email" />
              <textarea placeholder="Message"></textarea>
              <button type="submit">Send Message</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
export default Contact;
