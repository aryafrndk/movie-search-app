// SearchBar.js
"use client";

import React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';

const SearchBar = ({ onSearch }) => {
  const handleSearch = (newValue) => {
    // Pass the search query to the parent component
    onSearch(newValue);
  };

  return (
    <div className="flex items-center my-4">
      <TextField
        placeholder="Search for movies..."
        variant="outlined"
        size="small"
        fullWidth
        onChange={(e) => handleSearch(e.target.value)}
        style={{ marginRight: '8px' }}
      />
    </div>
  );
};

export default SearchBar;
