import { useReducer } from 'react';
import { Form, Button, Card, Container, Row, Col, Modal, Toast } from 'react-bootstrap';

const initialState = {
  formData: {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  },
  errors: {},
  submitted: false,
  showModal: false,
  showToast: false,
};

function validateField(name, value, formData) {
  let error = '';

  switch (name) {
    case 'username':
      if (!/^[a-zA-Z0-9._]{3,}$/.test(value.trim())) {
        error = 'Username ≥ 3 ký tự, chỉ gồm chữ, số, _ hoặc .';
      }
      break;
    case 'email':
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        error = 'Email không hợp lệ';
      }
      break;
    case 'password':
      if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/.test(value)) {
        error = 'Password ≥ 8 ký tự, gồm chữ hoa, chữ thường, số và ký tự đặc biệt';
      }
      break;
    case 'confirmPassword':
      if (value !== formData.password) {
        error = 'Confirm password không khớp';
      }
      break;
    default:
      break;
  }

  return error;
}

function reducer(state, action) {
  switch (action.type) {
    case 'CHANGE_FIELD': {
      const { name, value } = action.payload;
      const newFormData = { ...state.formData, [name]: value };
      const newErrors = {
        ...state.errors,
        [name]: validateField(name, value, newFormData),
      };

      if (name === 'password') {
        newErrors.confirmPassword = validateField(
          'confirmPassword',
          newFormData.confirmPassword,
          newFormData
        );
      }

      return {
        ...state,
        formData: newFormData,
        errors: newErrors,
      };
    }

    case 'SUBMIT_FORM': {
      const errors = {};
      Object.keys(state.formData).forEach((key) => {
        errors[key] = validateField(key, state.formData[key], state.formData);
      });

      const isValid = Object.values(errors).every((err) => !err);

      return {
        ...state,
        errors,
        submitted: true,
        showModal: isValid,
        showToast: isValid,
      };
    }

    case 'RESET_FORM':
      return { ...initialState };

    case 'CLOSE_MODAL':
      return { ...state, showModal: false };

    case 'CLOSE_TOAST':
      return { ...state, showToast: false };

    default:
      return state;
  }
}

function SignUpForm() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { formData, errors, submitted, showModal, showToast } = state;

  const isFormValid =
    formData.username &&
    formData.email &&
    formData.password &&
    formData.confirmPassword &&
    Object.values(errors).every((err) => !err);

  const handleChange = (e) => {
    dispatch({ type: 'CHANGE_FIELD', payload: { name: e.target.name, value: e.target.value } });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({ type: 'SUBMIT_FORM' });
  };

  const handleCancel = () => {
    dispatch({ type: 'RESET_FORM' });
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-md-center">
        <Col md={7}>
          <Card>
            <Card.Header>
              <h3 className="text-center">Sign Up Form</h3>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                {/* Username */}
                <Form.Group controlId="username" className="mb-3">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    isInvalid={submitted && !!errors.username}
                    placeholder="Enter username"
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.username}
                  </Form.Control.Feedback>
                </Form.Group>

                {/* Email */}
                <Form.Group controlId="email" className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    isInvalid={submitted && !!errors.email}
                    placeholder="Enter email"
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.email}
                  </Form.Control.Feedback>
                </Form.Group>

                {/* Password */}
                <Form.Group controlId="password" className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    isInvalid={submitted && !!errors.password}
                    placeholder="Enter password"
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.password}
                  </Form.Control.Feedback>
                </Form.Group>

                {/* Confirm Password */}
                <Form.Group controlId="confirmPassword" className="mb-3">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    isInvalid={submitted && !!errors.confirmPassword}
                    placeholder="Re-enter password"
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.confirmPassword}
                  </Form.Control.Feedback>
                </Form.Group>

                {/* Buttons */}
                <div className="d-flex justify-content-between">
                  <Button variant="secondary" type="button" onClick={handleCancel}>
                    Cancel
                  </Button>
                  <Button variant="primary" type="submit" disabled={!isFormValid}>
                    Submit
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Toast */}
      <Toast
        show={showToast}
        onClose={() => dispatch({ type: 'CLOSE_TOAST' })}
        delay={2000}
        autohide
        bg="success"
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          color: 'white',
        }}
      >
        <Toast.Body>✅ Submitted successfully!</Toast.Body>
      </Toast>

      {/* Modal */}
      <Modal show={showModal} onHide={() => dispatch({ type: 'CLOSE_MODAL' })} centered>
        <Modal.Header closeButton>
          <Modal.Title>Account Registered</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Card>
            <Card.Body>
              <h5>🎉 Thông tin đăng ký:</h5>
              <p><strong>Username:</strong> {formData.username}</p>
              <p><strong>Email:</strong> {formData.email}</p>
              <p><strong>Password:</strong> {formData.password}</p>
            </Card.Body>
          </Card>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={() => dispatch({ type: 'CLOSE_MODAL' })}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default SignUpForm;