import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import NavBar from '../components/Navbar';
import HomeCarousel from '../components/Carousel/HomeCarousel';
import moviesData from '../data/movie';
import MovieCard from '../components/Card/MovieCard';
import Filter from '../components/filter';

function HomePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [yearFilter, setYearFilter] = useState('');
  const [sortOption, setSortOption] = useState('');

  // Lọc theo từ khóa
  let filteredMovies = moviesData.filter((movie) =>
    (movie.title + movie.description).toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Lọc theo năm
  if (yearFilter === '<=2000') {
    filteredMovies = filteredMovies.filter((m) => m.year <= 2000);
  } else if (yearFilter === '2001-2015') {
    filteredMovies = filteredMovies.filter((m) => m.year >= 2001 && m.year <= 2015);
  } else if (yearFilter === '>=2016') {
    filteredMovies = filteredMovies.filter((m) => m.year >= 2016);
  }

  // Sắp xếp
  if (sortOption === 'year-asc') {
    filteredMovies.sort((a, b) => a.year - b.year);
  } else if (sortOption === 'year-desc') {
    filteredMovies.sort((a, b) => b.year - a.year);
  } else if (sortOption === 'title-asc') {
    filteredMovies.sort((a, b) => a.title.localeCompare(b.title));
  } else if (sortOption === 'title-desc') {
    filteredMovies.sort((a, b) => b.title.localeCompare(a.title));
  } else if (sortOption === 'duration-asc') {
    filteredMovies.sort((a, b) => a.duration - b.duration);
  } else if (sortOption === 'duration-desc') {
    filteredMovies.sort((a, b) => b.duration - a.duration);
  }

  return (
    <div>
      {/* NavBar đầu trang */}
      <NavBar />

      {/* Carousel đầu trang */}
      <HomeCarousel />

      {/* Bộ lọc */}
      <Container className="mt-4">
        <Filter
          onSearchChange={setSearchTerm}
          onYearFilterChange={setYearFilter}
          onSortChange={setSortOption}
        />

        {/* Section hiển thị phim */}
        <h2 className="text-center mb-4">🎬 Featured Movies Collections</h2>
        <Row>
          {filteredMovies.map((movie) => (
            <Col key={movie.id} xs={12} sm={6} md={4} className="mb-3">
              <MovieCard movie={movie} />
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}

export default HomePage;