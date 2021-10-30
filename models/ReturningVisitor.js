const mongoose = require("mongoose");

const ReturningVisitorSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "Visitor",
    required: true,
  },
  laptop: {
    type: String,
    required: [true, "Please add address"],
  },
  lsn: {
    type: String,
  },
  host: {
    type: String,
    required: [true, "Please add host"],
  },
  purpose: {
    type: String,
    required: [true, "Please add purpose"],
  },
  appointment: {
    type: String,
    required: [true, "Please add appointment"],
  },

  photo: {
    type: String,
    default: "no-photo.jpg",
  },
  date: {
    type: String,
  },
  status: {
    type: String,
    enum: [
      "Approved",
      "CheckedIn",
      "CheckedOut",
      "Pending",
      "Rejected",
      "Awaiting Host",
    ],
    default: "Pending",
  },
  month: {
    type: String,
  },
  timeIn: {
    type: String,
  },
  timeOut: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("ReturningVisitor", ReturningVisitorSchema);
