const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9])(?!.*\s).{8,}$/;

const isPasswordValid = (password) => {
  return passwordRegex.test(password);
};

module.exports = { isPasswordValid };
