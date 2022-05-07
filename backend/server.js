import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv'
import messageRouter from './routes/messaggeRouter.js'
import requestLogger from './middleware/requestLogger.js';
import checkPassword from './middleware/checkPassword.js';


//initialize express, and add the middlewares
const app = express();
app.use(cors());
app.use(express.json());
app.use(requestLogger);
app.use(checkPassword);

dotenv.config()
console.log(process.env.API_KEY);

//Add endpoints
app.use('/messages', messageRouter);
app.use((req, res) => res.sendStatus(404))
app.use((err, req, res) => {
  console.log(err);
  res.status(500)
  res.send({ error: err.message })
})

// const port=process.env.PORT;
app.listen(4000/*port*/, () => {
  console.log('listening on http://localhost:4000')//+port);
})