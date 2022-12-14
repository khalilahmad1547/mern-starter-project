const mongoose = require("mongoose");

const { Schema } = mongoose;

const userSchema = new Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  email: { type: String, unique: true, required: true, index: true },
  password: { type: String, required: true },
  userType: { type: String, enum: ["admin", "player"], default: "player" },
});

const User = mongoose.model("User", userSchema);

const userExists = async (email) => {
  const res = await User.find({ email: email });
  if (res.length >= 1) return true;
  else return false;
};

module.exports = {
  User,
  userExists,
};
