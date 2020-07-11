import express from 'express';
import routes from '.';
import * as videoController from '../controllers/videoController';
import { uploadVideo } from '../middlewares/localsMiddleware';

const videoRouter = express.Router();

// Upload
videoRouter.get(routes.upload, videoController.getUpload);
videoRouter.post(routes.upload, uploadVideo, videoController.postUpload);

// Video Detail
videoRouter.get(routes.videoDetail(), videoController.videoDetail);

// Edit Video
videoRouter.get(routes.editVideo(), videoController.getEditVideo);
videoRouter.post(routes.editVideo(), videoController.postEditVideo);

// Delete Video
videoRouter.get(routes.deleteVideo(), videoController.deleteVideo);

export default videoRouter;
