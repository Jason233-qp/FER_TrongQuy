// src/components/Banner.jsx
export default function Banner() {
  return (
    <header className="bg-brand-orange py-4 border mt-3">
      <div className="container text-center">
        <img
          src="/fpt-logo.png"
          alt="FPT University"
          className="img-fluid mx-auto d-block mb-3"
          style={{ maxWidth: '480px' }}
        />

        <nav aria-label="secondary">
          <ul className="nav justify-content-center small">
            <li className="nav-item"><a className="nav-link link-light px-2" href="#home">Home</a></li>
            <li className="nav-item"><a className="nav-link link-light px-2" href="#about">About</a></li>
            <li className="nav-item"><a className="nav-link link-light px-2" href="#contact">Contact</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}