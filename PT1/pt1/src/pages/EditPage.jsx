import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Card, Form, Button, Spinner } from 'react-bootstrap';
import * as api from '../services/api';

const EditPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ semester: '', courseName: '', amount: '' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPayment = async () => {
      try {
        const data = await api.getPaymentById(id);
        setForm({
          semester: data.semester,
          courseName: data.courseName,
          amount: data.amount.toString(),
        });
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch payment:', error);
        setLoading(false);
      }
    };
    fetchPayment();
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedPayment = {
      semester: form.semester,
      courseName: form.courseName,
      amount: parseInt(form.amount),
    };
    await api.updatePayment(id, updatedPayment);
    navigate('/home');
  };

  if (loading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" />
      </div>
    );
  }

  return (
    <Container className="mt-4">
      <Card>
        <Card.Header as="h5">Edit Payment</Card.Header>
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
            <Button type="submit" variant="primary">
              Update Payment
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default EditPage;