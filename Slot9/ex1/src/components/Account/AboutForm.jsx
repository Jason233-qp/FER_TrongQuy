import React from 'react';
import { Form, Row, Col } from 'react-bootstrap';

const AboutForm = () => {
  return (
    <Form>
      <Row>
        <Col md={6}>
          <Form.Group controlId="firstName" className="mb-3">
            <Form.Label><i className="bi bi-person-circle me-2"></i>First Name</Form.Label>
            <Form.Control type="text" isInvalid />
            <Form.Control.Feedback type="invalid">
              First name is required.
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group controlId="lastName" className="mb-3">
            <Form.Label><i className="bi bi-person-circle me-2"></i>Last Name</Form.Label>
            <Form.Control type="text" isInvalid />
            <Form.Control.Feedback type="invalid">
              Last name is required.
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Row>

      <Form.Group controlId="email" className="mb-3">
        <Form.Label><i className="bi bi-person-circle me-2"></i>Email</Form.Label>
        <Form.Control type="email" isInvalid />
        <Form.Control.Feedback type="invalid">
          Email is required.
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group controlId="phone" className="mb-3">
        <Form.Label><i className="bi bi-person-circle me-2"></i>Phone</Form.Label>
        <Form.Control type="text" isInvalid />
        <Form.Control.Feedback type="invalid">
          Phone number is required.
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group controlId="age" className="mb-3">
        <Form.Label><i className="bi bi-person-circle me-2"></i>Age</Form.Label>
        <Form.Control type="number" isInvalid />
        <Form.Control.Feedback type="invalid">
          Age is required.
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group controlId="avatar" className="mb-3">
        <Form.Label><i className="bi bi-person-circle me-2"></i>Avatar</Form.Label>
        <Form.Control type="file" isInvalid />
        <Form.Control.Feedback type="invalid">
          Avatar is required.
        </Form.Control.Feedback>
      </Form.Group>
    </Form>
  );
};

export default AboutForm;