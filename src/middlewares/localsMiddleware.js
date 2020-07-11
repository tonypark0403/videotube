import multer from 'multer';
import routes from '../routes';

const multerVideo = multer({ dest: 'uploads/videos/' });
export const uploadVideo = multerVideo.single('videoFile');

// eslint-disable-next-line import/prefer-default-export
export const localsMiddleware = (req, res, next) => {
  res.locals.siteName = 'YouTube';
  res.locals.routes = routes;
  res.locals.user = req.user || null;
  console.log('auth-user: ', req.user);
  next();
};
