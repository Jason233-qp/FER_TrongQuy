/**
 * @fileoverview DashboardPage - Trang chính hiển thị bảng thanh toán
 * 
 * Component này là trang chính của ứng dụng, hiển thị:
 * 1. Navigation header với thông tin user và menu
 * 2. Thanh filter/search/sort
 * 3. Bảng danh sách payments
 * 
 * Cấu trúc:
 * - PaymentProvider (Context)
 *   - NavigationHeader
 *   - FilterBar
 *   - PaymentTable
 */
import React from 'react';
import { Container, Card } from 'react-bootstrap';
import NavigationHeader from '../components/NavigationHeader';
import FilterBar from '../components/FilterBar';
import PaymentTable from '../components/PaymentTable';
import { PaymentProvider } from '../contexts/PaymentContext';

/**
 * DashboardPage - Component trang chính
 * 
 * Sử dụng PaymentProvider để cung cấp context cho 
 * toàn bộ các components con liên quan đến payment
 */
const DashboardPage = () => {
  return (
    <PaymentProvider>
      {/* Header với navigation và thông tin user */}
      <NavigationHeader />

      <Container>
        {/* Thanh công cụ lọc và tìm kiếm */}
        <FilterBar />

        {/* Card chính chứa bảng payments */}
        <Card className="shadow-sm">
          <Card.Header as="h5">Dashboard Overview</Card.Header>
          <Card.Body>
            {/* Bảng hiển thị danh sách payments */}
            <PaymentTable />
          </Card.Body>
        </Card>
      </Container>
    </PaymentProvider>
  );
};

/**
 * Export DashboardPage component làm default export
 * Được sử dụng trong:
 * - AppRoutes như trang chính sau khi đăng nhập
 * - Route /home
 */
export default DashboardPage;
