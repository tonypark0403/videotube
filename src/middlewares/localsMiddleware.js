import routes from '../routes';

// eslint-disable-next-line import/prefer-default-export
export const localsMiddleware = (req, res, next) => {
  res.locals.siteName = 'YouTube';
  res.locals.routes = routes;
  next();
};
