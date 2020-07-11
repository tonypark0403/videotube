import express from 'express';
import routes from '.';
import * as videoController from '../controllers/videoController';
import * as userController from '../controllers/userController';

const globalRouter = express.Router();

globalRouter.get(routes.join, userController.getJoin);
globalRouter.post(routes.join, userController.postJoin);
globalRouter.get(routes.login, userController.getLogin);
globalRouter.get(routes.login, userController.postLogin);
globalRouter.get(routes.home, videoController.home);
globalRouter.get(routes.search, userController.logout);
globalRouter.get(routes.join, videoController.search);

export default globalRouter;
