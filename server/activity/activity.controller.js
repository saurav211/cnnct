const Activity = require("./activity.model");

const getAllActivities = async (req, res) => {
  try {
    console.log("req.user._id", req.user._id);
    const activities = await Activity.find({ user: req.user._id });
    res.json(activities);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateAvailability = async (req, res) => {
  const { day, isAvailable } = req.body;
  try {
    const activity = await Activity.findOneAndUpdate(
      { day, user: req.user._id },
      { isAvailable },
      { new: true, upsert: true }
    );
    res.json(activity);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const addAvailableTime = async (req, res) => {
  const { day, startTime, endTime } = req.body;
  try {
    const activity = await Activity.findOneAndUpdate(
      { day, user: req.user._id },
      { $push: { availableTimes: { startTime, endTime } } },
      { new: true, upsert: true }
    );
    res.json(activity);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteAvailableTime = async (req, res) => {
  const { day, timeId } = req.body;
  try {
    const activity = await Activity.findOneAndUpdate(
      { day, user: req.user._id },
      { $pull: { availableTimes: { _id: timeId } } },
      { new: true }
    );
    res.json(activity);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  updateAvailability,
  addAvailableTime,
  deleteAvailableTime,
  getAllActivities,
};
