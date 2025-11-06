import React from 'react';
import { Table, Button, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { usePayments } from '../contexts/PaymentContext';
import * as api from '../services/api';

const PaymentTable = () => {
  const { state, dispatch } = usePayments();
  const { filteredPayments, loading, totalAmount } = state;
  const navigate = useNavigate();

  const handleDelete = async (id) => {
    await api.deletePayment(id);
    dispatch({ type: 'DELETE_PAYMENT', payload: id });
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
                    onClick={() => handleDelete(p.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
      <h5 className="text-end mt-3">
        Total: {totalAmount.toLocaleString()} ₫
      </h5>
    </>
  );
};

export default PaymentTable;