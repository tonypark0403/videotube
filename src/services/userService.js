import User from '../models/user';

/* eslint-disable import/prefer-default-export */
export const processSignUp = async ({ name, email, password, password2 }) => {
  // eslint-disable-next-line no-unused-vars
  if (password !== password2) {
    return null;
  }
  try {
    const user = await User({
      name,
      email,
    });
    return await User.register(user, password);
  } catch (error) {
    console.log(error);
  }
  return null;
};
