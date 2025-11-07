import React, { useState } from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';

const UserFilter = ({ onFilter }) => {
  const [keyword, setKeyword] = useState('');
  const [role, setRole] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onFilter({ keyword, role, status });
  };

  const handleReset = () => {
    setKeyword('');
    setRole('');
    setStatus('');
    onFilter({ keyword: '', role: '', status: '' });
  };

  return (
    <Form onSubmit={handleSubmit} className="mb-4">
      <Row className="align-items-end">
        <Col md={4}>
          <Form.Group controlId="keyword">
            <Form.Label>Tìm kiếm (username hoặc tên)</Form.Label>
            <Form.Control
              type="text"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="Nhập từ khóa..."
            />
          </Form.Group>
        </Col>
        <Col md={3}>
          <Form.Group controlId="role">
            <Form.Label>Role</Form.Label>
            <Form.Select value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="">Tất cả</option>
              <option value="admin">Admin</option>
              <option value="user">User</option>
            </Form.Select>
          </Form.Group>
        </Col>
        <Col md={3}>
          <Form.Group controlId="status">
            <Form.Label>Status</Form.Label>
            <Form.Select value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="">Tất cả</option>
              <option value="active">Active</option>
              <option value="blocked">Blocked</option>
              <option value="locked">Locked</option>
            </Form.Select>
          </Form.Group>
        </Col>
        <Col md={2}>
          <Button type="submit" variant="primary" className="me-2">
            Lọc
          </Button>
          <Button variant="secondary" onClick={handleReset}>
            Reset
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default UserFilter;