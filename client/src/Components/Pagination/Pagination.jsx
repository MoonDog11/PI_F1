import React from "react";
import PropTypes from "prop-types";
import "./Pagination.css"; // Importa el archivo CSS donde se encuentran los estilos

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);
  const startIndex = Math.max(1, currentPage - 5);
  const visiblePages = pageNumbers.slice(startIndex - 1, startIndex + 9); // Muestra las primeras 10 páginas desde startIndex

  return (
    <div className="pagination-container">
      {currentPage > 1 && ( // Muestra la flecha hacia atrás solo si no estás en la primera página
        <button className="pagination-arrow" onClick={() => onPageChange(currentPage - 1)}>
          {"<"}
        </button>
      )}
      {visiblePages.map((number) => (
        <button
          key={number}
          className={`pagination-button ${currentPage === number ? "active" : ""}`}
          onClick={() => onPageChange(number)}
        >
          {number}
        </button>
      ))}
      {currentPage < totalPages && ( // Muestra la flecha hacia adelante solo si no estás en la última página
        <button className="pagination-arrow" onClick={() => onPageChange(currentPage + 1)}>
          {">"}
        </button>
      )}
    </div>
  );
};

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default Pagination;