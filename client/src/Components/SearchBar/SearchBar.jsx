import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { searchDriverByName } from '../../Redux/Actions';
import './SearchBar.css';
import Card from '../Card/Card'; 

const SearchBar = () => {
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearch = async () => {
    try {
      setIsLoading(true); // Inicia el estado de carga

      // Realiza la búsqueda solo si hay un valor en searchQuery
      if (searchQuery.trim() !== '') {
        const results = await dispatch(searchDriverByName(searchQuery));
        setSearchResults(results);
      }
    } catch (error) {
      console.error('Error en la búsqueda:', error);
    } finally {
      setIsLoading(false); // Detiene el estado de carga
    }
  };

  const handleKeypress = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleSearch();
  };

  return (
    <div className="driver-form-container-2">
      <form onSubmit={handleSubmit}>
        <h1 className="driver-finder-title">Driver Finder</h1>
        <div className="search-bar-container">
          <input
            className="INPUT-2"
            type="text"
            placeholder="Search by name"
            value={searchQuery}
            onChange={handleChange}
            onKeyPress={handleKeypress} // Realiza la búsqueda al presionar Enter
          />
          <button type="submit" className="submit" disabled={isLoading}>
            {isLoading ? 'Searching...' : 'Search'} {/* Cambia el texto del botón según isLoading */}
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
