import React, { useState } from 'react';
import { Table, Button, Spinner, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useExpenses } from '../contexts/ExpenseContext';
import * as api from '../services/api';

const ExpenseTable = () => {
  const { state, dispatch } = useExpenses();
  const { filteredExpenses, loading } = state;
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const handleDeleteClick = (id) => {
    setSelectedId(id);
    setShowModal(true);
  };

  const confirmDelete = async () => {
    await api.deleteExpense(selectedId);
    dispatch({ type: 'DELETE_EXPENSE', payload: selectedId });
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
      <h6 className="text-muted fw-semibold mb-3">Expense Management</h6>

      <Table striped bordered hover responsive className="align-middle shadow-sm">
        <thead className="table-light text-center">
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Amount (₫)</th>
            <th>Category</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredExpenses.length === 0 ? (
            <tr>
              <td colSpan="6" className="text-center text-muted">
                No expense data available
              </td>
            </tr>
          ) : (
            filteredExpenses.map((p, idx) => (
              <tr key={p.id}>
                <td className="text-center">{idx + 1}</td>
                <td className="fw-semibold">{p.name}</td>
                <td className="text-end text-primary">{p.amount.toLocaleString()} ₫</td>
                <td className="text-center">{p.category}</td>
                <td className="text-center">
                  {new Date(p.date).toLocaleDateString('vi-VN')}
                </td>
                <td>
                  <div className="d-flex justify-content-center gap-2">
                    <Button
                      size="sm"
                      variant="warning"
                      onClick={() => navigate(`/expenses/edit/${p.id}`)}
                    >
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="danger"
                      onClick={() => handleDeleteClick(p.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>

      {/* Modal xác nhận xóa */}
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

export default ExpenseTable;