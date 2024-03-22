import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { searchDriverByName } from '../../Redux/Actions';
import './SearchBar.css';
import Card from '../Card/Card'; 

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
    } catch (error) {
      console.error('Error en la búsqueda:', error);
    }
  };

  useEffect(() => {
    if (searchQuery !== '') {
      handleSearch(); // Realiza la búsqueda cuando searchQuery cambie
    } else {
      setSearchResults([]); // Restablece los resultados de la búsqueda si searchQuery está vacío
    }
  }, [searchQuery]); // Ejecuta el efecto cuando searchQuery cambie

  return (
    <div className="driver-form-container-2">
      <form onSubmit={e => e.preventDefault()}>
        <h1 className="driver-finder-title">Driver Finder</h1>
        <div className="search-bar-container">
          <input
            className="INPUT-2"
            type="text"
            placeholder="Search by name"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
          <button type="submit" className="submit" onClick={handleSearch}>
            <span className="button-text">Search</span>
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
