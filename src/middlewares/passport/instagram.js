import InstagramStrategy from 'passport-instagram';
import * as userController from '../../controllers/userController';
import routes from '../../routes';

const { INSTA_ID, INSTA_SECRET } = process.env;

export default () =>
  new InstagramStrategy(
    {
      clientID: INSTA_ID,
      clientSecret: INSTA_SECRET,
      callbackURL: `http://localhost:4000${routes.instagramCallback}`,
    },
    userController.instagramLoginCallback,
  );
