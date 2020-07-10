import dotenv from 'dotenv';
import express from 'express';

dotenv.config();

const app = express();

const { PORT } = process.env;

const handleListening = () => {
  console.log(`Listening on: http://localhost:${PORT}`);
};

const handleHome = (req, res) => res.send('Hello from my home');

const handleProfile = (req, res) => res.send('You are on my profile');

app.get('/', handleHome);

app.get('/profile', handleProfile);

app.listen(PORT, handleListening);
