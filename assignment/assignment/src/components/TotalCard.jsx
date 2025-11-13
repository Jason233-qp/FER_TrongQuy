import React from 'react';
import { Card } from 'react-bootstrap';
import { useExpenses } from '../contexts/ExpenseContext';

const TotalCard = () => {
  const { state } = useExpenses();

  // Tính tổng từ danh sách đã lọc.
  // QUAN TRỌNG: Đảm bảo item.amount được chuyển đổi thành số bằng Number()
  // để tránh việc nối chuỗi (string concatenation).
  const totalFiltered = state.filteredExpenses.reduce((sum, item) => {
    // Thêm kiểm tra an toàn: chỉ cộng nếu item.amount là giá trị hợp lệ
    const amount = Number(item.amount);
    return sum + (isNaN(amount) ? 0 : amount);
  }, 0);

  return (
    <Card className="mb-4 shadow-sm text-center bg-light border-0">
      <Card.Body>
        <h6 className="text-muted fw-semibold">Total of Expenses</h6>
        <h2 className="text-primary fw-bold">
          {/* Định dạng số tiền theo chuẩn Việt Nam */}
          {totalFiltered.toLocaleString('vi-VN')} ₫
        </h2>
      </Card.Body>
    </Card>
  );
};

export default TotalCard;