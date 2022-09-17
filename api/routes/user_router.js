const express = require("express");
const { signUpUser } = require("../controllers/user_controller");
const router = express.Router();

/* GET users listing. */
router.post("/signup", signUpUser);

module.exports = router;
