const router = require("express").Router({ mergeParams: true });
const hostModifyRoute = require("./hostModifyRoute");
const { loginRequired, hostRequired } = require("../middleware/auth");

const {
    getExperiences,
    createExperience,
    getExpByTag,
} = require("../controllers/expController");

router.use("/host", loginRequired, hostRequired, hostModifyRoute);

router
    .route("/")
    .get(getExperiences)
    .post(loginRequired, hostRequired, createExperience);

router.route("/:tag").get(getExpByTag);

module.exports = router;
