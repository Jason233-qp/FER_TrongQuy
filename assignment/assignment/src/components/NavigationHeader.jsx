// NavigationHeader.jsx
import React from 'react';
import { Navbar, Container, Nav, Button, Image } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const NavigationHeader = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <Navbar bg="light" expand="lg" className="mb-4 shadow-sm">
      <Container>
        <Navbar.Brand className="d-flex align-items-center">
          <Image src="/images/logo.png" width={40} height={40} className="me-2" roundedCircle />
          <span className="fw-bold">PersonalBudget</span>
        </Navbar.Brand>
        <Nav className="ms-auto align-items-center">
          <span className="me-3 text-muted">
            Signed in as <strong>{user?.fullName}</strong>
          </span>
          <Button variant="outline-danger" onClick={handleLogout}>Logout</Button>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default NavigationHeader;