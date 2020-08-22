import express from 'express';
import passport from 'passport';
import routes from '.';
import * as videoController from '../controllers/videoController';
import * as userController from '../controllers/userController';
import { onlyPublic, onlyPrivate } from '../middlewares/localsMiddleware';

const globalRouter = express.Router();

globalRouter.get(routes.join, onlyPublic, userController.getJoin);
globalRouter.post(routes.join, onlyPublic, userController.postJoin, userController.postLogin);

globalRouter.get(routes.login, onlyPublic, userController.getLogin);
globalRouter.post(routes.login, onlyPublic, userController.postLogin);

globalRouter.get(routes.home, videoController.home);
globalRouter.get(routes.search, videoController.search);
globalRouter.get(routes.logout, onlyPrivate, userController.logout);

globalRouter.get(routes.github, onlyPublic, userController.githubLogin);
globalRouter.get(
  routes.githubCallback,
  onlyPublic,
  passport.authenticate('github', { failureRedirect: routes.login }),
  userController.postGithubLogIn,
);

globalRouter.get(routes.me, userController.getMe);

export default globalRouter;
