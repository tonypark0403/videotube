import express from 'express';
import routes from '..';
import * as userController from '../../controllers/api/userController';

const userRouter = express.Router();

userRouter.get(routes.userDetail, userController.userDetail);
userRouter.get(routes.editProfile, userController.editProfile);
userRouter.get(routes.changePassword, userController.changePassword);

export default userRouter;