var express = require("express");
var router = express.Router();
const {
    loginWithEmail,
    logoutUser,
    loginFacebook,
    facebookAuthHandler,
    loginGoogle,
    googleAuthHandler,
} = require("../controllers/authController");
const { loginRequired } = require("../middleware/auth.js");

router.route("/login").post(loginWithEmail);

router.route("/logout").post(loginRequired, logoutUser);

router.route("/facebook/login").get(loginFacebook);
router.route("/facebook/authorized").get(facebookAuthHandler);

router.route("/google/login").get(loginGoogle);
router.route("/google/authorized").get(googleAuthHandler);

module.exports = router;
