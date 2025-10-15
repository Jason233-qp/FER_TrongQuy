import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';

function SearchAccount() {
  // Mỗi useState đại diện cho 1 account riêng biệt
  const [john_doe] = useState({
    id: 1,
    username: 'john_doe',
    password: '123456',
    avatar: 'https://i.pravatar.cc/100?img=1',
  });

  const [mary_smith] = useState({
    id: 2,
    username: 'mary_smith',
    password: 'abcdef',
    avatar: 'https://i.pravatar.cc/100?img=2',
  });

  const [alex_nguyen] = useState({
    id: 3,
    username: 'alex_nguyen',
    password: 'qwerty',
    avatar: 'https://i.pravatar.cc/100?img=3',
  });

  const [linda_phan] = useState({
    id: 4,
    username: 'linda_phan',
    password: 'letmein',
    avatar: 'https://i.pravatar.cc/100?img=4',
  });

  // Gom các user state vào 1 danh sách để tiện duyệt
  const allAccounts = [john_doe, mary_smith, alex_nguyen, linda_phan];

  // State cho ô tìm kiếm
  const [searchTerm, setSearchTerm] = useState('');

  // Lọc theo username
  const filteredAccounts = allAccounts.filter((acc) =>
    acc.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div
      style={{
        maxWidth: '700px',
        margin: '40px auto',
        padding: '24px',
        borderRadius: '12px',
        boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
        background: '#f7fafd',
      }}
    >
      <h3 style={{ textAlign: 'center', color: '#1976d2', marginBottom: 24 }}>
        🔍 Tìm kiếm Account theo Username
      </h3>

      {/* Ô nhập tìm kiếm */}
      <Form.Control
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Nhập username cần tìm..."
        style={{
          marginBottom: 24,
          padding: '10px 14px',
          borderRadius: '8px',
          border: '1.5px solid #90caf9',
          fontSize: 16,
        }}
      />

      {/* Danh sách kết quả */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
          gap: '16px',
        }}
      >
        {filteredAccounts.length > 0 ? (
          filteredAccounts.map((account) => (
            <Card
              key={account.id}
              style={{
                borderRadius: '10px',
                boxShadow: '0 1px 6px rgba(33,150,243,0.1)',
                textAlign: 'center',
                padding: '16px',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.04)';
                e.currentTarget.style.boxShadow =
                  '0 4px 12px rgba(33,150,243,0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow =
                  '0 1px 6px rgba(33,150,243,0.1)';
              }}
            >
              <Card.Img
                variant="top"
                src={account.avatar}
                alt={account.username}
                style={{
                  width: '100px',
                  height: '100px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  margin: '0 auto 10px',
                }}
              />
              <Card.Body>
                <Card.Title style={{ color: '#1976d2', fontWeight: 'bold' }}>
                  {account.username}
                </Card.Title>
                <Card.Text>
                  <strong>Password:</strong> {account.password}
                </Card.Text>
              </Card.Body>
            </Card>
          ))
        ) : (
          <p
            style={{
              gridColumn: '1 / -1',
              textAlign: 'center',
              color: '#888',
              fontSize: '16px',
            }}
          >
            Không tìm thấy kết quả
          </p>
        )}
      </div>
    </div>
  );
}

export default SearchAccount;
