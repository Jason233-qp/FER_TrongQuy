import React from 'react';
import { useAuthState, useAuthDispatch } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const { user } = useAuthState();
  const { logout } = useAuthDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '1rem 2rem',
        backgroundColor: '#f8f9fa',
        borderBottom: '1px solid #ddd',
      }}
    >
      <h4>🎬 Quản lý Phim</h4>
      <div>
        {user ? (
          <>
            <span>Xin chào, <strong>{user.username}</strong> 👋</span>
            <button
              onClick={handleLogout}
              className="btn btn-danger btn-sm ms-2"
            >
              Đăng xuất
            </button>
          </>
        ) : (
          <span>Chưa đăng nhập</span>
        )}
      </div>
    </header>
  );
};

export default Header;
