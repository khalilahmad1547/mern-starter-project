const jwt = require("jsonwebtoken");
const { StatusCodes } = require("http-status-codes");
const { jwtTokenVerifier } = require("../helpers/login_helper");

const { UNAUTHORIZED } = StatusCodes;

module.exports = (req, res, next) => {
  const token = req.headers.authorization;
  try {
    const decoded = jwtTokenVerifier(token);
    req.decodeBody = decoded;
    next();
  } catch (error) {
    return res
      .status(UNAUTHORIZED)
      .json({ error: "please provide valid auth token" });
  }
};
