import express from 'express';
import routes from '.';
import * as videoController from '../controllers/videoController';

const videoRouter = express.Router();

videoRouter.get(routes.editVideo, videoController.editVideo);
videoRouter.get(routes.deleteVideo, videoController.deleteVideo);
videoRouter.get(routes.videoDetail(), videoController.videoDetail);

export default videoRouter;
