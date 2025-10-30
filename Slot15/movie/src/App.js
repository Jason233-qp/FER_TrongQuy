import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MovieManager from './pages/MovieManager';
import LoginForm from './components/LoginForm';
import Header from './components/Header';
import { AuthProvider, useAuthState } from './contexts/AuthContext';
import { MovieProvider } from './contexts/MovieContext';

function PrivateRoute({ children }) {
  const { user } = useAuthState();
  return user ? children : <Navigate to="/login" />;
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<LoginForm />} />
          <Route
            path="/movies"
            element={
              <PrivateRoute>
                <>
                  <Header />
                  <MovieProvider>
                    <MovieManager />
                  </MovieProvider>
                </>
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
