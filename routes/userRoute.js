var express = require("express");
var router = express.Router();
const {
    createUser,
    getAllUser,
    getMyProfile,
    updateUser,
    logoutUser,
} = require("../controllers/userController");
const { loginRequired } = require("../middleware/auth.js");
const User = require("../models/user");

/* GET users listing. */
//localhost:5000/users/me => all current user information

router.route("/").get(getAllUser).post(createUser);

router.route("/me").get(loginRequired, getMyProfile);
router.route("/update").post(loginRequired, updateUser);
router.route("/logout").post(loginRequired, logoutUser);

module.exports = router;
