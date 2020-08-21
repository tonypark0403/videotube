import express from 'express';
import middlewares from './middlewares';
import globalRouter from './routes/globalRouter';
import userRouter from './routes/userRouter';
import videoRouter from './routes/videoRouter';
import globalErrorHandler from './shared/globalErrorHandler';
import routes from './routes';
import './middlewares/db';
import './middlewares/passport';

const app = express();

// middlewares
app.set('views', 'src/views');
app.set('view engine', 'pug');
app.use('/uploads', express.static('uploads'));
app.use('/static', express.static('static'));

middlewares(app);

app.use(routes.home, globalRouter);
app.use(routes.users, userRouter);
app.use(routes.videos, videoRouter);

// error - for API
app.use(globalErrorHandler);

export default app;
