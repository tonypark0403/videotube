import express from 'express';
import routes from '.';
import * as videoController from '../controllers/videoController';
import * as userController from '../controllers/userController';

const globalRouter = express.Router();

globalRouter.get(routes.home, videoController.home);
globalRouter.get(routes.join, videoController.search);
globalRouter.get(routes.login, userController.join);
globalRouter.get(routes.logout, userController.login);
globalRouter.get(routes.search, userController.logout);

export default globalRouter;
