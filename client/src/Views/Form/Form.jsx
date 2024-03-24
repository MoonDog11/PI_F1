import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createDriver } from '../../Redux/Actions';
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
      // Clear form after submitting data
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
      <div className="driver-form-container">
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
            <p className="popup-text">Driver created successfully!</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default DriverForm;
