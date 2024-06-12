import React from "react";
import './ContactForm.css';
const Contact=()=>{
    return(<>
        <div className="dasheader">
            <h1>Contact</h1>
        </div>
        <hr />
        <div className="contact_cont">
        <div className="container_container">
            <h2>Contact Me</h2>
            <form action="#" method="post">
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input type="text" id="name" name="name" required />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email" required />
                </div>
                <div className="form-group">
                    <label htmlFor="subject">Subject:</label>
                    <input type="text" id="subject" name="subject" required />
                </div>
                <div className="form-group">
                    <label htmlFor="message">Message:</label>
                    <textarea id="message" name="message" rows="5" required></textarea>
                </div>
                <div className="form-group">
                    <button type="submit">Send</button>
                </div>
            </form>
        </div>
        </div>
    </>)
}
export default Contact;