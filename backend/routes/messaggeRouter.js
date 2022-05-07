import express from 'express';
import { nanoid } from 'nanoid';
import db from '../db.js'


const messageRouter = express.Router();

messageRouter
  .get('/', (req, res) => res.send(JSON.stringify(db.data.messages)))
  .post('/', (req, res) => { 
    //assumption: req contains a body with a message object
    const message = req.body;
    message.id = nanoid(7);
    db.data.messages.push(message);
    db.write()
    res.status(201).send({ success: true, message: req.body });
  })
  .put("/:id", (req, res) => {
    const id = req.params.id;
    const message = db.data.messages.find(message => message.id === id);
    const index = db.data.messages.indexOf(message)
    const newUpdate = req.body
    db.data.messages.splice(index, 1, newUpdate);
    res.status(200).send(db.data.messages)
  })
  .delete("/:id", (req, res) => {
    const id = req.params.id;
    const message = db.data.messages.find(message => message.id === id);
    const index = db.data.messages.indexOf(message);
    db.data.messages.splice(index, 1);
    db.write()
    res.status(200).send(db.data.messages)
  })

  export default messageRouter;