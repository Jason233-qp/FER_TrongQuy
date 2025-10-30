// src/components/FilterBar.jsx
import React, { useState, useEffect, useMemo } from 'react';

const FilterBar = ({ onFilterChange, movies = [] }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [genre, setGenre] = useState('');
  const [duration, setDuration] = useState('');
  const [sortOrder, setSortOrder] = useState('');

  // 👉 Dùng useMemo để tránh tính lại genres khi không cần
  const uniqueGenres = useMemo(() => {
    if (!Array.isArray(movies)) return [];
    return [...new Set(movies.map((m) => m.genre).filter(Boolean))];
  }, [movies]);

  // 🔄 Gọi callback mỗi khi filter thay đổi
  useEffect(() => {
    onFilterChange({
      searchTerm,
      genre,
      duration,
      sortOrder,
    });
  }, [searchTerm, genre, duration, sortOrder, onFilterChange]);

  return (
    <div className="p-3 bg-light rounded shadow-sm mb-4">
      <h5 className="mb-3">🎬 Bộ lọc phim</h5>

      <div className="row g-3">
        {/* 🔍 Tìm kiếm */}
        <div className="col-md-3">
          <input
            type="text"
            className="form-control"
            placeholder="Tìm theo tên phim..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* 🎭 Lọc theo thể loại */}
        <div className="col-md-3">
          <select
            className="form-select"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
          >
            <option value="">Tất cả thể loại</option>
            {uniqueGenres.length > 0 ? (
              uniqueGenres.map((g, i) => (
                <option key={i} value={g}>
                  {g}
                </option>
              ))
            ) : (
              <option disabled>Không có thể loại</option>
            )}
          </select>
        </div>

        {/* ⏱️ Lọc theo thời lượng */}
        <div className="col-md-3">
          <select
            className="form-select"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
          >
            <option value="">Tất cả thời lượng</option>
            <option value="short">Dưới 90 phút</option>
            <option value="medium">90 - 120 phút</option>
            <option value="long">Trên 120 phút</option>
          </select>
        </div>

        {/* ↕️ Sắp xếp */}
        <div className="col-md-3">
          <select
            className="form-select"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="">Không sắp xếp</option>
            <option value="asc">Tên A → Z</option>
            <option value="desc">Tên Z → A</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
