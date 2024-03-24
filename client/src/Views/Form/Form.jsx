import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createDriver } from '../../Redux/Actions';
import { useNavigate } from 'react-router-dom';
import fondoImage from './abstract-316425_640.jpeg';
import Navbar from "../../Components/NavBar/NavBar";
import './Form.css'; // Añade tu archivo CSS o estilos aquí

const DriverForm = () => {
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [nationality, setNationality] = useState('');
  const [image, setImage] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [description, setDescription] = useState('');
  const [teams, setTeams] = useState([]);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Basic validations
    if (!name || !lastName || !nationality || !birthdate || teams.length === 0) {
      alert('Please complete all required fields.');
      return;
    }

    try {
      await dispatch(createDriver({ name, lastName, nationality, image, birthdate, description, teams }));
      setShowSuccessMessage(true);
      // Limpiar el formulario después de enviar los datos
      setName('');
      setLastName('');
      setNationality('');
      setImage('');
      setBirthdate('');
      setDescription('');
      setTeams([]);
    } catch (error) {
      console.error('Error creating driver:', error);
      alert('Error creating driver. Please try again.');
    }
  };

  return (
    <div className="page-container">
      <Navbar />
      <div className="driver-form-container" style={{ backgroundImage: `url(${fondoImage})` }}>
        <h2>New Driver</h2>
        <form onSubmit={handleSubmit} className="driver-form">
          <label>
            Name:
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="input-field" />
          </label>
          <br />
          <label>
            Last Name:
            <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} className="input-field" />
          </label>
          <br />
          <label>
            Nationality:
            <input type="text" value={nationality} onChange={(e) => setNationality(e.target.value)} className="input-field" />
          </label>
          <br />
          <label>
            Image URL:
            <input type="text" value={image} onChange={(e) => setImage(e.target.value)} className="input-field" />
          </label>
          <br />
          <label>
            Birthdate:
            <input type="date" value={birthdate} onChange={(e) => setBirthdate(e.target.value)} className="input-field" />
          </label>
          <br />
          <label>
            Description:
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="input-field" />
          </label>
          <br />
          <label>
            Teams (separate by commas):
            <input type="text" value={teams.join(',')} onChange={(e) => setTeams(e.target.value.split(','))} className="input-field" />
          </label>
          <br />
          <button className="button-create" type="submit">
            <span>Create</span>
          </button>
        </form>
        {showSuccessMessage && (
          <div className="popup-container">
            <span className="close-icon" onClick={handleClosePopup}>X</span>
            <p className="popup-text">Driver created successfully!</p>
            <button className="accept-button" onClick={handleClosePopup}>Accept</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default DriverForm;
