const express = require("express");
const { getEmployee, createEmployee } = require("../controllers/employee");
const Employee = require("../models/Employee");
const { protect, authorize } = require("../middleware/auth");
const advancedResults = require("../middleware/advancedResults");

const router = express.Router();

router
  .route("/")
  .post(createEmployee)
  .get(advancedResults(Employee), getEmployee);

module.exports = router;
