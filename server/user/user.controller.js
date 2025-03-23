const User = require("./user.model");
const Activity = require("../activity/activity.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const signup = async (req, res) => {
  try {
    console.log(req.body);
    const { firstName, lastName, email, password, confirmPassword } = req.body;
    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Passwords do not match" });
    }
    const user = new User({ firstName, lastName, email, password });
    await user.save();

    // Add activity data for the new user
    const activityData = [
      { day: "Sunday", isAvailable: false, availableTimes: [], user: user._id },
      { day: "Monday", isAvailable: true, availableTimes: [], user: user._id },
      { day: "Tuesday", isAvailable: true, availableTimes: [], user: user._id },
      {
        day: "Wednesday",
        isAvailable: true,
        availableTimes: [],
        user: user._id,
      },
      {
        day: "Thursday",
        isAvailable: true,
        availableTimes: [],
        user: user._id,
      },
      { day: "Friday", isAvailable: true, availableTimes: [], user: user._id },
      {
        day: "Saturday",
        isAvailable: true,
        availableTimes: [],
        user: user._id,
      },
    ];
    await Activity.insertMany(activityData);

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "Invalid email or password" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid email or password" });
    }
    const token = jwt.sign({ ...user }, process.env.JWT_SECRET);
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const preferences = async (req, res) => {
  const { proffesion, username } = req.body;
  try {
    req.user.proffesion = proffesion;
    req.user.username = username;
    await req.user.save();
    res.json({ message: "Preferences updated successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  signup,
  login,
  preferences,
};
