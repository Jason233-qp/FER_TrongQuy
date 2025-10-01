// src/components/Navbar.jsx
export default function Navbar() {
  return (
    <div className="container">
      {/* NAV TABS */}
      <ul className="nav nav-tabs mb-4">
        <li className="nav-item">
          <button className="nav-link active" data-bs-toggle="tab">Active</button>
        </li>
        <li className="nav-item">
          <button className="nav-link" data-bs-toggle="tab">Link</button>
        </li>
        <li className="nav-item">
          <button className="nav-link" data-bs-toggle="tab">Link</button>
        </li>
        <li className="nav-item">
          <button className="nav-link disabled" disabled>Disabled</button>
        </li>
      </ul>

      {/* GRID XÁM */}
      <div className="px-sm-4 mx-auto" style={{ width: "88%" }}>
        {/* Hàng 1: 2 cột */}
        <div className="row g-0">
          <div className="col-12 col-md-6">
            <div style={cellStyle}>First col</div>
          </div>
          <div className="col-12 col-md-6">
            <div style={cellStyle}>Second col</div>
          </div>
        </div>

        {/* Hàng 2: 3 cột */}
        <div className="row g-0">
          <div className="col-12 col-md-4"><div style={cellStyle}>col</div></div>
          <div className="col-12 col-md-4"><div style={cellStyle}>col</div></div>
          <div className="col-12 col-md-4"><div style={cellStyle}>col</div></div>
        </div>

        {/* Hàng 3: 4 cột */}
        <div className="row g-0">
          <div className="col-12 col-md-3"><div style={cellStyle}>col</div></div>
          <div className="col-12 col-md-3"><div style={cellStyle}>col</div></div>
          <div className="col-12 col-md-3"><div style={cellStyle}>col</div></div>
          <div className="col-12 col-md-3"><div style={cellStyle}>col</div></div>
        </div>
      </div>

      {/* FOOTER BANNER */}
      <div className="mt-4 px-sm-4">
        <div style={footerStyle} className="rounded-1">Created by ABC!</div>
      </div>
    </div>
  );
}

const cellStyle = {
  background: '#d9d9d9',
  border: '1px solid #bbb',
  minHeight: '60px',
  padding: '8px',
  textAlign: 'left',
  verticalAlign: 'top',
};

const footerStyle = {
  background: '#d6c6c6',
  border: '1px solid #bdaaaa',
  fontWeight: 700,
  fontSize: '2rem',
  textAlign: 'center',
  padding: '.4rem 0'
};
