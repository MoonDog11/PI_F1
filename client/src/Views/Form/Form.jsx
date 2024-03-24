import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createDriver } from '../../Redux/Actions';
import { useNavigate } from 'react-router-dom';
import './Form.css'; // Añade tu archivo CSS o estilos aquí
import fondoImage from './abstract-316425_640.jpeg';
import Navbar from "../../Components/NavBar/NavBar";

const DriverForm = () => {
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [nationality, setNationality] = useState('');
  const [image, setImage] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [description, setDescription] = useState('');
  const [teams, setTeams] = useState([]);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false); // Nuevo estado para controlar la visibilidad del mensaje
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validaciones básicas
    if (!name || !lastName || !nationality || !birthdate || teams.length === 0) {
      alert('Por favor, completa todos los campos obligatorios.');
      return;
    }

    try {
      await dispatch(createDriver({ name, lastName, nationality, image, birthdate, description, teams }));
      
      // Mostrar el mensaje emergente
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
      console.error('Error al crear el conductor:', error);
      alert('Error al crear el conductor. Por favor, intenta nuevamente.');
    }
  };

  return (
    <div className="page-container">
      <Navbar />
      <div className="driver-form-container" style={{ backgroundImage: `url(${fondoImage})` }}>
        <h2>New Driver</h2>
        <form onSubmit={handleSubmit} className="driver-form">
          {/* Resto del formulario */}

          <button className="button-create" type="submit">
            <span>Create</span>
          </button>

          {/* Mostrar el mensaje emergente si showSuccessMessage es true */}
          {showSuccessMessage && (
            <div className="popup">
              <div className="popup-content">
                <span onClick={() => setShowSuccessMessage(false)} className="close-popup">&times;</span>
                <p>Driver created successfully!</p>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default DriverForm;
