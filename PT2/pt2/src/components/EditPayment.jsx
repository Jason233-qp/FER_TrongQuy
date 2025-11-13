/**
 * @fileoverview EditPayment Component - Form chỉnh sửa thông tin thanh toán
 * 
 * Component này cung cấp form để người dùng cập nhật thông tin payment với các trường:
 * - Semester (Kỳ học)
 * - Course Name (Tên khóa học)
 * - Amount (Số tiền)
 * - Date (Ngày thanh toán)
 * 
 * Quy trình:
 * 1. Fetch thông tin payment hiện tại
 * 2. Hiển thị form với dữ liệu đã có
 * 3. Cho phép người dùng chỉnh sửa
 * 4. Gửi request update khi submit
 */
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Card, Form, Button, Spinner } from 'react-bootstrap';
import * as api from '../services/api';

/**
 * EditPayment - Component form chỉnh sửa payment
 */
const EditPayment = () => {
  // Lấy id từ URL params
  const { id } = useParams();
  const navigate = useNavigate();

  // State cho form data và loading status
  const [form, setForm] = useState({
    semester: '',
    courseName: '',
    amount: '',
    date: ''
  });
  const [loading, setLoading] = useState(true);

  /**
   * Fetch thông tin payment khi component mount
   * hoặc khi id thay đổi
   */
  useEffect(() => {
    const fetchPayment = async () => {
      try {
        const data = await api.getPaymentById(id);
        // Chuẩn hóa dữ liệu trước khi đưa vào form
        setForm({
          semester: data.semester,
          courseName: data.courseName,
          amount: data.amount.toString(),
          date: data.date ? data.date.slice(0, 10) : '', // Lấy YYYY-MM-DD
        });
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch payment:', error);
        setLoading(false);
      }
    };
    fetchPayment();
  }, [id]);

  /**
   * Xử lý khi giá trị form thay đổi
   * @param {React.ChangeEvent} e - Event object
   */
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  /**
   * Xử lý submit form
   * @param {React.FormEvent} e - Event object
   * 
   * 1. Ngăn chặn form submit mặc định
   * 2. Chuẩn hóa dữ liệu payment:
   *    - Chuyển amount sang số
   *    - Bỏ date nếu trống
   * 3. Gọi API update payment
   * 4. Chuyển về trang home
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedPayment = {
      semester: form.semester,
      courseName: form.courseName,
      amount: parseInt(form.amount),
      date: form.date || undefined, // Không gửi date nếu trống
    };
    await api.updatePayment(id, updatedPayment);
    navigate('/home');
  };

  /**
   * Hiển thị loading spinner khi đang fetch dữ liệu
   */
  if (loading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" />
      </div>
    );
  }

  return (
    <Container className="mt-4">
      {/* Card chứa form */}
      <Card>
        <Card.Header as="h5">Edit Payment</Card.Header>
        <Card.Body>
          {/* Form edit payment với validation HTML5 */}
          <Form onSubmit={handleSubmit}>
            {/* Input Semester */}
            <Form.Group className="mb-3">
              <Form.Label>Semester</Form.Label>
              <Form.Control
                name="semester"
                value={form.semester}
                onChange={handleChange}
                required
                placeholder="Spring 2024"
              />
            </Form.Group>

            {/* Input Course Name */}
            <Form.Group className="mb-3">
              <Form.Label>Course Name</Form.Label>
              <Form.Control
                name="courseName"
                value={form.courseName}
                onChange={handleChange}
                required
                placeholder="FER201m"
              />
            </Form.Group>

            {/* Input Amount */}
            <Form.Group className="mb-3">
              <Form.Label>Amount</Form.Label>
              <Form.Control
                name="amount"
                type="number"
                value={form.amount}
                onChange={handleChange}
                required
                placeholder="2000000"
                min="0" // Không cho phép số âm
              />
            </Form.Group>

            {/* Input Date - Optional */}
            <Form.Group className="mb-3">
              <Form.Label>Date</Form.Label>
              <Form.Control
                name="date"
                type="date"
                value={form.date}
                onChange={handleChange}
              />
            </Form.Group>

            {/* Nút submit form */}
            <Button type="submit" variant="primary">
              Update Payment
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

/**
 * Export EditPayment component làm default export
 * Được sử dụng trong:
 * - Route /payments/edit/:id
 * - Cho phép user chỉnh sửa thông tin payment
 */
export default EditPayment;