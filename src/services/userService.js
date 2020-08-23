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

export const createUser = user => {
  return User.create(user);
};

export const getUser = email => {
  return User.findOne({ email });
};

export const getUserById = id => User.findById(id);

export const getUserByIdWithPopulate = (id, key) => User.findById(id).populate(key);

export const getUpdateUserById = (id, user) => User.findByIdAndUpdate(id, user);
