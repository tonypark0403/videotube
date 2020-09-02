/* eslint-disable import/no-cycle */
import InstagramStrategy from 'passport-instagram';
import * as userController from '../../controllers/userController';
import routes from '../../routes';
import { SERVER } from '.';

const { INSTA_ID, INSTA_SECRET } = process.env;

export default () =>
  new InstagramStrategy(
    {
      clientID: INSTA_ID,
      clientSecret: INSTA_SECRET,
      callbackURL: `${SERVER}${routes.instagramCallback}`,
    },
    userController.instagramLoginCallback,
  );
