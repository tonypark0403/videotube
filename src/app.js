import express from 'express';
import middlewares from './middlewares';
import userRouter from './routes/userRouter';

const app = express();

// middlewares
middlewares(app);

app.use('/user', userRouter);

export default app;
