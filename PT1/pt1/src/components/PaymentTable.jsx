import React, { useState } from 'react';
import { Table, Button, Spinner, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { usePayments } from '../contexts/PaymentContext';
import * as api from '../services/api';

const PaymentTable = () => {
  const { state, dispatch } = usePayments();
  const { filteredPayments, loading } = state;
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const handleDeleteClick = (id) => {
    setSelectedId(id);
    setShowModal(true);
  };

  const confirmDelete = async () => {
    await api.deletePayment(selectedId);
    dispatch({ type: 'DELETE_PAYMENT', payload: selectedId });
    setShowModal(false);
    setSelectedId(null);
  };

  const cancelDelete = () => {
    setShowModal(false);
    setSelectedId(null);
  };

  if (loading) {
    return (
      <div className="text-center my-5">
        <Spinner animation="border" />
      </div>
    );
  }

  return (
    <>
      {/* ✅ Nút thêm payment */}
      <Button
        variant="success"
        className="mb-3"
        onClick={() => navigate('/payments/add')}
      >
        Add Payment
      </Button>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Semester</th>
            <th>Course Name</th>
            <th>Amount (₫)</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredPayments.length === 0 ? (
            <tr>
              <td colSpan="5" className="text-center">
                No payment data available
              </td>
            </tr>
          ) : (
            filteredPayments.map((p, idx) => (
              <tr key={p.id}>
                <td>{idx + 1}</td>
                <td>{p.semester}</td>
                <td>{p.courseName}</td>
                <td>{p.amount.toLocaleString()}</td>
                <td>
                  <Button
                    size="sm"
                    variant="info"
                    onClick={() => navigate(`/payments/${p.id}`)}
                  >
                    View
                  </Button>{' '}
                  <Button
                    size="sm"
                    variant="warning"
                    onClick={() => navigate(`/payments/edit/${p.id}`)}
                  >
                    Edit
                  </Button>{' '}
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

      {/* ✅ Modal xác nhận xóa */}
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

export default PaymentTable;