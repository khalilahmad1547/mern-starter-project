const signUpUser = (req, res) => {
  res.status(200).json({ message: "sign up user request" });
};

const loginUser = (req, res) => {};

const resetPassword = (req, res) => {};

module.exports = {
  signUpUser,
  loginUser,
  resetPassword,
};
