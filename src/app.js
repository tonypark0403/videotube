import express from 'express';
import middlewares from './middlewares';
import globalRouter from './routes/globalRouter';
import userRouter from './routes/userRouter';
import videoRouter from './routes/videoRouter';
import apiGlobalRouter from './routes/api/globalRouter';
import apiUserRouter from './routes/api/userRouter';
import apiVideoRouter from './routes/api/videoRouter';
import routes from './routes';

const app = express();

// middlewares
app.set('views', 'src/views');
app.set('view engine', 'pug');
middlewares(app);

app.use(routes.home, globalRouter);
app.use(routes.users, userRouter);
app.use(routes.videos, videoRouter);

// api
app.use(`${routes.api}${routes.home}`, apiGlobalRouter);
app.use(`${routes.api}${routes.users}`, apiUserRouter);
app.use(`${routes.api}${routes.videos}`, apiVideoRouter);

export default app;
