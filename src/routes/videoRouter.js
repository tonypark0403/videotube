import express from 'express';
import routes from '.';
import * as videoController from '../controllers/videoController';
import { uploadVideo, onlyPrivate } from '../middlewares/localsMiddleware';

const videoRouter = express.Router();

// Upload
videoRouter.get(routes.upload, onlyPrivate, videoController.getUpload);
videoRouter.post(routes.upload, onlyPrivate, uploadVideo, videoController.postUpload);

// Video Detail
videoRouter.get(routes.videoDetail(), videoController.videoDetail);

// Edit Video
videoRouter.get(routes.editVideo(), onlyPrivate, videoController.getEditVideo);
videoRouter.post(routes.editVideo(), onlyPrivate, videoController.postEditVideo);

// Delete Video
videoRouter.get(routes.deleteVideo(), onlyPrivate, videoController.deleteVideo);

export default videoRouter;
