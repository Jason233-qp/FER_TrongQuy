/**
 * AppRoutes.js
 * File cấu hình routing chính của ứng dụng, định nghĩa:
 * 1. Các routes công khai và routes được bảo vệ
 * 2. Logic chuyển hướng khi chưa đăng nhập
 * 3. Nested routes cho các tính năng (payments, users)
 */

import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import LoginPage from '../pages/LoginPage';
import DashboardPage from '../pages/DashboardPage';
import NotFoundPage from '../pages/NotFoundPage';
import DetailPage from '../pages/DetailPage';
import EditPage from '../pages/EditPage';
import AddPayment from '../pages/AddPayment';
import UserList from '../pages/UserList';

/**
 * PrivateRoute Component
 * HOC (Higher Order Component) để bảo vệ các routes yêu cầu đăng nhập
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Components con cần bảo vệ
 * 
 * Hoạt động:
 * - Kiểm tra trạng thái đăng nhập từ AuthContext
 * - Nếu đã đăng nhập: hiển thị component con
 * - Nếu chưa đăng nhập: chuyển hướng về trang login
 */
const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" />;
};

/**
 * AppRoutes Component
 * Cấu hình chi tiết các routes của ứng dụng
 * 
 * Cấu trúc Routes:
 * 1. Routes công khai (public):
 *    - /login: Trang đăng nhập
 *    - /* (NotFoundPage): Trang 404 cho URL không tồn tại
 * 
 * 2. Routes được bảo vệ (yêu cầu đăng nhập):
 *    - /home: Dashboard chính
 *    - /payments/add: Thêm payment mới
 *    - /payments/:id: Xem chi tiết payment
 *    - /payments/edit/:id: Sửa payment
 *    - /users: Quản lý người dùng
 * 
 * Lưu ý:
 * - Tất cả routes bảo vệ đều được wrap bởi <PrivateRoute>
 * - URL "/" sẽ redirect về "/home"
 */
const AppRoutes = () => (
  <Router>
    <Routes>
      {/* Redirect từ root URL về dashboard */}
      <Route path="/" element={<Navigate to="/home" replace />} />

      {/* Routes công khai */}
      <Route path="/login" element={<LoginPage />} />

      {/* Routes được bảo vệ - Dashboard */}
      <Route
        path="/home"
        element={
          <PrivateRoute>
            <DashboardPage />
          </PrivateRoute>
        }
      />

      {/* Routes được bảo vệ - Payment Management */}
      <Route
        path="/payments/add"
        element={
          <PrivateRoute>
            <AddPayment />
          </PrivateRoute>
        }
      />
      <Route
        path="/payments/:id"
        element={
          <PrivateRoute>
            <DetailPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/payments/edit/:id"
        element={
          <PrivateRoute>
            <EditPage />
          </PrivateRoute>
        }
      />

      {/* Routes được bảo vệ - User Management */}
      <Route
        path="/users"
        element={
          <PrivateRoute>
            <UserList />
          </PrivateRoute>
        }
      />

      {/* Fallback cho URL không tồn tại */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  </Router>
);

export default AppRoutes;