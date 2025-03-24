const express = require("express");
const {
  createEvent,
  checkTimeAvailability,
  getEvents,
  updateEvent,
  getUserEvents,
  updateUserStatus,
} = require("./event.controller");
const authenticate = require("../middleware/validator");
const router = express.Router();

router.post("/create", authenticate, createEvent);
router.post("/checkTimeAvailability", authenticate, checkTimeAvailability);
router.get("/getEvents", authenticate, getEvents);
router.put("/update/:id", authenticate, updateEvent);
router.get("/getUserEvents", authenticate, getUserEvents);
router.post("/updateUserStatus", authenticate, updateUserStatus);

module.exports = router;
