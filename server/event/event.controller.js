const Event = require("./event.model");
const Activity = require("../activity/activity.model");

const createEvent = async (req, res) => {
  try {
    const { dateTime, duration, users } = req.body;
    const start = new Date(dateTime);
    const end = new Date(dateTime);
    end.setMinutes(end.getMinutes() + duration);

    const userList = [];
    await users.map((user) => {
      userList.push({ email: user, status: "Pending" });
    });

    const event = new Event({ ...req.body, start, end, users: userList });
    await event.save();
    res.status(201).json({ message: "Event created successfully", });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const checkTimeAvailability = async (req, res) => {
  let { dateTime } = req.body;
  const userId = req.user._id;
  try {
    dateTime = new Date(dateTime);
    const dayOfWeek = dateTime.toLocaleString("en-US", { weekday: "long" });
    const activities = await Activity.find({ user: userId, day: dayOfWeek });

    if (activities[0].availableTimes.length == 0) {
      return res.json({ isAvailable: true });
    }

    const isAvailable = activities[0].availableTimes.some((time) => {
      const startTime = new Date(dateTime);
      const endTime = new Date(dateTime);
      const [startHour, startMinute] = time.startTime.split(":").map(Number);
      const [endHour, endMinute] = time.endTime.split(":").map(Number);
      startTime.setHours(startHour, startMinute, 0, 0);
      endTime.setHours(endHour, endMinute, 0, 0);

      return dateTime >= startTime && dateTime <= endTime;
    });
    res.json({ isAvailable });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getEvents = async (req, res) => {
  try {
    const events = await Event.find({ "users.userId": req.user._id });
    res.json(events);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(event);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getUserEvents = async (req, res) => {
  const { status } = req.query;
  try {
    const events = await Event.find({
      "users.userId": req.user._id,
      "users.status": status,
    });
    res.json(events);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateUserStatus = async (req, res) => {
  const { eventId, status } = req.body;
  try {
    const event = await Event.findOneAndUpdate(
      { _id: eventId, "users.userId": req.user._id },
      { $set: { "users.$.status": status } },
      { new: true }
    );
    res.json(event);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createEvent,
  checkTimeAvailability,
  getEvents,
  updateEvent,
  getUserEvents,
  updateUserStatus,
};
