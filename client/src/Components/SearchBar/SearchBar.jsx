import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { searchDriverByName } from '../../Redux/Actions';
import './SearchBar.css';
import Card from '../Card/Card'; 

const SearchBar = () => {
  const dispatch = useDispatch();
  const searchResults = useSelector(state => state.searchedDriver); // Obteniendo los resultados de búsqueda del estado global

  const [searchQuery, setSearchQuery] = useState('');

  const handleChange = (event) => {
    setSearchQuery(event.target.value);
  };

 const handleSearch = async (e) => {
  if (e) {
    e.preventDefault(); 
  }

  console.log('Search query:', searchQuery);

  try {
    // Realiza la búsqueda y obtén los resultados
    const results = await dispatch(searchDriverByName(searchQuery));
    console.log('Search results:', results);
    // Actualiza el estado searchResults con los resultados de la búsqueda
    setSearchResults(results); // Aquí actualizas el estado searchResults
  } catch (error) {
    console.error('Error en la búsqueda:', error);
  }
};

  useEffect(() => {
    // Si hay resultados de búsqueda, se actualizará automáticamente
    // cada vez que searchedDriver cambie en el estado global
    console.log('Search Results:', searchResults);
  }, [searchResults]);

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
