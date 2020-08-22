import multer from 'multer';
import routes from '../routes';

const multerVideo = multer({ dest: 'uploads/videos/' });
export const uploadVideo = multerVideo.single('videoFile');

// eslint-disable-next-line import/prefer-default-export
export const localsMiddleware = (req, res, next) => {
  res.locals.siteName = 'YouTube';
  res.locals.routes = routes;
  res.locals.loggedUser = req.user || null;
  console.log('auth-user: ', req.user);
  next();
};

export const onlyPublic = (req, res, next) => {
  if (req.user) {
    res.redirect(routes.home);
  } else {
    next();
  }
};

export const onlyPrivate = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.redirect(routes.home);
  }
};
