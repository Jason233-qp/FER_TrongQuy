import { useReducer } from 'react';
import { Form, Button, Card, Container, Row, Col, Modal } from 'react-bootstrap';

const initialState = {
  username: '',
  password: '',
  errors: {},
  showModal: false,
  isValid: false,
};

function validateUsername(value) {
  const errors = {};
  if (value.trim() === '') {
    errors.username = 'Username is required';
  }
  return errors;
}

function validatePassword(value) {
  const errors = {};
  if (value.trim() === '') {
    errors.password = 'Password is required';
  } else if (
    value.length < 8 ||
    !/[A-Z]/.test(value) ||
    !/[a-z]/.test(value) ||
    !/[0-9]/.test(value) ||
    !/[!@#$%^&*(),.?":{}|<>]/.test(value)
  ) {
    errors.password =
      'Password must be at least 8 characters and include uppercase, lowercase, number, and special character';
  }
  return errors;
}

function reducer(state, action) {
  switch (action.type) {
    case 'SET_USERNAME': {
      const usernameErrors = validateUsername(action.payload);
      const passwordErrors = validatePassword(state.password);
      const isValid = Object.keys(usernameErrors).length === 0 && Object.keys(passwordErrors).length === 0;

      return {
        ...state,
        username: action.payload,
        errors: isValid ? {} : { ...state.errors, ...usernameErrors },
        isValid,
      };
    }
    case 'SET_PASSWORD': {
      const passwordErrors = validatePassword(action.payload);
      const usernameErrors = validateUsername(state.username);
      const isValid = Object.keys(passwordErrors).length === 0 && Object.keys(usernameErrors).length === 0;

      return {
        ...state,
        password: action.payload,
        errors: isValid ? {} : { ...state.errors, ...passwordErrors },
        isValid,
      };
    }
    case 'SUBMIT_FORM': {
      const usernameErrors = validateUsername(state.username);
      const passwordErrors = validatePassword(state.password);
      const allErrors = { ...usernameErrors, ...passwordErrors };
      const isValid = Object.keys(allErrors).length === 0;

      return {
        ...state,
        errors: allErrors,
        showModal: isValid,
        isValid,
      };
    }
    case 'RESET_FORM':
      return { ...initialState };
    default:
      return state;
  }
}

function LoginForm() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { username, password, errors, showModal, isValid } = state;

  const handleUsernameChange = (e) => {
    dispatch({ type: 'SET_USERNAME', payload: e.target.value });
  };

  const handlePasswordChange = (e) => {
    dispatch({ type: 'SET_PASSWORD', payload: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({ type: 'SUBMIT_FORM' });
  };

  const handleCloseModal = () => {
    dispatch({ type: 'RESET_FORM' });
  };

  const handleCancel = () => {
    dispatch({ type: 'RESET_FORM' });
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-md-center">
        <Col md={6}>
          <Card>
            <Card.Header>
              <h3 className="text-center">Login</h3>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="username" className="mb-3">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    value={username}
                    onChange={handleUsernameChange}
                    isInvalid={!!errors.username && !isValid}
                    placeholder="Enter username"
                  />
                  {!isValid && errors.username && (
                    <Form.Control.Feedback type="invalid">
                      {errors.username}
                    </Form.Control.Feedback>
                  )}
                </Form.Group>

                <Form.Group controlId="password" className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    value={password}
                    onChange={handlePasswordChange}
                    isInvalid={!!errors.password && !isValid}
                    placeholder="Enter password"
                  />
                  {!isValid && errors.password && (
                    <Form.Control.Feedback type="invalid">
                      {errors.password}
                    </Form.Control.Feedback>
                  )}
                </Form.Group>

                <div className="d-flex justify-content-between">
                  <Button variant="secondary" onClick={handleCancel}>
                    Cancel
                  </Button>
                  <Button variant="primary" type="submit" disabled={!isValid}>
                    Login
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Login Successful</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Welcome, {username}!</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default LoginForm;