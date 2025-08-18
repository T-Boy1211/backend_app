const express = require('express');
const app = express();
const nodemailer = require("nodemailer");
const cron = require('node-cron');
const ejs = require('ejs');
const fs = require('fs');
require('dotenv').config();
const mongoose = require('mongoose');
const cors = require('cors');
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const port = process.env.PORT;

mongoose.connect(process.env.MONGO_DB)
.then(()=>console.log('BD connected'))
.catch((err)=>console.log(err))

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema)

app.get('/', (req, res)=>{
  res.send('Hello World, Welcom To My Web Server');
});

app.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.post('/signup', async (req, res)=>{
  const { firstName, lastName, email, password }  = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }
    const newUser = new User({
      firstName,      
      lastName,
      email,
      password
    });
    await newUser.save();
    return res.status(200).json({ message: 'Signup successful, you can proceed', newUser });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const userExists = await User.findOne({ email, password });
    if (userExists) {
      return res.status(200).json({ message: 'Login successful, you can proceed' });
    }
    return res.status(400).json({ message: 'Login failed' });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.put('/users/:id', async (req, res) => {
  const userId = req.params.id;
  try {
    const updatedUser = await User.findOneAndUpdate(
      { _id: userId },
      { $set: req.body },
      { new: true }
    );
    return res.status(200).json(updatedUser);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.patch('/users/:id', async (req, res) => {
  const userId = req.params.id;
  try {
    const updatedUser = await User.findOneAndUpdate(
      { _id: userId },
      { $set: req.body },
      { new: true }
    );
    return res.status(200).json(updatedUser);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.delete('/users/:id', async (req, res) => {
  const userId = req.params.id;
  try {
    const deletedUser = await User.findOneAndDelete(
      { _id: userId }
    );
    return res
      .status(200)
      .json({ message: `User id ${userId} deleted successfully`, deletedUser });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.listen(port, ()=>{
  console.log('A Giant Loop For Programmers');
  console.log(`http://localhost:${port}`);
});