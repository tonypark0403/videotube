require('dotenv').config();
const express = require('express');
const app = express();

const PORT = process.env.PORT;

function handleListening() {
  console.log(`Listening on: http://localhost:${PORT}`);
}

app.listen(PORT, handleListening);
