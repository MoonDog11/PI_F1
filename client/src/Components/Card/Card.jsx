// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "./Card.css"; // Reemplaza con el nombre real de tu archivo CSS

const Card = ({ driver }) => {
  // Verifica si driver.teams es un array o asigna un array vacío por defecto
  const teamsArray = Array.isArray(driver.teams)
    ? driver.teams
    : (driver.teams || '').split(',').map((team) => team.trim());
  
  useEffect(() => {
    console.log("Driver data on mount:", driver);
    console.log("Teams Array on mount:", teamsArray);
  }, [driver, teamsArray]);

  // Estado para controlar si la descripción se muestra completamente o recortada
  const [showFullDescription, setShowFullDescription] = useState(false);

  // Función para alternar la visibilidad completa de la descripción
  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  // Verifica si driver.description existe antes de intentar llamar a slice
  const truncatedDescription = driver.description
    ? `${driver.description.slice(0, 100)}...`
    : "";
 
  console.log("Teams Array:", teamsArray); // Agregado para imprimir teamsArray
  
  return (
    <div className="card">
      <div className="front-content">
        <img
          src={driver.image ? driver.image.url : ''}
          alt={`Image of ${driver.name ? driver.name.forename : ''} ${driver.name ? driver.name.surname : ''}`}
        />
        <p className="name"> {driver.name ? `${driver.name.forename} ${driver.name.surname}` : ''}</p>
        {teamsArray.length > 0 && <p className="teams">Team: {teamsArray.join(", ")}</p>}
      </div>
      <div className="back-content">
        <p className="back-text">ID: {driver.id}</p>
        <p className="back-text">Date of Birth: {driver.dob}</p>
        <p className="back-text">Nationality: {driver.nationality}</p> 
        {showFullDescription && (
          <>
            {/* Agrega aquí cualquier información adicional que desees mostrar */}
          </>
        )}
        <div className="description-container">
          <button onClick={toggleDescription}>
            {showFullDescription ? "Show Less" : "Show More"}
          </button>
        </div>
      </div>
    </div>
  );
};



Card.propTypes = {
  driver: PropTypes.shape({
    // Omitir number de las PropTypes si no es necesario
    // number: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    id: PropTypes.number.isRequired,
    code: PropTypes.string.isRequired,
    name: PropTypes.shape({
      forename: PropTypes.string.isRequired,
      surname: PropTypes.string.isRequired,
    }).isRequired,
    image: PropTypes.shape({
      url: PropTypes.string.isRequired,
    }).isRequired,
    dob: PropTypes.string.isRequired,
    nationality: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    description: PropTypes.string,
    // Especifica que teams debe ser un array de strings
    teams: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.string),
      PropTypes.string,
    ]),
  }).isRequired,
};
export default Card;