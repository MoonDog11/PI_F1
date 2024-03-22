import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'; // Importa useSelector para acceder al estado global
import { searchDriverByName } from '../../Redux/Actions'; // Asegúrate de que la ruta sea correcta
import './SearchBar.css';
import Card from '../Card/Card'; 

const SearchBar = () => {
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState('');
  // Obtén el estado searchedDriver del store usando useSelector
  const searchResults = useSelector(state => state.searchedDriver);

  const handleChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    console.log('Search query:', searchQuery);

    try {
      // Despacha la acción para buscar conductores por nombre
      await dispatch(searchDriverByName(searchQuery));
    } catch (error) {
      console.error('Error en la búsqueda:', error);
    }
  };

  const handleKeypress = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleSearch();
    }
  };

  return (
    <div className="driver-form-container-2">
      <form onSubmit={handleSearch}>
        <h1 className="driver-finder-title">Driver Finder</h1>
        <div className="search-bar-container">
          <input
            className="INPUT-2"
            type="text"
            placeholder="Search by name"
            value={searchQuery}
            onChange={handleChange}
            onKeyPress={handleKeypress}
          />
          <button type="submit" className="submit">
            <span className="button-text">Search</span>
          </button>
        </div>
      </form>

      {/* Muestra las tarjetas de los conductores en la interfaz de usuario */}
      {searchResults.length > 0 && (
        <div>
          <h2>Search Results</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            {searchResults.map(driver => (
              <Card key={driver.id} driver={driver} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
