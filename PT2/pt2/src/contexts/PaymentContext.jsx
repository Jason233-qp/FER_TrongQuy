/**
 * PaymentContext - Quản lý state toàn cục cho các thông tin thanh toán
 * 
 * Context này cung cấp:
 * - Danh sách tất cả payments và payments đã được lọc
 * - State loading và error
 * - Các filter và chức năng sort
 * - Tổng số tiền của các payments đang hiển thị
 */
import React, { createContext, useContext, useReducer, useEffect } from 'react';
import * as api from '../services/api';

const PaymentContext = createContext();

/**
 * Initial state cho PaymentContext
 * @typedef {Object} PaymentState
 * @property {Array} payments - Mảng tất cả payments gốc
 * @property {Array} filteredPayments - Mảng payments sau khi lọc/sắp xếp
 * @property {number} totalAmount - Tổng số tiền của các payments đang hiển thị
 * @property {boolean} loading - Trạng thái loading khi fetch data
 * @property {string|null} error - Message lỗi nếu có
 * @property {Object} filter - Các tiêu chí lọc/sắp xếp hiện tại
 */
const initialState = {
  payments: [],
  filteredPayments: [],
  totalAmount: 0,
  loading: false,
  error: null,
  filter: { semester: '', course: '', search: '', sort: '' },
};

/**
 * Reducer function xử lý các actions liên quan đến payments
 * @param {PaymentState} state - State hiện tại
 * @param {Object} action - Action object với type và payload
 */
const paymentReducer = (state, action) => {
  switch (action.type) {
    // Bắt đầu fetch data
    case 'FETCH_START':
      return { ...state, loading: true, error: null };

    // Fetch data thành công
    case 'FETCH_SUCCESS':
      return {
        ...state,
        loading: false,
        payments: action.payload,
        filteredPayments: action.payload,
        totalAmount: action.payload.reduce((t, p) => t + p.amount, 0),
      };

    // Fetch data thất bại
    case 'FETCH_ERROR':
      return { ...state, loading: false, error: action.payload };

    // Cập nhật các tiêu chí lọc
    case 'SET_FILTER':
      return { ...state, filter: { ...state.filter, ...action.payload } };

    // Áp dụng bộ lọc vào danh sách payments
    case 'APPLY_FILTER':
      const { semester, course, search, sort } = state.filter;
      let filtered = [...state.payments];

      // Lọc theo kỳ học
      if (semester) filtered = filtered.filter(p => p.semester === semester);
      
      // Lọc theo tên khóa học
      if (course) filtered = filtered.filter(p => p.courseName === course);
      
      // Tìm kiếm theo tên khóa học hoặc kỳ học
      if (search)
        filtered = filtered.filter(p =>
          p.courseName.toLowerCase().includes(search.toLowerCase()) ||
          p.semester.toLowerCase().includes(search.toLowerCase())
        );

      // Sắp xếp theo các tiêu chí
      if (sort) {
        switch (sort) {
          case 'course_asc': // Tên khóa học tăng dần
            filtered.sort((a, b) => a.courseName.localeCompare(b.courseName));
            break;
          case 'course_desc': // Tên khóa học giảm dần
            filtered.sort((a, b) => b.courseName.localeCompare(a.courseName));
            break;
          case 'date_asc': // Ngày thanh toán cũ nhất trước
            filtered.sort((a, b) => new Date(a.date) - new Date(b.date));
            break;
          case 'date_desc': // Ngày thanh toán mới nhất trước
            filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
            break;
          case 'amount_asc': // Số tiền tăng dần
            filtered.sort((a, b) => a.amount - b.amount);
            break;
          case 'amount_desc': // Số tiền giảm dần
            filtered.sort((a, b) => b.amount - a.amount);
            break;
          default:
            break;
        }
      }

      // Cập nhật danh sách đã lọc và tổng tiền
      return {
        ...state,
        filteredPayments: filtered,
        totalAmount: filtered.reduce((t, p) => t + p.amount, 0),
      };

    // Xóa một payment khỏi danh sách
    case 'DELETE_PAYMENT':
      const updated = state.payments.filter(p => p.id !== action.payload);
      return {
        ...state,
        payments: updated,
        filteredPayments: updated,
        totalAmount: updated.reduce((t, p) => t + p.amount, 0),
      };

    default:
      return state;
  }
};

/**
 * PaymentProvider - Component cung cấp PaymentContext cho cây component
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Các components con
 * 
 * Component này:
 * 1. Khởi tạo state quản lý payments với useReducer
 * 2. Tự động fetch danh sách payments khi mount
 * 3. Cung cấp state và dispatch function qua context
 */
export const PaymentProvider = ({ children }) => {
  const [state, dispatch] = useReducer(paymentReducer, initialState);

  // Fetch danh sách payments khi component mount
  useEffect(() => {
    const fetchPayments = async () => {
      dispatch({ type: 'FETCH_START' });
      try {
        // Lấy tất cả payments không phân biệt userId vì đây là view của admin
        const data = await api.getAllPayments();
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (error) {
        dispatch({ type: 'FETCH_ERROR', payload: error.message });
      }
    };
    fetchPayments();
  }, []); // Empty deps => chỉ chạy một lần khi mount

  return (
    <PaymentContext.Provider value={{ state, dispatch }}>
      {children}
    </PaymentContext.Provider>
  );
};

/**
 * usePayments - Custom hook để truy cập PaymentContext
 * @returns {Object} Context object chứa state và dispatch function
 * @property {PaymentState} state - State hiện tại của payments
 * @property {Function} dispatch - Function để dispatch actions
 * 
 * Sử dụng:
 * const { state, dispatch } = usePayments();
 * const { payments, loading, error } = state;
 */
export const usePayments = () => useContext(PaymentContext);