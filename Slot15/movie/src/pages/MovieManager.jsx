// src/pages/MovieManager.jsx
import React, { useState, useMemo } from 'react';
import { Container, Spinner } from 'react-bootstrap';
import { MovieProvider, useMovieState } from '../contexts/MovieContext';
import MovieForm from '../components/MovieForm';
import MovieTable from '../components/Movietable';
import FilterBar from '../components/FilterBar';

// 🧩 Component con (nằm trong MovieProvider)
const MovieManagerContent = () => {
  const { movies = [], loading } = useMovieState(); // tránh lỗi undefined
  const [filters, setFilters] = useState({
    searchTerm: '',
    genre: '',
    duration: '',
    sortOrder: '',
  });

  // Nhận filter từ FilterBar
  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  // 🔍 Lọc + Sắp xếp phim
  const filteredMovies = useMemo(() => {
    let result = [...movies];

    // Tìm kiếm theo tên
    if (filters.searchTerm.trim()) {
      result = result.filter((m) =>
        m.title.toLowerCase().includes(filters.searchTerm.toLowerCase())
      );
    }

    // Lọc theo thể loại
    if (filters.genre) {
      result = result.filter((m) => m.genre === filters.genre);
    }

    // Lọc theo thời lượng
    if (filters.duration) { 
      result = result.filter((m) => {
        if (filters.duration === 'short') return m.duration < 90;
        if (filters.duration === 'medium') return m.duration >= 90 && m.duration <= 120;
        if (filters.duration === 'long') return m.duration > 120;
        return true;
      });
    }

    // Sắp xếp theo tên
    if (filters.sortOrder === 'asc') {
      result.sort((a, b) => a.title.localeCompare(b.title));
    } else if (filters.sortOrder === 'desc') {
      result.sort((a, b) => b.title.localeCompare(a.title));
    }

    return result;
  }, [movies, filters]);

  return (
    <Container className="mt-5">
      <h1 className="text-center mb-4">🎬 Quản lý Phim (Context + useReducer + Axios)</h1>

      <MovieForm />

      {/* 🧭 Bộ lọc */}
      <FilterBar onFilterChange={handleFilterChange} movies={movies || []} />

      <h2 className="mt-4">Danh sách Phim</h2>

      {loading ? (
        <div className="text-center my-4">
          <Spinner animation="border" variant="primary" />
          <p>Đang tải danh sách phim...</p>
        </div>
      ) : (
        <MovieTable movies={filteredMovies} />
      )}
    </Container>
  );
};

// 🧩 Component chính — bọc toàn bộ trong MovieProvider
const MovieManager = () => (
  <MovieProvider>
    <MovieManagerContent />
  </MovieProvider>
);

export default MovieManager;
