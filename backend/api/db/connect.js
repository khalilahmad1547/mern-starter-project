require("dotenv").config();
const { exit } = require("process");
const mongoose = require("mongoose");

const connectToDB = async (url) => {
  try {
    await mongoose.connect(url);
    console.log("connected to DB");
  } catch (error) {
    console.log(error);
    exit();
  }
};

const { MONGODB_URL } = process.env;

connectToDB(MONGODB_URL);
