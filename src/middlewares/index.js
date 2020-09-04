import morgan from 'morgan';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import passport from 'passport';
import session from 'express-session';
import mongoose from 'mongoose';
import mongoStore from 'connect-mongo';
import flash from 'connect-flash';
import expressFlash from 'express-flash';
import cloudinaryConfig from './cloudinary';
import { localsMiddleware } from './localsMiddleware';

const CookieStore = mongoStore(session);

export default app => {
  app.use(cookieParser());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(helmet());
  app.use(morgan('dev'));
  app.use(
    session({
      secret: process.env.COOKIE_SECRET,
      resave: true,
      saveUninitialized: false,
      store: new CookieStore({ mongooseConnection: mongoose.connection }),
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(flash());
  app.use(expressFlash());
  app.use(localsMiddleware);
  app.use(cloudinaryConfig);
};
