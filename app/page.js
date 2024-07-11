"use client";

import { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import MovieCard from './components/MovieCard';
import YearFilterModal from './components/YearFilterModal';
import Header from './components/Header';
import Footer from './components/Footer';
import Pagination from './components/Pagination';

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentYear, setCurrentYear] = useState(null);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchPopularMovies();
  }, []);

  const fetchPopularMovies = async (page = 1) => {
    const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;
    const url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&sort_by=popularity.desc&page=${page}`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setMovies(data.results);
      setTotalPages(data.total_pages);
    } catch (error) {
      console.error('Error fetching data:', error);
      setMovies([]);
    }
  };

  const searchMovies = async (query, page = 1) => {
    if (!query) {
      fetchPopularMovies(page);
    } else {
      const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;
      const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}&page=${page}`;

      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setMovies(data.results);
        setTotalPages(data.total_pages);
      } catch (error) {
        console.error('Error fetching data:', error);
        setMovies([]);
      }
    }
  };

  const filterMoviesByYear = async (year, page = 1) => {
    const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;
    const url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&primary_release_year=${year}&sort_by=popularity.desc&page=${page}`;

    setMovies([]);
    setCurrentYear(year);
    setCurrentPage(page);

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setMovies(data.results);
      setTotalPages(data.total_pages);
    } catch (error) {
      console.error('Error fetching data:', error);
      setMovies([]);
    }
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);

    if (currentYear) {
      filterMoviesByYear(currentYear, newPage);
    } else {
      fetchPopularMovies(newPage);
    }
  };

  return (
    <div className="container mx-auto px-4">
      <Header onOpenYearFilter={() => setIsModalOpen(true)} />
      <SearchBar onSearch={(query) => searchMovies(query, 1)} />
      <YearFilterModal
        open={isModalOpen}
        handleClose={() => setIsModalOpen(false)}
        onSelectYear={(year) => {
          setIsModalOpen(false);
          filterMoviesByYear(year, 1);
        }}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
      <Footer />
    </div>
  );
}
