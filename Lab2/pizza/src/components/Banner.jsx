// src/components/Banner.jsx
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import '../App.css';

export default function Banner() {
  return (
    <div className="banner-section">
      {/* NAVIGATION BAR */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-5 sticky-top shadow">
        <a className="navbar-brand" href="#">Pizza House</a>
        <ul className="navbar-nav mx-auto">
          <li className="nav-item"><a className="nav-link active" href="#">Home</a></li>
          <li className="nav-item"><a className="nav-link" href="#">About Us</a></li>
          <li className="nav-item"><a className="nav-link" href="#">Contact</a></li>
        </ul>
        <form className="d-flex">
          <input
            type="search"
            className="form-control border-end-0 rounded-start"
            placeholder="Search"
          />
          <button
            type="submit"
            className="btn btn-danger border-start-0 rounded-end"
          >
            🔍
          </button>
        </form>
      </nav>

      {/* BANNER IMAGE + TEXT */}
      <div className="banner">
        <img
          src="/assets/Neapolitan-Pizza.webp"
          alt="Neapolitan Pizza"
          className="banner-img"
        />
        <div className="banner-text">
          <h2>Neapolitan Pizza</h2>
          <p>If you are looking for a traditional Italian pizza, the Neapolitan is the best option!</p>
        </div>
      </div>
    </div>
  );
}