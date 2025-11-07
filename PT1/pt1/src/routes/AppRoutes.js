import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import LoginPage from '../pages/LoginPage';
import DashboardPage from '../pages/DashboardPage';
import NotFoundPage from '../pages/NotFoundPage';
import DetailPage from '../pages/DetailPage';     // ✅ Trang xem chi tiết
import EditPage from '../pages/EditPage';         // ✅ Trang chỉnh sửa
import AddPayment from '../pages/AddPayment';     // ✅ Trang thêm mới

const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" />;
};

const AppRoutes = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Navigate to="/home" replace />} />
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/home"
        element={
          <PrivateRoute>
            <DashboardPage />
          </PrivateRoute>
        }
      />
      {/* ✅ Route thêm mới thanh toán */}
      <Route
        path="/payments/add"
        element={
          <PrivateRoute>
            <AddPayment />
          </PrivateRoute>
        }
      />
      {/* ✅ Route xem chi tiết thanh toán */}
      <Route
        path="/payments/:id"
        element={
          <PrivateRoute>
            <DetailPage />
          </PrivateRoute>
        }
      />
      {/* ✅ Route chỉnh sửa thanh toán */}
      <Route
        path="/payments/edit/:id"
        element={
          <PrivateRoute>
            <EditPage />
          </PrivateRoute>
        }
      />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  </Router>
);

export default AppRoutes;