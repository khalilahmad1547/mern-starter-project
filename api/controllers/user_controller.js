const { User, userExists } = require("../db/models/user_model");
import { ReasonPhrases, StatusCodes } from "http-status-codes";

const signUpUser = async (req, res) => {
  const { fullName, email, password } = req.body;
  const exist = await userExists(email);
  if (exist) {
    return res
      .status(StatusCodes.BAD_GATEWAY)
      .json({ error: ReasonPhrases.BAD_GATEWAY });
  } else {
    try {
      const user = new User({
        fullName: fullName,
        email: email,
        password: password,
      });
      await user.save();
      return res.status(StatusCodes.CREATED).json(user);
    } catch (error) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
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
