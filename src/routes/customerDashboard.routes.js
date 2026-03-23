const express = require("express");
const router = express.Router();

const controller = require("../controllers/customerDashboard.controller");

// GET CUSTOMER DASHBOARD
router.get("/", controller.getCustomerDashboard);

module.exports = router;