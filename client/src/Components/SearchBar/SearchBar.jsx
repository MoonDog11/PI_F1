import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { searchDriverByName } from '../../Redux/Actions';
import './SearchBar.css';
import Card from '../Card/Card'; 

const SearchBar = () => {
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const isLoading = useSelector(state => state.loading); // Obtener el estado de carga desde Redux

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      // Realizar la búsqueda solo si searchQuery no está vacío
      if (searchQuery.trim() !== '') {
        dispatch(searchDriverByName(searchQuery)); // Disparar la acción de búsqueda
      }
    } catch (error) {
      console.error('Error en la búsqueda:', error);
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
            onChange={e => setSearchQuery(e.target.value)}
          />
          <button type="submit" className="submit" disabled={isLoading}>
            {/* Mostrar un mensaje de carga en el botón mientras se está cargando */}
            {isLoading ? 'Loading...' : 'Search'}
          </button>
        </div>
      </form>

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
