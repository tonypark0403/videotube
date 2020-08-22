import passport from 'passport';
import githubStrategy from './github';
import User from '../../models/user';

passport.use(User.createStrategy());
passport.use(githubStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
