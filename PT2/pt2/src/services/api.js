/**
 * api.js
 * Module chứa tất cả các API calls của ứng dụng
 * Sử dụng axios để gọi API và được chia thành 2 nhóm chính:
 * 1. User APIs: quản lý người dùng (get, update)
 * 2. Payment APIs: CRUD operations cho payments
 */

import axios from 'axios';

/**
 * Khởi tạo instance axios với cấu hình mặc định:
 * - baseURL: URL gốc của API (json-server)
 * - headers: Content-Type mặc định là application/json
 * 
 * Lưu ý: URL http://localhost:3001 giả định json-server 
 * đang chạy ở port 3001
 */
const API = axios.create({
  baseURL: 'http://localhost:3001',
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * ===== USER APIs =====
 * Nhóm các API liên quan đến quản lý người dùng
 */

/**
 * getUsers - Lấy danh sách tất cả người dùng
 * @returns {Promise<Array>} Mảng chứa thông tin người dùng
 * 
 * Được sử dụng trong:
 * - Trang quản lý users
 * - Login để kiểm tra thông tin đăng nhập
 * 
 * Response data format:
 * [
 *   {
 *     id: string,
 *     username: string,
 *     fullName: string,
 *     role: "admin" | "user",
 *     status: "active" | "blocked",
 *     avatar: string
 *   }
 * ]
 */
export const getUsers = async () => {
  const response = await API.get('/users');
  return response.data;
};

/**
 * updateUser - Cập nhật thông tin người dùng
 * @param {string} id - ID của user cần cập nhật
 * @param {Object} updatedData - Dữ liệu cần cập nhật
 * @returns {Promise<Object>} Thông tin user sau khi cập nhật
 * 
 * Được sử dụng để:
 * - Cập nhật trạng thái (block/unblock)
 * - Cập nhật thông tin cá nhân
 * 
 * updatedData format:
 * {
 *   status?: "active" | "blocked",
 *   fullName?: string,
 *   avatar?: string
 * }
 */
export const updateUser = async (id, updatedData) => {
  const response = await API.put(`/users/${id}`, updatedData);
  return response.data;
};

/**
 * ===== PAYMENT APIs =====
 * Nhóm các API liên quan đến quản lý thanh toán (CRUD operations)
 */

/**
 * getPaymentsByUser - Lấy danh sách payments của một user cụ thể
 * @param {string} userId - ID của user cần lấy payments
 * @returns {Promise<Array>} Mảng các payment của user
 * 
 * Sử dụng trong Dashboard để hiển thị payments của user đăng nhập
 */
export const getPaymentsByUser = async (userId) => {
  const response = await API.get(`/payments?userId=${userId}`);
  return response.data;
};

/**
 * getAllPayments - Lấy toàn bộ payments trong hệ thống
 * @returns {Promise<Array>} Mảng tất cả payments
 * 
 * Sử dụng cho admin để xem tất cả payments của mọi user
 */
export const getAllPayments = async () => {
  const response = await API.get('/payments');
  return response.data;
};

/**
 * getPaymentById - Lấy chi tiết một payment
 * @param {string} id - ID của payment cần xem
 * @returns {Promise<Object>} Chi tiết payment
 * 
 * Sử dụng trong:
 * - Trang xem chi tiết payment
 * - Lấy dữ liệu để edit payment
 */
export const getPaymentById = async (id) => {
  const response = await API.get(`/payments/${id}`);
  return response.data;
};

/**
 * createPayment - Tạo payment mới
 * @param {Object} paymentData - Thông tin payment cần tạo
 * @returns {Promise<Object>} Payment đã được tạo (có id)
 * 
 * paymentData format:
 * {
 *   userId: string,
 *   semester: string,
 *   courseName: string,
 *   amount: number,
 *   date: string (YYYY-MM-DD)
 * }
 */
export const createPayment = async (paymentData) => {
  const response = await API.post('/payments', paymentData);
  return response.data;
};

/**
 * deletePayment - Xóa một payment
 * @param {string} id - ID của payment cần xóa
 * 
 * Lưu ý: API này không trả về dữ liệu,
 * caller cần tự cập nhật UI sau khi xóa thành công
 */
export const deletePayment = async (id) => {
  await API.delete(`/payments/${id}`);
};

/**
 * updatePayment - Cập nhật thông tin payment
 * @param {string} id - ID của payment cần cập nhật
 * @param {Object} updatedData - Dữ liệu cần cập nhật
 * @returns {Promise<Object>} Payment sau khi cập nhật
 * 
 * updatedData có thể chứa một số hoặc tất cả các trường:
 * {
 *   semester?: string,
 *   courseName?: string,
 *   amount?: number,
 *   date?: string
 * }
 */
export const updatePayment = async (id, updatedData) => {
  const response = await API.put(`/payments/${id}`, updatedData);
  return response.data;
};