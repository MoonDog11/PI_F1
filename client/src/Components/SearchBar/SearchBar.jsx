import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { searchDriverByName } from '../../Redux/Actions';
import './SearchBar.css';

const SearchBar = () => {
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

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
      setSearchResults(results);
    } catch (error) {
      console.error('Error en la búsqueda:', error);
    }
  };

  const handleKeypress = async (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleSearch(event); // Corrección: pasa el evento como argumento
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

      {searchResults.length > 0 && (
        <div>
          <h2>Go!</h2>
          <ul>
            {searchResults.map((driver) => (
              <li key={driver.id}>
                {driver.name.forename} {driver.name.surname}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
