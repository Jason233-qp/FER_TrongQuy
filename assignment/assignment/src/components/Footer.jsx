import React from 'react';
import { Navbar, Container } from 'react-bootstrap';

const Footer = () => (
  // Dùng fixed="bottom" để footer luôn dính vào cuối màn hình (viewport)
  // Loại bỏ mt-5 vì nó không cần thiết cho fixed element
  <Navbar bg="light" fixed="bottom" className="shadow-sm border-top">
    <Container className="justify-content-between text-muted small">
      <span>© 2023 PersonalBudget Demo</span>
      <span>Built with React, Redux Toolkit & ASP.Net Server</span>
    </Container>
  </Navbar>
);

export default Footer;