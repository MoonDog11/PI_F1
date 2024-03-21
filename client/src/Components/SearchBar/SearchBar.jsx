import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { searchDriverByName } from '../../Redux/Actions';
import Card from '../Card/Card'; // Asegúrate de que la ruta sea correcta
import './SearchBar.css';

const SearchBar = () => {
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResult, setSearchResult] = useState(null);

  // Manejar el cambio en el input de búsqueda
  const handleChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Manejar la búsqueda al hacer clic en el botón de búsqueda
  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      // Realizar la búsqueda
      const result = await dispatch(searchDriverByName(searchQuery));
      // Actualizar el estado con el resultado de la búsqueda
      setSearchResult(result);
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
            onChange={handleChange}
          />
          <button type="submit" className="submit">
            <span className="button-text">Search</span>
          </button>
        </div>
      </form>

      {/* Mostrar la tarjeta del conductor si se encontró un resultado */}
      {searchResult && <Card driver={searchResult} />}
    </div>
  );
};

export default SearchBar;
