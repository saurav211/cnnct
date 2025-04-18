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
    res.status(201).json({ message: "Event created successfully" });
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
    const events = await Event.find({ "hostname.id": req.user._id });

    res.json(events);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateEvent = async (req, res) => {
  try {
    const e = await Event.findById(req.params.id);
    const userList = e.users.map((user) => ({
      email: user.email,
      status: user.status,
    }));

    req.body.users.forEach((user) => {
      const existingUser = userList.find((u) => u.email === user);
      if (existingUser) {
        existingUser.status = req.body.status || existingUser.status;
      } else {
        userList.push({ email: user, status: "Pending" });
      }
    });
    const event = await Event.findByIdAndUpdate(
      req.params.id,
      { ...req.body, users: userList },
      {
        new: true,
      }
    );
    res.json(event);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getUserEvents = async (req, res) => {
  const { status } = req.query;
  try {
    let events;
    if (status) {
      events = await Event.find({
        "users.email": req.user.email,
        "users.status": status,
      });
    } else {
      events = await Event.find({
        "users.email": req.user.email,
      });
    }
    res.json(events);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getCalendarEvents = async (req, res) => {
  try {
    const events = await Event.find({
      "users.email": req.user.email,
      "users.status": "Accept",
    });

    const simplifiedEvents = events.map((event) => ({
      title: event.title,
      start: event.start,
      end: event.end,
    }));

    res.json(simplifiedEvents);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateUserStatus = async (req, res) => {
  const { eventId, status } = req.body;
  try {
    const event = await Event.findOneAndUpdate(
      { _id: eventId, "users.email": req.user.email },
      { $set: { "users.$.status": status } },
      { new: true }
    );
    res.json(event);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteEvent = async (req, res) => {
  try {
    await Event.findByIdAndDelete(req.params.id);
    res.json({ message: "Event deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }
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
  deleteEvent,
  getEventById,
  getCalendarEvents,
};
