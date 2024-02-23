// Home.js
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchDrivers,
  searchDriverByName,
  toggleSortOrder,
  setDrivers,
  searchDriverByTeamRequest,
} from "../../Redux/Actions";
import SearchBar from "../../Components/SearchBar/SearchBar";
import CardsContainer from "../../Components/CardContainer/CardConatiner";
import Navbar from "../../Components/NavBar/NavBar";
import Pagination from "../../Components/Pagination/Pagination";
import Logo from './f1_home_logo_2.png';
import { setLoading } from "../../Redux/Actions";
import "./Home.css";
import LoadingComponent from './Loading';

const ITEMS_PER_PAGE = 12;

const Home = () => {
  const searchedDriver = useSelector((state) => state.searchedDriver) || [];
  const teams = useSelector((state) => state.teams) || {};
  const isLoading = useSelector((state) => state.loading);
  const dispatch = useDispatch();

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isAscending, setIsAscending] = useState(null);
  const [selectedTeam, setSelectedTeam] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch(setLoading(true));
        await new Promise(resolve => setTimeout(resolve, 1000));
        await dispatch(fetchDrivers(searchTerm));
        setCurrentPage(1);
      } catch (error) {
  
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchData();
  }, [dispatch, searchTerm]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchClick = async () => {
    if (!searchTerm) {
      return;
    }

    try {
      dispatch(setLoading(true));
      await dispatch(searchDriverByName(searchTerm));
      setCurrentPage(1);
    } catch (error) {
   
    } finally {
      dispatch(setLoading(false));
    }
  };

  const onPageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSortAZ = () => {
    setIsAscending(true);
  };

  const handleSortZA = () => {
    setIsAscending(false);
  };

  const handleTeamChange = (event) => {
    const team = event.target.value;
    console.log("Selected Team:", team); // Agrega este console.log para verificar selectedTeam
    setSelectedTeam(team);
  };

  const handleReset = () => {
    setSearchTerm("");
    setCurrentPage(1);
    setIsAscending(null);
    setSelectedTeam("");
  };

  useEffect(() => {
    console.log("Teams:", teams);
  }, [teams]);
  
  const totalPages = Math.ceil(searchedDriver.length / ITEMS_PER_PAGE);

  const handleHomeClick = () => {
    // Realiza el reinicio necesario aquí
    // Por ejemplo, puedes reiniciar el término de búsqueda y volver a cargar los conductores
    setSearchTerm("");
    setCurrentPage(1);
    setIsAscending(null);
    setSelectedTeam("");
    dispatch(fetchDrivers('')); // Cargar los conductores nuevamente
  };

   return (
    <div className={`your-container ${isLoading ? 'loading' : ''}`}>
      <img src={Logo} alt="Logo" className="logo" />
       <Navbar onHomeClick={handleHomeClick} />
      
      <SearchBar
        searchTerm={searchTerm}
        onSearchChange={handleSearchChange}
        onSearchClick={handleSearchClick}
      />
      {(isLoading || searchedDriver.length === 0) && (
        <LoadingComponent />
      )}
      {!isLoading && searchedDriver.length > 0 && (
         <>
          <div className="black-bar"></div>
          <div className="sort-filter">
          <h1 className="sort-btn_A-Z">AZ Filter</h1>
          <div className="sort-btns">
        <button className="sort-btn" onClick={handleSortAZ}>A-Z</button>
        <button className="sort-btn" onClick={handleSortZA}>Z-A</button>
        </div>
        </div>
          
          <div className="team-dropdown">
            <label htmlFor="team-select">Select a team:</label>
            <select id="team-select" value={selectedTeam} onChange={handleTeamChange}>
              <option value="">All Teams</option>/watch
              {Object.keys(teams).map((team) => (
                <option key={team} value={team}>
                  {team}
                </option>
              ))}
            </select>
          </div>
          <div className="reset-container">
            <button className="reset-btn" onClick={handleReset}>reset</button>
          </div>
          <CardsContainer
            currentPage={currentPage}
            itemsPerPage={ITEMS_PER_PAGE}
            sortOrder={isAscending}
            selectedTeam={selectedTeam}
            drivers={searchedDriver}
          />
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChange}
          />
        </>
      )}
    </div>
  );
}

export default Home;