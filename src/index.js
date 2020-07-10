require('dotenv').config();
const express = require('express');

const app = express();
const { PORT } = process.env;

function handleListening() {
  console.log(`Listening on: http://localhost:${PORT}`);
}

function handleHome(req, res) {
  res.send('Hello from home');
}

function handleProfile(req, res) {
  res.send('You are on my profile');
}

app.get('/', handleHome);

app.get('/profile', handleProfile);

app.listen(PORT, handleListening);
