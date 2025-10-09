import React from 'react';
import '../App.css';

const students = [
  {
    id: 'DE160182',
    name: 'Nguyễn Hữu Quốc Khanh',
    location: 'ĐàNẵng',
    image: 'nguyen-huu-quoc-khanh.png',
  },
  {
    id: 'DE160377',
    name: 'Choy Vinh Thiên',
    location: 'QuảngNam',
    image: 'choy-vinh-thien.png',
  },
  {
    id: 'DE160547',
    name: 'Đỗ Nguyễn Phúc',
    location: 'QuảngNam',
    image: 'do-nguyen-phuc.png',
  },
  {
    id: 'DE170049',
    name: 'Lê Hoàng Minh',
    location: 'ĐàNẵng',
    image: 'le-hoang-minh.png',
  },
];

function Navbar() {
  return (
    <div className="students-section">
      {/* Breadcrumb */}
      <div className="breadcrumb-bar">Home / Student</div>

      {/* Tiêu đề trang */}
      <h2 className="page-title">Students Detail</h2>

      {/* Danh sách sinh viên */}
      <div className="students-grid">
        {students.map((student) => (
          <div className="student-card" key={student.id}>
            <img
              src={`${process.env.PUBLIC_URL}/${student.image}`}
              alt={student.name}
              className="student-photo"
            />
            <p><strong>ID:</strong> {student.id}</p>
            <p><strong>Name:</strong> {student.name}</p>
            <p><strong>Location:</strong> {student.location}</p>

            <div className="attendance-options">
              <label>
                <input type="radio" name={`attendance-${student.id}`} value="Absent" />
                Absent
              </label>
              <label>
                <input type="radio" name={`attendance-${student.id}`} value="Present" />
                Present
              </label>
            </div>

            <button className="submit-button">Submit</button>
          </div>
        ))}
      </div>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <h3>Our Address</h3>
          <p>33 Xô Viết Nghệ Tĩnh, Hải Châu, TP Đà Nẵng</p>
          <p>Phone: 0236-395-8633</p>
          <p>Fax: 0236-395-8632</p>

          <div className="social-icons">
            <i className="fab fa-google-plus-g"></i>
            <i className="fab fa-facebook-f"></i>
            <i className="fab fa-linkedin-in"></i>
            <i className="fab fa-twitter"></i>
            <i className="fab fa-youtube"></i>
          </div>
        </div>
        <div className="footer-bottom">
          © Copyright 2023
        </div>
      </footer>
    </div>
  );
}

export default Navbar;