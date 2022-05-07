import React, { useRef, useState, useEffect } from 'react';
import ModalComponent from './Modal'
import Login from './Login.jsx'
import 'bootstrap/dist/css/bootstrap.min.css'; 
import {Form, Button, Table} from 'react-bootstrap'

console.log(process.env.REACT_APP_BACKEND_BASEURL+ '/messages');

export default function App() {
  const [isClicked, setIsClicked] = useState(false)
  const [isPassword, setIsPassword] = useState(false)
  const [messages, setMessages] = useState([])
  const [password, setPassword] = useState('')
  const [newName, setNewName] = useState('')
  const [newMessage, setNewMessage] = useState('')
  
  const refName = useRef()
  const refMsg = useRef()

  const getMessageData = (message) => {
    setNewMessage(message.message)
    setNewName(message.name)
    setIsClicked(true)
  } 
  const handlePassword = (e) => {
    const pwdValue = e.target.value
    setPassword(pwdValue)
  }

  useEffect(() => {
    setPassword(window.localStorage.getItem('password'));
    setIsPassword(window.localStorage.getItem('isPassword'));
  }, [])
  
  useEffect(() => {
    window.localStorage.setItem('password', password)
    window.localStorage.setItem('isPassword', isPassword)
  }, [password, isPassword])
  
  

  useEffect(() => {
    const url = 'http://localhost:4000/messages/'
    const config = {
      headers: {
        Authorization: password
      }
    }
    fetch(url, config)
      .then(response => response.json())
      .then(result => {
        if (result.error) {
          console.log('Error: ' + result.error)
          setIsPassword(false)
          return;
        }
        setMessages(result)
        setIsPassword(true)
      })
      .catch(err => {
        // setMessages(err)
        alert(err.message)
      })
  }, [password])
  console.log(password);

  const handleSubmit = (e) => {
    e.preventDefault();

    const url = "http://localhost:4000/messages/"
    const payload = {
      name: refName.current.value,
      message:refMsg.current.value
    }
    const config = {
      method: "POST",
      headers: {
        Authorization: password,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    }

    fetch(url, config)
      .then(response => response.json())
      .then(result => {
        if (result.error) {
          alert('Error: ' + result.error)
          return;
        }
        setMessages([...messages, result.message ])
      })
      .catch(err => {
        console.error(err)
        alert(err.message)
      })
    
    refName.current.value = ''
    refMsg.current.value = ''
  }

  const handleDelete = (id) => {

    const url = 'http://localhost:4000/messages/' + id;
    
    fetch(url, {
      method: 'DELETE',
      headers: {
        Authorization: password,
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(result => {
        if (result.error) {
          console.log('Error: ' + result.error)
          return;
        } 
        setMessages(result)
      })
      .catch(err => console.log(err.message))
  }

  const handleEdit = (message) => {
    const url = 'http://localhost:4000/messages/' + message.id;
    
    const payload = {
      ...message,
      message: newMessage,
      name: newName
    }
    const config = {
      method: "PUT",
      headers: {
        Authorization: password,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    }

    fetch(url, config)
      .then(response => response.json())
      .then(result => {
        if (result.error) {
          alert('Error: ' + result.error)
          return;
        }
        console.log('result >>', result);
        setMessages(result)
      })
      .catch(err => {
        alert(err.message)
      })
  }


  return (
    <main className='app'>
      {isPassword ? 
      <>
      <h1>MESSAGE BOARD</h1>
      <div className="form" style={{width:'50%'}}>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control ref={refName} type="text" placeholder="Enter name" />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Message</Form.Label>
            <Form.Control ref={refMsg} as="textarea" rows={3} placeholder="Message" />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
      <div className="messages-list">
        <h1>Messages List</h1>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Message</th>
              <th colSpan={2} className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {messages.map((message, i) =>
              <tr key={i}>
                <td>{message.id}</td>
                <td>{message.name}</td>
                <td>{message.message}</td>
                <td> <Button variant="outline-success" size="sm" onClick={
                  () => 
                  getMessageData(message)
                }>Edit</Button>
                {isClicked ? <ModalComponent show={isClicked}
                    onHide={() => setIsClicked(false)}
                    editing={handleEdit}
                    message={message}
                    setNewName={setNewName}
                    setNewMessage={setNewMessage}
                    newName={newName}
                    newMessage={newMessage}
                    /> : ''}
                </td>
                <td><Button variant="outline-danger"  size="sm" onClick={() => handleDelete(message.id)}>Delete</Button></td>
                
              </tr>
            )}
          </tbody>
        </Table>
      </div>
      </>
      :
    <Login isPassword={isPassword} setIsPassword={setIsPassword} setPassword={setPassword} password={password} handlePassword={handlePassword}/>
  }  
      </main>
  )
};
