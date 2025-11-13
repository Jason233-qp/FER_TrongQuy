/**
 * @fileoverview AddPayment Component - Form tạo khoản thanh toán mới
 * 
 * Component này cung cấp form để người dùng tạo khoản thanh toán mới với các trường:
 * - Semester (Kỳ học)
 * - Course Name (Tên khóa học)
 * - Amount (Số tiền)
 * 
 * Tự động thêm:
 * - userId từ user đang đăng nhập
 * - date là thời điểm tạo payment
 */
import React, { useState } from 'react';
import { Form, Button, Container, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import * as api from '../services/api';

/**
 * AddPayment - Component form thêm payment mới
 */
const AddPayment = () => {
  // Form state với giá trị mặc định rỗng
  const [form, setForm] = useState({ semester: '', courseName: '', amount: '' });
  const navigate = useNavigate();
  const { user } = useAuth();

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
   * 2. Chuẩn bị dữ liệu payment mới:
   *    - Chuyển amount sang số
   *    - Thêm userId của user đang đăng nhập
   *    - Thêm ngày tạo payment
   * 3. Gọi API tạo payment
   * 4. Chuyển về trang home
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPayment = {
      ...form,
      amount: parseInt(form.amount),
      userId: user.id,
      date: new Date().toISOString()
    };
    await api.createPayment(newPayment);
    navigate('/home');
  };

  return (
    <Container className="mt-4">
      {/* Card chứa form */}
      <Card>
        <Card.Header as="h5">Add New Payment</Card.Header>
        <Card.Body>
          {/* Form thêm payment với validation HTML5 (required) */}
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

            {/* Nút submit form */}
            <Button type="submit">Add Payment</Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

/**
 * Export AddPayment component làm default export
 * Được sử dụng trong:
 * - Route /payments/add
 * - Cho phép user thêm payment mới vào hệ thống
 */
export default AddPayment;