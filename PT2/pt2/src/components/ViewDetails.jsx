/**
 * @fileoverview ViewDetails Component - Hiển thị chi tiết một khoản thanh toán
 * 
 * Component này hiển thị tất cả thông tin của một payment:
 * - Semester (Kỳ học)
 * - Course Name (Tên khóa học)
 * - Amount (Số tiền)
 * - Date (Ngày thanh toán)
 * - User ID (ID của người thanh toán)
 * 
 * Dữ liệu được fetch từ API dựa trên ID từ URL params
 */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Card } from 'react-bootstrap';
import * as api from '../services/api';

/**
 * ViewDetails - Component hiển thị chi tiết payment
 * 
 * Quy trình:
 * 1. Lấy ID từ URL params
 * 2. Fetch thông tin payment
 * 3. Hiển thị loading trong quá trình fetch
 * 4. Render thông tin chi tiết khi có dữ liệu
 */
const ViewDetails = () => {
  // Lấy payment ID từ URL params
  const { id } = useParams();
  
  // State lưu thông tin payment
  const [payment, setPayment] = useState(null);

  // Fetch thông tin payment khi component mount
  useEffect(() => {
    const fetch = async () => {
      const data = await api.getPaymentById(id);
      setPayment(data);
    };
    fetch();
  }, [id]); // Re-fetch khi ID thay đổi

  // Hiển thị loading khi chưa có dữ liệu
  if (!payment) return <div className="text-center mt-5">Loading...</div>;

  return (
    <Container className="mt-4">
      {/* Card hiển thị thông tin chi tiết */}
      <Card>
        <Card.Header as="h5">Payment Details</Card.Header>
        <Card.Body>
          {/* Semester */}
          <p>
            <strong>Semester:</strong> {payment.semester}
          </p>
          
          {/* Course Name */}
          <p>
            <strong>Course Name:</strong> {payment.courseName}
          </p>
          
          {/* Amount - đã format theo định dạng tiền tệ VN */}
          <p>
            <strong>Amount:</strong> {payment.amount.toLocaleString()} ₫
          </p>
          
          {/* Date - đã format theo định dạng ngày tháng VN */}
          <p>
            <strong>Date:</strong> {
              new Date(payment.date).toLocaleDateString('vi-VN')
            }
          </p>
          
          {/* User ID */}
          <p>
            <strong>User ID:</strong> {payment.userId}
          </p>
        </Card.Body>
      </Card>
    </Container>
  );
};

/**
 * Export ViewDetails component làm default export
 * Được sử dụng trong:
 * - Route /payments/:id để hiển thị chi tiết một payment
 */
export default ViewDetails;