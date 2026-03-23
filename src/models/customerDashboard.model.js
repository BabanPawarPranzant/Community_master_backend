const db = require("../config/db");

// GET CUSTOMER DASHBOARD
exports.getCustomerDashboard = async () => {

  const result = await db.query(
    `SELECT public.fn_get_customer_dashboard()`
  );

  return result.rows[0];
};