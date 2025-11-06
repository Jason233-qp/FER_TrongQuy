import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Card } from 'react-bootstrap';
import * as api from '../services/api';

const ViewDetails = () => {
  const { id } = useParams();
  const [payment, setPayment] = useState(null);

  useEffect(() => {
    const fetch = async () => {
      const data = await api.getPaymentById(id);
      setPayment(data);
    };
    fetch();
  }, [id]);

  if (!payment) return <div className="text-center mt-5">Loading...</div>;

  return (
    <Container className="mt-4">
      <Card>
        <Card.Header as="h5">Payment Details</Card.Header>
        <Card.Body>
          <p><strong>Semester:</strong> {payment.semester}</p>
          <p><strong>Course Name:</strong> {payment.courseName}</p>
          <p><strong>Amount:</strong> {payment.amount.toLocaleString()} ₫</p>
          <p><strong>Date:</strong> {new Date(payment.date).toLocaleDateString('vi-VN')}</p>
          <p><strong>User ID:</strong> {payment.userId}</p>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ViewDetails; 