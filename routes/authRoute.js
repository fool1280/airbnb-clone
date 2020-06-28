var express = require("express");
var router = express.Router();
const { loginWithEmail } = require("../controllers/authController");

router.route("/login").post(loginWithEmail);

module.exports = router;
