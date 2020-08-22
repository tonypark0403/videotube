import passport from 'passport';
import githubStrategy from './github';
import facebookStrategy from './facebook';
import instagramStrategy from './instagram';
import User from '../../models/user';

passport.use(User.createStrategy());
passport.use(githubStrategy());
passport.use(facebookStrategy());
passport.use(instagramStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
