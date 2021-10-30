const express = require("express");
const { protect, authorize } = require("../middleware/auth");
const advancedResults = require("../middleware/advancedResults");
const { prebook, prebookSignin } = require("../controllers/prebook");

const router = express.Router();

router.route("/").post(protect, prebook);
router.route("/checkin").post(protect, prebookSignin);

module.exports = router;
