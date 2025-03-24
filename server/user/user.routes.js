const express = require("express");
const {
  login,
  signup,
  preferences,
  updateProfile,
  getProfile,
} = require("./user.controller");
const authenticate = require("../middleware/validator");
const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/preferences", authenticate, preferences);
router.post("/updateProfile", authenticate, updateProfile);
router.get("/profile", authenticate, getProfile);

module.exports = router;
