import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Alert, Toast, ToastContainer } from 'react-bootstrap';
import LoginForm from '../components/LoginForm';
import { useAuth } from '../contexts/AuthContext';
import ConfirmModal from '../components/ConfirmModal'; // Nếu muốn dùng modal hiển thị lỗi
/**
 * LoginPage Component
 * Trang đăng nhập của ứng dụng, hiển thị form đăng nhập và xử lý thông báo lỗi.
 * 
 * Chức năng:
 * - Hiển thị form đăng nhập (LoginForm component)
 * - Hiển thị thông báo lỗi từ AuthContext nếu có
 * - Cho phép đóng thông báo lỗi
 * 
 * Layout:
 * - Căn giữa form đăng nhập
 * - Card có header "Đăng nhập hệ thống"
 * - Alert hiển thị lỗi (nếu có) phía trên form
 */
const LoginPage = () => {
  // Lấy error và clearError từ AuthContext để hiển thị/xử lý lỗi đăng nhập
  const { error, clearError } = useAuth();

  // Local state để điều khiển hiển thị Toast góc màn hình
  const [showToast, setShowToast] = useState(false);

  // Khi có error mới, bật Toast; khi error biến mất, ẩn Toast
  useEffect(() => {
    if (error) setShowToast(true);
    else setShowToast(false);
  }, [error]);

  /**
   * Cấu trúc giao diện:
   * 1. Container với margin-top để cách top
   * 2. Row với justify-content-center để căn giữa
   * 3. Col md={6} để form chiếm 1/2 chiều rộng trên màn hình medium+
   * 4. Card chứa:
   *    - Header: tiêu đề trang
   *    - Body: 
   *      + Alert hiển thị lỗi (nếu có)
   *      + LoginForm component xử lý form đăng nhập
   */
  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <Card>
            <Card.Header as="h4" className="text-center">
              Đăng nhập hệ thống
            </Card.Header>
            <Card.Body>

              {/* Nếu muốn hiển thị lỗi bằng modal thay vì Alert, bạn có thể dùng ConfirmModal.
                  Đoạn ví dụ dưới đây chỉ là comment (không được thực thi). Nếu muốn bật,
                  hãy import ConfirmModal và thay block Alert bằng ConfirmModal. */}
              {/* // import ConfirmModal at top of file: */}
              {/* // JSX example (uncomment to use): */}
              {/* <ConfirmModal
                show={!!error}
                title="Lỗi đăng nhập"
                message={error || ''}
                onConfirm={clearError}
                onHide={clearError}
              /> */}

              {/* Hiển thị Alert lỗi nếu có error từ AuthContext */}
              {/* dismissible + onClose cho phép đóng thông báo */}
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
              {/* Form đăng nhập - xử lý logic trong LoginForm component */}
              <LoginForm />
            </Card.Body>
          </Card>
        </Col>
      </Row>
      {/* Toast container hiển thị lỗi ở góc trên bên phải (không thay thế Alert hiện tại) */}
      {/* <ToastContainer position="top-end" className="p-3">
        <Toast
          show={!!error && showToast}
          onClose={() => {
            setShowToast(false);
            clearError();
          }}
          autohide
          delay={4000}
        >
          <Toast.Header>
            <strong className="me-auto">Lỗi</strong>
          </Toast.Header>
          <Toast.Body className="text-danger">{error}</Toast.Body>
        </Toast>
      </ToastContainer> */}
    </Container>
  );
};

export default LoginPage;