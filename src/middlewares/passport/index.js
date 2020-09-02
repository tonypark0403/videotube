/* eslint-disable import/no-cycle */
/* eslint-disable import/prefer-default-export */
import passport from 'passport';
import githubStrategy from './github';
import facebookStrategy from './facebook';
import instagramStrategy from './instagram';
import User from '../../models/user';

export const SERVER =
  process.env.NODE_ENV === 'production' ? process.env.PROD_SERVER : process.env.DEV_SERVER;

passport.use(User.createStrategy());
passport.use(githubStrategy());
passport.use(facebookStrategy());
passport.use(instagramStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
