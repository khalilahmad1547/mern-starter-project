import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema({
  fullName: { type: String, required: true },
  email: { type: String, unique: true, required: true, index: true },
  password: { type: String, required: true },
  userType: { type: String, enum: ["admin", "player"], default: "player" },
});

module.exports = mongoose.model("User", userSchema);
