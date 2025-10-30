import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const ConfirmModal = ({ show, title, message, onHide }) => {
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{message}</Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={onHide}>OK</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmModal;
