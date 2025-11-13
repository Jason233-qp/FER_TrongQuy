import React, { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import * as api from '../services/api';
import { useExpenses } from '../contexts/ExpenseContext';

const AddExpense = () => {
  const [form, setForm] = useState({ name: '', category: '', amount: '', date: '' });
  const { dispatch } = useExpenses();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleReset = () => {
    setForm({ name: '', category: '', amount: '', date: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem('user'));
    const newExpense = await api.createExpense({ ...form, userId: user.id });
    dispatch({ type: 'ADD_EXPENSE', payload: newExpense });
    handleReset();
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h6 className="text-center text-muted fw-semibold mb-3">Add Expense</h6>
      <Row className="g-3">
        <Col md={6}>
          <Form.Group>
            <Form.Label>Name</Form.Label>
            <Form.Control
              name="name"
              type="text"
              value={form.name}
              onChange={handleChange}
              required
            />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group>
            <Form.Label>Amount</Form.Label>
            <Form.Control
              name="amount"
              type="number"
              value={form.amount}
              onChange={handleChange}
              required
            />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group>
            <Form.Label>Category</Form.Label>
            <Form.Select
              name="category"
              value={form.category}
              onChange={handleChange}
              required
            >
              <option value="">Select category</option>
              <option value="Food">Food</option>
              <option value="Utilities">Utilities</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Shopping">Shopping</option>
            </Form.Select>
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group>
            <Form.Label>Date</Form.Label>
            <Form.Control
              name="date"
              type="date"
              value={form.date}
              onChange={handleChange}
              required
            />
          </Form.Group>
        </Col>
      </Row>
      <div className="mt-4 d-flex justify-content-center gap-2">
        <Button variant="secondary" onClick={handleReset}>Reset</Button>
        <Button type="submit" variant="success">Save</Button>
      </div>
    </Form>
  );
};

export default AddExpense;