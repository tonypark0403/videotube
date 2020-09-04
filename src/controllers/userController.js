import passport from 'passport';
import * as userService from '../services/userService';
import routes from '../routes';

export const getJoin = (req, res) => {
  res.render('join', { pageTitle: 'Join' });
};
export const postJoin = async (req, res, next) => {
  const { password, password2 } = req.body;
  try {
    if (password !== password2) {
      req.flash('error', "Passwords don't match");
      res.status(400);
      res.render('join', { pageTitle: 'Join' });
    } else {
      const user = await userService.processSignUp(req.body);
      if (!user) {
        res.status(400);
        res.render('join', { pageTitle: 'Join' });
      } else {
        next();
      }
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

export const githubLogin = passport.authenticate('github', {
  successFlash: 'Welcome',
  failureFlash: "Can't log in. Check email and/or password",
});

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

export const facebookLogin = passport.authenticate('facebook', {
  successFlash: 'Welcome',
  failureFlash: "Can't log in. Check email and/or password",
});

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

export const instagramLogin = passport.authenticate('instagram', {
  successFlash: 'Welcome',
  failureFlash: "Can't log in. Check email and/or password",
});

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

export const getMe = async (req, res) => {
  const user = await userService.getUserByEmailWithPopulate(req.user.email, 'videos');
  res.render('userDetail', { pageTitle: 'User Detail', user });
};

export const userDetail = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const user = await userService.getUserByIdWithPopulate(id, 'videos');
    // console.log('userDetail-user:', user);
    res.render('userDetail', { pageTitle: 'User Detail', user });
  } catch (error) {
    req.flash('error', 'User not found');
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
    req.flash('success', 'Profile updated');
    res.redirect(routes.me);
  } catch (error) {
    req.flash('error', "Can't update profile");
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
      req.flash('error', "Passwords don't match");
      res.status(400);
      res.redirect(`/users/${routes.changePassword}`);
      return;
    }
    await req.user.changePassword(oldPassword, newPassword);
    res.redirect(routes.me);
  } catch (error) {
    req.flash('error', "Can't change password");
    res.status(400);
    res.redirect(`/users/${routes.changePassword}`);
  }
};
