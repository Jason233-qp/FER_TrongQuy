// src/contexts/AuthContext.jsx
import React, { createContext, useReducer, useContext, useCallback, useEffect } from 'react';
import movieApi from '../api/movieAPI'; // Axios instance (kết nối json-server)

// 🎯 Trạng thái ban đầu
const initialAuthState = {
  user: JSON.parse(localStorage.getItem('user')) || null, // Khôi phục từ localStorage
  loading: false,
  error: null,
};

// ⚙️ Reducer
function authReducer(state, action) {
  switch (action.type) {
    case 'LOGIN_START':
      return { ...state, loading: true, error: null };

    case 'LOGIN_SUCCESS':
      return { ...state, loading: false, user: action.payload, error: null };

    case 'LOGIN_ERROR':
      return { ...state, loading: false, error: action.payload };

    case 'LOGOUT':
      return { ...state, user: null, error: null };

    default:
      return state;
  }
}

// 🧩 Contexts
const AuthStateContext = createContext(initialAuthState);
const AuthDispatchContext = createContext(null);

// 🪄 Hooks tiện dụng
export const useAuthState = () => useContext(AuthStateContext);
export const useAuthDispatch = () => useContext(AuthDispatchContext);

// 🧠 Provider chính
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialAuthState);

  // 🔐 Xử lý đăng nhập
  const login = useCallback(async (username, password) => {
    dispatch({ type: 'LOGIN_START' });
    try {
      const res = await movieApi.get('/users');
      const foundUser = res.data.find(
        (u) => u.username === username && u.password === password
      );

      if (foundUser) {
        localStorage.setItem('user', JSON.stringify(foundUser)); // Lưu user
        dispatch({ type: 'LOGIN_SUCCESS', payload: foundUser });
        return { success: true, user: foundUser };
      } else {
        dispatch({
          type: 'LOGIN_ERROR',
          payload: 'Sai tên đăng nhập hoặc mật khẩu!',
        });
        return { success: false, message: 'Sai tên đăng nhập hoặc mật khẩu!' };
      }
    } catch (err) {
      dispatch({
        type: 'LOGIN_ERROR',
        payload: 'Không thể kết nối đến server!',
      });
      return { success: false, message: 'Không thể kết nối đến server!' };
    }
  }, []);

  // 🚪 Đăng xuất
  const logout = useCallback(() => {
    localStorage.removeItem('user'); // Xoá user khỏi localStorage
    dispatch({ type: 'LOGOUT' });
  }, []);

  // 🧩 Tự động đồng bộ user nếu reload trang
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      dispatch({ type: 'LOGIN_SUCCESS', payload: JSON.parse(storedUser) });
    }
  }, []);

  // 🧭 Giá trị cung cấp cho Context
  const valueDispatch = { login, logout, dispatch };

  return (
    <AuthStateContext.Provider value={state}>
      <AuthDispatchContext.Provider value={valueDispatch}>
        {children}
      </AuthDispatchContext.Provider>
    </AuthStateContext.Provider>
  );
};
