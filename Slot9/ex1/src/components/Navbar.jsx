// src/components/NavBar.jsx
import React from 'react';
import { Navbar, Nav, Form, FormControl, Button, NavDropdown } from 'react-bootstrap';
import { BiHeart, BiUser, BiLock } from 'react-icons/bi';

const NavBar = () => {
  return (
    <Navbar bg="light" expand="lg" className="shadow-sm px-4 mb-3">
      <Navbar.Brand href="/">🎬 MovieZone</Navbar.Brand>
      <Navbar.Toggle aria-controls="main-navbar" />
      <Navbar.Collapse id="main-navbar">
        {/* Links */}
        <Nav className="me-auto">
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="/about">About</Nav.Link>
          <Nav.Link href="/contact">Contact</Nav.Link>
        </Nav>

        {/* Form Search + Icons */}
        <Form className="d-flex me-3">
          <FormControl
            type="search"
            placeholder="Quick search"
            className="me-2"
            aria-label="Search"
          />
          <Button variant="outline-primary">Search</Button>
        </Form>

        {/* Icons */}
        <Nav>
          <NavDropdown title={<><BiUser className="me-1" />Accounts</>} id="account-dropdown">
            <NavDropdown.Item href="/profile">Manage Your Profiles</NavDropdown.Item>
            <NavDropdown.Item href="/account">Build your Account</NavDropdown.Item>
            <NavDropdown.Item href="/change-password">Change Password</NavDropdown.Item>
          </NavDropdown>
          <Nav.Link href="/login"><BiLock className="me-1" />Login</Nav.Link>
          <Nav.Link href="/favourites"><BiHeart className="me-1" />Favourites</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;