import React from 'react';
import { Form, InputGroup } from 'react-bootstrap';

const AccountForm = () => {
  return (
    <Form>
      <Form.Group controlId="username" className="mb-3">
        <Form.Label><i className="bi bi-person-circle me-2"></i>Username</Form.Label>
        <InputGroup>
          <InputGroup.Text><i className="bi bi-person-circle"></i></InputGroup.Text>
          <Form.Control type="text" isInvalid />
        </InputGroup>
        <Form.Control.Feedback type="invalid">
          Username is required.
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group controlId="password" className="mb-3">
        <Form.Label><i className="bi bi-lock me-2"></i>Password</Form.Label>
        <InputGroup>
          <InputGroup.Text><i className="bi bi-lock"></i></InputGroup.Text>
          <Form.Control type="password" isInvalid />
        </InputGroup>
        <Form.Control.Feedback type="invalid">
          Password is required.
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group controlId="confirmPassword" className="mb-3">
        <Form.Label><i className="bi bi-lock me-2"></i>Confirm Password</Form.Label>
        <InputGroup>
          <InputGroup.Text><i className="bi bi-lock"></i></InputGroup.Text>
          <Form.Control type="password" isInvalid />
        </InputGroup>
        <Form.Control.Feedback type="invalid">
          Please confirm your password.
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group controlId="secretQuestion" className="mb-3">
        <Form.Label><i className="bi bi-lock me-2"></i>Secret Question</Form.Label>
        <Form.Control type="text" isInvalid />
        <Form.Control.Feedback type="invalid">
          Secret question is required.
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group controlId="secretAnswer" className="mb-3">
        <Form.Label><i className="bi bi-lock me-2"></i>Answer</Form.Label>
        <Form.Control type="text" isInvalid />
        <Form.Control.Feedback type="invalid">
          Answer is required.
        </Form.Control.Feedback>
      </Form.Group>
    </Form>
  );
};

export default AccountForm;