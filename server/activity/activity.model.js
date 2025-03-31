const mongoose = require("mongoose");

const availableTimeSchema = new mongoose.Schema({
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
  _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
});

const activitySchema = new mongoose.Schema({
  day: { type: String, required: true },
  isAvailable: { type: Boolean, required: true },
  availableTimes: [availableTimeSchema],
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

const Activity = mongoose.model("Activity", activitySchema);

module.exports = Activity;
