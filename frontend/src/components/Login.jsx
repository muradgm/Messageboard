import React, {useState} from 'react'
import {Modal, Button, Form, Row, InputGroup} from 'react-bootstrap'


export default function Login(props) {
  const [show, setShow] = useState(true);
  const [validated, setValidated] = useState(false);
  const { isPassword, password, handlePassword } = props

  const handleSubmit = (e) => {
    const form = e.currentTarget;
    // console.log('form :>> ', form);
    console.log(!form.checkValidity());
    if (!isPassword || !form.checkValidity()) {
      e.preventDefault();
      e.stopPropagation();
    }else{
      setValidated(true)
      e.preventDefault();
    }
  };

  return (
    <>
      <Modal
        onClick={e => e.stopPropagation()}
        show={show}
        onHide={() => setShow(false)}
      >
        <Modal.Header>
          <Modal.Title id="example-custom-modal-styling-title">
            Please Login
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Row>
          <Form.Group className="mb-5">
            <Form.Label>Password</Form.Label>
              <InputGroup hasValidation>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => handlePassword(e)} required
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a valid password.
                </Form.Control.Feedback>
              </InputGroup>
              </Form.Group>
              </Row>
              <Button type="submit">Login</Button>
            </Form>
        </Modal.Body>
      </Modal>
    </>
  )
}
