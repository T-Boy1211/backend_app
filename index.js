const express = require('express');
const app = express();
const nodemailer = require("nodemailer");
require('dotenv').config();
const mongoose = require('mongoose');
const WebSocket = require('ws');
const cors = require('cors');
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const port = process.env.PORT;
const userRoutes = require('./routes/user.route');
app.use('/users', userRoutes);


mongoose.connect(process.env.MONGO_DB)
.then(()=>console.log('BD connected'))
.catch((err)=>console.log(err))

const server = new WebSocket.Server({ port: 3000 });
server.on('connection', (socket) => {
  console.log('Client connected');
  
  socket.on('message', (message) => {
    console.log(`Received: ${message}`);
    socket.send(`Echo: ${message}`);
  });
  
  socket.on('close', () => {
    console.log('Client disconnected');
  });
});

app.get('/', (req, res)=>{
  res.send('Hello World, Welcom To My Web Server');
});

app.listen(port, ()=>{
  console.log('A Giant Loop For Programmers');
  console.log(`http://localhost:${port}`);
});
