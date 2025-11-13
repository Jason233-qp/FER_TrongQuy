import React, { useReducer, useState } from 'react';
import { Form, Button, Card, Container, Row, Col, Alert, Spinner } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import ConfirmModal from './ConfirmModal';
import { useNavigate } from 'react-router-dom'; // Thêm useNavigate để chuyển hướng

/**
 * LoginForm.jsx
 * Đây là component xử lý form đăng nhập cho ứng dụng.
 * Nó dùng `useReducer` để quản lý trạng thái form (giá trị các field + lỗi + trạng thái modal)
 * và `useAuth` (AuthContext) để gọi action đăng nhập thực tế.
 *
 * Mục tiêu chỉnh sửa: thêm comment chi tiết cho từng phương thức/khối logic
 * để bạn dễ đọc và hiểu cách hoạt động.
 */

// 1. Khởi tạo trạng thái ban đầu cho form

/**
 * initialFormState
 * - formData: chứa các giá trị input hiện tại của form.
 *   - identifier: có thể là username hoặc email (đầu vào do người dùng nhập)
 *   - password: mật khẩu
 * - errors: object chứa thông báo lỗi cho từng field (nếu có)
 * - showSuccessModal: boolean để điều khiển modal thông báo đăng nhập thành công
 */
const initialFormState = {
  formData: {
    identifier: '', // username hoặc email
    password: '',
  },
  errors: {},
  showSuccessModal: false,
};

// 2. Định nghĩa reducer cho form 
/**
 * formReducer
 * - Là reducer quản lý trạng thái form dùng bởi useReducer.
 * - Các action được hỗ trợ:
 *   - SET_FIELD: cập nhật giá trị một trường trong formData
 *   - SET_ERROR: gán thông báo lỗi cho một field
 *   - CLEAR_ERROR: xóa lỗi cho 1 field cụ thể
 *   - SET_ERRORS: set toàn bộ object lỗi (dùng khi validate toàn bộ form)
 *   - SHOW_SUCCESS_MODAL / HIDE_SUCCESS_MODAL: điều khiển modal thành công
 *   - RESET_FORM: reset về trạng thái ban đầu
 *
 * Lưu ý: reducer chỉ chịu trách nhiệm cập nhật state thuần túy.
 */
function formReducer(state, action) {
  switch (action.type) {
    case 'SET_FIELD':
      // Cập nhật giá trị của một field trong formData
      return {
        ...state,
        formData: {
          ...state.formData,
          [action.field]: action.value,
        },
      };

    case 'SET_ERROR':
      // Gán thông báo lỗi cho một field cụ thể
      return {
        ...state,
        errors: { ...state.errors, [action.field]: action.message },
      };

    case 'CLEAR_ERROR':
      // Xóa lỗi cho field cụ thể (không hiệu ứng tới các lỗi khác)
      const { [action.field]: removed, ...restErrors } = state.errors;
      return {
        ...state,
        errors: restErrors,
      };

    case 'SET_ERRORS':
      // Thay thế toàn bộ object lỗi (dùng sau khi validate toàn bộ form)
      return {
        ...state,
        errors: action.errors,
      };

    case 'SHOW_SUCCESS_MODAL':
      // Hiển thị modal thành công
      return {
        ...state,
        showSuccessModal: true,
      };

    case 'HIDE_SUCCESS_MODAL':
      // Ẩn modal thành công
      return {
        ...state,
        showSuccessModal: false,
      };

    case 'RESET_FORM':
      // Reset về trạng thái ban đầu
      return initialFormState;

    default:
      return state;
  }
}

