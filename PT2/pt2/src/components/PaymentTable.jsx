/**
 * @fileoverview PaymentTable Component - Hiển thị bảng danh sách thanh toán
 * 
 * Component này hiển thị danh sách các khoản thanh toán dưới dạng bảng,
 * với các chức năng:
 * - Hiển thị loading spinner khi đang tải dữ liệu
 * - Các nút thao tác: View, Edit, Delete cho từng payment
 * - Modal xác nhận khi xóa payment
 * - Phân trang và sắp xếp (nếu có)
 */
import React, { useState } from 'react';
import { Table, Button, Spinner, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { usePayments } from '../contexts/PaymentContext';
import * as api from '../services/api';

/**
 * PaymentTable - Component bảng hiển thị danh sách thanh toán
 * Sử dụng PaymentContext để lấy dữ liệu và dispatch actions
 */
const PaymentTable = () => {
  // Lấy state từ PaymentContext
  const { state, dispatch } = usePayments();
  const { filteredPayments, loading } = state;
  const navigate = useNavigate();

  // Local state cho modal xác nhận xóa
  const [showModal, setShowModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  /**
   * Xử lý khi click nút Delete
   * @param {string} id - ID của payment cần xóa
   */
  const handleDeleteClick = (id) => {
    setSelectedId(id);
    setShowModal(true);
  };

  /**
   * Xử lý xác nhận xóa payment
   * 1. Gọi API xóa payment
   * 2. Cập nhật state qua dispatch
   * 3. Đóng modal và reset selectedId
   */
  const confirmDelete = async () => {
    await api.deletePayment(selectedId);
    dispatch({ type: 'DELETE_PAYMENT', payload: selectedId });
    setShowModal(false);
    setSelectedId(null);
  };

  /**
   * Hủy thao tác xóa
   * Reset modal state và selectedId
   */
  const cancelDelete = () => {
    setShowModal(false);
    setSelectedId(null);
  };

  /**
   * Hiển thị loading spinner khi đang tải dữ liệu
   */
  if (loading) {
    return (
      <div className="text-center my-5">
        <Spinner animation="border" />
      </div>
    );
  }

  return (
    <>
      {/* Nút thêm payment mới */}
      <Button
        variant="success"
        className="mb-3"
        onClick={() => navigate('/payments/add')}
      >
        Add Payment
      </Button>

      {/* Bảng hiển thị danh sách payments */}
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Semester</th>
            <th>Date</th>
            <th>Course Name</th>
            <th>Amount (₫)</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {/* Hiển thị thông báo khi không có dữ liệu */}
          {filteredPayments.length === 0 ? (
            <tr>
              <td colSpan="6" className="text-center">
                No payment data available
              </td>
            </tr>
          ) : (
            // Map qua danh sách payments đã được lọc
            filteredPayments.map((p, idx) => (
              <tr key={p.id}>
                <td>{idx + 1}</td>
                <td>{p.semester}</td>
                <td>{p.date ? new Date(p.date).toLocaleDateString() : '-'}</td>
                <td>{p.courseName}</td>
                <td>{p.amount.toLocaleString()}</td>
                <td>
                  {/* Nút View - chuyển đến trang chi tiết */}
                  <Button
                    size="sm"
                    variant="info"
                    onClick={() => navigate(`/payments/${p.id}`)}
                  >
                    View
                  </Button>{' '}
                  {/* Nút Edit - chuyển đến trang chỉnh sửa */}
                  <Button
                    size="sm"
                    variant="warning"
                    onClick={() => navigate(`/payments/edit/${p.id}`)}
                  >
                    Edit
                  </Button>{' '}
                  {/* Nút Delete - mở modal xác nhận */}
                  <Button
                    size="sm"
                    variant="danger"
                    onClick={() => handleDeleteClick(p.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>

      {/* Modal xác nhận trước khi xóa payment */}
      <Modal show={showModal} onHide={cancelDelete} centered>
        <Modal.Header closeButton>
          <Modal.Title>Xác nhận xóa</Modal.Title>
        </Modal.Header>
        <Modal.Body>Bạn có chắc muốn xóa khoản thanh toán này?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={cancelDelete}>
            Hủy
          </Button>
          <Button variant="danger" onClick={confirmDelete}>
            Xóa
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

/**
 * Export PaymentTable component làm default export
 * Được sử dụng trong:
 * - DashboardPage để hiển thị payments của user
 * - AdminPage để hiển thị tất cả payments
 */
export default PaymentTable;