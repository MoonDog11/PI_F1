import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { searchDriverByName } from '../../Redux/Actions'; // Asegúrate de que la ruta sea correcta
import './SearchBar.css';
import Card from '../Card/Card'; 

const SearchBar = () => {
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResult, setSearchResult] = useState(null);

  const handleChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearch = async (e) => {
    if (e) {
      e.preventDefault(); 
    }

    console.log('Search query:', searchQuery);

    try {
      const results = await dispatch(searchDriverByName(searchQuery));
      console.log('Search results:', results);
      setSearchResult(results.length > 0 ? results[0] : null);
    } catch (error) {
      console.error('Error en la búsqueda:', error);
    }
  };

  const handleKeypress = async (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleSearch();
    }
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search by name"
          value={searchQuery}
          onChange={handleChange}
          onKeyPress={handleKeypress}
        />
        <button type="submit">Search</button>
      </form>

      {/* Muestra la tarjeta del conductor en la interfaz de usuario */}
      {searchResult && (
        <div>
          <h2>Search Result</h2>
          <Card driver={searchResult} />
        </div>
      )}
    </div>
  );
};

export default SearchBar;
