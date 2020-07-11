import * as userService from '../../services/userService';
import tryCatch from '../../shared/tryCatch';
import routes from '../../routes';

export const getJoin = (req, res) => {
  res.render('join', { pageTitle: 'Join' });
};
export const postJoin = tryCatch(async (req, res) => {
  await userService.processSignUp(req.body);
  res.redirect(routes.home);
});
export const getLogin = (req, res) => res.render('login', { pageTitle: 'Log In' });
export const postLogin = (req, res) => {
  res.redirect(routes.home);
};
export const login = (req, res) => res.render('login', { pageTitle: 'Log In' });
export const logout = (req, res) => res.render('logout', { pageTitle: 'Log Out' });
export const userDetail = (req, res) => res.render('userDetail', { pageTitle: 'User Detail' });
export const editProfile = (req, res) => res.render('editProfile', { pageTitle: 'Edit Profile' });
export const changePassword = (req, res) =>
  res.render('changePassword', { pageTitle: 'Change Password' });
