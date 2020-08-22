import passport from 'passport';
import * as userService from '../services/userService';
import routes from '../routes';

export const getJoin = (req, res) => {
  res.render('join', { pageTitle: 'Join' });
};
export const postJoin = async (req, res, next) => {
  try {
    const user = await userService.processSignUp(req.body);
    if (!user) {
      res.status(400);
      res.render('join', { pageTitle: 'Join' });
    } else {
      next();
    }
  } catch (err) {
    res.redirect(routes.home);
  }
};
export const getLogin = (req, res) => res.render('login', { pageTitle: 'Log In' });
export const postLogin = passport.authenticate('local', {
  failureRedirect: routes.login,
  successRedirect: routes.home,
  successFlash: 'Welcome',
  failureFlash: "Can't log in. Check email and/or password",
});

export const githubLogin = passport.authenticate('github');

export const githubLoginCallback = async (_, __, profile, cb) => {
  // accessToken, refreshToken is not used so use _ and __
  // console.log(accessToken, refreshToken, profile, cb);
  console.log(profile);
  const {
    _json: { id, avatar_url: avatarUrl, name, email },
  } = profile;
  try {
    let modifiedEmail = email;
    if (!modifiedEmail) {
      modifiedEmail = `${name}@test.com`;
    }
    const user = await userService.getUser(modifiedEmail);
    if (user) {
      // the email is already saved or used as our account
      user.githubId = id;
      user.save();
      return cb(null, user);
    }
    // github user is not saved in db yet
    const newUser = await userService.createUser({
      email: modifiedEmail,
      name,
      githubId: id,
      avatarUrl,
    });
    return cb(null, newUser);
  } catch (error) {
    return cb(error);
  }
};

export const postGithubLogIn = (req, res) => {
  res.redirect(routes.home);
};

export const logout = (req, res) => {
  req.flash('info', 'Logged out, see you later');
  req.logout();
  res.redirect(routes.home);
};
export const userDetail = (req, res) => res.render('userDetail', { pageTitle: 'User Detail' });
export const editProfile = (req, res) => res.render('editProfile', { pageTitle: 'Edit Profile' });
export const changePassword = (req, res) =>
  res.render('changePassword', { pageTitle: 'Change Password' });
