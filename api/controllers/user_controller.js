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

const loginUser = async (req, res) => {
  const { fullName, email, password } = req.body;
  const user = await User.find({ email: email });
  if (user.length < 1) {
    // user not found
    return res.status(BAD_GATEWAY).json({
      message: "email or password is wrong",
    });
  }
  console.log(user);
  const correctPassowrd = await matchPasword(password, user[0].password);
  if (correctPassowrd) {
    // return the JWT
    const token = jwtToken({
      fullName: user[0].fullName,
      email: user[0].email,
      _id: user[0]._id,
    });

    return res.status(CREATED).json({
      message: "Auth successful",
      token: token,
    });
  }

  return res.status(BAD_GATEWAY).json({
    message: "email or password is wrong",
  });
};

const resetPassword = (req, res) => {};

module.exports = {
  signUpUser,
  loginUser,
  resetPassword,
};
