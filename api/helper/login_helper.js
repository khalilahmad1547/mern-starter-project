const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const hash = async (password, salt_rounds = 10) => {
  return await bcrypt.hash(password, salt_rounds);
};

const matchPasword = async (password, hash) => {
  return await bcrypt.compare(password, hash);
};

const jwtToken = (payload) => {
  const { SERVER_SECREAT_KEY, JWT_TOKEN_EXPIRY_TIME } = process.env;
  return jwt.sign(payload, SERVER_SECREAT_KEY || "key", {
    expiresIn: JWT_TOKEN_EXPIRY_TIME || "1h",
  });
};

module.exports = {
  hash,
  matchPasword,
  jwtToken,
};
