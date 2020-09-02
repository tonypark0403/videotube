import dotenv from 'dotenv';
import app from './app';

dotenv.config();
console.log('ev:', process.env.NODE_ENV);
const { PORT } = process.env;

const handleListening = () => console.log(`✅ Listening on: http://localhost:${PORT}`);

app.listen(PORT, handleListening);
