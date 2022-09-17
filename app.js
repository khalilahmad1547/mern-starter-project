const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");
const { exit } = require("process");
require("dotenv").config();

const { MONGODB_URL } = process.env;
const userRouter = require("./api/routes/user_router");

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/api/users", userRouter);

const connectToDB = async (url) => {
  try {
    await mongoose.connect(url);
    console.log("connected to DB");
  } catch (error) {
    console.log(error);
    exit();
  }
};

connectToDB(MONGODB_URL);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500);
});

module.exports = app;
