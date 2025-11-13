import React, { createContext, useContext, useReducer } from 'react';
import * as api from '../services/api';

/**
 * AuthContext.jsx
 * Context để quản lý trạng thái xác thực (authentication) trong toàn bộ ứng dụng.
 * Cung cấp:
 * - Trạng thái đăng nhập (isAuthenticated)
 * - Thông tin user hiện tại
 * - Loading state khi đang xử lý
 * - Thông báo lỗi nếu có
 * - Các hàm login/logout để components con có thể sử dụng
 */

const AuthContext = createContext();

/**
 * initialAuthState - Trạng thái khởi tạo của auth context
 * @property {boolean} isAuthenticated - true nếu user đã đăng nhập
 * @property {Object|null} user - thông tin user hiện tại hoặc null
 * @property {boolean} isLoading - true khi đang xử lý login/logout
 * @property {string|null} error - thông báo lỗi hoặc null
 */
const initialAuthState = {
  isAuthenticated: false,
  user: null,
  isLoading: false,
  error: null,
};

/**
 * authReducer - Reducer để quản lý trạng thái auth
 * @param {Object} state - Trạng thái hiện tại
 * @param {Object} action - Action được dispatch
 * 
 * Các actions được hỗ trợ:
 * - LOGIN_START: bắt đầu quá trình login (set loading=true)
 * - LOGIN_SUCCESS: lưu thông tin user và set authenticated=true
 * - LOGIN_FAILURE: lưu thông báo lỗi
 * - LOGOUT: xóa thông tin user và reset về trạng thái ban đầu
 * - CLEAR_ERROR: xóa thông báo lỗi
 */
const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN_START':
      return { ...state, isLoading: true, error: null };
    case 'LOGIN_SUCCESS':
      // Lưu user vào localStorage để duy trì session sau khi refresh
      localStorage.setItem('user', JSON.stringify(action.payload));
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
        user: action.payload,
        error: null,
      };
    case 'LOGIN_FAILURE':
      return { ...state, isLoading: false, error: action.payload };
    case 'LOGOUT':
      // Xóa user khỏi localStorage khi logout
      localStorage.removeItem('user');
      return { ...initialAuthState };
    case 'CLEAR_ERROR':
      return { ...state, error: null };
    default:
      return state;
  }
};

/**
 * AuthProvider Component
 * Cung cấp context authentication cho toàn bộ ứng dụng
 * @param {Object} props
 * @param {React.ReactNode} props.children - Các components con sẽ có quyền truy cập vào context
 */
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialAuthState);

  /**
   * clearError
   * Reset thông báo lỗi về null
   * Được gọi khi:
   * - User bắt đầu nhập lại sau khi gặp lỗi
   * - Cần xóa thông báo lỗi cũ
   */
  const clearError = () => {
    dispatch({ type: 'CLEAR_ERROR' });
  };

  /**
   * login - Xử lý đăng nhập người dùng
   * @param {Object} credentials - Thông tin đăng nhập
   * @param {string} credentials.usernameOrEmail - Username hoặc email
   * @param {string} credentials.password - Mật khẩu
   * @returns {Promise<Object>} Kết quả đăng nhập
   * 
   * Luồng xử lý:
   * 1. Set loading=true
   * 2. Gọi API lấy danh sách users
   * 3. Tìm user khớp với thông tin đăng nhập
   * 4. Kiểm tra role=admin và status=active
   * 5. Nếu OK: lưu user vào state+localStorage
   * 6. Nếu lỗi: set error message tương ứng
   */
  const login = async ({ usernameOrEmail, password }) => {
    dispatch({ type: 'LOGIN_START' });

    try {
      const accounts = await api.getUsers();

      // Tìm user khớp username/email và password
      const user = accounts.find(
        (acc) =>
          (acc.username === usernameOrEmail ||
            (acc.email && acc.email === usernameOrEmail)) &&
          acc.password === password
      );

      if (user) {
        // Kiểm tra quyền truy cập: chỉ admin và status=active được phép
        if (user.role !== 'admin' || user.status !== 'active') {
          const errorMessage = 'Tài khoản bị khoá hoặc không có quyền truy cập.';
          dispatch({ type: 'LOGIN_FAILURE', payload: errorMessage });
          return { success: false, error: errorMessage };
        }

        // Đăng nhập thành công
        dispatch({ type: 'LOGIN_SUCCESS', payload: user });
        return { success: true, user };
      } else {
        // Không tìm thấy user hoặc sai mật khẩu
        const errorMessage = 'Sai tên đăng nhập hoặc mật khẩu.';
        dispatch({ type: 'LOGIN_FAILURE', payload: errorMessage });
        return { success: false, error: errorMessage };
      }
    } catch (error) {
      // Lỗi khi gọi API
      const errorMessage = error.message || 'Lỗi mạng khi đăng nhập.';
      dispatch({ type: 'LOGIN_FAILURE', payload: errorMessage });
      return { success: false, error: errorMessage };
    }
  };

  /**
   * logout - Đăng xuất người dùng
   * - Xóa thông tin user khỏi state
   * - Xóa user khỏi localStorage
   * - Reset về trạng thái ban đầu
   */
  const logout = () => {
    dispatch({ type: 'LOGOUT' });
  };

  // Tạo object chứa các giá trị và functions sẽ được chia sẻ qua context
  const contextValue = {
    isAuthenticated: state.isAuthenticated,
    user: state.user,
    loading: state.isLoading,
    error: state.error,
    login,
    logout,
    clearError,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

/**
 * useAuth - Custom hook để truy cập AuthContext
 * @returns {Object} Các giá trị và functions từ AuthContext
 * 
 * Cách dùng trong components:
 * ```jsx
 * const { user, login, logout, error } = useAuth();
 * ```
 * 
 * Giá trị trả về:
 * - isAuthenticated: boolean - trạng thái đăng nhập
 * - user: Object|null - thông tin user hiện tại
 * - loading: boolean - trạng thái đang xử lý
 * - error: string|null - thông báo lỗi nếu có
 * - login: Function - hàm đăng nhập
 * - logout: Function - hàm đăng xuất
 * - clearError: Function - hàm xóa lỗi
 */
export const useAuth = () => useContext(AuthContext);