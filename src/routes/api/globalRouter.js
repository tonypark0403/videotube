import express from 'express';
import routes from '..';
import * as videoController from '../../controllers/api/videoController';
import * as userController from '../../controllers/api/userController';

const globalRouter = express.Router();

globalRouter.get(routes.join, userController.getJoin);
globalRouter.post(routes.join, userController.postJoin);
globalRouter.get(routes.login, userController.getLogin);
globalRouter.get(routes.login, userController.postLogin);
globalRouter.get(routes.home, videoController.home);
globalRouter.get(routes.logout, userController.logout);
globalRouter.get(routes.search, videoController.search);

export default globalRouter;
