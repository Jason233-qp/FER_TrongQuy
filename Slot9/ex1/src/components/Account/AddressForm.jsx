import React from 'react';
import { Form, Row, Col } from 'react-bootstrap';

const AddressForm = () => {
  return (
    <Form>
      <Form.Group controlId="street" className="mb-3">
        <Form.Label><i className="bi bi-geo-alt me-2"></i>Street</Form.Label>
        <Form.Control type="text" isInvalid />
        <Form.Control.Feedback type="invalid">
          Street is required.
        </Form.Control.Feedback>
      </Form.Group>

      <Row>
        <Col md={6}>
          <Form.Group controlId="city" className="mb-3">
            <Form.Label><i className="bi bi-geo-alt me-2"></i>City</Form.Label>
            <Form.Control type="text" isInvalid />
            <Form.Control.Feedback type="invalid">
              City is required.
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group controlId="zip" className="mb-3">
            <Form.Label><i className="bi bi-geo-alt me-2"></i>Zip Code</Form.Label>
            <Form.Control type="text" isInvalid />
            <Form.Control.Feedback type="invalid">
              Zip Code is required.
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Row>

      <Form.Group controlId="country" className="mb-3">
        <Form.Label><i className="bi bi-geo-alt me-2"></i>Country</Form.Label>
        <Form.Select isInvalid>
          <option value="">Select Country</option>
          <option value="Vietnam">Vietnam</option>
          <option value="USA">USA</option>
          <option value="South Korea">South Korea</option>
          <option value="Japan">Japan</option>
        </Form.Select>
        <Form.Control.Feedback type="invalid">
          Country is required.
        </Form.Control.Feedback>
      </Form.Group>
    </Form>
  );
};

export default AddressForm; 