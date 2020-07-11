/* eslint-disable prefer-promise-reject-errors */
/* eslint-disable import/prefer-default-export */
export const processSignUp = user => {
  // eslint-disable-next-line no-unused-vars
  const { name, email, password, password2 } = user;
  return new Promise((resolve, reject) => {
    if (password !== password2) {
      reject('password not matched');
      return;
    }
    // To Do: Register User
    // To Do: Log user in
    resolve('success');
  });
};
