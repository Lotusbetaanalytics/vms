const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const ReturningVisitor = require("../models/ReturningVisitor");

// @desc    Get single visitor info
// @route   GET/api/v1/
// @access   Public
exports.getVisitorsInfo = asyncHandler(async (req, res, next) => {
  const visitors = await ReturningVisitor.findOne({
    _id: req.params.id,
  }).populate({
    path: "user",
    select: "fullname company email mobile",
  });
  res.status(200).json({ success: true, data: visitors });
});
