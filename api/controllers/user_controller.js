const { User, userExists } = require("../db/models/user_model");

const signUpUser = async (req, res) => {
  const { fullName, email, password } = req.body;
  const exist = await userExists(email);
  if (exist) {
    return res
      .status(404)
      .json({ message: `user with ${email} already exist` });
  } else {
    const user = new User({
      fullName: fullName,
      email: email,
      password: password,
    });
    await user.save();
    res.status(201).json(user);
  }
};

const loginUser = (req, res) => {};

const resetPassword = (req, res) => {};

module.exports = {
  signUpUser,
  loginUser,
  resetPassword,
};
