"use client";

import React from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';

const YearFilterModal = ({ open, handleClose, onSelectYear }) => {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 20 }, (_, i) => currentYear - i);

  return (
    <Modal open={open} onClose={handleClose}>
      <Box className="p-6 bg-white rounded-md shadow-lg max-w-lg mx-auto my-20">
        <h2 className="text-2xl mb-4">Select Year</h2>
        <div className="grid grid-cols-4 gap-4">
          {years.map((year) => (
            <button
              key={year}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded"
              onClick={() => onSelectYear(year)}
            >
              {year}
            </button>
          ))}
        </div>
      </Box>
    </Modal>
  );
};

export default YearFilterModal;
