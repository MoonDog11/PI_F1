import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getDriverById, setSelectedDriver } from '../../Redux/Actions'; // Asegúrate de importar las acciones correctas
import "./Detail.css";
import Navbar from "../../Components/NavBar/NavBar";

const DriverDetail = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [showFullDescription, setShowFullDescription] = useState(false);

  const selectedDriver = useSelector(state => state.selectedDriver);

  useEffect(() => {
    console.log("Dispatching GET_DRIVER_BY_ID action with ID:", id);
    dispatch(getDriverById(id));

    return () => {
      dispatch(setSelectedDriver(null));
    };
  }, [dispatch, id]);

  if (!selectedDriver) {
    return <div>Loading...</div>;
  }

  const { name, teams, driverId, driverRef, number, code, dob, nationality, url, description, image } = selectedDriver;

  const teamsArray = Array.isArray(teams) ? teams : teams.split(',').map((team) => team.trim());
  const truncatedDescription = description ? `${description.slice(0, 100)}...` : "";

  return (
     
    <div className="container detail-container">
      <div className="navbar-container">
        <Navbar /> {/* Agrega el componente Navbar dentro de un contenedor con estilos */}
      </div>
       <div className="driver-image-container">
         <h1>Driver Detail</h1>
        <img
          src={image.url}
          alt={`Image of ${name.forename} ${name.surname}`}
        />
      </div>
      <div className="driver-info-container">
        
        <p className="name">{`${name.forename} ${name.surname}`}</p>
        {teamsArray.length > 0 && <p className="teams">Team: {teamsArray.join(", ")}</p>}
        
        <p>Driver Reference: {driverRef}</p>
        <p>Number: {parseInt(number, 10)}</p>
        <p>Code: {code}</p>
        <p>Date of Birth: {dob}</p>
        <p>Nationality: {nationality}</p>
        {teamsArray.length > 0 && <p>Teams: {teamsArray.join(", ")}</p>}
        <p>Wikipedia: <a href={url} target="_blank" rel="noopener noreferrer">{url}</a></p>
        <p>
          Description:{" "}
          {showFullDescription ? description : truncatedDescription}
         </p>
          <button className="button-show-more" onClick={() => setShowFullDescription(!showFullDescription)}>
            {showFullDescription ? "Show Less" : "Show More"}
          </button>
      </div>
    </div>
  );
};

export default DriverDetail;