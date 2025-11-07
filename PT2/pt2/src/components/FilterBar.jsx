import React from 'react';
import { Card, Form, Row, Col } from 'react-bootstrap';
import { usePayments } from '../contexts/PaymentContext';

const FilterBar = () => {
  const { state, dispatch } = usePayments();

  const handleChange = (field, value) => {
    dispatch({ type: 'SET_FILTER', payload: { [field]: value } });
    dispatch({ type: 'APPLY_FILTER' });
  };

  return (
    <Card className="mb-4 shadow-sm">
      <Card.Header as="h5">Bộ lọc, Tìm kiếm & Sắp xếp</Card.Header>
      <Card.Body>
        <Form>
          <Row className="g-3">
            <Col xs={12} lg={4}>
              <Form.Group>
                <Form.Label>Tìm kiếm (Semester/Course)</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Search by semester or course name"
                  value={state.filter.search}
                  onChange={(e) => handleChange('search', e.target.value)}
                />
              </Form.Group>
            </Col>

            <Col xs={6} md={4} lg={2}>
              <Form.Group>
                <Form.Label>Lọc theo Semester</Form.Label>
                <Form.Select
                  value={state.filter.semester}
                  onChange={(e) => handleChange('semester', e.target.value)}
                >
                  <option value="">All Semesters</option>
                </Form.Select>
              </Form.Group>
            </Col>

            <Col xs={6} md={4} lg={2}>
              <Form.Group>
                <Form.Label>Lọc theo Course</Form.Label>
                <Form.Select
                  value={state.filter.course}
                  onChange={(e) => handleChange('course', e.target.value)}
                >
                  <option value="">All Courses</option>
                </Form.Select>
              </Form.Group>
            </Col>

            <Col xs={12} md={4} lg={4}>
              <Form.Group>
                <Form.Label>Sắp xếp theo:</Form.Label>
                <Form.Select
                  value={state.filter.sort}
                  onChange={(e) => handleChange('sort', e.target.value)}
                >
                  <option value="course_asc">Course name ascending</option>
                  <option value="course_desc">Course name descending</option>
                  <option value="date_asc">Date ascending</option>
                  <option value="date_desc">Date descending</option>
                  <option value="amount_asc">Amount ascending</option>
                  <option value="amount_desc">Amount descending</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default FilterBar;