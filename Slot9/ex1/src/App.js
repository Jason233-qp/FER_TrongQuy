import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

import FooterPage from './pages/FooterPage.jsx';
import HomePage from './pages/HomePage.jsx';
import AccountPage from './pages/AccountPage.jsx';

import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
        <Container fluid className="p-0">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/account" element={<AccountPage />} />
          </Routes>
          <FooterPage />
        </Container>
      </Router>
    </div>
  );
}

export default App;