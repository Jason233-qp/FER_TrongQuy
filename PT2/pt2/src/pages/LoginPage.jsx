import React from 'react';
import { Container, Row, Col, Card, Alert } from 'react-bootstrap';
import LoginForm from '../components/LoginForm';
import { useAuth } from '../contexts/AuthContext';

const LoginPage = () => {
  const { error, clearError } = useAuth();

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <Card>
            <Card.Header as="h4" className="text-center">
              Đăng nhập hệ thống
            </Card.Header>
            <Card.Body>
              {/* ✅ Hiển thị lỗi nếu có, có thể đóng */}
              {error && (
                <Alert
                  variant="danger"
                  className="text-center mb-3"
                  dismissible
                  onClose={clearError}
                >
                  {error}
                </Alert>
              )}
              <LoginForm />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;