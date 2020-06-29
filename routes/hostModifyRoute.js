const router = require("express").Router({ mergeParams: true });
const {
    hostUpdate,
    hostExperience,
    hostDelete,
} = require("../controllers/hostController");

router.route("/all").get(hostExperience);

router.route("/:id/edit").post(hostUpdate);

router.route("/:id/delete").delete(hostDelete);

module.exports = router;
