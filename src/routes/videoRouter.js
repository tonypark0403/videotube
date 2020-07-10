import express from 'express';
import routes from '.';
import * as videoController from '../controllers/videoController';

const videoRouter = express.Router();

videoRouter.get(routes.videos, videoController.videos);
videoRouter.get(routes.upload, videoController.upload);
videoRouter.get(routes.videoDetail, videoController.videoDetail);
videoRouter.get(routes.editVideo, videoController.editVideo);
videoRouter.get(routes.deleteVideo, videoController.deleteVideo);

export default videoRouter;
