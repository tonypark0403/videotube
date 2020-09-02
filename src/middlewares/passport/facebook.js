/* eslint-disable import/no-cycle */
import FacebookStrategy from 'passport-facebook';
import * as userController from '../../controllers/userController';
import routes from '../../routes';
import { SERVER } from '.';

const { FB_ID, FB_SECRET } = process.env;

export default () =>
  new FacebookStrategy(
    {
      clientID: FB_ID,
      clientSecret: FB_SECRET,
      callbackURL: `${SERVER}${routes.facebookCallback}`,
      profileFields: ['id', 'displayName', 'photos', 'email'],
      scope: ['public_profile', 'email'],
    },
    userController.facebookLoginCallback,
  );
