/**
 * @fileoverview NotFoundPage - Trang 404 khi không tìm thấy route
 * 
 * Component này hiển thị khi:
 * - URL không khớp với bất kỳ route nào đã định nghĩa
 * - Người dùng truy cập vào đường dẫn không tồn tại
 * - Redirect từ PrivateRoute khi route không hợp lệ
 */
import React from 'react';
import { Container } from 'react-bootstrap';

/**
 * NotFoundPage - Component trang 404
 * 
 * Hiển thị thông báo lỗi 404 đơn giản với:
 * - Tiêu đề "404 - Page Not Found"
 * - Message giải thích ngắn gọn
 * 
 * Component này được giữ đơn giản và nhẹ nhàng,
 * tập trung vào việc thông báo lỗi cho user một cách rõ ràng
 */
const NotFoundPage = () => (
  <Container className="text-center mt-5">
    <h2>404 - Page Not Found</h2>
    <p>The page you are looking for does not exist.</p>
  </Container>
);

/**
 * Export NotFoundPage component làm default export
 * Được sử dụng trong:
 * - AppRoutes như fallback route
 * - Xử lý các URL không hợp lệ
 */
export default NotFoundPage;
