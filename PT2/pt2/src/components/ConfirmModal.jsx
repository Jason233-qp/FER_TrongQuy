/**
 * @fileoverview ConfirmModal Component - Modal xác nhận hành động
 * 
 * Component này tạo một modal dialog để xác nhận các hành động quan trọng như:
 * - Xóa payment
 * - Đăng xuất
 * - Các hành động khác cần xác nhận từ user
 * 
 * Modal bao gồm:
 * - Header với tiêu đề
 * - Body hiển thị message
 * - Footer với nút xác nhận và nút đóng (tùy chọn)
 */
import React from 'react';
import { Modal, Button } from 'react-bootstrap';

/**
 * ConfirmModal - Component modal xác nhận
 * 
 * @param {Object} props - Component props
 * @param {boolean} props.show - Trạng thái hiển thị của modal
 * @param {string} props.title - Tiêu đề của modal
 * @param {string} props.message - Nội dung message cần xác nhận
 * @param {Function} props.onConfirm - Callback khi user nhấn nút xác nhận
 * @param {Function} props.onHide - Callback khi modal bị đóng
 * 
 * Sử dụng:
 * ```jsx
 * <ConfirmModal
 *   show={showModal}
 *   title="Xác nhận xóa"
 *   message="Bạn có chắc muốn xóa payment này?"
 *   onConfirm={handleDelete}
 *   onHide={() => setShowModal(false)}
 * />
 * ```
 */
const ConfirmModal = ({ show, title, message, onConfirm, onHide }) => {
  return (
    <Modal show={show} centered onHide={onHide}>
      {/* Header với nút close */}
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>

      {/* Body hiển thị message */}
      <Modal.Body>{message}</Modal.Body>

      {/* Footer với nút xác nhận */}
      <Modal.Footer>
        <Button variant="primary" onClick={onConfirm}>
          Xác nhận
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

/**
 * Export ConfirmModal component làm default export
 * Được sử dụng trong:
 * - PaymentTable để xác nhận xóa payment
 * - NavigationHeader để xác nhận đăng xuất
 * - Các components khác cần xác nhận action
 */
export default ConfirmModal;