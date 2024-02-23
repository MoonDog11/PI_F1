import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { resetDrivers } from '../../Redux/Actions';
import './Navbar.css'; // Agrega un archivo CSS separado para tus estilos

const Navbar = ({ onHomeClick }) => { // Modifica la firma para recibir props

  const handleHomeClick = () => {
    // Llama a la función proporcionada por props cuando se hace clic en "Home"
    if (onHomeClick) {
      onHomeClick();
    }
  };

  return (
    <nav className="navbar">
      <ul>
        <li>
          <div className="nav-container">
            <Link to="/home" onClick={handleHomeClick}>Home</Link>
          </div>
        </li>
        <li>
          <div className="nav-container">
            <Link to="/create">Create</Link>
          </div>
        </li>
        <li>
          <div className="nav-container">
            <Link to="/contact">Contact</Link>
          </div>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;