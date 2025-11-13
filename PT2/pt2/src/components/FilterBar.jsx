/**
 * @fileoverview FilterBar Component - Thanh công cụ lọc và tìm kiếm payments
 * 
 * Component này cung cấp giao diện để:
 * 1. Tìm kiếm payments theo semester hoặc tên khóa học
 * 2. Lọc payments theo semester hoặc khóa học
 * 3. Sắp xếp payments theo nhiều tiêu chí khác nhau
 * 
 * Tất cả các thao tác đều tương tác trực tiếp với PaymentContext
 * để cập nhật danh sách payments được hiển thị.
 */
import React from 'react';
import { Card, Form, Row, Col } from 'react-bootstrap';
import { usePayments } from '../contexts/PaymentContext';

/**
 * FilterBar - Component thanh công cụ lọc
 */
const FilterBar = () => {
  // Lấy state và dispatch từ PaymentContext
  const { state, dispatch } = usePayments();

  /**
   * Xử lý khi giá trị filter thay đổi
   * @param {string} field - Tên trường filter (search/semester/course/sort)
   * @param {string} value - Giá trị mới
   * 
   * Quy trình:
   * 1. Cập nhật giá trị filter trong state
   * 2. Kích hoạt lọc lại danh sách payments
   */
  const handleChange = (field, value) => {
    dispatch({ type: 'SET_FILTER', payload: { [field]: value } });
    dispatch({ type: 'APPLY_FILTER' });
  };

  return (
    <Card className="mb-4 shadow-sm">
      <Card.Header as="h5">Bộ lọc, Tìm kiếm & Sắp xếp</Card.Header>
      <Card.Body>
        <Form>
          {/* Grid layout cho các controls */}
          <Row className="g-3">
            {/* Ô tìm kiếm - chiếm 4 cột trên màn hình lớn */}
            <Col xs={12} lg={4}>
              <Form.Group>
                <Form.Label>Tìm kiếm (Semester/Course)</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Search by semester or course name"
                  value={state.filter.search}
                  onChange={(e) => handleChange('search', e.target.value)}
                />
              </Form.Group>
            </Col>

            {/* Select box Semester - chiếm 2 cột trên màn hình lớn */}
            <Col xs={6} md={4} lg={2}>
              <Form.Group>
                <Form.Label>Lọc theo Semester</Form.Label>
                <Form.Select
                  value={state.filter.semester}
                  onChange={(e) => handleChange('semester', e.target.value)}
                >
                  <option value="">All Semesters</option>
                  {/* Danh sách semester được lấy động từ payments */}
                </Form.Select>
              </Form.Group>
            </Col>

            {/* Select box Course - chiếm 2 cột trên màn hình lớn */}
            <Col xs={6} md={4} lg={2}>
              <Form.Group>
                <Form.Label>Lọc theo Course</Form.Label>
                <Form.Select
                  value={state.filter.course}
                  onChange={(e) => handleChange('course', e.target.value)}
                >
                  <option value="">All Courses</option>
                  {/* Danh sách course được lấy động từ payments */}
                </Form.Select>
              </Form.Group>
            </Col>

            {/* Select box sắp xếp - chiếm 4 cột trên màn hình lớn */}
            <Col xs={12} md={4} lg={4}>
              <Form.Group>
                <Form.Label>Sắp xếp theo:</Form.Label>
                <Form.Select
                  value={state.filter.sort}
                  onChange={(e) => handleChange('sort', e.target.value)}
                >
                  <option value="course_asc">Course name ascending</option>
                  <option value="course_desc">Course name descending</option>
                  <option value="date_asc">Date ascending</option>
                  <option value="date_desc">Date descending</option>
                  <option value="amount_asc">Amount ascending</option>
                  <option value="amount_desc">Amount descending</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
        </Form>
      </Card.Body>
    </Card>
  );
};

/**
 * Export FilterBar component làm default export
 * Được sử dụng trong:
 * - DashboardPage để cung cấp chức năng lọc/tìm kiếm
 * - Tương tác trực tiếp với PaymentContext để cập nhật danh sách
 */
export default FilterBar;