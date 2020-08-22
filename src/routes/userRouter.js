import express from 'express';
import routes from '.';
import * as userController from '../controllers/userController';
import { onlyPrivate, uploadAvatar } from '../middlewares/localsMiddleware';

const userRouter = express.Router();

userRouter.get(routes.editProfile, onlyPrivate, userController.getEditProfile);
userRouter.post(routes.editProfile, onlyPrivate, uploadAvatar, userController.postEditProfile);
userRouter.get(routes.changePassword, onlyPrivate, userController.changePassword);
userRouter.get(routes.userDetail(), userController.userDetail);

export default userRouter;
