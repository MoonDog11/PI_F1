import React from 'react';
import Navbar from '../../Components/NavBar/NavBar';
// Importa la imagen de fondo
import "./Contact.css";
const ContactPage = ({ handleHomeClick }) => {
  return (
    <div>
      <Navbar onHomeClick={handleHomeClick} />
      <div className="contact-container" >
        <h1>Contact Us</h1>
        <div className="contact-info-container">
          <div className="contact-info-background">
            <p className="contact-info">Developed by: MoonDogStudios</p>
            <p className="contact-info">Address: AV 37 C 61 -08, Medellin, Colombia</p>
            <p className="contact-info">Phone: +573114587170</p>
            <p className="contact-info">E-Mail: juanherrera0625@gmail.com</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;