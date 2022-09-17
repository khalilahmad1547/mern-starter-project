const express = require("express");
const { signUpUser, loginUser } = require("../controllers/user_controller");
const router = express.Router();

/* GET users listing. */
router.post("/signup", signUpUser);
router.post("/login", loginUser);

module.exports = router;
