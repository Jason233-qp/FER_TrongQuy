import React, { useState } from 'react';
import { Form, Button, Container, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import * as api from '../services/api';

const AddPayment = () => {
  const [form, setForm] = useState({
    semester: '',
    courseName: '',
    amount: '',
    date: new Date().toISOString().slice(0, 10),
  });

  const navigate = useNavigate();
  const { user } = useAuth();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPayment = {
      ...form,
      amount: parseInt(form.amount),
      userId: user.id,
      // persist date in YYYY-MM-DD format
      date: form.date || new Date().toISOString().slice(0, 10),
    };
    await api.createPayment(newPayment);
    navigate('/home');
  };

  return (
    <Container className="mt-4">
      <Card>
        <Card.Header as="h5">Add New Payment</Card.Header>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Semester</Form.Label>
              <Form.Control
                name="semester"
                value={form.semester}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Course Name</Form.Label>
              <Form.Control
                name="courseName"
                value={form.courseName}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Amount</Form.Label>
              <Form.Control
                name="amount"
                type="number"
                value={form.amount}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Date</Form.Label>
              <Form.Control
                name="date"
                type="date"
                value={form.date}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Button type="submit" variant="primary">
              Add Payment
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default AddPayment;