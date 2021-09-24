const express = require("express");
const { getVisitorsInfo } = require("../controllers/guest");

const { protect, authorize } = require("../middleware/auth");

const router = express.Router();

router.route("/:id").get(protect, getVisitorsInfo);

module.exports = router;
