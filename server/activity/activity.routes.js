const express = require("express");
const {
  updateAvailability,
  addAvailableTime,
  deleteAvailableTime,
  getAllActivities,
} = require("./activity.controller");
const router = express.Router();

const authenticate = require("../middleware/validator");

router.get("/getAllActivities", authenticate, getAllActivities);
router.post("/addAvailableTime", authenticate, addAvailableTime);
router.post("/updateAvailability", authenticate, updateAvailability);
router.post("/deleteAvailableTime", authenticate, deleteAvailableTime);

module.exports = router;
