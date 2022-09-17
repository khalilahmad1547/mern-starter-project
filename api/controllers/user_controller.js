const { User, userExists } = require("../db/models/user_model");

const signUpUser = async (req, res) => {
  const { fullName, email, password } = req.body;
  const exist = await userExists(email);
  if (exist) {
    return res
      .status(502)
      .json({ message: `user with ${email} already exist` });
  } else {
    try {
      const user = new User({
        fullName: fullName,
        email: email,
        password: password,
      });
      await user.save();
      return res.status(201).json(user);
    } catch (error) {
      return res.status(500).json(error);
    }
  }
};

const loginUser = (req, res) => {};

const resetPassword = (req, res) => {};

module.exports = {
  signUpUser,
  loginUser,
  resetPassword,
};
