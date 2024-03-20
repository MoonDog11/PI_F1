import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'; // Agrega useSelector
import { searchDriverByName } from '../../Redux/Actions';
import Card from '../Card/Card'; // Importa tu componente Card
import './SearchBar.css';

const SearchBar = () => {
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async (e) => {
    if (e) {
      e.preventDefault(); 
    }

    console.log('Search query:', searchQuery);

    try {
      const results = await dispatch(searchDriverByName(searchQuery));
      console.log('Search results:', results);
      setSearchResults(results); // Actualiza el estado con los resultados obtenidos
    } catch (error) {
      console.error('Error en la búsqueda:', error);
    }
  };

  const renderDriverCard = () => {
    if (searchResults.length === 1) { // Si se encuentra un solo conductor
      return <Card driver={searchResults[0]} />; // Renderiza la tarjeta del conductor
    }
    return null; // De lo contrario, no se muestra nada
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
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit" className="submit">
            <span className="button-text">Search</span>
          </button>
        </div>
      </form>

      {/* Renderiza la tarjeta del conductor si hay un solo resultado */}
      {renderDriverCard()}
    </div>
  );
};

export default SearchBar;
