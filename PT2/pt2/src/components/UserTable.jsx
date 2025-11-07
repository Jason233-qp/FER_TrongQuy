import React from 'react';
import { Table, Button, Image } from 'react-bootstrap';

/**
 * Bảng hiển thị danh sách người dùng
 * @param {Array} users - Danh sách người dùng
 * @param {Function} onView - Hàm xử lý khi nhấn "View Details"
 * @param {Function} onConfirmBan - Hàm xử lý khi xác nhận ban tài khoản
 * @param {Function} onConfirmUnblock - Hàm xử lý khi xác nhận mở khóa tài khoản
 * @param {Number} currentUserId - ID của người đang đăng nhập (để ngăn tự ban chính mình)
 */
const UserTable = ({ users, onView, onConfirmBan, onConfirmUnblock, currentUserId }) => {
  return (
    <Table striped bordered hover responsive>
      <thead>
        <tr>
          <th>ID</th>
          <th>Avatar</th>
          <th>Username</th>
          <th>Full Name</th>
          <th>Role</th>
          <th>Status</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {users.length === 0 ? (
          // Nếu không có người dùng nào, hiển thị thông báo
          <tr>
            <td colSpan="7" className="text-center">
              Không có người dùng nào
            </td>
          </tr>
        ) : (
          // Lặp qua danh sách người dùng
          users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>

              {/* Hiển thị avatar người dùng */}
              <td className="text-center">
                <Image
                  src={process.env.PUBLIC_URL + user.avatar}
                  roundedCircle
                  width={40}
                  height={40}
                  alt={user.username}
                />
              </td>

              <td>{user.username}</td>
              <td>{user.fullName}</td>
              <td>{user.role}</td>
              <td>{user.status}</td>

              {/* Các nút hành động */}
              <td>
                {/* Nút xem chi tiết */}
                <Button
                  size="sm"
                  variant="info"
                  onClick={() => onView(user)}
                  className="me-2"
                >
                  View Details
                </Button>

                {/* Chỉ hiển thị nút ban/mở khóa nếu không phải chính mình */}
                {user.id !== currentUserId && (
                  <>
                    {/* Nếu tài khoản đang active → hiển thị nút Ban */}
                    {user.status === 'active' && (
                      <Button
                        size="sm"
                        variant="danger"
                        onClick={() => onConfirmBan(user)}
                      >
                        Ban Account
                      </Button>
                    )}

                    {/* Nếu tài khoản đang blocked → hiển thị nút Unblock */}
                    {user.status === 'blocked' && (
                      <Button
                        size="sm"
                        variant="success"
                        onClick={() => onConfirmUnblock(user)}
                      >
                        Unblock Account
                      </Button>
                    )}
                  </>
                )}
              </td>
            </tr>
          ))
        )}
      </tbody>
    </Table>
  );
};

export default UserTable;