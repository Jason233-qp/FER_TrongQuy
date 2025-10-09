// App.js
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import FooterPage from './pages/FooterPage.jsx';
import HomePage from './pages/HomePage.jsx';
import { Container } from 'react-bootstrap';

function App() {
  return (
    <div className="App">
      <Container fluid className="p-0">
        <HomePage />
        <FooterPage />
      </Container>
    </div>
  );
}

export default App;