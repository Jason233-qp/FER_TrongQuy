import React from 'react';
import { Card, Form } from 'react-bootstrap';
import { useExpenses } from '../contexts/ExpenseContext';

const FilterBar = () => {
  const { state, dispatch } = useExpenses();

  const handleChange = (e) => {
    dispatch({ type: 'SET_FILTER', payload: { category: e.target.value } });
    dispatch({ type: 'APPLY_FILTER' });
  };

  return (
    <Card className="mb-4 shadow-sm">
      <Card.Header as="h6" className="text-muted">Filter</Card.Header>
      <Card.Body>
        <Form.Group>
          <Form.Label className="fw-semibold">Category</Form.Label>
          <Form.Select value={state.filter.category} onChange={handleChange}>
            <option value="">All categories</option>
            <option value="Food">Food</option>
            <option value="Utilities">Utilities</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Shopping">Shopping</option>
          </Form.Select>
        </Form.Group>
      </Card.Body>
    </Card>
  );
};

export default FilterBar;