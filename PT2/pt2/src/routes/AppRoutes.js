import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import LoginPage from '../pages/LoginPage';
import DashboardPage from '../pages/DashboardPage';
import NotFoundPage from '../pages/NotFoundPage';
import DetailPage from '../pages/DetailPage';
import EditPage from '../pages/EditPage';
import AddPayment from '../pages/AddPayment';
import UserList from '../pages/UserList'; // ✅ Thêm import trang quản lý người dùng

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
      {/* ✅ Route quản lý người dùng */}
      <Route
        path="/users"
        element={
          <PrivateRoute>
            <UserList />
          </PrivateRoute>
        }
      />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  </Router>
);

export default AppRoutes;