function LoginForm() {
  const navigate = useNavigate(); // Sử dụng useNavigate

  // 3. Sử dụng useReducer cho form state
  const [formState, dispatch] = useReducer(formReducer, initialFormState);

  // 4. Sử dụng AuthContext (Giả định AuthContext đã cung cấp đủ các giá trị này)
  const { login, loading, error, clearError, user } = useAuth();

  // 5. Validation helpers
  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isEmail = (v) => v.includes('@');

  /**
   * isEmail helper
   * - kiểm tra nhanh xem chuỗi nhập vào chứa dấu '@' hay không
   * - lưu ý: đây chỉ là kiểm tra nhanh để phân biệt identifier là email hay username,
   *   còn kiểm tra định dạng chính xác dùng emailRe bên trên.
   */

  // 6. Xử lý thay đổi input
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Cập nhật giá trị field (SỬ DỤNG action SET_FIELD đã sửa)
    dispatch({ type: 'SET_FIELD', field: name, value });

    // Clear auth error khi user nhập (Giả định clearError tồn tại trong useAuth)
    if (error) clearError();

    // Validation real-time
    let message = '';
    if (name === 'identifier') {
      if (!value.trim()) {
        message = 'Username or Email is required.';
      } else if (isEmail(value) && !emailRe.test(value)) {
        message = 'Email is invalid format.';
      }
    }

    if (name === 'password') {
      if (!value.trim()) {
        message = 'Password is required.';
      } else if (value.length < 6) { // Thêm validation min length 6
        message = 'Password must be at least 6 characters.';
      }
    }

    if (message) {
      dispatch({ type: 'SET_ERROR', field: name, message });
    } else {
      dispatch({ type: 'CLEAR_ERROR', field: name });
    }
  };

  /**
   * handleChange
   * - Hàm được gắn vào onChange của các input form.
   * - Nhiệm vụ:
   *   1. Cập nhật giá trị input vào state.formData thông qua action SET_FIELD.
   *   2. Xóa lỗi auth chung (nếu có) khi người dùng bắt đầu nhập lại.
   *   3. Thực hiện validation real-time cho từng field và cập nhật lỗi tương ứng
   *      (SET_ERROR hoặc CLEAR_ERROR) để hiển thị feedback ngay lập tức.
   *
   * Các behavior cụ thể:
   * - identifier: kiểm tra rỗng và nếu có chứa '@' thì kiểm tra regex emailRe
   * - password: kiểm tra rỗng và tối thiểu 6 ký tự
   */

  // 7. Validation form
  const validateForm = () => {
    const errors = {};
    const { identifier, password } = formState.formData; // Lấy từ formData đã sửa

    if (!identifier.trim()) {
      errors.identifier = 'Username or Email is required.';
    } else if (isEmail(identifier) && !emailRe.test(identifier)) {
      errors.identifier = 'Email is invalid format.';
    }

    if (!password.trim()) {
     errors.password = 'Password is required.';
    } else if (password.length < 6) {
      errors.password = 'Password must be at least 6 characters.';
    }

    return errors;
  };

  /**
   * validateForm
   * - Hàm validate toàn bộ form trước khi submit.
   * - Trả về object dạng { fieldName: errorMessage }.
   * - Được gọi trong handleSubmit; nếu object trả về không rỗng thì sẽ
   *   ngăn form submit và hiển thị lỗi tương ứng.
   *
   * Edge cases:
   * - Không cho phép identifier hoặc password rỗng
   * - Nếu identifier có dạng email thì kiểm tra regex emailRe
   * - Mật khẩu phải >= 6 ký tự
   */

  // 8. Xử lý submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (error) clearError(); // Clear error trước khi submit lại

    // Validate form
    const validationErrors = validateForm();
    dispatch({ type: 'SET_ERRORS', errors: validationErrors });

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    try {
      // Gọi login từ AuthContext
      const result = await login({ // SỬA LỖI: login cần nhận object {usernameOrEmail, password}
        usernameOrEmail: formState.formData.identifier.trim(), 
        password: formState.formData.password,
      });

      // result.success là cách logic tốt hơn để kiểm tra thành công
      if (result && result.success) { 
        // Hiển thị modal thành công
        dispatch({ type: 'SHOW_SUCCESS_MODAL' });
      }
     // Lỗi sẽ được xử lý và hiển thị qua AuthContext error (như "Invalid username/email or password!"[cite: 16])
    } catch (err) {
      // Lỗi mạng hoặc lỗi không xác định
      console.error('Login error:', err);
    }
  };

  /**
   * handleSubmit
   * - Hàm xử lý gửi form khi người dùng bấm nút Login.
   * - Luồng:
   *   1. Ngăn hành vi submit mặc định của browser.
   *   2. Clear lỗi chung từ AuthContext (nếu có).
   *   3. Gọi validateForm và nếu có lỗi thì cập nhật state.errors và dừng xử lý.
   *   4. Nếu hợp lệ, gọi `login` từ AuthContext với payload { usernameOrEmail, password }.
   *   5. Dựa trên `result.success` để hiển thị modal thành công.
   *
   * Error handling:
   * - Lỗi xác thực (ví dụ sai mật khẩu) được trả/đặt bởi AuthContext và sẽ hiển thị
   *   thông qua `error` từ useAuth; ở đây chỉ log các lỗi mạng/không mong muốn.
   */
  //9. Xử lý reset form
    const handleReset = () => { 
    //1. Reset form state về ban đầu
    dispatch({ type: 'RESET_FORM' });
    //2. Xóa lỗi từ AuthContext nếu có
    if (error) clearError();
  };

  /**
   * handleReset
   * - Đặt lại toàn bộ form về trạng thái ban đầu.
   * - Gọi `clearError` của AuthContext nếu có lỗi tồn tại để đảm bảo giao diện
   *   không hiển thị lỗi cũ sau khi user nhấn Cancel.
   * - Không thực hiện chuyển trang hay gọi API nào cả.
   */

  // 10. Xử lý đóng modal thành công
  const handleCloseSuccessModal = () => {
    dispatch({ type: 'HIDE_SUCCESS_MODAL' });
    dispatch({ type: 'RESET_FORM' });
    // Chuyển hướng đến /home sau khi đóng modal[cite: 17]
    navigate('/home'); 
  };

  /**
   * handleCloseSuccessModal
   * - Được gọi khi người dùng đóng modal thông báo đăng nhập thành công.
   * - Hành động:
   *   1. Ẩn modal (HIDE_SUCCESS_MODAL)
   *   2. Reset form về trạng thái ban đầu (RESET_FORM)
   *   3. Điều hướng về trang /home
   */

  return (
    <Container className="mt-5">
      <Row className="justify-content-md-center">
        <Col xs={12} md={6}>
          <Card>
            <Card.Header>
              <h3 className="text-center mb-0">Login</h3>
            </Card.Header>
            <Card.Body>
              {/* Hiển thị lỗi từ AuthContext ("Invalid username/email or password!")*/}
              
              
              <Form onSubmit={handleSubmit} noValidate>
                {/* Identifier Field */}
                <Form.Group controlId="identifier" className="mb-3">
                  <Form.Label>Username or Email</Form.Label>
                  <Form.Control
                    type="text"
                    name="identifier"
                    value={formState.formData.identifier} // Lấy từ formData
                    onChange={handleChange}
                    isInvalid={!!formState.errors.identifier}
                    placeholder="Enter username or email"
                    disabled={loading}
                  />
                  {/* Form.Control.Feedback: Hiển thị lỗi validation */}
                  <Form.Control.Feedback type="invalid">
                    {formState.errors.identifier}
                  </Form.Control.Feedback>
                </Form.Group>

                {/* Password Field */}
                <Form.Group controlId="password" className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    value={formState.formData.password} // Lấy từ formData
                    onChange={handleChange}
                    isInvalid={!!formState.errors.password}
                    placeholder="Enter password"
                    disabled={loading}
                  />
                  {/* Form.Control.Feedback: Hiển thị lỗi validation */}
                  <Form.Control.Feedback type="invalid">
                    {formState.errors.password}
                  </Form.Control.Feedback>
                </Form.Group>

                <div style={{ display: 'flex', gap: 8 }}>
                  <Button 
                    variant="primary" 
                    type="submit" 
                    style={{ flex: 1 }}
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <Spinner size="sm" animation="border" role="status" className="me-2" />
                        Logging in...
                      </>
                    ) : (
                      'Login'
                    )}
                  </Button>
                  <Button 
                    variant="secondary" 
                    type="button" 
                    style={{ flex: 1 }}
                    onClick={handleReset}
                    disabled={loading}
                  >
                    Cancel
                  </Button>
                </div>
                
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Modal thông báo thành công, gọi ConfirmModal */}
      <ConfirmModal
        show={formState.showSuccessModal}
        title="Login Successful!"
        message={`Welcome, ${user?.username}!, login successful.`}
        onConfirm={handleCloseSuccessModal}
        onHide={handleCloseSuccessModal}
      />
    </Container>
  );
}

export default LoginForm;
