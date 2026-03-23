const dashboardModel = require("../models/customerDashboard.model");

// GET CUSTOMER DASHBOARD
exports.getCustomerDashboard = async (req, res) => {

  try {

    const data = await dashboardModel.getCustomerDashboard();

    res.status(200).json({
      success: true,
      message: "Customer dashboard data fetched successfully",
      data: data
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};