import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import HomeCarousel from '../components/Carousel/HomeCarousel';
import movies from '../data/movie';
import MovieCard from '../components/Card/MovieCard';

function HomePage() {
  return (
    <div>
      {/* Carousel đầu trang */}
      <HomeCarousel />

      {/* Section hiển thị phim */}
      <Container fluid className="mt-4">
        <h2 className="text-center mb-4">🎬 Featured Movies Collections</h2>

        {/* Grid hiển thị danh sách phim */}
        <Row>
          {movies.map((movie) => (
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