// pages/index.js
"use client";

import { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import MovieCard from './components/MovieCard';
import Header from './components/Header';
import Footer from './components/Footer';

export default function Home() {
  const [movies, setMovies] = useState([]);

  // Function to fetch popular movies
  const fetchPopularMovies = async () => {
    const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;
    const url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&sort_by=popularity.desc`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setMovies(data.results);
    } catch (error) {
      console.error('Error fetching data:', error);
      setMovies([]);
    }
  };

  useEffect(() => {
    // Fetch popular movies initially
    fetchPopularMovies();
  }, []); // Empty dependency array to run once on component mount

  const searchMovies = async (query) => {
    if (!query) {
      // If query is empty (null), fetch popular movies
      fetchPopularMovies();
    } else {
      // If query is not empty, search movies based on the query
      const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;
      const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}`;

      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setMovies(data.results);
      } catch (error) {
        console.error('Error fetching data:', error);
        setMovies([]);
      }
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto px-4">
          <SearchBar onSearch={searchMovies} />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
