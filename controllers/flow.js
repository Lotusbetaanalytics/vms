const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const Visitor = require("../models/visitor");
const ReturningVisitor = require("../models/ReturningVisitor");
const visitor = require("../models/visitor");

// @desc    Get all visitors
// @route   GET/api/v1/visitors
// @access   Public
exports.getVisitors = asyncHandler(async (req, res, next) => {
  const visitors = await Visitor.find();
  res
    .status(200)
    .json({ success: true, count: visitors.length, data: visitors });
});

// @desc    Get all visitors
// @route   GET/api/v1/visitors
// @access   Public
exports.getDashboard = asyncHandler(async (req, res, next) => {
  const visitorsToday = await ReturningVisitor.find({ date: req.body.date });
  const pending = await ReturningVisitor.find({
    date: req.body.date,
    status: "Pending",
  });
  const vin = await ReturningVisitor.find({
    date: req.body.date,
    status: "CheckedIn",
  });
  const out = await ReturningVisitor.find({
    date: req.body.date,
    status: "CheckedOut",
  });

  const all = await ReturningVisitor.find({}).populate({});

  res.status(200).json({
    success: true,
    today: visitorsToday.length,
    checkedIn: vin.length,
    checkedOut: out.length,
    all: all.length,
    pending: pending.length,
    newGuest: pending,
  });
});
