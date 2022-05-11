import React from 'react'
import {Modal, Button, Form} from 'react-bootstrap'

const ModalComponent = (props) => {
  const { editing, message,
          newName, newMessage,
          setNewMessage, setNewName } = props
  
  const handleEdit = editing



  return (
    <Modal
      show 
      size="lg"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Edit Your Message
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={(e) => handleEdit(message)}>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text"
              value={newName} onChange={(e)=> {setNewName(e.target.value)}}
            placeholder="Enter name" />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Message</Form.Label>
            <Form.Control value={newMessage} onChange={e => setNewMessage(e.target.value)} as="textarea" rows={3} placeholder="Message"/>
          </Form.Group>
          <Button variant="primary" type="submit" onClick={(e) => e.preventDefault}>
            Submit
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  )
}

export default ModalComponent



