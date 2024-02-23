import React from 'react';
import './Landing.css';
import landingImage from './F1-Recuperado.jpg';
import Logo from './f1_finale.png';
import LoginForm from './Landing_Form.jsx';
const Landing = () => {
  return (
    <div className="landing-container">
      
      <div className="image-container">
        <img src={landingImage} alt="Landing Image" className="landing-image" />
        <div className="login-form-overlay">
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default Landing;