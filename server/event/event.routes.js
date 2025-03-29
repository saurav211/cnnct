const express = require("express");
const {
  createEvent,
  checkTimeAvailability,
  getEvents,
  updateEvent,
  getUserEvents,
  updateUserStatus,
  deleteEvent,
  getEventById,
  getCalendarEvents,
} = require("./event.controller");
const authenticate = require("../middleware/validator");
const router = express.Router();

router.post("/create", authenticate, createEvent);
router.post("/checkTimeAvailability", authenticate, checkTimeAvailability);
router.get("/getEvents", authenticate, getEvents);
router.put("/update/:id", authenticate, updateEvent);
router.get("/getUserEvents", authenticate, getUserEvents);
router.get("/getCalendarEvents", authenticate, getCalendarEvents);
router.post("/updateUserStatus", authenticate, updateUserStatus);
router.delete("/delete/:id", authenticate, deleteEvent);
router.get("/:id", authenticate, getEventById);

module.exports = router;
