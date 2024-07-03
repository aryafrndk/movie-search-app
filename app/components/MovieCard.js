"use client";

import React from 'react';

const MovieCard = ({ movie }) => {
  const { title, poster_path, overview, release_date, vote_average } = movie;
  const posterUrl = `https://image.tmdb.org/t/p/w500/${poster_path}`;

  return (
    <div className="max-w-sm mx-auto bg-white rounded-lg shadow-md overflow-hidden transform transition-transform hover:scale-105 duration-300">
      <img className="w-full h-64 object-cover" src={posterUrl} alt={title} />
      <div className="p-4">
        <h2 className="font-bold text-xl mb-2">{title}</h2>
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">{overview}</p>
        <div className="flex justify-between items-center">
          <span className="text-gray-500 text-sm">{release_date}</span>
          <span className="text-yellow-500 font-bold">{vote_average}</span>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
