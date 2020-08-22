import express from 'express';
import routes from '.';
import * as userController from '../controllers/userController';
import { onlyPrivate } from '../middlewares/localsMiddleware';

const userRouter = express.Router();

userRouter.get(routes.editProfile, onlyPrivate, userController.editProfile);
userRouter.get(routes.changePassword, onlyPrivate, userController.changePassword);
userRouter.get(routes.userDetail(), userController.userDetail);

export default userRouter;
