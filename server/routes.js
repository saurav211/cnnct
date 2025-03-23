const express = require("express");
const router = express.Router();

router.use("/user", require("./user/user.routes"));
router.use("/activity", require("./activity/activity.routes"));

module.exports = router;
