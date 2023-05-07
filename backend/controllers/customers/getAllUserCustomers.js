import asyncHandler from "express-async-handler";
import Customer from "../../models/customerModel.js";

// $-title   Get ALL Customers belonging to a specific User
// $-path    GET /api/v1/customer/all
// $-auth    Private

const getAllUserCustomers = asyncHandler(async (req, res) => {
  // create pagination
  const pageSize = 10;
  const page = Number(req.query.page) || 1;

  const count = await Customer.countDocuments({ createdBy: req.user._id });

  const customers = await Customer.find({ createdBy: req.user._id })
    .sort({
      createdAt: -1,
    })
    .limit(pageSize)
    .skip(pageSize * (page - 1))
    .lean();

  res.json({
    success: true,
    totalCustomers: count,
    numberOfPages: Math.ceil(count / pageSize),
    myCustomers: customers,
  });
});

export default getAllUserCustomers;
