"use client";

import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  // Jika total halaman kurang dari atau sama dengan 6, tampilkan semua halaman
  if (totalPages <= 6) {
    return (
      <div className="flex justify-center my-8">
        <button
          className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Prev
        </button>
        {pageNumbers.map((number) => (
          <button
            key={number}
            className={`mx-1 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${currentPage === number ? 'bg-blue-700' : ''}`}
            onClick={() => onPageChange(number)}
          >
            {number}
          </button>
        ))}
        <button
          className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''}`}
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    );
  }

  // Jika lebih dari 6 halaman, atur tampilan untuk menampilkan maksimal 4 halaman awal dan ...
  const visiblePages = [];
  if (currentPage <= 4) {
    visiblePages.push(...pageNumbers.slice(0, 4), '...');
  } else {
    visiblePages.push(1, '...');
    if (currentPage >= totalPages - 3) {
      visiblePages.push(...pageNumbers.slice(totalPages - 4, totalPages));
    } else {
      visiblePages.push(...pageNumbers.slice(currentPage - 2, currentPage + 1), '...');
    }
  }

  return (
    <div className="flex justify-center my-8">
      <button
        className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Prev
      </button>
      {visiblePages.map((page, index) => (
        <React.Fragment key={index}>
          {page === '...' ? (
            <span className="mx-1">...</span>
          ) : (
            <button
              className={`mx-1 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${currentPage === page ? 'bg-blue-700' : ''}`}
              onClick={() => onPageChange(page)}
            >
              {page}
            </button>
          )}
        </React.Fragment>
      ))}
      <button
        className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''}`}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
