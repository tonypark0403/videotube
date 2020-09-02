/* eslint-disable import/no-cycle */
import GithubStrategy from 'passport-github';
import * as userController from '../../controllers/userController';
import routes from '../../routes';
import { SERVER } from '.';

const { GH_ID, GH_SECRET } = process.env;

export default () =>
  new GithubStrategy(
    {
      clientID: GH_ID,
      clientSecret: GH_SECRET,
      callbackURL: `${SERVER}${routes.githubCallback}`,
    },
    userController.githubLoginCallback,
  );
