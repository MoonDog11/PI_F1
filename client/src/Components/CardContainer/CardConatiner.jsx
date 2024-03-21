import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Card from "../Card/Card";
import { Link } from "react-router-dom";
import styles from "./CradContainer.module.css";

const CardsContainer = ({ currentPage, itemsPerPage, sortOrder, selectedTeam }) => {
  const drivers = useSelector((state) => state.searchedDriver);
  const teams = useSelector((state) => state.teams);

  const [filteredTeamDrivers, setFilteredTeamDrivers] = useState([]);

  useEffect(() => {
    if (selectedTeam === "") {
      setFilteredTeamDrivers(drivers);
    } else {
      if (teams && teams[selectedTeam]) {
        setFilteredTeamDrivers(teams[selectedTeam]);
      } else {
        setFilteredTeamDrivers([]);
      }
    }
  }, [drivers, selectedTeam, teams]);

  const sortedDrivers = sortOrder === null || sortOrder === undefined
    ? [...filteredTeamDrivers]
    : sortOrder
      ? [...filteredTeamDrivers].sort((a, b) => (a.name.forename > b.name.forename ? 1 : -1))
      : [...filteredTeamDrivers].sort((a, b) => (a.name.forename < b.name.forename ? 1 : -1));

  const indexOfLastDriver = currentPage * itemsPerPage;
  const indexOfFirstDriver = indexOfLastDriver - itemsPerPage;
  const currentDrivers = sortedDrivers.slice(indexOfFirstDriver, indexOfLastDriver);

  return (
    <div>
      <div className={styles["cards-container"]}>
        {currentDrivers.length > 0 ? (
          currentDrivers.map((driver) => (
            <div key={driver.id} className={styles["card-wrapper"]}>
              <Link to={`/driver/${driver.id}`}>
                <Card driver={driver} />
              </Link>
            </div>
          ))
        ) : (
          <p>No drivers found.</p>
        )}
      </div>
    </div>
  );
};

export default CardsContainer;
