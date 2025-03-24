const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    password: { type: String },
    hostname: {
      email: { type: String, required: true },
      name: { type: String, required: true },
      id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    },
    description: { type: String },
    dateTime: { type: Date, required: true },
    duration: { type: Number },
    start: { type: Date, required: true },
    end: { type: Date, required: true },
    isEventActive: { type: Boolean, default: true },
    backgroundColor: { type: String, required: true },
    link: { type: String, required: true },
    users: [
      {
        email: { type: String, required: true },
        status: {
          type: String,
          enum: ["Accept", "Reject", "Pending"],
          default: "Pending",
        },
      },
    ],
  },
  { timestamps: true }
);

const Event = mongoose.model("Event", eventSchema);

module.exports = Event;
