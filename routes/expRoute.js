const router = require("express").Router({ mergeParams: true });
const hostModifyRoute = require("./hostModifyRoute");
const { loginRequired, hostRequired } = require("../middleware/auth");
const {
    createReview,
    getAllReview,
    deleteReview,
} = require("../controllers/reviewController");

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
router
    .route("/:id/reviews")
    .post(loginRequired, createReview)
    .get(loginRequired, getAllReview)
    .delete(loginRequired, deleteReview);

module.exports = router;
