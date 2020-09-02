import '@babel/polyfill';
import express from 'express';
import path from 'path';
import middlewares from './middlewares';
import globalRouter from './routes/globalRouter';
import userRouter from './routes/userRouter';
import videoRouter from './routes/videoRouter';
import apiRouter from './routes/apiRouter';
import globalErrorHandler from './shared/globalErrorHandler';
import routes from './routes';
import './middlewares/db';
import './middlewares/passport';

const app = express();
// middlewares
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
// app.use('/uploads', express.static('uploads'));
app.use('/static', express.static(path.join(__dirname, 'static')));
middlewares(app);

app.use(routes.home, globalRouter);
app.use(routes.users, userRouter);
app.use(routes.videos, videoRouter);
app.use(routes.api, apiRouter);

// error - for API
app.use(globalErrorHandler);

export default app;
