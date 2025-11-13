/**
 * App.js
 * Entry point của React app. File này chịu trách nhiệm:
 * - Import CSS toàn cục (App.css, Bootstrap)
 * - Bọc ứng dụng bằng các Context providers ở cấp cao nhất (hiện tại là AuthProvider)
 * - Render hệ thống route thông qua `AppRoutes` để tách biệt phần cấu hình route khỏi App root
 *
 * Nguyên tắc:
 * - Không đặt logic side-effect nặng ở đây; App chỉ là trình bọc (wrapper) cho providers + routes
 * - Đảm bảo provider được đặt cao nhất để mọi component con có thể truy cập context
 */
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AuthProvider } from './contexts/AuthContext';
import AppRoutes from './routes/AppRoutes';

/**
 * App - Component root của ứng dụng
 *
 * Cấu trúc:
 * <AuthProvider>
 *   <div className="App">
 *     <AppRoutes />
 *   </div>
 * </AuthProvider>
 *
 * - `AuthProvider` cung cấp thông tin xác thực (user, login/logout) cho toàn app.
 * - `AppRoutes` tách phần cấu hình routing (public/private routes) ra file riêng.
 *
 * Lưu ý về test/dev:
 * - Khi chạy trên môi trường dev, đảm bảo backend (json-server) đang chạy nếu các routes cần gọi API.
 */
function App() {
  return (
    // AuthProvider được đặt ở cấp cao nhất để mọi component con (navigation, pages...) có thể
    // truy cập thông tin user và các hàm liên quan đến authentication.
    <AuthProvider>
      <div className="App">
        {/* AppRoutes chứa toàn bộ route definitions, giúp App.js giữ gọn và dễ đọc */}
        <AppRoutes />
      </div>
    </AuthProvider>
  );
}

export default App;