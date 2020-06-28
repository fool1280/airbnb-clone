const router = require("express").Router({ mergeParams: true });
const { loginRequired, hostRequired } = require("../middleware/auth");

const {
    getExperiences,
    createExperience,
} = require("../controllers/expController");

router
    .route("/")
    .get(getExperiences)
    .post(loginRequired, hostRequired, createExperience);

module.exports = router;
