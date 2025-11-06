import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AuthProvider } from './contexts/AuthContext';
import AppRoutes from './routes/AppRoutes';

function App() {
  return (
    <AuthProvider>
      {/* Đặt AuthProvider ở cấp cao nhất để cung cấp Context cho toàn bộ ứng dụng */}
      <div className="App">
        {/* Sử dụng AppRoutes để quản lý các route trong ứng dụng */}
        <AppRoutes />
      </div>
    </AuthProvider>
  );
}

export default App;