import React, { useState } from 'react';
import { Card, Form, Button, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuthState, useAuthDispatch } from '../contexts/AuthContext';
import ConfirmModal from './ConfirmModal';

const LoginForm = () => {
  const { loading, error, user } = useAuthState();
  const { login } = useAuthDispatch();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalMsg, setModalMsg] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await login(username, password);
    setModalMsg(result.success ? 'Đăng nhập thành công!' : result.message);
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    if (user) navigate('/movies');
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <Card style={{ width: '25rem' }}>
        <Card.Body>
          <h3 className="text-center mb-4">🔐 Đăng nhập</h3>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Tên đăng nhập</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nhập username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Mật khẩu</Form.Label>
              <Form.Control
                type="password"
                placeholder="Nhập mật khẩu"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>
            <Button type="submit" variant="primary" className="w-100" disabled={loading}>
              {loading ? <Spinner animation="border" size="sm" /> : 'Đăng nhập'}
            </Button>
          </Form>
        </Card.Body>
      </Card>

      <ConfirmModal
        show={showModal}
        title="Thông báo"
        message={modalMsg}
        onHide={handleClose}
      />
    </div>
  );
};

export default LoginForm;
