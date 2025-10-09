import React, { useState } from 'react';
import {
  Card,
  Button,
  Badge,
  Modal,
  Toast,
  ToastContainer
} from 'react-bootstrap';
import './MovieCard.css';

const MovieCard = ({ movie }) => {
  const [showModal, setShowModal] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const handleAddToFavourites = () => {
    const favourites = JSON.parse(localStorage.getItem('favourites')) || [];
    const exists = favourites.some((fav) => fav.title === movie.title);
    if (!exists) {
      favourites.push(movie);
      localStorage.setItem('favourites', JSON.stringify(favourites));
    }
    setShowToast(true);
  };

  return (
    <>
      <Card className="mb-3 shadow-sm hover-card">
        <Card.Img
          variant="top"
          src={movie.poster}
          alt={`Poster of ${movie.title}`}
          style={{ height: '250px', objectFit: 'cover' }}
          onError={(e) => { e.target.src = '/images/default.jpg'; }}
        />
        <Card.Body className="p-3">
          <Card.Title className="fs-5 fw-semibold">{movie.title}</Card.Title>
          <Card.Text className="text-muted small">
            {movie.description?.length > 100
              ? movie.description.slice(0, 100) + '...'
              : movie.description}
          </Card.Text>
          <div className="small mb-2">
            <div><strong>Year:</strong> {movie.year}</div>
            <div><strong>Country:</strong> {movie.country}</div>
            <div><strong>Duration:</strong> {movie.duration} phút</div>
          </div>
          <div className="mb-2">
            {movie.genre?.map((g, idx) => (
              <Badge bg="info" key={idx} className="me-1">{g}</Badge>
            ))}
          </div>
          <div className="d-flex justify-content-between">
            <Button variant="outline-success" size="sm" onClick={handleAddToFavourites}>
              Add to Favourites
            </Button>
            <Button variant="outline-primary" size="sm" onClick={() => setShowModal(true)}>
              View Details
            </Button>
          </div>
        </Card.Body>
      </Card>

      {/* Modal xem chi tiết */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>{movie.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img
            src={movie.poster}
            alt={`Poster of ${movie.title}`}
            className="img-fluid mb-3 d-block mx-auto"
            onError={(e) => { e.target.src = '/images/default.jpg'; }}
          />
          <p><strong>Showtimes:</strong> {movie.showtimes || 'N/A'}</p>
          <p>{movie.description}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Toast thông báo */}
      <ToastContainer position="bottom-end" className="p-3">
        <Toast show={showToast} onClose={() => setShowToast(false)} delay={2000} autohide>
          <Toast.Body>✅ Added to favourites!</Toast.Body>
        </Toast>
      </ToastContainer>
    </>
  );
};

export default MovieCard;