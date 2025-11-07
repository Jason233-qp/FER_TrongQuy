import React, { useEffect, useState } from 'react';
import { Container, Modal, Button } from 'react-bootstrap';
import NavigationHeader from '../components/NavigationHeader';
import UserFilter from '../components/UserFilter';
import UserTable from '../components/UserTable';
import * as api from '../services/api';
import { useAuth } from '../contexts/AuthContext';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null); // Modal chi tiết
  const [showDetailModal, setShowDetailModal] = useState(false);

  const [confirmUser, setConfirmUser] = useState(null); // Modal xác nhận
  const [confirmAction, setConfirmAction] = useState(null); // 'ban' hoặc 'unblock'
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const auth = useAuth();

  useEffect(() => {
    const fetchUsers = async () => {
      const data = await api.getUsers();
      setUsers(data);
      setFiltered(data);
    };
    fetchUsers();
  }, []);

  const handleFilter = ({ keyword, role, status }) => {
    let result = [...users];
    if (keyword) {
      const lower = keyword.toLowerCase();
      result = result.filter(
        (u) =>
          u.username.toLowerCase().includes(lower) ||
          u.fullName.toLowerCase().includes(lower)
      );
    }
    if (role) result = result.filter((u) => u.role === role);
    if (status) result = result.filter((u) => u.status === status);
    setFiltered(result);
  };

  const handleView = (user) => {
    setSelectedUser(user);
    setShowDetailModal(true);
  };

  const handleCloseDetailModal = () => {
    setShowDetailModal(false);
    setSelectedUser(null);
  };

  const onConfirmBan = (user) => {
    setConfirmUser(user);
    setConfirmAction('ban');
    setShowConfirmModal(true);
  };

  const onConfirmUnblock = (user) => {
    setConfirmUser(user);
    setConfirmAction('unblock');
    setShowConfirmModal(true);
  };

  const handleConfirmAction = async () => {
    if (!confirmUser) return;
    // Ngăn admin tự khóa/mở khóa chính mình (phòng trường hợp UI vẫn hiển thị nút ở nơi khác)
    const currentUserId = auth && auth.user ? auth.user.id : null;
    if (confirmUser.id === currentUserId) {
      // Thông báo và đóng modal
      window.alert('Bạn không thể thực hiện hành động này trên chính tài khoản của mình.');
      setShowConfirmModal(false);
      setConfirmUser(null);
      setConfirmAction(null);
      return;
    }

    const updated = {
      ...confirmUser,
      status: confirmAction === 'ban' ? 'blocked' : 'active',
    };

    await api.updateUser(confirmUser.id, updated);
    const newList = users.map((u) => (u.id === confirmUser.id ? updated : u));
    setUsers(newList);
    setFiltered(newList);
    setShowConfirmModal(false);
    setConfirmUser(null);
    setConfirmAction(null);
  };

  return (
    <>
      <NavigationHeader />
      <Container className="mt-4">
        <h3 className="mb-4 text-center">Quản lý người dùng</h3>
        <UserFilter onFilter={handleFilter} />
        <UserTable
          users={filtered}
          onView={handleView}
          onConfirmBan={onConfirmBan}
          onConfirmUnblock={onConfirmUnblock}
          currentUserId={auth && auth.user ? auth.user.id : null}
        />
      </Container>

      {/* ✅ Modal chi tiết người dùng */}
      <Modal show={showDetailModal} onHide={handleCloseDetailModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Thông tin người dùng</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedUser ? (
            <div>
              <p><strong>ID:</strong> {selectedUser.id}</p>
              <p><strong>Username:</strong> {selectedUser.username}</p>
              <p><strong>Full Name:</strong> {selectedUser.fullName}</p>
              <p><strong>Role:</strong> {selectedUser.role}</p>
              <p><strong>Status:</strong> {selectedUser.status}</p>
              <p><strong>Avatar:</strong></p>
              <img
                src={process.env.PUBLIC_URL + selectedUser.avatar}
                alt={selectedUser.username}
                width={80}
                height={80}
                style={{ borderRadius: '50%' }}
              />
            </div>
          ) : (
            <p>Không có dữ liệu người dùng.</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDetailModal}>
            Đóng
          </Button>
        </Modal.Footer>
      </Modal>

      {/* ✅ Modal xác nhận hành động */}
      <Modal show={showConfirmModal} onHide={() => setShowConfirmModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Xác nhận hành động</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {confirmUser && (
            <p>
              Bạn có chắc muốn{' '}
              <strong>{confirmAction === 'ban' ? 'khóa' : 'mở khóa'}</strong> tài khoản{' '}
              <strong>{confirmUser.username}</strong> không?
            </p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowConfirmModal(false)}>
            Hủy
          </Button>
          <Button
            variant={confirmAction === 'ban' ? 'danger' : 'success'}
            onClick={handleConfirmAction}
          >
            Xác nhận
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default UserList;