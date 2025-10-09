import React from 'react';
import '../App.css';

function Banner() {
  return (
    <section className="banner">
      {/* Thanh điều hướng nằm trong banner */}
      <div className="banner-nav">
        <div className="banner-left">
          <img
            src={`${process.env.PUBLIC_URL}/fpt-logo.png`}
            alt="FPT Logo"
            className="banner-logo"
          />
        </div>

        <ul className="banner-menu">
          <li>Trang chủ</li>
          <li>Ngành học</li>
          <li>Tuyển sinh</li>
          <li>Sinh viên</li>
        </ul>

        <div className="banner-search">
          <label htmlFor="search">Search:</label>
          <input type="text" id="search" placeholder="Tìm kiếm..." />
        </div>
      </div>

      {/* Ảnh sinh viên */}
      <div className="banner-image">
        <img
          src={`${process.env.PUBLIC_URL}/anh-sinh-vien.png`}
          alt="Sinh viên FPT"
        />
      </div>
    </section>
  );
}

export default Banner;