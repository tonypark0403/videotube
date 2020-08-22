import GithubStrategy from 'passport-github';
import * as userController from '../../controllers/userController';
import routes from '../../routes';

const { GH_ID, GH_SECRET } = process.env;

export default () =>
  new GithubStrategy(
    {
      clientID: GH_ID,
      clientSecret: GH_SECRET,
      callbackURL: `http://localhost:4000${routes.githubCallback}`,
    },
    userController.githubLoginCallback,
  );
