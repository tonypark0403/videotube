import FacebookStrategy from 'passport-facebook';
import * as userController from '../../controllers/userController';
import routes from '../../routes';

const { FB_ID, FB_SECRET } = process.env;

export default () =>
  new FacebookStrategy(
    {
      clientID: FB_ID,
      clientSecret: FB_SECRET,
      callbackURL: `http://localhost:4000${routes.facebookCallback}`,
      profileFields: ['id', 'displayName', 'photos', 'email'],
      scope: ['public_profile', 'email'],
    },
    userController.facebookLoginCallback,
  );
