const { User, userExists } = require("../db/models/user_model");
const { StatusCodes } = require("http-status-codes");

const { BAD_GATEWAY, CREATED, INTERNAL_SERVER_ERROR } = StatusCodes;

const signUpUser = async (req, res) => {
  const { fullName, email, password } = req.body;
  const exist = await userExists(email);
  if (exist) {
    return res
      .status(BAD_GATEWAY)
      .json({ error: `user with ${email} is already exist` });
  } else {
    try {
      const user = new User({
        fullName: fullName,
        email: email,
        password: password,
      });
      await user.save();
      return res.status(CREATED).json(user);
    } catch (error) {
      return res.status(INTERNAL_SERVER_ERROR).json(error);
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
