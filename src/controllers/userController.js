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

export const facebookLogin = passport.authenticate('facebook');

export const facebookLoginCallback = async (_, __, profile, cb) => {
  // accessToken, refreshToken is not used so use _ and __
  // console.log(accessToken, refreshToken, profile, cb);
  console.log(profile);
  const {
    _json: { id, name, email },
  } = profile;
  // const { value: avatarUrl } = profile.photos[0];
  const avatarUrl = `https://graph.facebook.com/${id}/picture?type=large`;
  try {
    let modifiedEmail = email;
    if (!modifiedEmail) {
      modifiedEmail = `${name}@test.com`;
    }
    const user = await userService.getUser(modifiedEmail);
    if (user) {
      // the email is already saved or used as our account
      user.facebookId = id;
      user.avatarUrl = avatarUrl;
      user.save();
      return cb(null, user);
    }
    // facebook user is not saved in db yet
    const newUser = await userService.createUser({
      email: modifiedEmail,
      name,
      facebookId: id,
      avatarUrl,
    });
    return cb(null, newUser);
  } catch (error) {
    return cb(error);
  }
};

export const postFacebookLogIn = (req, res) => {
  res.redirect(routes.home);
};

export const instagramLogin = passport.authenticate('instagram');

export const instagramLoginCallback = async (_, __, profile, cb) => {
  // accessToken, refreshToken is not used so use _ and __
  // console.log(accessToken, refreshToken, profile, cb);
  console.log(profile, cb);
  // const {
  //   _json: { id, name, email },
  // } = profile;
  // // const { value: avatarUrl } = profile.photos[0];
  // const avatarUrl = `https://graph.facebook.com/${id}/picture?type=large`;
  // try {
  //   let modifiedEmail = email;
  //   if (!modifiedEmail) {
  //     modifiedEmail = `${name}@test.com`;
  //   }
  //   const user = await userService.getUser(modifiedEmail);
  //   if (user) {
  //     // the email is already saved or used as our account
  //     user.facebookId = id;
  //     user.avatarUrl = avatarUrl;
  //     user.save();
  //     return cb(null, user);
  //   }
  //   // instagram user is not saved in db yet
  //   const newUser = await userService.createUser({
  //     email: modifiedEmail,
  //     name,
  //     facebookId: id,
  //     avatarUrl,
  //   });
  //   return cb(null, newUser);
  // } catch (error) {
  //   return cb(error);
  // }
};

export const postInstagramLogIn = (req, res) => {
  res.redirect(routes.home);
};

export const logout = (req, res) => {
  req.flash('info', 'Logged out, see you later');
  req.logout();
  res.redirect(routes.home);
};

export const getMe = (req, res) => {
  res.render('userDetail', { pageTitle: 'User Detail', user: req.user });
};

export const userDetail = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const user = await userService.getUserById(id);
    res.render('userDetail', { pageTitle: 'User Detail', user });
  } catch (error) {
    res.redirect(routes.home);
  }
};
export const getEditProfile = (req, res) =>
  res.render('editProfile', { pageTitle: 'Edit Profile' });

export const postEditProfile = async (req, res) => {
  const {
    body: { name, email },
    file,
  } = req;
  try {
    await userService.getUpdateUserById(req.user.id, {
      name,
      email,
      avatarUrl: file ? file.path : req.user.avatarUrl,
    });
    res.redirect(routes.me);
  } catch (error) {
    res.redirect(routes.editProfile);
  }
};

export const getChangePassword = (req, res) =>
  res.render('changePassword', { pageTitle: 'Change Password' });

export const postChangePassword = async (req, res) => {
  const {
    body: { oldPassword, newPassword, newPassword1 },
  } = req;
  try {
    if (newPassword !== newPassword1) {
      res.status(400);
      res.redirect(`/users/${routes.changePassword}`);
      return;
    }
    await req.user.changePassword(oldPassword, newPassword);
    res.redirect(routes.me);
  } catch (error) {
    res.status(400);
    res.redirect(`/users/${routes.changePassword}`);
  }
};
