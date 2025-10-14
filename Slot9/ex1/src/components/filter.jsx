import React from 'react';
import { Card, Form, Row, Col } from 'react-bootstrap';

const Filter = ({ onSearchChange, onYearFilterChange, onSortChange }) => {
  return (
    <Card className="mb-4 p-3 shadow-sm">
      <h5 className="mb-3">🎯 Movie Filter</h5>
      <Form>
        {/* Search */}
        <Form.Group className="mb-3" controlId="search">
          <Form.Label>🔍 Search by Title or Description</Form.Label>
          <Form.Control
            type="text"
            placeholder="Type to search..."
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </Form.Group>

        <Row>
          {/* Filter by Year */}
          <Col md={4}>
            <Form.Group controlId="yearFilter">
              <Form.Label>📅 Filter by Year</Form.Label>
              <Form.Select onChange={(e) => onYearFilterChange(e.target.value)}>
                <option value="">All</option>
                <option value="<=2000">≤ 2000</option>
                <option value="2001-2015">2001 – 2015</option>
                <option value=">=2015">≥ 2015</option>
              </Form.Select>
            </Form.Group>
          </Col>

          {/* Sort Options */}
          <Col md={8}>
            <Form.Group controlId="sortOption">
              <Form.Label>↕️ Sort By</Form.Label>
              <Form.Select onChange={(e) => onSortChange(e.target.value)}>
                <option value="">None</option>
                <option value="year-asc">Year ↑</option>
                <option value="year-desc">Year ↓</option>
                <option value="title-asc">Title A → Z</option>
                <option value="title-desc">Title Z → A</option>
                <option value="duration-asc">Duration ↑</option>
                <option value="duration-desc">Duration ↓</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>
      </Form>
    </Card>
  );
};

export default Filter;